/**
 * autoResponder.ts — the host answers Mini App requests by itself
 *
 * Until now every `requestFromMiniApp()` call from a Mini App landed in the
 * DevPanel's pending queue and a human had to author JSON and click Fire.
 * That is only useful when you are *debugging a contract*. For normal work the
 * Mini App should just get its data: INIT_APP hands back a token + scope,
 * USER_DETAIL_ACCESS hands back the signed-in user and wallet balance,
 * REQUEST_PAYMENT actually debits that balance and writes a transaction, etc.
 *
 * This module is the host's "backend": one pure-ish resolver that turns an
 * incoming BridgeRequest into the response the real eSewa app would send,
 * using host session state + the onboarding registry. bridge.ts calls it from
 * `onOutgoing` when auto mode is on (the default), and still supports the
 * manual DevPanel path when it is off.
 *
 * Everything it returns goes through `fireResponse`, so the log, the session
 * side-effects and the wire format stay identical between auto and manual.
 */

import type { BridgeRequest, SessionState } from './bridge';
import { DEFAULT_GRANTED_SCOPE, REQUEST_TYPE_ENUM } from './requestTypes';
import type { RegisteredMiniApp } from './onboarding/types';
import { REGISTRY_STORAGE_KEY } from './onboarding/store';

export type AutoResponse = {
  responseType: 'success' | 'error';
  response: any;
};

export type HostTransaction = {
  transaction_uuid: string;
  refId: string;
  amount: number;
  product_code?: string;
  merchant_identifier?: string;
  status: 'COMPLETE' | 'PENDING' | 'FAILED';
  timestamp: string;
};

export type AutoResponderContext = {
  session: SessionState;
};

// ---------------------------------------------------------------------------
// Config — auto mode on by default, persisted so a reload keeps your choice
// ---------------------------------------------------------------------------

const ENABLED_KEY = 'esewa-host-auto-respond';
const LATENCY_KEY = 'esewa-host-auto-latency';
const DEFAULT_LATENCY_MS = 120;

let autoEnabled: boolean = readEnabled();
let autoLatencyMs: number = readLatency();

function readEnabled(): boolean {
  try {
    const v = localStorage.getItem(ENABLED_KEY);
    return v === null ? true : v === 'true';
  } catch {
    return true;
  }
}

function readLatency(): number {
  try {
    const v = Number(localStorage.getItem(LATENCY_KEY));
    return Number.isFinite(v) && v >= 0 ? v : DEFAULT_LATENCY_MS;
  } catch {
    return DEFAULT_LATENCY_MS;
  }
}

export function isAutoRespondEnabled(): boolean {
  return autoEnabled;
}

export function setAutoRespondEnabled(on: boolean): void {
  autoEnabled = on;
  try {
    localStorage.setItem(ENABLED_KEY, String(on));
  } catch {}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('esewaHostAutoModeUpdate'));
  }
}

export function getAutoLatency(): number {
  return autoLatencyMs;
}

export function setAutoLatency(ms: number): void {
  autoLatencyMs = Number.isFinite(ms) && ms >= 0 ? ms : DEFAULT_LATENCY_MS;
  try {
    localStorage.setItem(LATENCY_KEY, String(autoLatencyMs));
  } catch {}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('esewaHostAutoModeUpdate'));
  }
}

// ---------------------------------------------------------------------------
// Registry lookup — the host only serves mini apps it has onboarded as live
// ---------------------------------------------------------------------------

function listRegisteredApps(): RegisteredMiniApp[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REGISTRY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function findLiveApp(merchantIdentifier?: string): RegisteredMiniApp | undefined {
  if (!merchantIdentifier) return undefined;
  return listRegisteredApps().find(
    (a) => a.merchant_identifier === merchantIdentifier && a.status === 'live',
  );
}

function merchantIdOf(data: any): string | undefined {
  return data?.merchant_identifier ?? data?.merchantIdentifier ?? undefined;
}

// ---------------------------------------------------------------------------
// Session tokens
//
// INIT_APP is idempotent per merchant for the life of a page session. A Mini
// App can call it more than once for reasons it does not control — React
// StrictMode double-invokes effects in dev, a remount re-runs init, a retry
// fires after a slow first call — and minting a fresh token each time would
// silently invalidate the one the Mini App is already holding, so every
// follow-up request (user detail, location, payment) would come back
// "Invalid token". The real app hands a mini app one session token, so the
// host re-issues the same one instead.
//
// Tokens the host has actually issued are also remembered, so a request that
// captured a superseded token is still served (with a warning) while a token
// the host never issued is still refused.
// ---------------------------------------------------------------------------

const issuedTokens = new Set<string>();
let lastInit: { merchant: string; token: string; scope: string[] } | null = null;

/** Remember a token the host handed out (or a dev typed into the panel). */
export function noteIssuedToken(token: string | null | undefined): void {
  if (token) issuedTokens.add(token);
}

/** Drop every issued token — used when the host session is reset. */
export function resetIssuedTokens(): void {
  issuedTokens.clear();
  lastInit = null;
}

function isKnownToken(token: string): boolean {
  return issuedTokens.has(token);
}

function err(message: string): AutoResponse {
  return { responseType: 'error', response: { error_message: message } };
}

function ok(response: any): AutoResponse {
  return { responseType: 'success', response };
}

function genRef(prefix: string): string {
  return `${prefix}${Math.floor(100000 + Math.random() * 900000)}`;
}

function genUuid(): string {
  return `txn-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

/** Amount a request is asking to move, wherever the mini app put it. */
function amountOf(data: any): number | null {
  const raw = data?.data?.amount ?? data?.amount;
  const n = typeof raw === 'string' ? Number(raw) : raw;
  return typeof n === 'number' && Number.isFinite(n) ? n : null;
}

/** GET_PRODUCT always answers with a `products` array, however state is shaped. */
function productsFrom(product: any): any[] {
  if (!product) return [];
  if (Array.isArray(product)) return product;
  if (Array.isArray(product.products)) return product.products;
  return [product];
}

// ---------------------------------------------------------------------------
// The resolver
// ---------------------------------------------------------------------------

/**
 * Decide what the host sends back for one request.
 * Returns null when the host has no opinion and the request should stay in the
 * pending queue for a human (currently only requests with no callbackKey).
 */
export function resolveAutoResponse(
  req: BridgeRequest,
  ctx: AutoResponderContext,
): AutoResponse | null {
  if (!req.hasCallback) return null;

  const { session } = ctx;
  const data = req.data ?? {};
  const rt = req.requestType;
  const mid = merchantIdOf(data);

  // --- gating: everything except INIT_APP / CLOSE_APP needs a live session ---
  if (rt !== REQUEST_TYPE_ENUM.INIT_APP && rt !== REQUEST_TYPE_ENUM.CLOSE_APP) {
    if (!session.token) {
      return err('Token not found. Please call INIT_APP first.');
    }
    if (data.token && data.token !== session.token) {
      if (!isKnownToken(data.token)) {
        return err('Invalid token. Please re-initialize the app (INIT_APP).');
      }
      console.warn(
        `[eSewa Host] ${rt} used a superseded session token — serving it anyway. The Mini App should re-read the token from its latest INIT_APP response.`,
      );
    }
    if (session.grantedScope && !session.grantedScope.includes(rt)) {
      return err(
        `Requested service is outside granted scope. Granted: [${session.grantedScope.join(', ')}]`,
      );
    }
  }

  switch (rt) {
    case REQUEST_TYPE_ENUM.INIT_APP: {
      const app = findLiveApp(mid);
      if (!app) {
        return err(
          mid
            ? `Unknown or non-live merchant_identifier: ${mid}`
            : 'merchant_identifier is required for INIT_APP',
        );
      }
      // A registry entry may carry its own scope list; otherwise grant the default.
      const declared = (app as unknown as { scopes?: string[] }).scopes;
      const scope = Array.isArray(declared) && declared.length ? declared : [...DEFAULT_GRANTED_SCOPE];

      // Same mini app, same live session → same token, so an init the Mini App
      // did not ask for (StrictMode, remount, retry) cannot invalidate the one
      // it already holds.
      const reuse =
        lastInit &&
        lastInit.merchant === app.merchant_identifier &&
        session.token === lastInit.token;
      const token = reuse
        ? lastInit!.token
        : `host_token_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const grantedScope = reuse ? lastInit!.scope : scope;

      lastInit = { merchant: app.merchant_identifier, token, scope: grantedScope };
      noteIssuedToken(token);

      return ok({
        token,
        scope: grantedScope,
        merchant_identifier: app.merchant_identifier,
        vendorIdentifier: app.vendorIdentifier,
        app_name: app.name,
      });
    }

    case REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS: {
      const user = (session.user ?? {}) as Record<string, unknown>;
      const balance = typeof session.balance === 'number' ? session.balance : (user.balance as number | undefined);
      return ok({
        ...user,
        balance,
        currency: (user.currency as string) ?? 'NPR',
      });
    }

    case REQUEST_TYPE_ENUM.LOCATION_ACCESS:
      return ok(
        session.location ?? {
          latitude: 27.7172,
          longitude: 85.324,
          accuracy: 12.5,
          address: 'Kathmandu, Nepal',
        },
      );

    case REQUEST_TYPE_ENUM.MEDIA_ACCESS:
      return ok({
        media:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=',
      });

    case REQUEST_TYPE_ENUM.GET_PRODUCT: {
      const products = productsFrom(session.product);
      return ok({ products, total: products.length });
    }

    case REQUEST_TYPE_ENUM.MERCHANT_DETAIL: {
      const app = findLiveApp(mid);
      const merchant = (session.merchant ?? {}) as Record<string, unknown>;
      return ok({
        ...merchant,
        merchant_code: app?.merchant_identifier ?? merchant.merchant_code,
        merchant_name: app?.name ?? merchant.merchant_name,
        status: 'ACTIVE',
      });
    }

    case REQUEST_TYPE_ENUM.VALIDATE_USER: {
      const user = (session.user ?? {}) as Record<string, unknown>;
      const asked = data?.data?.esewa_id ?? data?.esewa_id ?? user.esewa_id;
      return ok({
        valid: true,
        esewa_id: String(asked ?? ''),
        name: user.name ?? null,
        status: 'ACTIVE',
      });
    }

    case REQUEST_TYPE_ENUM.REQUEST_PAYMENT: {
      const amount = amountOf(data);
      if (amount === null || amount <= 0) {
        return err('Invalid payment amount.');
      }
      const balance = session.balance;
      if (typeof balance === 'number' && amount > balance) {
        return err(
          `Insufficient balance. Available: Rs ${balance.toLocaleString('en-IN')}, required: Rs ${amount.toLocaleString('en-IN')}. Please top up your eSewa wallet.`,
        );
      }
      return ok({
        status: 'COMPLETE',
        refId: genRef('PAY'),
        transaction_uuid: genUuid(),
        product_code: data?.data?.product_code ?? data?.product_code ?? null,
        amount,
        merchant_identifier: mid ?? null,
        channel: data?.data?.channel ?? 'WEB_USER',
        timestamp: new Date().toISOString(),
      });
    }

    case REQUEST_TYPE_ENUM.VALIDATE_TRANSACTION: {
      const ledger = session.transactions ?? [];
      const key =
        data?.transactionCode ??
        data?.data?.transaction_uuid ??
        data?.transaction_uuid ??
        data?.data?.refId ??
        data?.refId;
      const found = key
        ? ledger.find((t) => t.transaction_uuid === key || t.refId === key)
        : ledger[0];
      if (!found) {
        return err(key ? `Transaction not found: ${key}` : 'No transaction to validate.');
      }
      return ok({ ...found });
    }

    case REQUEST_TYPE_ENUM.CREDIT_ADDITION: {
      const amount = amountOf(data);
      if (amount === null || amount <= 0) return err('Invalid credit amount.');
      return ok({
        status: 'SUCCESS',
        amount,
        refId: genRef('CR'),
        transaction_uuid: genUuid(),
        balance: (session.balance ?? 0) + amount,
        timestamp: new Date().toISOString(),
      });
    }

    case REQUEST_TYPE_ENUM.CLOSE_APP: {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('esewaHostCloseApp', { detail: { merchant_identifier: mid ?? null } }),
        );
      }
      return ok({ message: 'Mini app closed by host' });
    }

    case REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS:
      return ok({
        message: 'Download handled by host',
        fileName: data?.data?.fileName ?? 'download.pdf',
        type: data?.data?.type ?? 'url',
        content: data?.data?.content ?? null,
      });

    case REQUEST_TYPE_ENUM.QR_SCANNER_ACCESS:
      return ok({
        qr_data: 'https://esewa.com.np/qr/MOCK123',
        scanned_text: 'esewa://pay?amt=500',
        format: 'QR_CODE',
      });

    case REQUEST_TYPE_ENUM.PAYMENT_REQUEST:
      return ok({
        status: 'PENDING',
        amount: amountOf(data) ?? 0,
        request_id: genRef('PR'),
        timestamp: new Date().toISOString(),
      });

    case REQUEST_TYPE_ENUM.CONNECTION_REQUEST:
      return ok({ status: 'CONNECTED', merchant_identifier: mid ?? null });

    case REQUEST_TYPE_ENUM.PAYMENT_SETTLEMENT:
      return ok({
        status: 'SETTLED',
        amount: amountOf(data) ?? 0,
        settlement_id: genRef('ST'),
        timestamp: new Date().toISOString(),
      });

    case REQUEST_TYPE_ENUM.DUE_DATE_REMINDER:
      return ok({
        status: 'SCHEDULED',
        due_date: data?.data?.due_date ?? new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10),
        amount: amountOf(data) ?? 0,
      });

    default:
      return err(`Unknown requestType: ${rt}`);
  }
}
