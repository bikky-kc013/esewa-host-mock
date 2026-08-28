/**
 * bridge.ts — Exact native bridge mock per spec section 3
 *
 * Reverse-engineered from esewa-ui-library/dist/index.js:7965-8021
 * - Library registers callback itself on window.Android[callbackKey] etc.
 * - Host only needs to CALL that function with envelope:
 *     { requestType, responseType: 'success'|'error', response }
 * - Must handle both requestMiniApp (no callback) and requestFromMiniApp (with callback)
 * - Platform detection via UA is done by library; host provides platform-specific
 *   transports but does NOT create callback slots — just invokes them.
 *
 * This bridge:
 * - Intercepts all three transports and creates a pending entry
 * - Does NOT auto-respond (spec: dev panel authors response manually)
 * - Optionally can auto-respond with sensible defaults if toggled (for quick DX)
 * - Emits CustomEvents for panel to subscribe
 */

import type { HostPlatform } from './platform';

// Exact strings from dist/index.js:8065-8082
export const REQUEST_TYPE_ENUM = {
  INIT_APP: 'INIT_APP',
  REQUEST_PAYMENT: 'REQUEST_PAYMENT',
  USER_DETAIL_ACCESS: 'USER_DETAIL_ACCESS',
  MEDIA_ACCESS: 'MEDIA_ACCESS',
  LOCATION_ACCESS: 'LOCATION_ACCESS',
  VALIDATE_TRANSACTION: 'VALIDATE_TRANSACTION',
  CLOSE_APP: 'CLOSE_APP',
  FILE_DOWNLOAD_ACCESS: 'FILE_DOWNLOAD_ACCESS',
  GET_PRODUCT: 'GET_PRODUCT',
  VALIDATE_USER: 'VALIDATE_USER',
  MERCHANT_DETAIL: 'MERCHANT_DETAIL',
  QR_SCANNER_ACCESS: 'QR_SCANNER_ACCESS',
  PAYMENT_REQUEST: 'PAYMENT_REQUEST',
  CONNECTION_REQUEST: 'CONNECTION_REQUEST',
  CREDIT_ADDITION: 'CREDIT_ADDITION',
  PAYMENT_SETTLEMENT: 'PAYMENT_SETTLEMENT',
  DUE_DATE_REMINDER: 'DUE_DATE_REMINDER',
} as const;

export type RequestType = (typeof REQUEST_TYPE_ENUM)[keyof typeof REQUEST_TYPE_ENUM];

export type MiniAppResponseType = {
  requestType: string;
  responseType: 'success' | 'error';
  response: any;
};

export type BridgeRequest = {
  id: string;
  timestamp: string;
  platform: HostPlatform; // which transport was used
  raw: string; // original JSON string from library
  data: any; // parsed
  requestType: string;
  callbackKey?: string;
  hasCallback: boolean;
  // for panel: whether we've already responded
  responded: boolean;
  response?: MiniAppResponseType;
  // Task 3.5: suggested prefill for DevPanel when identifier not live
  suggestedResponseType?: 'success' | 'error';
  suggestedResponse?: any;
};

export type SessionState = {
  token: string | null;
  grantedScope: string[] | null;
  user: any | null;
  product: any | null;
  merchant: any | null;
  balance: number | null;
  // keep as editable JSON
};

const MAX_LOG = 100;

let bridgeRequests: BridgeRequest[] = [];
let pendingRequests: BridgeRequest[] = [];
let sessionState: SessionState = {
  token: null,
  grantedScope: null,
  user: {
    esewa_id: '9841000001',
    name: 'Ram Bahadur Thapa',
    mobile: '9841000001',
    email: 'ram.thapa@esewa.mock',
    balance: 12480,
    currency: 'NPR',
  },
  product: {
    id: '3299',
    name: 'Vianet Internet',
    product_code: 'NP-ES-VIANET',
    price: 1200,
    currency: 'NPR',
  },
  merchant: {
    merchant_code: 'NP-ES-MOCK-MERCHANT',
    merchant_name: 'Mock Merchant Pvt. Ltd.',
    address: 'Kathmandu, Nepal',
    contact: '9800000000',
    email: 'merchant@mock.com.np',
  },
  balance: 12480,
};

let listeners: Set<() => void> = new Set();
let pendingListeners: Set<() => void> = new Set();

function emit() {
  listeners.forEach((fn) => fn());
  pendingListeners.forEach((fn) => fn());
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('esewaHostLogUpdate'));
    window.dispatchEvent(new CustomEvent('esewaHostPendingUpdate'));
    window.dispatchEvent(new CustomEvent('esewaHostSessionUpdate'));
  }
}

function genId(): string {
  return Math.random().toString(36).slice(2, 8) + '-' + Date.now().toString(36).slice(-4);
}

function detectPlatformFromTransport(transport: HostPlatform): HostPlatform {
  return transport;
}

// Called by each transport shim when library calls it
function onOutgoing(raw: string, platform: HostPlatform): void {
  let data: any;
  try {
    data = typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch {
    data = { raw, parseError: true };
  }
  const requestType: string = data.requestType || data.request_type || 'UNKNOWN';
  const callbackKey: string | undefined = data.callbackKey;

  const entry: BridgeRequest = {
    id: genId(),
    timestamp: new Date().toISOString(),
    platform,
    raw: typeof raw === 'string' ? raw : JSON.stringify(raw),
    data,
    requestType,
    callbackKey,
    hasCallback: !!callbackKey,
    responded: false,
  };

  // Task 3.5 — auto-validate INIT_APP merchant_identifier against live registry
  if (requestType === REQUEST_TYPE_ENUM.INIT_APP) {
    try {
      const rawStore = typeof window !== 'undefined' ? localStorage.getItem('esewa_dev_registered_miniapps') : null;
      if (rawStore) {
        const apps = JSON.parse(rawStore);
        const mid = data.merchant_identifier || data.merchantIdentifier;
        const match = Array.isArray(apps) ? apps.find((a: any) => a.merchant_identifier === mid && a.status === 'live') : null;
        if (!match) {
          entry.suggestedResponseType = 'error';
          entry.suggestedResponse = { message: 'Unknown or non-live merchant_identifier' };
        }
      } else {
        const mid = data.merchant_identifier || data.merchantIdentifier;
        if (mid) {
          entry.suggestedResponseType = 'error';
          entry.suggestedResponse = { message: 'Unknown or non-live merchant_identifier' };
        }
      }
    } catch {}
  }

  // Task 4 — scope enforcement: if grantedScope exists and requestType not in it (not INIT_APP)
  if (requestType !== REQUEST_TYPE_ENUM.INIT_APP && sessionState.grantedScope) {
    const scope = sessionState.grantedScope;
    if (!scope.includes(requestType)) {
      entry.suggestedResponseType = 'error';
      entry.suggestedResponse = { message: 'Requested service is outside granted scope' };
    }
  }

  // Wallet balance check — if REQUEST_PAYMENT amount exceeds host balance, suggest insufficient error
  if (requestType === REQUEST_TYPE_ENUM.REQUEST_PAYMENT && typeof sessionState.balance === 'number') {
    const amt = (data?.data?.amount ?? data?.amount ?? 0) as number
    if (typeof amt === 'number' && amt > sessionState.balance) {
      entry.suggestedResponseType = 'error';
      entry.suggestedResponse = { error_message: `Insufficient balance. Available: Rs ${sessionState.balance}, required: Rs ${amt}.` };
    }
  }

  bridgeRequests.unshift(entry);
  if (bridgeRequests.length > MAX_LOG) bridgeRequests.pop();

  if (entry.hasCallback) {
    pendingRequests.unshift(entry);
    if (pendingRequests.length > MAX_LOG) pendingRequests.pop();
  }

  // Auto-store token if INIT_APP with manual response not yet fired?
  // We don't auto-respond; panel will fire. But we can show pending.

  console.info(`[eSewa Host] -> ${requestType} via ${platform}`, data);

  emit();
}

/**
 * Fire a response for a pending request.
 * Real contract (Task 4): callback receives raw JSON STRING, not envelope.
 *  - success: JSON.stringify(response)
 *  - error:   JSON.stringify({ error_message: response.message ?? response })
 * Always normalize error under error_message.
 */
export function fireResponse(
  requestId: string,
  responseType: 'success' | 'error',
  response: any,
): boolean {
  const idx = pendingRequests.findIndex((r) => r.id === requestId);
  if (idx === -1) return false;
  const req = pendingRequests[idx];
  const callbackKey = req.callbackKey!;
  const w = window as any;

  // Build wire payload per real contract
  let wirePayload: string;
  let envelopeForLog: MiniAppResponseType;
  if (responseType === 'error') {
    // Normalize error: always { error_message: string }
    let errorMessage: string;
    if (typeof response === 'string') {
      errorMessage = response;
    } else if (response && typeof response === 'object' && 'error_message' in response) {
      // already correct shape (e.g. prefilled {"error_message": "..."}) — use as-is but ensure string
      const val = (response as any).error_message;
      errorMessage = typeof val === 'string' ? val : JSON.stringify(val);
      // if already correct, use original object directly to avoid double wrap
      if (Object.keys(response).length === 1 && 'error_message' in response) {
        wirePayload = JSON.stringify(response);
        envelopeForLog = { requestType: req.requestType, responseType, response };
        // skip generic wrapping below
        // update log and fire directly
        req.responded = true;
        req.response = envelopeForLog;
        const logEntry = bridgeRequests.find((r) => r.id === requestId);
        if (logEntry) { logEntry.responded = true; logEntry.response = envelopeForLog; }
        pendingRequests.splice(idx, 1);
        // No session side-effects for error
        let fn: any =
          (w.Android && w.Android[callbackKey]) ||
          (w.iOSNative && w.iOSNative[callbackKey]) ||
          (w.flutter_inappwebview && w.flutter_inappwebview[callbackKey]);
        if (!fn) {
          if (req.platform === 'android') fn = w.Android?.[callbackKey];
          else if (req.platform === 'ios') fn = w.webkit?.messageHandlers?.iOSNative?.[callbackKey] || w.iOSNative?.[callbackKey];
          else if (req.platform === 'flutter') fn = w.flutter_inappwebview?.[callbackKey];
        }
        if (!fn && w[callbackKey]) fn = w[callbackKey];
        if (typeof fn === 'function') {
          try { fn(wirePayload); console.info(`[eSewa Host] <- ${req.requestType} error`, wirePayload); } catch (e) { console.error(`[eSewa Host] callback ${callbackKey} threw`, e); }
        } else {
          console.warn(`[eSewa Host] No callback found for ${callbackKey} (${req.requestType}). Payload:`, wirePayload);
        }
        emit();
        return true;
      }
      errorMessage = typeof val === 'string' ? val : String(val);
    } else if (response && typeof response === 'object' && 'message' in response) {
      errorMessage = String((response as any).message);
    } else if (typeof response === 'object') {
      // if object without message/error_message, stringify it as message
      errorMessage = JSON.stringify(response);
    } else {
      errorMessage = String(response);
    }
    wirePayload = JSON.stringify({ error_message: errorMessage });
    envelopeForLog = { requestType: req.requestType, responseType, response: { error_message: errorMessage } };
  } else {
    wirePayload = JSON.stringify(response);
    envelopeForLog = { requestType: req.requestType, responseType, response };
  }

  // Update pending entry for log display
  req.responded = true;
  req.response = envelopeForLog;
  const logEntry = bridgeRequests.find((r) => r.id === requestId);
  if (logEntry) {
    logEntry.responded = true;
    logEntry.response = envelopeForLog;
  }

  pendingRequests.splice(idx, 1);

  // Session side-effects — scope + token
  if (
    req.requestType === REQUEST_TYPE_ENUM.INIT_APP &&
    responseType === 'success' &&
    response?.token
  ) {
    sessionState.token = response.token;
    if (Array.isArray(response.scope)) {
      sessionState.grantedScope = [...response.scope];
    }
    try {
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('miniAppAuthToken', response.token);
      if (response.scope) sessionStorage.setItem('miniAppAuthScope', JSON.stringify(response.scope));
    } catch {}
  }
  if (req.requestType === REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS && responseType === 'success') {
    sessionState.user = response;
    if (typeof response.balance === 'number') sessionState.balance = response.balance;
    else if (typeof response.walletBalance === 'number') sessionState.balance = response.walletBalance;
  }
  if (req.requestType === REQUEST_TYPE_ENUM.GET_PRODUCT && responseType === 'success') {
    sessionState.product = response;
  }
  if (req.requestType === REQUEST_TYPE_ENUM.MERCHANT_DETAIL && responseType === 'success') {
    sessionState.merchant = response;
  }
  if (req.requestType === REQUEST_TYPE_ENUM.REQUEST_PAYMENT && responseType === 'success') {
    const amt = (req.data?.data?.amount ?? response?.amount ?? 0) as number
    if (typeof sessionState.balance === 'number' && typeof amt === 'number') {
      sessionState.balance = Math.max(0, sessionState.balance - amt)
      if (sessionState.user && typeof sessionState.user === 'object') {
        ;(sessionState.user as Record<string, unknown>).balance = sessionState.balance
      }
    }
  }

  // Call the callback slot that library created — with JSON STRING
  let fn: any =
    (w.Android && w.Android[callbackKey]) ||
    (w.iOSNative && w.iOSNative[callbackKey]) ||
    (w.flutter_inappwebview && w.flutter_inappwebview[callbackKey]);

  if (!fn) {
    if (req.platform === 'android') fn = w.Android?.[callbackKey];
    else if (req.platform === 'ios')
      fn = w.webkit?.messageHandlers?.iOSNative?.[callbackKey] || w.iOSNative?.[callbackKey];
    else if (req.platform === 'flutter') fn = w.flutter_inappwebview?.[callbackKey];
  }

  if (!fn && w[callbackKey]) fn = w[callbackKey];

  if (typeof fn === 'function') {
    try {
      fn(wirePayload);
      console.info(`[eSewa Host] <- ${req.requestType} ${responseType}`, wirePayload);
    } catch (e) {
      console.error(`[eSewa Host] callback ${callbackKey} threw`, e);
    }
  } else {
    console.warn(
      `[eSewa Host] No callback found for ${callbackKey} (${req.requestType}). Payload:`,
      wirePayload,
    );
  }

  emit();
  return true;
}

export function getBridgeRequests(): BridgeRequest[] {
  return [...bridgeRequests];
}

export function getPendingRequests(): BridgeRequest[] {
  return [...pendingRequests];
}

export function clearBridgeLog(): void {
  bridgeRequests = [];
  pendingRequests = [];
  emit();
}

export function getSessionState(): SessionState {
  return { ...sessionState };
}

export function setSessionState(patch: Partial<SessionState>): void {
  Object.assign(sessionState, patch);
  // persist token / scope side-effect if provided
  if (patch.token !== undefined) {
    try {
      if (patch.token) {
        sessionStorage.setItem('token', patch.token);
        sessionStorage.setItem('miniAppAuthToken', patch.token);
      } else {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('miniAppAuthToken');
      }
    } catch {}
  }
  if (patch.grantedScope !== undefined) {
    try {
      if (patch.grantedScope) {
        sessionStorage.setItem('miniAppAuthScope', JSON.stringify(patch.grantedScope));
      } else {
        sessionStorage.removeItem('miniAppAuthScope');
      }
    } catch {}
  }
  emit();
}

export function subscribeLogs(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function subscribePending(fn: () => void): () => void {
  pendingListeners.add(fn);
  return () => pendingListeners.delete(fn);
}

// Default response templates per requestType for panel quick-fill
// INIT_APP placeholder uses realistic narrow scope per Task 4 spec
export const DEFAULT_RESPONSES: Record<string, any> = {
  [REQUEST_TYPE_ENUM.INIT_APP]: {
    token: 'dev-fake-token',
    scope: ['USER_DETAIL_ACCESS', 'LOCATION_ACCESS', 'MEDIA_ACCESS', 'REQUEST_PAYMENT'],
  },
  [REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS]: {
    esewa_id: '9841000001',
    name: 'Ram Bahadur Thapa',
    mobile: '9841000001',
    email: 'ram.thapa@esewa.mock',
    balance: 12480,
    currency: 'NPR',
  },
  [REQUEST_TYPE_ENUM.LOCATION_ACCESS]: {
    latitude: 27.7172,
    longitude: 85.324,
    accuracy: 12.5,
    address: 'Kathmandu, Nepal',
  },
  [REQUEST_TYPE_ENUM.MEDIA_ACCESS]: {
    media:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=',
  },
  [REQUEST_TYPE_ENUM.VALIDATE_TRANSACTION]: {
    status: 'COMPLETE',
    transaction_uuid: 'mock-txn-' + Date.now(),
    refId: 'MOCK123456',
    amount: 1250.5,
  },
  [REQUEST_TYPE_ENUM.REQUEST_PAYMENT]: {
    status: 'COMPLETE',
    refId: 'PAY123456',
    transaction_uuid: 'txn-' + Date.now(),
    amount: 28.48,
  },
  [REQUEST_TYPE_ENUM.CLOSE_APP]: {
    message: 'App would close here',
  },
  [REQUEST_TYPE_ENUM.GET_PRODUCT]: {
    products: [
      {
        id: '3299',
        name: 'Vianet Internet',
        product_code: 'NP-ES-VIANET',
        price: 1200,
        currency: 'NPR',
      },
    ],
    total: 1,
  },
  [REQUEST_TYPE_ENUM.VALIDATE_USER]: {
    valid: true,
    esewa_id: '9847474747',
    name: 'Ram Thapa',
    status: 'ACTIVE',
  },
  [REQUEST_TYPE_ENUM.MERCHANT_DETAIL]: {
    merchant_code: 'NP-ES-MOCK-MERCHANT',
    merchant_name: 'Mock Merchant Pvt. Ltd.',
    address: 'Kathmandu, Nepal',
    contact: '9800000000',
    email: 'merchant@mock.com.np',
    status: 'ACTIVE',
  },
  [REQUEST_TYPE_ENUM.QR_SCANNER_ACCESS]: {
    qr_data: 'https://esewa.com.np/qr/MOCK123',
    scanned_text: 'esewa://pay?amt=500',
    format: 'QR_CODE',
  },
  [REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS]: {
    message: 'Download simulated',
    fileName: 'Statement-2025.pdf',
    type: 'url',
    content: 'https://example.com/sample.pdf',
  },
  [REQUEST_TYPE_ENUM.PAYMENT_REQUEST]: { status: 'PENDING', amount: 100 },
  [REQUEST_TYPE_ENUM.CONNECTION_REQUEST]: { status: 'CONNECTED' },
  [REQUEST_TYPE_ENUM.CREDIT_ADDITION]: { status: 'SUCCESS', amount: 500 },
  [REQUEST_TYPE_ENUM.PAYMENT_SETTLEMENT]: { status: 'SETTLED' },
  [REQUEST_TYPE_ENUM.DUE_DATE_REMINDER]: { due_date: '2026-09-01', amount: 200 },
};

// ---------------------------------------------------------------------------
// Installer — sets up window.Android / webkit / flutter_inappwebview
// Does NOT create callback slots (library does), only intercepts outgoing calls
// ---------------------------------------------------------------------------
let installed = false;

export function installHostBridge(): boolean {
  if (typeof window === 'undefined') return false;
  const w = window as any;
  if (installed || w.__ESEWA_HOST_BRIDGE_INSTALLED__) {
    console.info('[eSewa Host] Bridge already installed');
    return true;
  }

  // Preserve any real native bridge (in real eSewa app, these already exist)
  const prevAndroid = w.Android?.requestApp;
  const prevIOS = w.webkit?.messageHandlers?.iOSNative?.postMessage;
  const prevFlutter = w.flutter_inappwebview?.callHandler;

  w.Android = w.Android || {};
  w.Android.requestApp = (data: string) => {
    onOutgoing(data, 'android');
    if (typeof prevAndroid === 'function') {
      try {
        prevAndroid.call(w.Android, data);
      } catch {}
    }
  };

  w.webkit = w.webkit || {};
  w.webkit.messageHandlers = w.webkit.messageHandlers || {};
  w.webkit.messageHandlers.iOSNative = w.webkit.messageHandlers.iOSNative || {};
  // capture after ensuring object exists
  const iosTarget = w.webkit.messageHandlers.iOSNative;
  const prevIOSPost = iosTarget.postMessage;
  iosTarget.postMessage = (data: any) => {
    const str = typeof data === 'string' ? data : JSON.stringify(data);
    onOutgoing(str, 'ios');
    if (typeof prevIOS === 'function' && prevIOS !== iosTarget.postMessage) {
      try {
        prevIOS.call(iosTarget, data);
      } catch {}
    } else if (typeof prevIOSPost === 'function' && prevIOSPost !== iosTarget.postMessage) {
      try {
        prevIOSPost.call(iosTarget, data);
      } catch {}
    }
  };

  // Also support window.iOSNative for older wrappers (library sometimes uses window.iOSNative)
  w.iOSNative = w.iOSNative || {};

  w.flutter_inappwebview = w.flutter_inappwebview || {};
  const prevFlutterHandler = w.flutter_inappwebview.callHandler;
  w.flutter_inappwebview.callHandler = (handlerName: string, data: any) => {
    if (handlerName === 'eSewaHandler') {
      const str = typeof data === 'string' ? data : JSON.stringify(data);
      onOutgoing(str, 'flutter');
    }
    if (typeof prevFlutter === 'function' && prevFlutter !== w.flutter_inappwebview.callHandler) {
      try {
        prevFlutter.call(w.flutter_inappwebview, handlerName, data);
      } catch {}
    } else if (
      typeof prevFlutterHandler === 'function' &&
      prevFlutterHandler !== w.flutter_inappwebview.callHandler
    ) {
      try {
        prevFlutterHandler.call(w.flutter_inappwebview, handlerName, data);
      } catch {}
    }
  };

  // Also shim legacy window.requestFromMiniApp if someone calls it directly
  // (not used by library, but useful for quick tests)
  if (typeof w.requestFromMiniApp !== 'function') {
    w.requestFromMiniApp = (data: any, _cb?: any) => {
      // library would have registered cb, but direct caller passes it here
      // we treat it as outgoing too
      onOutgoing(JSON.stringify(data), detectPlatformFromUA());
    };
  }

  // Helper to detect current platform from UA for legacy shim
  function detectPlatformFromUA(): HostPlatform {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    if (/Flutter/i.test(ua) || /wv/i.test(ua)) return 'flutter';
    if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
    return 'android';
  }

  w.__ESEWA_HOST_BRIDGE_INSTALLED__ = true;
  installed = true;
  console.info('[eSewa Host] Bridge installed — waiting for Mini App requests');
  // Expose for debugging / panel
  w.__ESEWA_HOST__ = {
    getBridgeRequests,
    getPendingRequests,
    getSessionState,
    setSessionState,
    fireResponse,
    clearBridgeLog,
    REQUEST_TYPE_ENUM,
    // also expose for tests
    _onOutgoing: onOutgoing,
  };
  return true;
}

export function uninstallHostBridge(): void {
  if (typeof window === 'undefined') return;
  const w = window as any;
  delete w.__ESEWA_HOST_BRIDGE_INSTALLED__;
  delete w.__ESEWA_HOST__;
  installed = false;
}

// For tests: reset all state
export function resetBridge(): void {
  bridgeRequests = [];
  pendingRequests = [];
  sessionState = {
    token: null,
    grantedScope: null,
    user: {
      esewa_id: '9841000001',
      name: 'Ram Bahadur Thapa',
      mobile: '9841000001',
      email: 'ram.thapa@esewa.mock',
      balance: 12480,
      currency: 'NPR',
    },
    product: {
      id: '3299',
      name: 'Vianet Internet',
      product_code: 'NP-ES-VIANET',
      price: 1200,
      currency: 'NPR',
    },
    merchant: {
      merchant_code: 'NP-ES-MOCK-MERCHANT',
      merchant_name: 'Mock Merchant Pvt. Ltd.',
      address: 'Kathmandu, Nepal',
      contact: '9800000000',
      email: 'merchant@mock.com.np',
    },
    balance: 12480,
  };
  try {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('miniAppAuthToken');
    sessionStorage.removeItem('miniAppAuthScope');
  } catch {}
  emit();
}

declare global {
  interface Window {
    __ESEWA_HOST_BRIDGE_INSTALLED__?: boolean;
    __ESEWA_HOST__?: any;
  }
}
