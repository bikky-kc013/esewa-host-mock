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
export var REQUEST_TYPE_ENUM;
(function (REQUEST_TYPE_ENUM) {
    REQUEST_TYPE_ENUM["INIT_APP"] = "INIT_APP";
    REQUEST_TYPE_ENUM["REQUEST_PAYMENT"] = "REQUEST_PAYMENT";
    REQUEST_TYPE_ENUM["USER_DETAIL_ACCESS"] = "USER_DETAIL_ACCESS";
    REQUEST_TYPE_ENUM["MEDIA_ACCESS"] = "MEDIA_ACCESS";
    REQUEST_TYPE_ENUM["LOCATION_ACCESS"] = "LOCATION_ACCESS";
    REQUEST_TYPE_ENUM["VALIDATE_TRANSACTION"] = "VALIDATE_TRANSACTION";
    REQUEST_TYPE_ENUM["CLOSE_APP"] = "CLOSE_APP";
    REQUEST_TYPE_ENUM["FILE_DOWNLOAD_ACCESS"] = "FILE_DOWNLOAD_ACCESS";
    REQUEST_TYPE_ENUM["GET_PRODUCT"] = "GET_PRODUCT";
    REQUEST_TYPE_ENUM["VALIDATE_USER"] = "VALIDATE_USER";
    REQUEST_TYPE_ENUM["MERCHANT_DETAIL"] = "MERCHANT_DETAIL";
    REQUEST_TYPE_ENUM["QR_SCANNER_ACCESS"] = "QR_SCANNER_ACCESS";
})(REQUEST_TYPE_ENUM || (REQUEST_TYPE_ENUM = {}));
export var CALLBACK_TYPE_ENUM;
(function (CALLBACK_TYPE_ENUM) {
    CALLBACK_TYPE_ENUM["INIT_APP_CALLBACK"] = "INIT_APP_CALLBACK";
    CALLBACK_TYPE_ENUM["REQUEST_PAYMENT_CALLBACK"] = "REQUEST_PAYMENT_CALLBACK";
    CALLBACK_TYPE_ENUM["USER_DETAIL_ACCESS_CALLBACK"] = "USER_DETAIL_ACCESS_CALLBACK";
    CALLBACK_TYPE_ENUM["MEDIA_ACCESS_CALLBACK"] = "MEDIA_ACCESS_CALLBACK";
    CALLBACK_TYPE_ENUM["LOCATION_ACCESS_CALLBACK"] = "LOCATION_ACCESS_CALLBACK";
    CALLBACK_TYPE_ENUM["VALIDATE_TRANSACTION_CALLBACK"] = "VALIDATE_TRANSACTION_CALLBACK";
    CALLBACK_TYPE_ENUM["CLOSE_APP_CALLBACK"] = "CLOSE_APP_CALLBACK";
    CALLBACK_TYPE_ENUM["FILE_DOWNLOAD_ACCESS_CALLBACK"] = "FILE_DOWNLOAD_ACCESS_CALLBACK";
    CALLBACK_TYPE_ENUM["GET_PRODUCT_CALLBACK"] = "GET_PRODUCT_CALLBACK";
    CALLBACK_TYPE_ENUM["VALIDATE_USER_CALLBACK"] = "VALIDATE_USER_CALLBACK";
    CALLBACK_TYPE_ENUM["MERCHANT_DETAIL_CALLBACK"] = "MERCHANT_DETAIL_CALLBACK";
    CALLBACK_TYPE_ENUM["QR_SCANNER_ACCESS_CALLBACK"] = "QR_SCANNER_ACCESS_CALLBACK";
})(CALLBACK_TYPE_ENUM || (CALLBACK_TYPE_ENUM = {}));
export const DEFAULT_SCOPE = [
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
const MOCK_BASE64_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';
const STORAGE_TOKEN_KEY = 'miniAppAuthToken';
const STORAGE_SCOPE_KEY = 'miniAppAuthScope';
export const mockEsewaConfig = {
    token: 'SEdcRFVePhYfCRtQJhEiATA8DyVWFFA7Dw8UBEAKH1IkLFwYJAUxPgI%3D',
    scope: [...DEFAULT_SCOPE],
    esewaId: '9841000001',
    userName: 'Ram Bahadur Thapa',
    mobile: '9841000001',
    email: 'ram.thapa@esewa.mock',
    latitude: 27.7172,
    longitude: 85.324,
    amount: 1250.5,
    validateStatus: 'COMPLETE',
    forceError: {},
    errorMessages: {},
    latencyMin: 300,
    latencyMax: 800,
};
// internal session state — token is null until INIT_APP succeeds
const mockState = {
    token: null,
    scope: null,
};
const mockLogs = [];
const MAX_LOGS = 50;
// Callback contract:
// - Most types return JSON string (caller does JSON.parse)
// - MEDIA_ACCESS, FILE_DOWNLOAD_ACCESS, CLOSE_APP return raw object/string
const RAW_CALLBACK_TYPES = new Set([
    REQUEST_TYPE_ENUM.MEDIA_ACCESS,
    REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS,
    REQUEST_TYPE_ENUM.CLOSE_APP,
]);
// Scope gating — which request type requires scope entry
// INIT_APP and CLOSE_APP never require scope.
const SCOPE_REQUIRED = new Set([
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
function randomLatency() {
    const { latencyMin, latencyMax } = mockEsewaConfig;
    return Math.floor(Math.random() * (latencyMax - latencyMin + 1)) + latencyMin;
}
function genToken() {
    // keep deterministic default unless overridden by panel
    return mockEsewaConfig.token || `mock_token_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
function errorPayload(requestType, fallback) {
    const custom = mockEsewaConfig.errorMessages[requestType];
    return { error_message: custom || fallback };
}
function pushLog(entry) {
    mockLogs.unshift(entry);
    if (mockLogs.length > MAX_LOGS)
        mockLogs.pop();
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
function buildStub(requestData) {
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
            }
            catch {
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
            return {
                payload: {
                    status: 'COMPLETE',
                    refId: `PAY${Math.floor(100000 + Math.random() * 900000)}`,
                    transaction_uuid: `txn-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                    transaction_code: `TXN${Date.now()}`,
                    product_code: pcode,
                    amount: amt,
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
                    merchant_identifier: requestData.merchant_identifier ?? 'IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=',
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
                    identifier: requestData.merchant_identifier ?? 'IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=',
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
                    content: requestData.data?.content ?? 'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf',
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
function mockRequestFromMiniApp(requestData, callback) {
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
                if (stored)
                    mockState.token = stored;
            }
            catch { }
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
                    if (storedScope)
                        mockState.scope = JSON.parse(storedScope);
                }
                catch { }
            }
            const allowed = mockState.scope ?? mockEsewaConfig.scope;
            if (!allowed.includes(rt)) {
                const err = errorPayload(rt, `Merchant scope not found for ${rt}. Granted scope: [${(allowed || []).join(', ')}]`);
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
    const out = raw ? payload : JSON.stringify(payload);
    console.info(`[Mock eSewa Host] ${rt} → ${isError ? 'error' : 'success'} (${latency}ms)`, {
        request: requestData,
        response: payload,
    });
    setTimeout(() => {
        try {
            // CLOSE_APP may be called without callback — just return
            if (typeof callback === 'function') {
                callback(out);
            }
            else if (rt === REQUEST_TYPE_ENUM.CLOSE_APP) {
                // no callback expected, already logged
            }
            else {
                console.warn(`[Mock eSewa Host] ${rt} called without callback — response was:`, out);
            }
        }
        catch (e) {
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
export function installMockEsewaHost(overrides) {
    if (typeof window === 'undefined') {
        console.warn('[Mock eSewa Host] window not available — skipping install');
        return false;
    }
    const w = window;
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
        if (storedToken)
            mockState.token = storedToken;
        if (storedScope)
            mockState.scope = JSON.parse(storedScope);
    }
    catch { }
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
        setForceError: (type, val) => {
            mockEsewaConfig.forceError[type] = val;
            emitConfigChange();
        },
        setValidateStatus: (s) => {
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
export function uninstallMockEsewaHost() {
    if (typeof window === 'undefined')
        return;
    const w = window;
    if (w.__MOCK_ESEWA_INSTALLED__) {
        delete w.requestFromMiniApp;
        delete w.__MOCK_ESEWA_INSTALLED__;
        delete w.__MOCK_ESEWA__;
        console.info('[Mock eSewa Host] Uninstalled');
    }
}
export function resetMockSession() {
    mockState.token = null;
    mockState.scope = null;
    try {
        sessionStorage.removeItem(STORAGE_TOKEN_KEY);
        sessionStorage.removeItem(STORAGE_SCOPE_KEY);
    }
    catch { }
    // clear logs? keep for debugging
    console.info('[Mock eSewa Host] Session reset — call INIT_APP again to get new token');
    emitConfigChange();
}
export function setMockConfig(patch) {
    Object.assign(mockEsewaConfig, patch);
    emitConfigChange();
}
export function getMockConfig() {
    return { ...mockEsewaConfig, scope: [...mockEsewaConfig.scope] };
}
export function getMockLogs() {
    return [...mockLogs];
}
export function clearMockLogs() {
    mockLogs.length = 0;
    emitConfigChange();
}
// ---------------------------------------------------------------------------
// Auto-install in dev (side-effect import)
// ---------------------------------------------------------------------------
if (typeof window !== 'undefined') {
    const w = window;
    // detect prod: Vite (import.meta.env.PROD) or webpack/CRA (process.env.NODE_ENV)
    let isProd = false;
    try {
        // Vite
        const viteEnv = (typeof import.meta !== 'undefined' ? import.meta.env : undefined);
        if (viteEnv?.PROD)
            isProd = true;
    }
    catch { }
    try {
        // webpack / CRA / Next
        if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production')
            isProd = true;
    }
    catch { }
    // also respect explicit opt-out: ?mockEsewa=0 or localStorage flag
    let optOut = false;
    try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('mockEsewa') === '0' || params.get('mockEsewa') === 'false')
            optOut = true;
        if (localStorage.getItem('mockEsewaDisabled') === '1')
            optOut = true;
    }
    catch { }
    if (!isProd && !optOut) {
        // defer to next tick so app code can set window.requestFromMiniApp first if needed
        // but install synchronously if not present at load time
        if (!w.__MOCK_ESEWA_INSTALLED__ && typeof w.requestFromMiniApp !== 'function') {
            // use queueMicrotask to run before React render but after current script
            const doInstall = () => installMockEsewaHost();
            if (typeof queueMicrotask === 'function')
                queueMicrotask(doInstall);
            else
                setTimeout(doInstall, 0);
        }
    }
    else if (isProd) {
        console.info('[Mock eSewa Host] Detected production — auto-install skipped.');
    }
}
