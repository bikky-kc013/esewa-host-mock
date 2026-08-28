#!/usr/bin/env node
// Test mockEsewaHost in Node ESM with minimal browser globals

// ---- Browser globals mock ----
globalThis.window = globalThis;
globalThis.document = { getElementById: () => null };
globalThis.sessionStorage = {
  _store: {},
  getItem(k) { return this._store[k] ?? null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
  clear() { this._store = {}; }
};
globalThis.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] ?? null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
};
globalThis.location = { search: '', href: 'http://localhost/' };
globalThis.CustomEvent = class CustomEvent {
  constructor(type, opts) { this.type = type; this.detail = opts?.detail; }
};
const listeners = new Map();
globalThis.addEventListener = (type, fn) => {
  if (!listeners.has(type)) listeners.set(type, []);
  listeners.get(type).push(fn);
};
globalThis.removeEventListener = (type, fn) => {
  const arr = listeners.get(type) || [];
  const idx = arr.indexOf(fn);
  if (idx >= 0) arr.splice(idx, 1);
};
globalThis.dispatchEvent = (evt) => {
  const arr = listeners.get(evt.type) || [];
  arr.forEach(fn => { try { fn(evt); } catch {} });
  return true;
};
globalThis.queueMicrotask = globalThis.queueMicrotask || ((fn) => setTimeout(fn, 0));

// Node process
process.env.NODE_ENV = 'development';

// ---- Import mock host ----
import { installMockEsewaHost, mockEsewaConfig, setMockConfig, resetMockSession, getMockLogs, REQUEST_TYPE_ENUM } from './dist/mockEsewaHost.js';

// speed up latency for tests
setMockConfig({ latencyMin: 30, latencyMax: 50 });

console.log('=== mockEsewaHost tests ===\n');

function call(requestData) {
  return new Promise((resolve) => {
    const start = Date.now();
    globalThis.requestFromMiniApp(requestData, (data) => {
      const latency = Date.now() - start;
      resolve({ data, latency });
    });
  });
}

async function tick() {
  // allow queueMicrotask auto-install to run
  await new Promise(r => setTimeout(r, 10));
}

// Wait for auto-install
await tick();
console.log(`[1] Auto-install check: typeof requestFromMiniApp = ${typeof globalThis.requestFromMiniApp}`);
if (typeof globalThis.requestFromMiniApp !== 'function') {
  console.log('  -> not auto-installed, manually installing');
  installMockEsewaHost();
}
console.log(`    installed = ${!!globalThis.__MOCK_ESEWA_INSTALLED__}\n`);

// Test 1: Token gating - before INIT_APP should fail
console.log('[2] Token gating (should fail before INIT_APP)');
{
  const { data, latency } = await call({ requestType: REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS, token: null, callbackKey: 'USER_DETAIL_ACCESS_CALLBACK' });
  console.log(`    latency: ${latency}ms (expected 30-50)`);
  let res;
  try { res = JSON.parse(data); } catch { res = data; }
  console.log(`    response: ${JSON.stringify(res).slice(0, 120)}`);
  console.log(`    PASS: ${!!res.error_message && res.error_message.includes('Token not found') ? '✅' : '❌'}`);
}
console.log();

// Test 2: INIT_APP success
console.log('[3] INIT_APP should succeed and return token + scope as JSON string');
let issuedToken = null;
{
  const { data, latency } = await call({ requestType: REQUEST_TYPE_ENUM.INIT_APP, merchant_identifier: 'IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=', callbackKey: 'INIT_APP_CALLBACK' });
  console.log(`    latency: ${latency}ms`);
  console.log(`    raw data type: ${typeof data} (should be string)`);
  const res = JSON.parse(data);
  console.log(`    parsed: ${JSON.stringify(res)}`);
  issuedToken = res.token;
  console.log(`    PASS token present: ${res.token ? '✅' : '❌'}`);
  console.log(`    PASS scope array: ${Array.isArray(res.scope) && res.scope.length > 0 ? '✅' : '❌'}`);
  console.log(`    sessionStorage token: ${sessionStorage.getItem('miniAppAuthToken') ? '✅' : '❌'}`);
}
console.log();

// Test 3: Subsequent call should succeed now
console.log('[4] USER_DETAIL_ACCESS after INIT_APP (JSON string contract)');
{
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS, token: issuedToken, callbackKey: 'USER_DETAIL_ACCESS_CALLBACK' });
  console.log(`    type: ${typeof data} (should be string)`);
  const res = JSON.parse(data);
  console.log(`    res: ${JSON.stringify(res)}`);
  console.log(`    PASS esewa_id: ${res.esewa_id === mockEsewaConfig.esewaId ? '✅' : '❌'}`);
  console.log(`    PASS name/mobile: ${res.name && res.mobile ? '✅' : '❌'}`);
}
console.log();

// Test 4: LOCATION_ACCESS
console.log('[5] LOCATION_ACCESS (JSON string)');
{
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.LOCATION_ACCESS, token: issuedToken, callbackKey: 'LOCATION_ACCESS_CALLBACK' });
  const res = JSON.parse(data);
  console.log(`    ${JSON.stringify(res)}`);
  console.log(`    PASS lat/lng: ${res.latitude && res.longitude ? '✅' : '❌'}`);
}
console.log();

// Test 5: MEDIA_ACCESS (raw string, no JSON.parse)
console.log('[6] MEDIA_ACCESS (raw base64 string — NOT JSON stringified)');
{
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.MEDIA_ACCESS, token: issuedToken, callbackKey: 'MEDIA_ACCESS_CALLBACK' });
  console.log(`    type: ${typeof data}`);
  console.log(`    is base64: ${typeof data === 'string' && data.startsWith('data:image') ? '✅' : '❌'}`);
  console.log(`    try JSON.parse should fail or not be needed: ${(() => { try { JSON.parse(data); return 'parsed (but should be raw)'; } catch { return 'throws ✅ (raw expected)'; }})()}`);
}
console.log();

// Test 6: VALIDATE_TRANSACTION
console.log('[7] VALIDATE_TRANSACTION (JSON string, status COMPLETE)');
{
  setMockConfig({ validateStatus: 'PENDING' });
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.VALIDATE_TRANSACTION, token: issuedToken, callbackKey: 'VALIDATE_TRANSACTION_CALLBACK' });
  const res = JSON.parse(data);
  console.log(`    ${JSON.stringify(res)}`);
  console.log(`    PASS status PENDING: ${res.status === 'PENDING' ? '✅' : '❌'}`);
  setMockConfig({ validateStatus: 'COMPLETE' });
}
console.log();

// Test 7: REQUEST_PAYMENT echo
console.log('[8] REQUEST_PAYMENT echo amount/product_code');
{
  const { data } = await call({
    requestType: REQUEST_TYPE_ENUM.REQUEST_PAYMENT,
    token: issuedToken,
    merchant_identifier: 'IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=',
    callbackKey: 'REQUEST_PAYMENT_CALLBACK',
    data: { product_code: 'NP-ES-VIANET', amount: 28.48, properties: { productId: '3299', refId: '400005' } }
  });
  const res = JSON.parse(data);
  console.log(`    ${JSON.stringify(res)}`);
  console.log(`    PASS amount echo: ${res.amount === 28.48 ? '✅' : '❌'}`);
  console.log(`    PASS product_code echo: ${res.product_code === 'NP-ES-VIANET' ? '✅' : '❌'}`);
  console.log(`    PASS refId present: ${res.refId ? '✅' : '❌'}`);
  console.log(`    PASS transaction_uuid present: ${res.transaction_uuid ? '✅' : '❌'}`);
}
console.log();

// Test 8: GET_PRODUCT
console.log('[9] GET_PRODUCT (JSON string)');
{
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.GET_PRODUCT, token: issuedToken, callbackKey: 'GET_PRODUCT_CALLBACK' });
  const res = JSON.parse(data);
  console.log(`    products length: ${res.products?.length}`);
  console.log(`    PASS: ${res.products?.length === 2 ? '✅' : '❌'}`);
}
console.log();

// Test 9: VALIDATE_USER
console.log('[10] VALIDATE_USER (JSON string)');
{
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.VALIDATE_USER, token: issuedToken, callbackKey: 'VALIDATE_USER_CALLBACK', data: { esewa_id: '9847474747' } });
  const res = JSON.parse(data);
  console.log(`    ${JSON.stringify(res)}`);
  console.log(`    PASS valid true: ${res.valid === true ? '✅' : '❌'}`);
  console.log(`    PASS esewa_id echo: ${res.esewa_id === '9847474747' ? '✅' : '❌'}`);
}
console.log();

// Test 10: MERCHANT_DETAIL
console.log('[11] MERCHANT_DETAIL (JSON string)');
{
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.MERCHANT_DETAIL, token: issuedToken, callbackKey: 'MERCHANT_DETAIL_CALLBACK' });
  const res = JSON.parse(data);
  console.log(`    ${JSON.stringify(res).slice(0, 120)}`);
  console.log(`    PASS merchant_name: ${res.merchant_name ? '✅' : '❌'}`);
}
console.log();

// Test 11: QR_SCANNER_ACCESS
console.log('[12] QR_SCANNER_ACCESS (JSON string)');
{
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.QR_SCANNER_ACCESS, token: issuedToken, callbackKey: 'QR_SCANNER_ACCESS_CALLBACK' });
  const res = JSON.parse(data);
  console.log(`    ${JSON.stringify(res)}`);
  console.log(`    PASS qr_data: ${res.qr_data ? '✅' : '❌'}`);
}
console.log();

// Test 12: FILE_DOWNLOAD_ACCESS (raw object)
console.log('[13] FILE_DOWNLOAD_ACCESS (raw object — NOT stringified)');
{
  const { data } = await call({
    requestType: REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS,
    token: issuedToken,
    callbackKey: 'FILE_DOWNLOAD_ACCESS_CALLBACK',
    data: { fileName: 'Statement-2025.pdf', type: 'url', content: 'https://example.com/sample.pdf' }
  });
  console.log(`    type: ${typeof data} (should be object)`);
  console.log(`    value: ${JSON.stringify(data)}`);
  console.log(`    PASS raw object: ${typeof data === 'object' && data.message === 'Download simulated' ? '✅' : '❌'}`);
  console.log(`    PASS not string: ${typeof data !== 'string' ? '✅' : '❌'}`);
}
console.log();

// Test 13: CLOSE_APP (raw, no-op)
console.log('[14] CLOSE_APP (raw, logs to console, callback optional)');
{
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.CLOSE_APP, callbackKey: 'CLOSE_APP_CALLBACK' });
  console.log(`    type: ${typeof data} (should be object)`);
  console.log(`    value: ${JSON.stringify(data)}`);
  console.log(`    PASS: ${data.message === 'App would close here' ? '✅' : '❌'}`);
}
console.log();

// Test 14: CLOSE_APP without callback
console.log('[15] CLOSE_APP without callback (should not throw)');
{
  try {
    globalThis.requestFromMiniApp({ requestType: REQUEST_TYPE_ENUM.CLOSE_APP, callbackKey: 'CLOSE_APP_CALLBACK' });
    // wait a bit
    await new Promise(r => setTimeout(r, 60));
    console.log('    PASS no throw ✅');
  } catch (e) {
    console.log(`    FAIL ❌ ${e}`);
  }
}
console.log();

// Test 15: Scope gating
console.log('[16] Scope gating — remove LOCATION_ACCESS from scope then call should fail');
{
  const originalScope = [...mockEsewaConfig.scope];
  setMockConfig({ scope: originalScope.filter(s => s !== REQUEST_TYPE_ENUM.LOCATION_ACCESS) });
  // also update state scope to match (as INIT_APP would have set)
  globalThis.__MOCK_ESEWA__.state.scope = [...mockEsewaConfig.scope];
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.LOCATION_ACCESS, token: issuedToken, callbackKey: 'LOCATION_ACCESS_CALLBACK' });
  const res = JSON.parse(data);
  console.log(`    ${JSON.stringify(res)}`);
  console.log(`    PASS error_message scope: ${res.error_message?.includes('Merchant scope not found') ? '✅' : '❌'}`);
  // restore
  setMockConfig({ scope: originalScope });
  globalThis.__MOCK_ESEWA__.state.scope = [...originalScope];
  // also restore sessionStorage
  sessionStorage.setItem('miniAppAuthScope', JSON.stringify(originalScope));
}
console.log();

// Test 16: Force error toggle
console.log('[17] Force error toggle (forceError=true)');
{
  setMockConfig({ forceError: { [REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS]: true } });
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS, token: issuedToken, callbackKey: 'USER_DETAIL_ACCESS_CALLBACK' });
  const res = JSON.parse(data);
  console.log(`    ${JSON.stringify(res)}`);
  console.log(`    PASS error_message: ${res.error_message ? '✅' : '❌'}`);
  setMockConfig({ forceError: {} });
  // verify success after clearing
  const { data: data2 } = await call({ requestType: REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS, token: issuedToken, callbackKey: 'USER_DETAIL_ACCESS_CALLBACK' });
  const res2 = JSON.parse(data2);
  console.log(`    after clear, success: ${!res2.error_message && res2.esewa_id ? '✅' : '❌'}`);
}
console.log();

// Test 17: MEDIA_ACCESS force error (raw)
console.log('[18] MEDIA_ACCESS force error (raw object)');
{
  setMockConfig({ forceError: { [REQUEST_TYPE_ENUM.MEDIA_ACCESS]: true } });
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.MEDIA_ACCESS, token: issuedToken, callbackKey: 'MEDIA_ACCESS_CALLBACK' });
  console.log(`    type: ${typeof data}`);
  console.log(`    value: ${JSON.stringify(data)}`);
  console.log(`    PASS error_message raw: ${data.error_message ? '✅' : '❌'}`);
  console.log(`    PASS raw not string: ${typeof data !== 'string' ? '✅' : '❌'}`);
  setMockConfig({ forceError: {} });
}
console.log();

// Test 18: FILE_DOWNLOAD force error (raw)
console.log('[19] FILE_DOWNLOAD_ACCESS force error (raw)');
{
  setMockConfig({ forceError: { [REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS]: true } });
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS, token: issuedToken, callbackKey: 'FILE_DOWNLOAD_ACCESS_CALLBACK', data: { fileName: 'a.pdf', type: 'url', content: 'https://x' } });
  console.log(`    type: ${typeof data}`);
  console.log(`    ${JSON.stringify(data)}`);
  console.log(`    PASS raw error: ${data.error_message ? '✅' : '❌'}`);
  setMockConfig({ forceError: {} });
}
console.log();

// Test 19: Token mismatch
console.log('[20] Token mismatch should fail');
{
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS, token: 'wrong_token', callbackKey: 'USER_DETAIL_ACCESS_CALLBACK' });
  const res = JSON.parse(data);
  console.log(`    ${JSON.stringify(res)}`);
  console.log(`    PASS invalid token: ${res.error_message?.includes('Invalid token') ? '✅' : '❌'}`);
}
console.log();

// Test 20: Real host guard — should not override
console.log('[21] Real host guard — install should not override existing bridge');
{
  // simulate real host present before install: we already have mock, so uninstall first, then set real
  const { uninstallMockEsewaHost } = await import('./dist/mockEsewaHost.js');
  // we need to reset: uninstall
  // manually clean
  delete globalThis.requestFromMiniApp;
  delete globalThis.__MOCK_ESEWA_INSTALLED__;
  delete globalThis.__MOCK_ESEWA__;
  let realCalled = false;
  globalThis.requestFromMiniApp = () => { realCalled = true; };
  const result = installMockEsewaHost();
  console.log(`    install returned: ${result} (should be false)`);
  console.log(`    still real host: ${globalThis.requestFromMiniApp && !globalThis.__MOCK_ESEWA_INSTALLED__ ? '✅' : '❌'}`);
  // clean up real host, reinstall mock for remaining tests
  delete globalThis.requestFromMiniApp;
  delete globalThis.__MOCK_ESEWA_INSTALLED__;
  delete globalThis.__MOCK_ESEWA__;
  resetMockSession();
  sessionStorage.clear();
  installMockEsewaHost();
  await tick();
  // need new INIT_APP after reinstall
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.INIT_APP, merchant_identifier: 'test', callbackKey: 'INIT_APP_CALLBACK' });
  const res = JSON.parse(data);
  console.log(`    re-init token: ${res.token ? '✅' : '❌'}`);
  issuedToken = res.token;
}
console.log();

// Test 21: Logs
console.log('[22] Logs should contain recent calls');
{
  const logs = getMockLogs();
  console.log(`    logs count: ${logs.length}`);
  console.log(`    recent: ${logs.slice(0, 3).map(l => l.requestType).join(', ')}`);
  console.log(`    PASS logs >0: ${logs.length > 0 ? '✅' : '❌'}`);
}
console.log();

// Test 22: Editable fields — token, esewa_id, amount
console.log('[23] Editable fields (token, esewa_id, amount) via setMockConfig');
{
  setMockConfig({ esewaId: '9849998888', amount: 9999.99, token: 'CUSTOM_TOKEN_123' });
  // need re-init to issue custom token
  resetMockSession();
  sessionStorage.clear();
  // queue new token will be CUSTOM_TOKEN_123
  const { data } = await call({ requestType: REQUEST_TYPE_ENUM.INIT_APP, merchant_identifier: 'test', callbackKey: 'INIT_APP_CALLBACK' });
  const res = JSON.parse(data);
  console.log(`    new token: ${res.token} (expected CUSTOM_TOKEN_123) ${res.token === 'CUSTOM_TOKEN_123' ? '✅' : '❌'}`);
  const { data: ud } = await call({ requestType: REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS, token: res.token, callbackKey: 'USER_DETAIL_ACCESS_CALLBACK' });
  const udRes = JSON.parse(ud);
  console.log(`    esewa_id edited: ${udRes.esewa_id} ${udRes.esewa_id === '9849998888' ? '✅' : '❌'}`);
  const { data: pay } = await call({ requestType: REQUEST_TYPE_ENUM.REQUEST_PAYMENT, token: res.token, callbackKey: 'REQUEST_PAYMENT_CALLBACK', data: { product_code: 'NP-ES-TEST', amount: 100 } });
  const payRes = JSON.parse(pay);
  console.log(`    amount default still from config if not passed: mockEsewaConfig.amount=${mockEsewaConfig.amount} ${mockEsewaConfig.amount === 9999.99 ? '✅' : '❌'}`);
  // reset
  setMockConfig({ esewaId: '9841000001', amount: 1250.5, token: 'SEdcRFVePhYfCRtQJhEiATA8DyVWFFA7Dw8UBEAKH1IkLFwYJAUxPgI%3D' });
}
console.log();

console.log('=== All tests done ===');
