# eSewa Mini App — Mock Host Bridge

Local browser mock for the eSewa host that Mini Apps expect inside the eSewa app's webview. Lets you run and test an `esewa-ui-library` Mini App in a normal desktop browser without the real bridge.

> **Real host:** eSewa injects `window.requestFromMiniApp(requestData, callback)` into the webview.  
> **This mock:** provides the same global function with realistic stub responses, latency, token/scope gating, and a floating dev panel.

---

## What you get

| File | Purpose |
|------|---------|
| `mockEsewaHost.ts` | Bridge implementation — defines `window.requestFromMiniApp` only if not already present, switches on `requestType`, returns JSON-stringified (or raw) payloads after 300–800ms |
| `MockHostPanel.tsx` | Floating React dev widget — toggle success/error per request type and edit fake identity at runtime |

---

## Quick start

### 1. Install / copy files

Copy `mockEsewaHost.ts` and `MockHostPanel.tsx` into your app, e.g.:

```
src/mocks/mockEsewaHost.ts
src/mocks/MockHostPanel.tsx
```

No extra npm deps beyond `react` (panel) and `typescript`.

### 2. Import before your first `requestFromMiniApp` call

**Vite (recommended):**
```ts
// src/main.tsx — must run BEFORE React renders
if (import.meta.env.DEV) {
  await import('./mocks/mockEsewaHost');
}

import ReactDOM from 'react-dom/client';
import App from './App';
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

**CRA / webpack / Next (pages):**
```ts
if (process.env.NODE_ENV !== 'production') {
  require('./mocks/mockEsewaHost');
}
```

The mock checks `window.requestFromMiniApp` existence, so it **never overrides the real host** in the eSewa app or production build.

### 3. (Optional) Add the dev panel

```tsx
// App.tsx
import { MockHostPanel } from './mocks/MockHostPanel';

export default function App() {
  return (
    <>
      {/* your app */}
      {import.meta.env.DEV && <MockHostPanel />}
      {/* or: {process.env.NODE_ENV !== 'production' && <MockHostPanel />} */}
    </>
  );
}
```

Panel is `fixed` bottom-right, draggable, collapsible. It does not render in production if guarded as above.

---

## Request coverage

Every `REQUEST_TYPE_ENUM` returns a realistic shape matching the `esewa-ui-library` README:

| `requestType` | Success stub (shape) | Callback contract |
|---------------|----------------------|-------------------|
| `INIT_APP` | `{ token, scope: string[] }` — token persisted to `sessionStorage` + internal state; scope defaults to all granted | `JSON.stringify` → `JSON.parse(data)` |
| `USER_DETAIL_ACCESS` | `{ esewa_id, name, mobile, email }` | `JSON.stringify` |
| `LOCATION_ACCESS` | `{ latitude, longitude, accuracy, address }` | `JSON.stringify` |
| `MEDIA_ACCESS` | base64 `data:image/png;base64,...` (1×1 png) | **raw string** — docs use `data` directly |
| `VALIDATE_TRANSACTION` | `{ status: 'COMPLETE'|'PENDING'|'FAILED', transaction_uuid, refId, amount }` | `JSON.stringify` |
| `REQUEST_PAYMENT` | echo `product_code`/`amount`/`properties` + `{ refId, transaction_uuid, transaction_code, status: 'COMPLETE' }` | `JSON.stringify` |
| `CLOSE_APP` | `{ message: 'App would close here' }` + `console.info` | **raw object** (no `JSON.parse`), callback optional |
| `GET_PRODUCT` | `{ products: [{ id, name, product_code, price, currency }], total }` | `JSON.stringify` |
| `VALIDATE_USER` | `{ valid: true, esewa_id, name, status }` | `JSON.stringify` |
| `MERCHANT_DETAIL` | `{ merchant_code, merchant_name, address, contact, email, status, category }` | `JSON.stringify` |
| `QR_SCANNER_ACCESS` | `{ qr_data, scanned_text, format }` | `JSON.stringify` |
| `FILE_DOWNLOAD_ACCESS` | `{ message: 'Download simulated', fileName, type, content }` | **raw object** — docs use `data` directly |

Unknown `requestType` → `{ error_message: 'Unknown requestType: ...' }`.

---

## Token / session gating (mirrors real flow)

- `INIT_APP` issues a token and scope, stored in memory and `sessionStorage` (`miniAppAuthToken` / `miniAppAuthScope`) — exactly like the README's `saveAuthData`.
- Any call **other than `INIT_APP` and `CLOSE_APP`** without a prior `INIT_APP` is rejected:
  ```json
  { "error_message": "Token not found. Please call INIT_APP first." }
  ```
- If `requestData.token` is present but mismatched, you get `Invalid token...`.
- Scope is enforced: if `scope` does not contain the `requestType`, you get:
  ```json
  { "error_message": "Merchant scope not found for LOCATION_ACCESS. Granted scope: [...] " }
  ```
  Use the panel's **Granted Scope** checkboxes to remove scopes and catch permission bugs early.

Reset at any time via panel **Reset** or programmatically:
```ts
(window as any).__MOCK_ESEWA__.reset();
// or
import { resetMockSession } from './mocks/mockEsewaHost';
resetMockSession();
```

---

## Callback contract — exact match

Most callbacks expect a JSON string:
```ts
requestFromMiniApp({ requestType: 'USER_DETAIL_ACCESS', token, callbackKey: '...' }, (data) => {
  const res = JSON.parse(data); // ← almost every type
  if (res.error_message) throw new Error(res.error_message);
});
```

Exceptions that receive **raw** values (no `JSON.parse`):
- `MEDIA_ACCESS` — `data` is a base64 string
- `FILE_DOWNLOAD_ACCESS` — `data` is `{ message, ... }` object
- `CLOSE_APP` — `data` is `{ message: 'App would close here' }` object (callback is optional; real app often calls without it)

The mock matches this exactly. Failures always use `{ error_message: '...' }`, stringified or raw matching the type.

---

## Error simulation

Every type supports an `error_message` failure path.

**Via panel (no code change):**
- **Force Error per RequestType** — red/green toggles; when red, that type always returns `{ error_message }`.
- Edit `token` / `esewa_id` / `amount` / `name` / `mobile` / `lat/lng` / `validateStatus` / latency at runtime.
- **TEST** button per type fires a live `requestFromMiniApp` call so you can verify your handler without touching app code.
- **Latency** min/max editable (default 300–800 ms).

**Via code:**
```ts
import { mockEsewaConfig, setMockConfig } from './mocks/mockEsewaHost';

// force single type error
setMockConfig({ forceError: { LOCATION_ACCESS: true } });

// custom message
setMockConfig({ errorMessages: { LOCATION_ACCESS: 'Location permission denied by user' } });

// change identity
setMockConfig({ esewaId: '9841112222', amount: 999.99, validateStatus: 'PENDING' });

// scope manipulation
setMockConfig({ scope: ['USER_DETAIL_ACCESS'] }); // only user detail will succeed
```

Panel and code stay in sync via `mockEsewaConfigChange` custom event and `window.__MOCK_ESEWA__`.

---

## Disable

The mock never installs in production (`import.meta.env.PROD` or `process.env.NODE_ENV === 'production'`), and also respects:

- URL: `?mockEsewa=0` or `?mockEsewa=false`
- localStorage: `localStorage.setItem('mockEsewaDisabled', '1')` → always off

To fully remove, delete the dev-guarded import. No server or eSewa dependency remains.

---

## What this mock does NOT do

- **No real eSewa servers.** No network, no real payment verification. For server-to-server verification you still need eSewa sandbox credentials and your backend's `/verify` call.
- **No real permission dialogs.** Location/media/QR are stubbed; no OS prompt.
- **No real file system.** `FILE_DOWNLOAD_ACCESS` only returns `{ message: 'Download simulated' }`; it does not write files.
- **No real cryptography.** `token` is a mock string; `merchant_identifier` is not validated.
- **No real transaction states.** `VALIDATE_TRANSACTION` status is toggled via panel/config, not by polling a gateway.
- **No persistence across origins.** `sessionStorage`-based session is per-origin/tab, unlike the real webview.

Use this for UI logic, loading/error states, scope bugs, and integration shape. Test real money flows in eSewa's sandbox with server-side verification.

---

## API surface (for panel / tests)

```ts
import {
  installMockEsewaHost,   // () => boolean — returns false if real host exists
  uninstallMockEsewaHost,
  resetMockSession,
  setMockConfig,          // (patch: Partial<MockEsewaConfig>) => void
  getMockConfig,
  getMockLogs,            // last 50 calls
  clearMockLogs,
  mockEsewaConfig,        // mutable live config object
  REQUEST_TYPE_ENUM,
  CALLBACK_TYPE_ENUM,
} from './mocks/mockEsewaHost';

// global escape hatch (used by panel)
window.__MOCK_ESEWA__.config
window.__MOCK_ESEWA__.state   // { token, scope }
window.__MOCK_ESEWA__.logs
window.__MOCK_ESEWA__.setForceError(type, bool)
window.__MOCK_ESEWA__.setValidateStatus('COMPLETE'|'PENDING'|'FAILED')
```

Events:
- `mockEsewaConfigChange` — config/state mutated
- `mockEsewaLogUpdate` — new call logged (`event.detail: MockCallLog`)

---

## Troubleshooting

- **Calls fail with `Token not found`** → call `INIT_APP` first (your `useEffect` on app mount). Click **Reset** in panel and retry.
- **Scope error though you granted it** → check panel's **Granted Scope**; `REQUEST_PAYMENT` etc. require scope entry. Click **Allow all**.
- **Panel not showing** → ensure guarded import ran **before** your root render and `MockHostPanel` is mounted.
- **Mock overrides real host?** → it never does; check `window.__MOCK_ESEWA_INSTALLED__` in the eSewa webview — should be `undefined` there.
- **Latency too fast/slow** → adjust **Latency** in panel or `setMockConfig({ latencyMin: 100, latencyMax: 200 })`.

---

## License

Mock only — use MIT same as your app. Not affiliated with eSewa.
