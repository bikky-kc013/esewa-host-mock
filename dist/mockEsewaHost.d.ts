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
export declare enum REQUEST_TYPE_ENUM {
    INIT_APP = "INIT_APP",
    REQUEST_PAYMENT = "REQUEST_PAYMENT",
    USER_DETAIL_ACCESS = "USER_DETAIL_ACCESS",
    MEDIA_ACCESS = "MEDIA_ACCESS",
    LOCATION_ACCESS = "LOCATION_ACCESS",
    VALIDATE_TRANSACTION = "VALIDATE_TRANSACTION",
    CLOSE_APP = "CLOSE_APP",
    FILE_DOWNLOAD_ACCESS = "FILE_DOWNLOAD_ACCESS",
    GET_PRODUCT = "GET_PRODUCT",
    VALIDATE_USER = "VALIDATE_USER",
    MERCHANT_DETAIL = "MERCHANT_DETAIL",
    QR_SCANNER_ACCESS = "QR_SCANNER_ACCESS"
}
export declare enum CALLBACK_TYPE_ENUM {
    INIT_APP_CALLBACK = "INIT_APP_CALLBACK",
    REQUEST_PAYMENT_CALLBACK = "REQUEST_PAYMENT_CALLBACK",
    USER_DETAIL_ACCESS_CALLBACK = "USER_DETAIL_ACCESS_CALLBACK",
    MEDIA_ACCESS_CALLBACK = "MEDIA_ACCESS_CALLBACK",
    LOCATION_ACCESS_CALLBACK = "LOCATION_ACCESS_CALLBACK",
    VALIDATE_TRANSACTION_CALLBACK = "VALIDATE_TRANSACTION_CALLBACK",
    CLOSE_APP_CALLBACK = "CLOSE_APP_CALLBACK",
    FILE_DOWNLOAD_ACCESS_CALLBACK = "FILE_DOWNLOAD_ACCESS_CALLBACK",
    GET_PRODUCT_CALLBACK = "GET_PRODUCT_CALLBACK",
    VALIDATE_USER_CALLBACK = "VALIDATE_USER_CALLBACK",
    MERCHANT_DETAIL_CALLBACK = "MERCHANT_DETAIL_CALLBACK",
    QR_SCANNER_ACCESS_CALLBACK = "QR_SCANNER_ACCESS_CALLBACK"
}
export type RequestData = {
    requestType: string;
    token?: string | null;
    merchant_identifier?: string;
    callbackKey?: string;
    data?: any;
};
export type MiniAppCallback = (data: any) => void;
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
export declare const DEFAULT_SCOPE: string[];
export declare const mockEsewaConfig: MockEsewaConfig;
declare const mockState: {
    token: string | null;
    scope: string[] | null;
};
export type MockCallLog = {
    id: string;
    ts: string;
    requestType: string;
    requestData: RequestData;
    response: any;
    isError: boolean;
    latency: number;
};
export declare function installMockEsewaHost(overrides?: Partial<MockEsewaConfig>): boolean;
export declare function uninstallMockEsewaHost(): void;
export declare function resetMockSession(): void;
export declare function setMockConfig(patch: Partial<MockEsewaConfig>): void;
export declare function getMockConfig(): MockEsewaConfig;
export declare function getMockLogs(): MockCallLog[];
export declare function clearMockLogs(): void;
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
export {};
