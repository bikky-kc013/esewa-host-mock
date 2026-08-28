/**
 * esewaHostBridge.ts
 * ------------------
 * PRODUCTION Host bridge for eSewa Mini Apps using `esewa-ui-library@1.10.12`.
 *
 * The library's `requestFromMiniApp(data, callback)` does NOT call
 * `window.requestFromMiniApp` (despite README/mocks naming it that way).
 * See `node_modules/esewa-ui-library/dist/index.js:8003-8021`:
 *   1. it stores `callback` on `window.Android[callbackKey]` (or iOS/Flutter)
 *   2. it sends JSON via `CONNECT_APP` -> `window.Android.requestApp(string)`
 *      / `window.webkit.messageHandlers.iOSNative.postMessage`
 *      / `window.flutter_inappwebview.callHandler('eSewaHandler', data)`
 *
 * So the HOST must inject those platform globals, not `window.requestFromMiniApp`.
 * This file implements them for both:
 *   (A) native WebView (Android/iOS/Flutter) — the WebView injects this before load
 *   (B) pure-web host (same-window or iframe dev) — we shim the globals in JS
 *
 * Install BEFORE the Mini App bundle loads:
 *   import { installEsewaHost } from './esewaHostBridge';
 *   installEsewaHost({ onCloseApp: () => window.close() });
 *
 * Mini-app usage (unchanged):
 *   import { requestFromMiniApp, REQUEST_TYPE_ENUM, CALLBACK_TYPE_ENUM } from 'esewa-ui-library';
 *   requestFromMiniApp({ requestType: REQUEST_TYPE_ENUM.INIT_APP, callbackKey: CALLBACK_TYPE_ENUM.INIT_APP_CALLBACK, merchant_identifier: '...' }, (data) => {
 *     const res = JSON.parse(data); // most types — see contract below
 *   });
 */

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

export type HostOptions = {
  /** Called when Mini App requests CLOSE_APP */
  onCloseApp?: () => void;
  /** Real auth / scope lookup — replace stub with your backend call */
  issueToken?: (merchant_identifier: string) => Promise<{ token: string; scope: string[] }>;
  /** Optional latency simulation (dev only) */
  latencyMs?: number;
};

// ---------------------------------------------------------------------------
// Host state (mirrors real eSewa session)
// ---------------------------------------------------------------------------
type HostState = {
  token: string | null;
  scope: string[] | null;
};

const DEFAULT_SCOPE = Object.values(REQUEST_TYPE_ENUM).filter(
  (v) => v !== REQUEST_TYPE_ENUM.INIT_APP && v !== REQUEST_TYPE_ENUM.CLOSE_APP,
) as string[];

const hostState: HostState = { token: null, scope: null };

// ---------------------------------------------------------------------------
// Callback contract — must match `mockEsewaHost.ts` / README
// Most callbacks receive JSON string -> mini-app does JSON.parse(data)
// Exceptions that MUST receive raw (no JSON.stringify):
//   MEDIA_ACCESS, FILE_DOWNLOAD_ACCESS, CLOSE_APP
// ---------------------------------------------------------------------------
const RAW_TYPES = new Set<string>([
  REQUEST_TYPE_ENUM.MEDIA_ACCESS,
  REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS,
  REQUEST_TYPE_ENUM.CLOSE_APP,
]);

function isRawType(t: string): boolean {
  return RAW_TYPES.has(t);
}

// ---------------------------------------------------------------------------
// Stub handlers — replace with real backend / native SDK calls
// ---------------------------------------------------------------------------
async function handleRequest(data: any, opts: HostOptions): Promise<{ payload: any; isError: boolean }> {
  const rt: string = data.requestType;

  // --- token gating (except INIT_APP/CLOSE_APP) ---
  if (rt !== REQUEST_TYPE_ENUM.INIT_APP && rt !== REQUEST_TYPE_ENUM.CLOSE_APP) {
    if (!hostState.token) {
      return { payload: { error_message: 'Token not found. Please call INIT_APP first.' }, isError: true };
    }
    if (data.token && data.token !== hostState.token) {
      return { payload: { error_message: 'Invalid token. Please re-initialize the app (INIT_APP).' }, isError: true };
    }
    if (!hostState.scope?.includes(rt)) {
      return {
        payload: {
          error_message: `Merchant scope not found for ${rt}. Granted scope: [${(hostState.scope ?? []).join(', ')}]`,
        },
        isError: true,
      };
    }
  }

  switch (rt) {
    case REQUEST_TYPE_ENUM.INIT_APP: {
      // Replace with real call to your auth service
      let token: string;
      let scope: string[];
      if (opts.issueToken) {
        const issued = await opts.issueToken(data.merchant_identifier);
        token = issued.token;
        scope = issued.scope;
      } else {
        // dev stub — same token as mockEsewaHost.ts for parity
        token = `host_token_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        scope = [...DEFAULT_SCOPE];
      }
      hostState.token = token;
      hostState.scope = scope;
      try {
        sessionStorage.setItem('miniAppAuthToken', token);
        sessionStorage.setItem('miniAppAuthScope', JSON.stringify(scope));
      } catch {}
      return { payload: { token, scope }, isError: false };
    }
    case REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS:
      return { payload: { esewa_id: '9841000001', name: 'Ram Thapa', mobile: '9841000001', email: 'ram@esewa.mock' }, isError: false };
    case REQUEST_TYPE_ENUM.LOCATION_ACCESS:
      return { payload: { latitude: 27.7172, longitude: 85.324, accuracy: 12.5, address: 'Kathmandu, Nepal' }, isError: false };
    case REQUEST_TYPE_ENUM.MEDIA_ACCESS:
      return { payload: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=', isError: false };
    case REQUEST_TYPE_ENUM.VALIDATE_TRANSACTION:
      return { payload: { status: 'COMPLETE', transaction_uuid: `txn-${Date.now()}`, refId: `MOCK${Math.floor(100000 + Math.random() * 900000)}`, amount: data.data?.amount ?? 1250.5 }, isError: false };
    case REQUEST_TYPE_ENUM.REQUEST_PAYMENT: {
      // Here you would call your payment gateway with data.data
      return {
        payload: {
          status: 'COMPLETE',
          refId: `PAY${Math.floor(100000 + Math.random() * 900000)}`,
          transaction_uuid: `txn-${Date.now()}`,
          product_code: data.data?.product_code ?? 'NP-ES-VIANET',
          amount: data.data?.amount ?? 0,
        },
        isError: false,
      };
    }
    case REQUEST_TYPE_ENUM.CLOSE_APP:
      opts.onCloseApp?.();
      return { payload: { message: 'App would close here' }, isError: false };
    case REQUEST_TYPE_ENUM.GET_PRODUCT:
      return { payload: { products: [{ id: '3299', name: 'Vianet', product_code: 'NP-ES-VIANET', price: 1200 }], total: 1 }, isError: false };
    case REQUEST_TYPE_ENUM.VALIDATE_USER:
      return { payload: { valid: true, esewa_id: String(data.data?.esewa_id ?? '9841000001'), status: 'ACTIVE' }, isError: false };
    case REQUEST_TYPE_ENUM.MERCHANT_DETAIL:
      return { payload: { merchant_code: 'MOCK', merchant_name: 'Mock Merchant', status: 'ACTIVE' }, isError: false };
    case REQUEST_TYPE_ENUM.QR_SCANNER_ACCESS:
      return { payload: { qr_data: 'https://esewa.com.np/qr/MOCK', scanned_text: 'esewa://pay?amt=500', format: 'QR_CODE' }, isError: false };
    case REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS:
      return { payload: { message: 'Download simulated', fileName: data.data?.fileName, type: data.data?.type, content: data.data?.content }, isError: false };
    default:
      return { payload: { error_message: `Unknown requestType: ${rt}` }, isError: true };
  }
}

// ---------------------------------------------------------------------------
// Dispatch back to Mini App via the callback the library stored
// Library at `dist/index.js:8008-8017` stored callback on:
//   window.Android[callbackKey] || window.iOSNative[callbackKey] || window.flutter_inappwebview[callbackKey]
// Host must invoke that exact slot after handling.
// ---------------------------------------------------------------------------
function dispatchToMiniApp(callbackKey: string, payload: any, raw: boolean) {
  const out: any = raw ? payload : JSON.stringify(payload);
  const w = window as any;

  // Try each platform slot — library only set one, but we try all for web-shim compat
  const fn =
    (w.Android && w.Android[callbackKey]) ||
    (w.iOSNative && w.iOSNative[callbackKey]) ||
    (w.flutter_inappwebview && w.flutter_inappwebview[callbackKey]) ||
    (w[callbackKey] as any); // fallback for direct window.requestFromMiniApp callers

  if (typeof fn === 'function') {
    try {
      fn(out);
    } catch (e) {
      console.error(`[eSewa Host] callback ${callbackKey} threw`, e);
    }
  } else {
    console.warn(`[eSewa Host] No callback found for ${callbackKey}. Payload:`, out);
  }
}

// ---------------------------------------------------------------------------
// Core entry point called by the WebView bridge
// ---------------------------------------------------------------------------
async function onRequestApp(rawData: string, opts: HostOptions) {
  let data: any;
  try {
    data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
  } catch {
    console.error('[eSewa Host] Invalid JSON from Mini App', rawData);
    return;
  }
  const rt = data.requestType;
  const callbackKey = data.callbackKey as string | undefined;
  if (!callbackKey && rt !== REQUEST_TYPE_ENUM.CLOSE_APP) {
    console.warn('[eSewa Host] Missing callbackKey for', rt);
  }
  const latency = opts.latencyMs ?? 0;
  if (latency) await new Promise((r) => setTimeout(r, latency));

  const { payload } = await handleRequest(data, opts);
  if (callbackKey) {
    dispatchToMiniApp(callbackKey, payload, isRawType(rt));
  }
}

// ---------------------------------------------------------------------------
// Desktop shim — make library think it's on Android so callbacks are stored
// Must run BEFORE esewa-ui-library is imported (its isAndroid is evaluated at import)
// ---------------------------------------------------------------------------
function spoofDesktopUA(): void {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') return;
  try {
    const ua = navigator.userAgent;
    if (!/Android|iPhone|iPad|iPod|wv|Flutter/i.test(ua)) {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: ua + ' Android',
        configurable: true,
      });
      console.info('[eSewa Host] Spoofed navigator.userAgent (+Android) for desktop library');
    }
  } catch {}
}

function patchLibraryRuntime(): void {
  // If library already loaded, its isAndroid was evaluated with old UA.
  // Patch its exported function to fallback to window.requestFromMiniApp / direct dispatch.
  try {
    // dynamic import — if mini-app hasn't imported library yet, this will load it
    import('esewa-ui-library')
      .then((lib: any) => {
        if (!lib || typeof lib.requestFromMiniApp !== 'function' || lib.__HOST_PATCHED__) return;
        const orig = lib.requestFromMiniApp;
        lib.requestFromMiniApp = (data: any, cb?: (d: any) => void) => {
          const w: any = window;
          // ensure callback is stored even when UA didn't match at orig's import time
          if (cb && data?.callbackKey) {
            w.Android = w.Android || {};
            w.Android[data.callbackKey] = cb;
            w.iOSNative = w.iOSNative || {};
            w.iOSNative[data.callbackKey] = cb;
            w.flutter_inappwebview = w.flutter_inappwebview || {};
            w.flutter_inappwebview[data.callbackKey] = cb;
          }
          // Try original first; it will call CONNECT_APP which we have shimmed to onRequestApp
          try {
            // If orig's isAndroid is still false, it won't store callback and will warn.
            // We already stored it above, so just ensure CONNECT_APP forwards.
            // Call orig if it will actually transport; otherwise bypass and call our bridge directly.
            if (/Android/i.test(navigator.userAgent)) {
              return orig(data, cb);
            }
            // desktop fallback — directly invoke bridge
            void onRequestApp(JSON.stringify(data), (w as any).__ESEWA_HOST_OPTS__ || {});
          } catch (e) {
            console.warn('[eSewa Host] patched requestFromMiniApp fallback', e);
            if (typeof w.requestFromMiniApp === 'function') w.requestFromMiniApp(data, cb);
          }
        };
        lib.__HOST_PATCHED__ = true;
        console.info('[eSewa Host] Patched esewa-ui-library.requestFromMiniApp for desktop');
      })
      .catch(() => {});
  } catch {}
}

// ---------------------------------------------------------------------------
// Public installer — call before Mini App loads
// ---------------------------------------------------------------------------
export function installEsewaHost(opts: HostOptions = {}): void {
  const w = window as any;
  w.__ESEWA_HOST_OPTS__ = opts;

  // desktop UA spoof must happen before any library code runs
  spoofDesktopUA();

  // 1) Native WebView globals the library actually uses (dist/index.js:7977-8001)
  w.Android = w.Android || {};
  const existingAndroidRequestApp = w.Android.requestApp;
  w.Android.requestApp = (data: string) => {
    // if a real native bridge already exists (e.g. in eSewa app WebView), chain to it
    if (typeof existingAndroidRequestApp === 'function' && existingAndroidRequestApp !== w.Android.requestApp) {
      try { existingAndroidRequestApp.call(w.Android, data); } catch {}
    }
    void onRequestApp(data, opts);
  };

  w.webkit = w.webkit || {};
  w.webkit.messageHandlers = w.webkit.messageHandlers || {};
  // capture previous before overwriting
  const prevIOS = w.webkit.messageHandlers.iOSNative;
  const existingPostMessage = prevIOS?.postMessage;
  w.webkit.messageHandlers.iOSNative = {
    postMessage: (data: any) => {
      if (typeof existingPostMessage === 'function') {
        try { existingPostMessage.call(prevIOS, data); } catch {}
      }
      const str = typeof data === 'string' ? data : JSON.stringify(data);
      void onRequestApp(str, opts);
    },
  };

  w.flutter_inappwebview = w.flutter_inappwebview || {};
  const existingFlutter = w.flutter_inappwebview.callHandler;
  w.flutter_inappwebview.callHandler = (handler: string, data: any) => {
    if (typeof existingFlutter === 'function' && existingFlutter !== w.flutter_inappwebview.callHandler) {
      try { existingFlutter.call(w.flutter_inappwebview, handler, data); } catch {}
    }
    if (handler === 'eSewaHandler') {
      const str = typeof data === 'string' ? data : JSON.stringify(data);
      void onRequestApp(str, opts);
    }
  };

  // Patch already-loaded library for desktop
  patchLibraryRuntime();

  // 2) Legacy / web-only fallback: expose window.requestFromMiniApp directly
  //    Some tutorials/mocks use this name. The library itself does NOT use it,
  //    but exposing it lets Mini Apps that call `window.requestFromMiniApp(...)`
  //    (like `src/App.tsx:19` / `mockEsewaHost.ts:444`) work without native.
  //    We reuse the same handler so both paths share token/scope.
  if (typeof w.requestFromMiniApp !== 'function') {
    w.requestFromMiniApp = (data: any, callback?: (res: any) => void) => {
      const callbackKey = data.callbackKey;
      if (callback && callbackKey) {
        w.Android[callbackKey] = callback;
        w.iOSNative = w.iOSNative || {};
        w.iOSNative[callbackKey] = callback;
        w.flutter_inappwebview[callbackKey] = callback;
      }
      void onRequestApp(JSON.stringify(data), opts).then(() => {
        // if caller also passed direct callback without key (legacy), invoke directly
        if (callback && !callbackKey) {
          handleRequest(data, opts).then(({ payload }) => {
            const raw = isRawType(data.requestType);
            callback(raw ? payload : JSON.stringify(payload));
          });
        }
      });
    };
  }

  // 3) Optional: iframe postMessage bridge (cross-origin host)
  //    Mini app in iframe can be shimmed to postMessage to parent:
  //    `window.Android.requestApp = (s) => parent.postMessage({ esewaBridge: true, data: s }, '*')`
  //    Host (this window) listens:
  window.addEventListener('message', (ev: MessageEvent) => {
    if (ev.data?.esewaBridge && ev.data?.data) {
      void onRequestApp(ev.data.data, opts);
    }
  });

  console.info('[eSewa Host] Bridge installed', { hasNativeAndroid: !!existingAndroidRequestApp });
  // Mark installed to prevent double-install
  w.__ESEWA_HOST_INSTALLED__ = true;
}

export function resetHostSession(): void {
  hostState.token = null;
  hostState.scope = null;
  try {
    sessionStorage.removeItem('miniAppAuthToken');
    sessionStorage.removeItem('miniAppAuthScope');
  } catch {}
}
