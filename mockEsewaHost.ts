/**
 * mockEsewaHost.ts
 * ----------------
 * Mock eSewa Mini App host bridge for local browser development.
 *
 * Implements `window.requestFromMiniApp(requestData, callback)` exactly as
 * the real eSewa webview does, with realistic stub payloads, latency,
 * token/session gating and scope checks.
 *
 * - Only attaches if `window.requestFromMiniApp` is NOT already defined
 *   (never overrides the real host in production/webview).
 * - Simulates 300-800ms latency via setTimeout.
 * - Persists fake token/scope in memory + sessionStorage.
 * - Exposes `window.__MOCK_ESEWA__` for the dev panel to mutate.
 *
 * Integration (Vite):
 * ```ts
 * // main.tsx — before root render
 * if (import.meta.env.DEV) {
 *   await import('./mockEsewaHost');
 * }
 * ```
 *
 * Integration (CRA / webpack):
 * ```ts
 * if (process.env.NODE_ENV !== 'production') {
 *   require('./mockEsewaHost');
 * }
 * ```
 *
 * @see esewa-ui-library README — Services section
 */

// ---------------------------------------------------------------------------
// Types & enums (mirrors esewa-ui-library)
// ---------------------------------------------------------------------------

export enum REQUEST_TYPE_ENUM {
  INIT_APP = 'INIT_APP',
  REQUEST_PAYMENT = 'REQUEST_PAYMENT',
  USER_DETAIL_ACCESS = 'USER_DETAIL_ACCESS',
  MEDIA_ACCESS = 'MEDIA_ACCESS',
  LOCATION_ACCESS = 'LOCATION_ACCESS',
  VALIDATE_TRANSACTION = 'VALIDATE_TRANSACTION',
  CLOSE_APP = 'CLOSE_APP',
  FILE_DOWNLOAD_ACCESS = 'FILE_DOWNLOAD_ACCESS',
  GET_PRODUCT = 'GET_PRODUCT',
  VALIDATE_USER = 'VALIDATE_USER',
  MERCHANT_DETAIL = 'MERCHANT_DETAIL',
  QR_SCANNER_ACCESS = 'QR_SCANNER_ACCESS',
}

export enum CALLBACK_TYPE_ENUM {
  INIT_APP_CALLBACK = 'INIT_APP_CALLBACK',
  REQUEST_PAYMENT_CALLBACK = 'REQUEST_PAYMENT_CALLBACK',
  USER_DETAIL_ACCESS_CALLBACK = 'USER_DETAIL_ACCESS_CALLBACK',
  MEDIA_ACCESS_CALLBACK = 'MEDIA_ACCESS_CALLBACK',
  LOCATION_ACCESS_CALLBACK = 'LOCATION_ACCESS_CALLBACK',
  VALIDATE_TRANSACTION_CALLBACK = 'VALIDATE_TRANSACTION_CALLBACK',
  CLOSE_APP_CALLBACK = 'CLOSE_APP_CALLBACK',
  FILE_DOWNLOAD_ACCESS_CALLBACK = 'FILE_DOWNLOAD_ACCESS_CALLBACK',
  GET_PRODUCT_CALLBACK = 'GET_PRODUCT_CALLBACK',
  VALIDATE_USER_CALLBACK = 'VALIDATE_USER_CALLBACK',
  MERCHANT_DETAIL_CALLBACK = 'MERCHANT_DETAIL_CALLBACK',
  QR_SCANNER_ACCESS_CALLBACK = 'QR_SCANNER_ACCESS_CALLBACK',
}

export type RequestData = {
  requestType: string; // REQUEST_TYPE_ENUM
  token?: string | null;
  merchant_identifier?: string;
  callbackKey?: string;
  data?: any;
};

export type MiniAppCallback = (data: any) => void;

// ---------------------------------------------------------------------------
// Mock configuration
// ---------------------------------------------------------------------------

export type ValidateStatus = 'COMPLETE' | 'PENDING' | 'FAILED';

export type MockEsewaConfig = {
  /** Fake JWT / token issued on INIT_APP */
  token: string;
  /** Scopes granted on INIT_APP */
  scope: string[];
  /** Fake user identity */
  esewaId: string;
  userName: string;
  mobile: string;
  email: string;
  /** Fake location */
  latitude: number;
  longitude: number;
  /** Fake payment amount used as fallback */
  amount: number;
  /** Wallet balance — returned via USER_DETAIL_ACCESS and checked on REQUEST_PAYMENT */
  balance: number;
  /** VALIDATE_TRANSACTION status toggle */
  validateStatus: ValidateStatus;
  /** Per-request forced error toggle */
  forceError: Record<string, boolean>;
  /** Optional custom error message per request type */
  errorMessages: Record<string, string>;
  /** Simulate latency ms range */
  latencyMin: number;
  latencyMax: number;
};

export const DEFAULT_SCOPE: string[] = [
  REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS,
  REQUEST_TYPE_ENUM.LOCATION_ACCESS,
  REQUEST_TYPE_ENUM.MEDIA_ACCESS,
  REQUEST_TYPE_ENUM.VALIDATE_TRANSACTION,
  REQUEST_TYPE_ENUM.REQUEST_PAYMENT,
  REQUEST_TYPE_ENUM.GET_PRODUCT,
  REQUEST_TYPE_ENUM.VALIDATE_USER,
  REQUEST_TYPE_ENUM.MERCHANT_DETAIL,
  REQUEST_TYPE_ENUM.QR_SCANNER_ACCESS,
  REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS,
];

// 1x1 transparent PNG
const MOCK_BASE64_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

const STORAGE_TOKEN_KEY = 'miniAppAuthToken';
const STORAGE_SCOPE_KEY = 'miniAppAuthScope';

export const mockEsewaConfig: MockEsewaConfig = {
  token: 'SEdcRFVePhYfCRtQJhEiATA8DyVWFFA7Dw8UBEAKH1IkLFwYJAUxPgI%3D',
  scope: [...DEFAULT_SCOPE],
  esewaId: '9841000001',
  userName: 'Ram Bahadur Thapa',
  mobile: '9841000001',
  email: 'ram.thapa@esewa.mock',
  latitude: 27.7172,
  longitude: 85.324,
  amount: 1250.5,
  balance: 12480,
  validateStatus: 'COMPLETE',
  forceError: {},
  errorMessages: {},
  latencyMin: 300,
  latencyMax: 800,
};

// internal session state — token is null until INIT_APP succeeds
const mockState: { token: string | null; scope: string[] | null } = {
  token: null,
  scope: null,
};

// recent call log for dev panel
export type MockCallLog = {
  id: string;
  ts: string;
  requestType: string;
  requestData: RequestData;
  response: any;
  isError: boolean;
  latency: number;
};
const mockLogs: MockCallLog[] = [];
const MAX_LOGS = 50;

// Callback contract:
// - Most types return JSON string (caller does JSON.parse)
// - MEDIA_ACCESS, FILE_DOWNLOAD_ACCESS, CLOSE_APP return raw object/string
const RAW_CALLBACK_TYPES = new Set<string>([
  REQUEST_TYPE_ENUM.MEDIA_ACCESS,
  REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS,
  REQUEST_TYPE_ENUM.CLOSE_APP,
]);

// Scope gating — which request type requires scope entry
// INIT_APP and CLOSE_APP never require scope.
const SCOPE_REQUIRED = new Set<string>([
  REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS,
  REQUEST_TYPE_ENUM.LOCATION_ACCESS,
  REQUEST_TYPE_ENUM.MEDIA_ACCESS,
  REQUEST_TYPE_ENUM.VALIDATE_TRANSACTION,
  REQUEST_TYPE_ENUM.REQUEST_PAYMENT,
  REQUEST_TYPE_ENUM.GET_PRODUCT,
  REQUEST_TYPE_ENUM.VALIDATE_USER,
  REQUEST_TYPE_ENUM.MERCHANT_DETAIL,
  REQUEST_TYPE_ENUM.QR_SCANNER_ACCESS,
  REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS,
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function randomLatency(): number {
  const { latencyMin, latencyMax } = mockEsewaConfig;
  return Math.floor(Math.random() * (latencyMax - latencyMin + 1)) + latencyMin;
}

function genToken(): string {
  // keep deterministic default unless overridden by panel
  return (
    mockEsewaConfig.token || `mock_token_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  );
}

function errorPayload(requestType: string, fallback: string): { error_message: string } {
  const custom = mockEsewaConfig.errorMessages[requestType];
  return { error_message: custom || fallback };
}

function pushLog(entry: MockCallLog) {
  mockLogs.unshift(entry);
  if (mockLogs.length > MAX_LOGS) mockLogs.pop();
  // notify panel
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mockEsewaLogUpdate', { detail: entry }));
    window.dispatchEvent(new CustomEvent('mockEsewaConfigChange'));
  }
}

function emitConfigChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mockEsewaConfigChange'));
  }
}

// ---------------------------------------------------------------------------
// Stub generators per REQUEST_TYPE_ENUM
// ---------------------------------------------------------------------------

function buildStub(requestData: RequestData): { payload: any; isError: boolean; raw: boolean } {
  const rt = requestData.requestType;
  const isRaw = RAW_CALLBACK_TYPES.has(rt);

  // forced error path (per-type toggle)
  if (mockEsewaConfig.forceError[rt]) {
    const err = errorPayload(rt, `Mock forced error for ${rt}`);
    return { payload: err, isError: true, raw: isRaw };
  }

  switch (rt) {
    case REQUEST_TYPE_ENUM.INIT_APP: {
      const token = genToken();
      const scope = [...mockEsewaConfig.scope];
      // persist session
      mockState.token = token;
      mockState.scope = scope;
      try {
        sessionStorage.setItem(STORAGE_TOKEN_KEY, token);
        sessionStorage.setItem(STORAGE_SCOPE_KEY, JSON.stringify(scope));
      } catch {
        // ignore storage errors (SSR / blocked)
      }
      return {
        payload: { token, scope },
        isError: false,
        raw: false,
      };
    }

    case REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS: {
      return {
        payload: {
          esewa_id: mockEsewaConfig.esewaId,
          name: mockEsewaConfig.userName,
          mobile: mockEsewaConfig.mobile,
          email: mockEsewaConfig.email,
          balance: mockEsewaConfig.balance,
          currency: 'NPR',
        },
        isError: false,
        raw: false,
      };
    }

    case REQUEST_TYPE_ENUM.LOCATION_ACCESS: {
      return {
        payload: {
          latitude: mockEsewaConfig.latitude,
          longitude: mockEsewaConfig.longitude,
          accuracy: 12.5,
          address: 'Kathmandu, Nepal',
        },
        isError: false,
        raw: false,
      };
    }

    case REQUEST_TYPE_ENUM.MEDIA_ACCESS: {
      // docs: callback receives data directly (no JSON.parse) — return base64 string
      return {
        payload: MOCK_BASE64_IMAGE,
        isError: false,
        raw: true,
      };
    }

    case REQUEST_TYPE_ENUM.VALIDATE_TRANSACTION: {
      return {
        payload: {
          status: mockEsewaConfig.validateStatus,
          transaction_uuid: `mock-txn-${Date.now()}`,
          refId: `MOCK${Math.floor(100000 + Math.random() * 900000)}`,
          amount: requestData.data?.amount ?? mockEsewaConfig.amount,
          product_code: requestData.data?.product_code ?? 'NP-ES-MOCK',
        },
        isError: false,
        raw: false,
      };
    }

    case REQUEST_TYPE_ENUM.REQUEST_PAYMENT: {
      const amt = requestData.data?.amount ?? mockEsewaConfig.amount;
      const pcode = requestData.data?.product_code ?? 'NP-ES-VIANET';
      // Insufficient balance check — mirrors real host wallet validation
      if (typeof mockEsewaConfig.balance === 'number' && amt > mockEsewaConfig.balance) {
        return {
          payload: {
            error_message: `Insufficient balance. Available: Rs ${mockEsewaConfig.balance}, required: Rs ${amt}.`,
          },
          isError: true,
          raw: false,
        };
      }
      // deduct for subsequent calls (demo)
      if (typeof mockEsewaConfig.balance === 'number') {
        mockEsewaConfig.balance = Math.max(0, mockEsewaConfig.balance - amt);
      }
      return {
        payload: {
          status: 'COMPLETE',
          refId: `PAY${Math.floor(100000 + Math.random() * 900000)}`,
          transaction_uuid: `txn-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          transaction_code: `TXN${Date.now()}`,
          product_code: pcode,
          amount: amt,
          remainingBalance: mockEsewaConfig.balance,
          // echo original properties for convenience
          properties: requestData.data?.properties ?? {},
          message: 'Payment request simulated successfully',
        },
        isError: false,
        raw: false,
      };
    }

    case REQUEST_TYPE_ENUM.CLOSE_APP: {
      console.info('[Mock eSewa Host] App would close here — CLOSE_APP called', requestData);
      return {
        payload: { message: 'App would close here' },
        isError: false,
        raw: true,
      };
    }

    case REQUEST_TYPE_ENUM.GET_PRODUCT: {
      return {
        payload: {
          products: [
            {
              id: '3299',
              name: 'Vianet Internet',
              product_code: 'NP-ES-VIANET',
              price: 1200,
              currency: 'NPR',
              image: 'https://via.placeholder.com/150',
              description: 'Mock Vianet product',
            },
            {
              id: '3300',
              name: 'WorldLink Internet',
              product_code: 'NP-ES-WORLDLINK',
              price: 1500,
              currency: 'NPR',
              image: 'https://via.placeholder.com/150',
              description: 'Mock WorldLink product',
            },
          ],
          total: 2,
          merchant_identifier:
            requestData.merchant_identifier ?? 'IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=',
        },
        isError: false,
        raw: false,
      };
    }

    case REQUEST_TYPE_ENUM.VALIDATE_USER: {
      const esewaId = requestData.data?.esewa_id ?? mockEsewaConfig.esewaId;
      return {
        payload: {
          valid: true,
          esewa_id: String(esewaId),
          name: mockEsewaConfig.userName,
          status: 'ACTIVE',
        },
        isError: false,
        raw: false,
      };
    }

    case REQUEST_TYPE_ENUM.MERCHANT_DETAIL: {
      return {
        payload: {
          merchant_code: 'NP-ES-MOCK-MERCHANT',
          merchant_name: 'Mock Merchant Pvt. Ltd.',
          address: 'Kathmandu, Nepal',
          contact: '9800000000',
          email: 'merchant@mock.com.np',
          status: 'ACTIVE',
          category: 'UTILITY',
          identifier:
            requestData.merchant_identifier ?? 'IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=',
        },
        isError: false,
        raw: false,
      };
    }

    case REQUEST_TYPE_ENUM.QR_SCANNER_ACCESS: {
      return {
        payload: {
          qr_data: 'https://esewa.com.np/qr/MOCK123456789',
          scanned_text: 'esewa://pay?amt=500&pid=MOCK123&qr=MOCK123456789',
          format: 'QR_CODE',
        },
        isError: false,
        raw: false,
      };
    }

    case REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS: {
      return {
        payload: {
          message: 'Download simulated',
          fileName: requestData.data?.fileName ?? 'Statement-2025.pdf',
          type: requestData.data?.type ?? 'url',
          content:
            requestData.data?.content ??
            'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf',
        },
        isError: false,
        raw: true,
      };
    }

    default: {
      return {
        payload: errorPayload(rt, `Unknown requestType: ${rt}`),
        isError: true,
        raw: false,
      };
    }
  }
}

// ---------------------------------------------------------------------------
// Core bridge implementation
// ---------------------------------------------------------------------------

function mockRequestFromMiniApp(requestData: RequestData, callback?: MiniAppCallback): void {
  const latency = randomLatency();
  const rt = requestData?.requestType;

  // basic validation
  if (!rt) {
    const err = { error_message: 'Missing requestType' };
    setTimeout(() => callback?.(JSON.stringify(err)), latency);
    return;
  }

  // 1. token gating — INIT_APP always allowed, CLOSE_APP allowed without token for DX
  //    all other types require an issued token
  if (rt !== REQUEST_TYPE_ENUM.INIT_APP && rt !== REQUEST_TYPE_ENUM.CLOSE_APP) {
    if (!mockState.token) {
      // also try sessionStorage as fallback (page reload)
      try {
        const stored = sessionStorage.getItem(STORAGE_TOKEN_KEY);
        if (stored) mockState.token = stored;
      } catch {}
    }
    if (!mockState.token) {
      const err = errorPayload(rt, 'Token not found. Please call INIT_APP first.');
      const raw = RAW_CALLBACK_TYPES.has(rt);
      const out = raw ? err : JSON.stringify(err);
      console.warn(`[Mock eSewa Host] ${rt} rejected — no token issued yet`, requestData);
      setTimeout(() => {
        callback?.(out);
        pushLog({
          id: Math.random().toString(36).slice(2, 8),
          ts: new Date().toISOString(),
          requestType: rt,
          requestData,
          response: out,
          isError: true,
          latency,
        });
      }, latency);
      return;
    }

    // optional token equality check — if caller sent a different token, treat as expired
    if (requestData.token && requestData.token !== mockState.token) {
      const err = errorPayload(rt, 'Invalid token. Please re-initialize the app (INIT_APP).');
      const raw = RAW_CALLBACK_TYPES.has(rt);
      const out = raw ? err : JSON.stringify(err);
      console.warn(`[Mock eSewa Host] ${rt} rejected — token mismatch`, {
        expected: mockState.token,
        received: requestData.token,
      });
      setTimeout(() => {
        callback?.(out);
        pushLog({
          id: Math.random().toString(36).slice(2, 8),
          ts: new Date().toISOString(),
          requestType: rt,
          requestData,
          response: out,
          isError: true,
          latency,
        });
      }, latency);
      return;
    }

    // 2. scope gating
    if (SCOPE_REQUIRED.has(rt)) {
      // hydrate scope from storage if needed
      if (!mockState.scope) {
        try {
          const storedScope = sessionStorage.getItem(STORAGE_SCOPE_KEY);
          if (storedScope) mockState.scope = JSON.parse(storedScope);
        } catch {}
      }
      const allowed = mockState.scope ?? mockEsewaConfig.scope;
      if (!allowed.includes(rt)) {
        const err = errorPayload(
          rt,
          `Merchant scope not found for ${rt}. Granted scope: [${(allowed || []).join(', ')}]`,
        );
        const raw = RAW_CALLBACK_TYPES.has(rt);
        const out = raw ? err : JSON.stringify(err);
        console.warn(`[Mock eSewa Host] ${rt} rejected — scope not granted`, {
          requestType: rt,
          grantedScope: allowed,
        });
        setTimeout(() => {
          callback?.(out);
          pushLog({
            id: Math.random().toString(36).slice(2, 8),
            ts: new Date().toISOString(),
            requestType: rt,
            requestData,
            response: out,
            isError: true,
            latency,
          });
        }, latency);
        return;
      }
    }
  }

  // build stub
  const { payload, isError, raw } = buildStub(requestData);
  const out: any = raw ? payload : JSON.stringify(payload);

  console.info(`[Mock eSewa Host] ${rt} → ${isError ? 'error' : 'success'} (${latency}ms)`, {
    request: requestData,
    response: payload,
  });

  setTimeout(() => {
    try {
      // CLOSE_APP may be called without callback — just return
      if (typeof callback === 'function') {
        callback(out);
      } else if (rt === REQUEST_TYPE_ENUM.CLOSE_APP) {
        // no callback expected, already logged
      } else {
        console.warn(`[Mock eSewa Host] ${rt} called without callback — response was:`, out);
      }
    } catch (e) {
      console.error('[Mock eSewa Host] callback threw', e);
    }
    pushLog({
      id: Math.random().toString(36).slice(2, 8),
      ts: new Date().toISOString(),
      requestType: rt,
      requestData,
      response: out,
      isError,
      latency,
    });
  }, latency);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function installMockEsewaHost(overrides?: Partial<MockEsewaConfig>): boolean {
  if (typeof window === 'undefined') {
    console.warn('[Mock eSewa Host] window not available — skipping install');
    return false;
  }

  const w = window as any;

  if (typeof w.requestFromMiniApp === 'function' && !w.__MOCK_ESEWA_INSTALLED__) {
    console.info('[Mock eSewa Host] Real bridge already present — mock will not override.');
    return false;
  }

  if (w.__MOCK_ESEWA_INSTALLED__) {
    console.info('[Mock eSewa Host] Already installed.');
    return true;
  }

  if (overrides) {
    Object.assign(mockEsewaConfig, overrides);
  }

  // hydrate session from storage if page reload
  try {
    const storedToken = sessionStorage.getItem(STORAGE_TOKEN_KEY);
    const storedScope = sessionStorage.getItem(STORAGE_SCOPE_KEY);
    if (storedToken) mockState.token = storedToken;
    if (storedScope) mockState.scope = JSON.parse(storedScope);
  } catch {}

  w.requestFromMiniApp = mockRequestFromMiniApp;
  w.__MOCK_ESEWA_INSTALLED__ = true;

  // expose for panel + debugging
  w.__MOCK_ESEWA__ = {
    config: mockEsewaConfig,
    state: mockState,
    logs: mockLogs,
    install: installMockEsewaHost,
    uninstall: uninstallMockEsewaHost,
    reset: resetMockSession,
    setConfig: setMockConfig,
    getConfig: () => ({ ...mockEsewaConfig }),
    setForceError: (type: string, val: boolean) => {
      mockEsewaConfig.forceError[type] = val;
      emitConfigChange();
    },
    setValidateStatus: (s: ValidateStatus) => {
      mockEsewaConfig.validateStatus = s;
      emitConfigChange();
    },
    REQUEST_TYPE_ENUM,
    CALLBACK_TYPE_ENUM,
  };

  console.info('[Mock eSewa Host] Mock bridge installed ✅', {
    token: mockState.token ? 'hydrated' : 'none (call INIT_APP)',
    scope: mockState.scope ?? mockEsewaConfig.scope,
  });

  return true;
}

export function uninstallMockEsewaHost(): void {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (w.__MOCK_ESEWA_INSTALLED__) {
    delete w.requestFromMiniApp;
    delete w.__MOCK_ESEWA_INSTALLED__;
    delete w.__MOCK_ESEWA__;
    console.info('[Mock eSewa Host] Uninstalled');
  }
}

export function resetMockSession(): void {
  mockState.token = null;
  mockState.scope = null;
  try {
    sessionStorage.removeItem(STORAGE_TOKEN_KEY);
    sessionStorage.removeItem(STORAGE_SCOPE_KEY);
  } catch {}
  // clear logs? keep for debugging
  console.info('[Mock eSewa Host] Session reset — call INIT_APP again to get new token');
  emitConfigChange();
}

export function setMockConfig(patch: Partial<MockEsewaConfig>): void {
  Object.assign(mockEsewaConfig, patch);
  emitConfigChange();
}

export function getMockConfig(): MockEsewaConfig {
  return { ...mockEsewaConfig, scope: [...mockEsewaConfig.scope] };
}

export function getMockLogs(): MockCallLog[] {
  return [...mockLogs];
}

export function clearMockLogs(): void {
  mockLogs.length = 0;
  emitConfigChange();
}

// ---------------------------------------------------------------------------
// Library shim — bridge esewa-ui-library's native transports to mockRequestFromMiniApp
// ---------------------------------------------------------------------------
// esewa-ui-library/dist/index.js:7965-8021 does NOT use window.requestFromMiniApp.
// It uses: window.Android.requestApp(JSON) / webkit.messageHandlers.iOSNative.postMessage
//         / flutter_inappwebview.callHandler('eSewaHandler', data)
// and stores callback on window.Android[callbackKey] etc.
// On desktop none of those UAs match, so callbacks are never stored and nothing is sent.
// This shim makes the mock work for library users in a normal browser:
//
//  1. Spoofs navigator.userAgent to contain "Android" BEFORE the library evaluates isAndroid
//  2. Installs window.Android.requestApp / iOS / Flutter handlers that forward to mockRequestFromMiniApp
//  3. Patches the library's exported requestFromMiniApp at runtime to fallback to window.requestFromMiniApp
//

function installLibraryShim(): void {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (w.__MOCK_ESEWA_SHIM_INSTALLED__) return;

  // 1) Spoof UA so library's isAndroid === true at import time (if library not yet loaded)
  try {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    if (!/Android|iPhone|iPad|iPod|wv|Flutter/i.test(ua)) {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: ua + ' Android',
        configurable: true,
      });
      // some libs read navigator.vendor / platform — keep it simple
      console.info('[Mock eSewa Host] Spoofed navigator.userAgent for library (added Android token)');
    }
  } catch {}

  // 2) Bridge native handlers -> mockRequestFromMiniApp
  //    Handles stringified JSON from CONNECT_APP and also already-parsed objects
  const forwardToMock = (raw: any) => {
    let data: any;
    try {
      data = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch {
      console.warn('[Mock eSewa Host] Shim: invalid JSON', raw);
      return;
    }
    const callbackKey = data.callbackKey;
    // library already stored callback on window.Android[callbackKey] etc before calling CONNECT_APP
    // so we just need to retrieve it and pass as second arg to mockRequestFromMiniApp
    let cb: MiniAppCallback | undefined;
    if (callbackKey) {
      cb =
        (w.Android && w.Android[callbackKey]) ||
        (w.iOSNative && w.iOSNative[callbackKey]) ||
        (w.flutter_inappwebview && w.flutter_inappwebview[callbackKey]);
      // fallback: if no platform matched, try to find any callbackKey on those objects (web shim case)
      if (!cb && typeof w.requestFromMiniApp === 'function') {
        // library didn't store callback because no UA matched — try to recover from window.requestFromMiniApp wrapper?
        // In that case we treat the call as direct and create a callback that will dispatch via those slots
        // No-op here — mockRequestFromMiniApp will handle callback invocation via its own dispatch
      }
    }
    // forward — mockRequestFromMiniApp will invoke the callback found on platform slots
    // if cb is undefined but caller expected a callback, mock will warn; we also try to inject a forwarder
    if (cb) {
      mockRequestFromMiniApp(data, cb);
    } else {
      // No callback stored (desktop without UA spoof at import time) — still handle request
      // and try to dispatch by looking up callback after the fact
      mockRequestFromMiniApp(data, (out: any) => {
        const fn =
          (w.Android && w.Android[callbackKey]) ||
          (w.iOSNative && w.iOSNative[callbackKey]) ||
          (w.flutter_inappwebview && w.flutter_inappwebview[callbackKey]);
        if (typeof fn === 'function') fn(out);
        else console.warn(`[Mock eSewa Host] No callback found for ${callbackKey} after forward`);
      });
    }
  };

  // Install shims — preserve existing real native bridges if present (chain)
  w.Android = w.Android || {};
  const prevAndroidRequestApp = w.Android.requestApp;
  w.Android.requestApp = (data: string) => {
    if (typeof prevAndroidRequestApp === 'function' && prevAndroidRequestApp !== w.Android.requestApp) {
      try { prevAndroidRequestApp.call(w.Android, data); } catch {}
    }
    forwardToMock(data);
  };

  w.webkit = w.webkit || {};
  w.webkit.messageHandlers = w.webkit.messageHandlers || {};
  w.webkit.messageHandlers.iOSNative = w.webkit.messageHandlers.iOSNative || {};
  const prevIOSPost = w.webkit.messageHandlers.iOSNative.postMessage;
  const iosHandler = (data: any) => {
    if (typeof prevIOSPost === 'function' && prevIOSPost !== iosHandler) {
      try { prevIOSPost.call(w.webkit.messageHandlers.iOSNative, data); } catch {}
    }
    forwardToMock(data);
  };
  w.webkit.messageHandlers.iOSNative.postMessage = iosHandler;

  w.flutter_inappwebview = w.flutter_inappwebview || {};
  const prevFlutter = w.flutter_inappwebview.callHandler;
  const flutterHandler = (handlerName: string, data: any) => {
    if (typeof prevFlutter === 'function' && prevFlutter !== flutterHandler) {
      try { prevFlutter.call(w.flutter_inappwebview, handlerName, data); } catch {}
    }
    if (handlerName === 'eSewaHandler') forwardToMock(data);
  };
  w.flutter_inappwebview.callHandler = flutterHandler;

  // 3) Runtime patch for already-loaded library — if esewa-ui-library was imported before shim,
  //    its isAndroid flag is already false. Patch its exported function to fallback.
  //    We try dynamic import; if it fails (not installed in mini-app dev) we skip.
  try {
    // @ts-ignore — optional peer dep
    import('esewa-ui-library')
      .then((lib: any) => {
        if (lib && typeof lib.requestFromMiniApp === 'function' && !lib.__MOCK_PATCHED__) {
          const orig = lib.requestFromMiniApp;
          lib.requestFromMiniApp = (data: any, cb?: MiniAppCallback) => {
            // if UA matched, orig will work; otherwise fallback to window.requestFromMiniApp
            const w2 = window as any;
            const hasPlatform =
              (w2.Android && typeof w2.Android.requestApp === 'function' && w2.Android.requestApp !== orig) ||
              (w2.webkit?.messageHandlers?.iOSNative?.postMessage) ||
              (w2.flutter_inappwebview?.callHandler);
            // Try orig first — it will store callback on platform slot if UA matches
            try {
              // Temporarily ensure platform slots exist so callback is stored even without UA
              if (!/Android/i.test(navigator.userAgent)) {
                // force store callback regardless of UA
                if (cb && data?.callbackKey) {
                  w2.Android = w2.Android || {};
                  w2.Android[data.callbackKey] = cb;
                  w2.iOSNative = w2.iOSNative || {};
                  w2.iOSNative[data.callbackKey] = cb;
                  w2.flutter_inappwebview = w2.flutter_inappwebview || {};
                  w2.flutter_inappwebview[data.callbackKey] = cb;
                }
                // also forward directly to mock
                forwardToMock(JSON.stringify(data));
                return;
              }
              return orig(data, cb);
            } catch (e) {
              console.warn('[Mock eSewa Host] Patched requestFromMiniApp fallback', e);
              // fallback to direct mock
              if (typeof w2.requestFromMiniApp === 'function') {
                return w2.requestFromMiniApp(data, cb);
              }
            }
          };
          lib.__MOCK_PATCHED__ = true;
          console.info('[Mock eSewa Host] Patched esewa-ui-library.requestFromMiniApp for desktop');
        }
      })
      .catch(() => {});
  } catch {}

  w.__MOCK_ESEWA_SHIM_INSTALLED__ = true;
  console.info('[Mock eSewa Host] Library shim installed (Android.requestApp/webkit/flutter -> mock)');
}

// ---------------------------------------------------------------------------
// Auto-install in dev (side-effect import)
// ---------------------------------------------------------------------------

if (typeof window !== 'undefined') {
  const w = window as any;

  // detect prod: Vite (import.meta.env.PROD) or webpack/CRA (process.env.NODE_ENV)
  let isProd = false;
  try {
    // Vite
    const viteEnv: any = typeof import.meta !== 'undefined' ? (import.meta as any).env : undefined;
    if (viteEnv?.PROD) isProd = true;
  } catch {}
  try {
    // webpack / CRA / Next
    if (typeof process !== 'undefined' && (process as any).env?.NODE_ENV === 'production')
      isProd = true;
  } catch {}

  // also respect explicit opt-out: ?mockEsewa=0 or localStorage flag
  let optOut = false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mockEsewa') === '0' || params.get('mockEsewa') === 'false') optOut = true;
    if (localStorage.getItem('mockEsewaDisabled') === '1') optOut = true;
  } catch {}

  if (!isProd && !optOut) {
    // Install library shim immediately (before library import evaluates isAndroid)
    installLibraryShim();
    // defer to next tick so app code can set window.requestFromMiniApp first if needed
    // but install synchronously if not present at load time
    if (!w.__MOCK_ESEWA_INSTALLED__ && typeof w.requestFromMiniApp !== 'function') {
      // use queueMicrotask to run before React render but after current script
      const doInstall = () => installMockEsewaHost();
      if (typeof queueMicrotask === 'function') queueMicrotask(doInstall);
      else setTimeout(doInstall, 0);
    } else if (!w.__MOCK_ESEWA_INSTALLED__) {
      // requestFromMiniApp already exists (maybe real host) — still ensure mock not overriding
      // but shim is already installed
    } else {
      // already installed, ensure shim is present
      if (!w.__MOCK_ESEWA_SHIM_INSTALLED__) installLibraryShim();
    }
  } else if (isProd) {
    console.info('[Mock eSewa Host] Detected production — auto-install skipped.');
  }
}

// Augment window type for TS consumers
declare global {
  interface Window {
    requestFromMiniApp?: (requestData: RequestData, callback?: MiniAppCallback) => void;
    __MOCK_ESEWA__?: {
      config: MockEsewaConfig;
      state: typeof mockState;
      logs: MockCallLog[];
      install: typeof installMockEsewaHost;
      uninstall: typeof uninstallMockEsewaHost;
      reset: typeof resetMockSession;
      setConfig: typeof setMockConfig;
      getConfig: typeof getMockConfig;
      setForceError: (type: string, val: boolean) => void;
      setValidateStatus: (s: ValidateStatus) => void;
      REQUEST_TYPE_ENUM: typeof REQUEST_TYPE_ENUM;
      CALLBACK_TYPE_ENUM: typeof CALLBACK_TYPE_ENUM;
    };
    __MOCK_ESEWA_INSTALLED__?: boolean;
  }
}
