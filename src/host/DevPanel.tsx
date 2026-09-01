/**
 * DevPanel.tsx — collapsible side drawer per spec
 *  - host mode switch: Auto (host answers by itself) vs Manual (author each response)
 *  - live log of every outgoing bridge request
 *  - form to author mocked response for each pending request and fire *_CALLBACK
 *  - current simulated user/session state (token, user, product, merchant) with editable JSON
 *  - transaction ledger of every payment the host has settled this session
 *  - platform picker (Android / iOS / Flutter)
 */

import React, { useEffect, useState, useCallback } from 'react';
import {
  getBridgeRequests,
  getPendingRequests,
  getSessionState,
  setSessionState,
  getTransactions,
  clearTransactions,
  fireResponse,
  clearBridgeLog,
  DEFAULT_RESPONSES,
} from './bridge';
import type { BridgeRequest, SessionState } from './bridge';
import {
  getAutoLatency,
  isAutoRespondEnabled,
  setAutoLatency,
  setAutoRespondEnabled,
} from './autoResponder';
import type { HostTransaction } from './autoResponder';
import { getStoredPlatform, setStoredPlatform, PLATFORM_LABEL } from './platform';
import type { HostPlatform } from './platform';
import { gray, red, primary, blue, orange } from './tokens';

type Tone = 'green' | 'blue' | 'orange' | 'red' | 'gray';

const TONE_CLASSES: Record<Tone, string> = {
  green: 'border-primary-500 bg-primary-50 text-primary-500',
  blue: 'border-blue-500 bg-blue-100 text-blue-500',
  orange: 'border-orange-500 bg-orange-50 text-orange-500',
  red: 'border-red-500 bg-red-50 text-red-500',
  gray: 'border-bluegray-100 bg-gray-25 text-gray-100',
};

type BtnVariant = 'primary' | 'ghost' | 'danger';

const BTN_CLASSES: Record<BtnVariant, string> = {
  primary: 'rounded-lg border-0 bg-primary-500 px-3.5 py-1.5 text-[11px] font-bold text-white',
  ghost: 'rounded-lg border border-bluegray-100 bg-white px-3.5 py-1.5 text-[11px] font-bold text-gray-500',
  danger: 'rounded-lg border-0 bg-red-500 px-3.5 py-1.5 text-[11px] font-bold text-white',
};

function DrawerHandle({ open, onClick, children }: { open: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-1/2 -translate-y-1/2 z-9999 cursor-pointer border-0 bg-primary-500 text-white rounded-l-lg py-3 px-2 text-[11px] font-bold tracking-[0.6px]"
      style={{ right: open ? '420px' : '0px', transition: 'right 0.24s ease', writingMode: 'vertical-rl', textOrientation: 'mixed' }}
    >
      {children}
    </button>
  );
}

function Drawer({ open, children }: { open: boolean; children: React.ReactNode }) {
  const platformKey = getStoredPlatform();
  return (
    <div
      className="fixed top-0 right-0 z-[9999] flex h-[100vh] w-[420px] flex-col border-l border-bluegray-100 bg-white"
      style={{
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.24s ease',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        boxShadow: '-8px 0 24px rgba(28, 37, 46, 0.08)',
      }}
    >
      <div className="flex items-center justify-between bg-primary-500 px-4 pt-3.5 pb-3 text-white">
        <div>
          <div className="text-[13px] font-extrabold tracking-[0.4px]">eSewa Host — Dev Panel</div>
          <div className="mt-[2px] text-[11px] opacity-90">Bridge log · Pending queue · Session</div>
          <div className="mt-2 flex gap-1.5">
            {(Object.keys(PLATFORM_LABEL) as HostPlatform[]).map((p) => (
              <PlatformBtn
                key={p}
                active={platformKey === p}
                onClick={() => setStoredPlatform(p)}
                title={`Switch to ${PLATFORM_LABEL[p]} — reloads to re-evaluate UA sniff`}
              >
                {PLATFORM_LABEL[p]}
              </PlatformBtn>
            ))}
          </div>
          <div className="mt-1 text-[10px] opacity-85">
            Current UA: {typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 48) + '…' : '—'} (reload on change)
          </div>
        </div>
        <Btn variant="ghost" onClick={() => clearBridgeLog()}>Clear</Btn>
      </div>
      {children}
    </div>
  );
}

function PlatformBtn({ active, onClick, title, children }: {
  active?: boolean; onClick?: () => void; title?: string; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex-1 cursor-pointer rounded-lg px-2 py-1.5 text-[11px] font-bold ${
        active
          ? 'border border-white bg-white text-primary-600'
          : 'border border-white/50 bg-white/15 text-white'
      }`}
    >
      {children}
    </button>
  );
}

function Section({ title, children }: { title?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-2.5 rounded-xl border border-bluegray-100 bg-white p-2.5">
      <div className="mb-2 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-[0.6px] text-gray-500">
        {title}
      </div>
      {children}
    </div>
  );
}

function Badge({ tone, children, className = '' }: { tone: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-full px-1.5 py-[2px] text-[10px] font-extrabold tracking-[0.4px] ${TONE_CLASSES[tone]} ${className}`}>
      {children}
    </span>
  );
}

function LogItem({ pending, success, children, className = '' }: {
  pending?: boolean; success?: boolean; children: React.ReactNode; className?: string;
}) {
  const borderCls = pending
    ? 'border-orange-500'
    : success === false
      ? 'border-red-500'
      : 'border-bluegray-100';
  const bgCls = pending ? 'bg-orange-50' : 'bg-white';
  return (
    <div className={`mb-1.5 rounded-lg border p-2 font-mono text-[11px] ${borderCls} ${bgCls} ${className}`}>
      {children}
    </div>
  );
}

function Btn({ variant = 'primary', disabled = false, style, className = '', onClick, children, type = 'button' }: {
  variant?: BtnVariant; disabled?: boolean; style?: React.CSSProperties; className?: string; onClick?: (e: React.MouseEvent) => void; children: React.ReactNode; type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={`cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${BTN_CLASSES[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function ModeBtn({ active, onClick, children }: { active: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 cursor-pointer rounded-lg px-2 py-2 text-[11px] font-bold ${
        active
          ? 'border border-primary-500 bg-primary-50 text-primary-600'
          : 'border border-bluegray-100 bg-white text-gray-300'
      }`}
    >
      {children}
    </button>
  );
}

function TypeSelect({ value, onChange, options }: {
  value: 'success' | 'error';
  onChange: (v: 'success' | 'error') => void;
  options: { value: 'success' | 'error'; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as 'success' | 'error')}
      className="rounded-lg border border-bluegray-100 bg-white px-2 py-1.5 text-[11px] font-semibold text-gray-500"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function TextArea({ value, onChange, rows = 4, placeholder }: {
  value: string; onChange: (v: string) => void; rows?: number; placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full min-h-[84px] resize-y rounded-lg border border-bluegray-100 bg-white p-2 font-mono text-[11px] text-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-50 focus:outline-none"
    />
  );
}

function JsonEditor({ value, onChange, onBlur, rows = 4 }: {
  value: string; onChange: (v: string) => void; onBlur?: (v: string) => void; rows?: number;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur ? (e) => onBlur(e.target.value) : undefined}
      className="w-full min-h-[72px] resize-y rounded-lg border border-bluegray-100 bg-[#f8fafc] p-2 font-mono text-[11px] text-gray-500"
    />
  );
}

export const DevPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState<BridgeRequest[]>(getBridgeRequests());
  const [pending, setPending] = useState<BridgeRequest[]>(getPendingRequests());
  const [session, setSession] = useState<SessionState>(getSessionState());
  const [platform, setPlatform] = useState<HostPlatform>(getStoredPlatform());
  const [drafts, setDrafts] = useState<Record<string, { json: string; responseType: 'success' | 'error' }>>({});
  const [transactions, setTransactions] = useState<HostTransaction[]>(getTransactions());
  const [auto, setAuto] = useState<boolean>(isAutoRespondEnabled());
  const [latency, setLatency] = useState<number>(getAutoLatency());

  const refresh = useCallback(() => {
    setLogs(getBridgeRequests());
    setPending(getPendingRequests());
    setSession(getSessionState());
    setTransactions(getTransactions());
  }, []);

  useEffect(() => {
    refresh();
    const onLog = () => refresh();
    const onPending = () => refresh();
    const onSession = () => refresh();
    const onAuto = () => {
      setAuto(isAutoRespondEnabled());
      setLatency(getAutoLatency());
    };
    window.addEventListener('esewaHostLogUpdate', onLog);
    window.addEventListener('esewaHostPendingUpdate', onPending);
    window.addEventListener('esewaHostSessionUpdate', onSession);
    window.addEventListener('esewaHostAutoModeUpdate', onAuto);
    return () => {
      window.removeEventListener('esewaHostLogUpdate', onLog);
      window.removeEventListener('esewaHostPendingUpdate', onPending);
      window.removeEventListener('esewaHostSessionUpdate', onSession);
      window.removeEventListener('esewaHostAutoModeUpdate', onAuto);
    };
  }, [refresh]);

  useEffect(() => {
    setDrafts((prev) => {
      const next = { ...prev };
      for (const p of pending) {
        if (!next[p.id]) {
          const suggested = (p as any).suggestedResponse;
          const suggestedType = (p as any).suggestedResponseType as 'success' | 'error' | undefined;
          const template = suggested ?? DEFAULT_RESPONSES[p.requestType] ?? { message: 'ok' };
          const rt = suggestedType ?? 'success';
          next[p.id] = { json: JSON.stringify(template, null, 2), responseType: rt };
        }
      }
      for (const k of Object.keys(next)) {
        if (!pending.find((p) => p.id === k)) delete next[k];
      }
      return next;
    });
  }, [pending]);

  const handleFire = (id: string) => {
    const d = drafts[id];
    if (!d) return;
    let parsed: any;
    try {
      parsed = JSON.parse(d.json);
    } catch (e: any) {
      alert('Invalid JSON: ' + e.message);
      return;
    }
    fireResponse(id, d.responseType, parsed);
  };

  const handleSessionSave = (key: keyof SessionState, raw: string) => {
    let parsed: any = raw;
    const trimmed = raw.trim();
    if (key === 'balance') {
      const n = Number(trimmed);
      parsed = isNaN(n) ? 0 : n;
    } else if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']')) || trimmed.startsWith('"')) {
      try { parsed = JSON.parse(raw); } catch { /* keep raw */ }
    } else if (trimmed === 'null') parsed = null;
    else {
      try { parsed = JSON.parse(raw); } catch { parsed = raw; }
    }
    setSessionState({ [key]: parsed } as any);
  };

  return (
    <>
      <DrawerHandle open={open} onClick={() => setOpen((v) => !v)}>
        {open ? '◀ HIDE HOST' : 'HOST ▶'}
      </DrawerHandle>
      <Drawer open={open}>
        <div className="flex-1 overflow-y-auto bg-blue-50 p-3">
          <Section title="Host mode">
            <div className="flex gap-1.5">
              <ModeBtn active={auto} onClick={() => { setAuto(true); setAutoRespondEnabled(true); }}>
                Auto — host answers
              </ModeBtn>
              <ModeBtn active={!auto} onClick={() => { setAuto(false); setAutoRespondEnabled(false); }}>
                Manual — I answer
              </ModeBtn>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-gray-500">latency</span>
              <input
                type="number"
                min={0}
                step={50}
                value={latency}
                disabled={!auto}
                onChange={(e) => setLatency(Number(e.target.value))}
                onBlur={(e) => setAutoLatency(Number(e.target.value))}
                className="w-[84px] rounded-lg border border-bluegray-100 px-2 py-1.5 text-[11px] font-semibold"
              />
              <span className="text-[10px] text-gray-100">ms before the callback fires</span>
            </div>
            <div className="mt-1.5 text-[10px] leading-[1.5] text-gray-100">
              {auto
                ? 'The host resolves every request itself — INIT_APP issues a token + scope for the live registry entry, USER_DETAIL_ACCESS returns the user and wallet balance below, REQUEST_PAYMENT debits that balance and writes a transaction. Switch to Manual to author responses by hand.'
                : 'Every request waits in the queue below until you fire a response.'}
            </div>
          </Section>

          <Section title={(
            <>
              Pending — needs response ({pending.length})
              <span className="font-normal normal-case text-[10px] text-gray-100">
                Author JSON + pick success/error → Fire
              </span>
            </>
          )}>
            {pending.length === 0 ? (
              <div className="text-[11px] italic text-gray-100">
                {auto
                  ? 'Nothing waiting — the host is answering automatically. See the live log below.'
                  : 'No pending callbacks. Trigger a Mini App action.'}
              </div>
            ) : (
              pending.map((p) => {
                const d = drafts[p.id];
                return (
                  <LogItem key={p.id} pending>
                    <div className="mb-1 flex justify-between gap-2">
                      <Badge tone="orange">{p.requestType}</Badge>
                      <span className="text-[10px] text-gray-100">{p.platform}</span>
                      <span className="text-[10px] text-gray-100">{new Date(p.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="mb-1.5 text-gray-400">
                      <div className="text-[10px] font-bold text-gray-500">outgoing payload:</div>
                      <pre className="my-1 rounded-md border border-bluegray-100 bg-white p-1.5 text-[10px]">{JSON.stringify(p.data, null, 2).slice(0, 800)}</pre>
                      <div className="text-[10px]">callbackKey: <code>{p.callbackKey}</code></div>
                    </div>
                    {d && (
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <TypeSelect
                            value={d.responseType}
                            onChange={(v: "success" | "error") => {
                              const cur = drafts[p.id]!;
                              const updated = {
                                ...drafts,
                                [p.id]: { ...cur, responseType: v },
                              };
                              setDrafts(updated);
                            }}
                            options={[{ value: 'success', label: 'success' }, { value: 'error', label: 'error' }]}
                          />
                          <Btn onClick={() => handleFire(p.id)}>{p.callbackKey}</Btn>
                          <Btn
                            variant="ghost"
                            onClick={() => {
                    setDrafts((prev) => ({
                        ...prev,
                        [p.id]: { ...d, json: JSON.stringify((DEFAULT_RESPONSES[p.requestType] ?? { message: 'ok' }), null, 2) },
                      }));
                  }}
                          >
                            Reset
                          </Btn>
                        </div>
                        <TextArea value={d.json} onChange={(v) => setDrafts((prev) => ({ ...prev, [p.id]: { ...d, json: v } }))} />
                      </div>
                    )}
                  </LogItem>
                );
              })
            )}
          </Section>

          <Section title={(
            <>
              Live log ({logs.length})
              <Btn variant="ghost" onClick={() => clearBridgeLog()}>Clear log</Btn>
            </>
          )}>
            <div className="flex max-h-[260px] flex-col gap-1.5 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-[11px] italic text-gray-100">No requests yet.</div>
              ) : (
                logs.slice(0, 30).map((r) => (
                  <LogItem key={r.id} success={r.response?.responseType === 'error' ? false : r.responded ? true : undefined}>
                    <div className="flex justify-between gap-1.5">
                      <Badge tone={r.responded ? (r.response?.responseType === 'error' ? 'red' : 'green') : 'gray'}>{r.requestType}</Badge>
                      <span className="text-[10px] text-gray-100">{r.platform} · {r.hasCallback ? r.callbackKey : 'no-cb'}</span>
                    </div>
                    <div className="mt-1 text-[10px] text-gray-300">
                      {r.responded ? `→ ${r.response?.responseType}: ${JSON.stringify(r.response?.response).slice(0, 140)}` : '… pending'}
                    </div>
                    <div className="mt-[2px] text-[9px] text-gray-100">{new Date(r.timestamp).toLocaleTimeString()}</div>
                  </LogItem>
                ))
              )}
            </div>
          </Section>

          <Section title={(
            <>
              Transactions ({transactions.length})
              <Btn variant="ghost" onClick={() => clearTransactions()}>Clear</Btn>
            </>
          )}>
            {transactions.length === 0 ? (
              <div className="text-[11px] italic text-gray-100">
                No payments settled yet. REQUEST_PAYMENT debits the wallet balance and lands here; VALIDATE_TRANSACTION resolves against it.
              </div>
            ) : (
              <div className="flex max-h-[200px] flex-col gap-1.5 overflow-y-auto">
                {transactions.map((t) => (
                  <LogItem key={t.transaction_uuid}>
                    <div className="flex justify-between gap-1.5">
                      <Badge tone={t.status === 'COMPLETE' ? 'green' : t.status === 'FAILED' ? 'red' : 'orange'}>{t.status}</Badge>
                      <b className="text-[11px] text-gray-500">Rs {t.amount.toLocaleString('en-IN')}</b>
                    </div>
                    <div className="mt-1 text-[10px] text-gray-300">
                      {t.refId} · {t.transaction_uuid}
                      {t.product_code ? ` · ${t.product_code}` : ''}
                    </div>
                    <div className="mt-[2px] text-[9px] text-gray-100">{new Date(t.timestamp).toLocaleTimeString()}</div>
                  </LogItem>
                ))}
              </div>
            )}
          </Section>

          <Section title="Session state — editable JSON">
            <div className="flex flex-col gap-2">
              <div>
                <div className="mb-1 text-[10px] font-bold text-gray-500">token (string | null)</div>
                <JsonEditor
                  value={session.token ?? 'null'}
                  onChange={(v) => {
                    const updated = { ...session, token: v === 'null' ? null : v };
                    setSession(updated as never);
                  }}
                  onBlur={(v) => handleSessionSave('token', v === 'null' ? 'null' : JSON.stringify(v))}
                  rows={1}
                />
                <div className="mt-1 flex gap-1.5">
                  <Btn variant="ghost" onClick={() => handleSessionSave('token', JSON.stringify('mock_token_' + Math.random().toString(36).slice(2, 8)))}>Gen token</Btn>
                  <Btn variant="ghost" onClick={() => handleSessionSave('token', 'null')}>Clear</Btn>
                </div>
              </div>
              <div>
                <div className="mb-1 text-[10px] font-bold text-gray-500">balance — wallet NPR (host → mini-app)</div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={session.balance ?? 0}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      const updated = { ...session, balance: isNaN(v) ? 0 : v };
                      setSession(updated as never);
                    }}
                    onBlur={(e) => {
                      const v = parseInt(e.target.value, 10);
                      const bal = isNaN(v) ? 0 : v;
                      const curUser = (session.user as Record<string, unknown>) || {};
                      const nextUser = { ...curUser, balance: bal };
                      handleSessionSave('balance', String(bal));
                      handleSessionSave('user', JSON.stringify(nextUser));
                    }}
                    className="flex-1 rounded-lg border border-bluegray-100 px-2 py-1.5 text-[11px] font-semibold"
                  />
                  <span className="text-[11px] text-gray-100">NPR</span>
                  <Btn
                    variant="ghost"
                    onClick={() => {
                      handleSessionSave('balance', '12480');
                      const cur = (session.user as Record<string, unknown>) || {};
                      const updated = { ...session, user: { ...cur, balance: 12480 } };
                      setSession(updated);
                      handleSessionSave('user', JSON.stringify(updated.user));
                      const curUser = (session.user as Record<string, unknown>) || {};
                      const nextUser = { ...curUser, balance: 12480 };
                      setSession({ ...session, balance: 12480, user: nextUser } as never);
                    }}
                  >
                    Reset 12,480
                  </Btn>
                  <Btn
                    variant="ghost"
                    onClick={() => {
                      handleSessionSave('balance', '500');
                      const cur = (session.user as Record<string, unknown>) || {};
                      const nextUser = { ...cur, balance: 500 };
                      handleSessionSave('user', JSON.stringify(nextUser));
                      setSession({ ...session, balance: 500, user: nextUser } as never);
                    }}
                  >
                    Set 500 (test)
                  </Btn>
                </div>
                <div className="mt-1 text-[10px] text-gray-100">Mini-app reads this via USER_DETAIL_ACCESS → balance. If balance &lt; pack price, host will respond error and mini-app shows insufficient.</div>
              </div>
              <EditableJsonBlock label="grantedScope (INIT_APP scope[])" value={session.grantedScope} onSave={(v) => handleSessionSave('grantedScope', v)} />
              <EditableJsonBlock label="user (USER_DETAIL_ACCESS) — includes balance" value={session.user} onSave={(v) => handleSessionSave('user', v)} />
              <EditableJsonBlock label="location (LOCATION_ACCESS)" value={session.location} onSave={(v) => handleSessionSave('location', v)} />
              <EditableJsonBlock label="product (GET_PRODUCT)" value={session.product} onSave={(v) => handleSessionSave('product', v)} />
              <EditableJsonBlock label="merchant (MERCHANT_DETAIL)" value={session.merchant} onSave={(v) => handleSessionSave('merchant', v)} />
            </div>
          </Section>

          <div className="px-[2px] pt-2 pb-3 text-[10px] leading-[1.5] text-gray-100">
            Real contract: Host calls <code>window.Android[callbackKey](JSON.stringify(payload))</code> where success is <code>{'{ token, scope ... }'}</code> and error is <code>{'{ error_message }'}</code>. Scope is stored on INIT_APP success; out-of-scope requests are refused. In Auto mode the host resolves this from the state above — in Manual mode you author it here.
          </div>
        </div>
      </Drawer>
    </>
  );
};

const EditableJsonBlock: React.FC<{ label: string; value: any; onSave: (raw: string) => void }> = ({ label, value, onSave }) => {
  const [raw, setRaw] = useState(() => JSON.stringify(value, null, 2));
  useEffect(() => setRaw(JSON.stringify(value, null, 2)), [value]);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div>
      <div className="mb-1 text-[10px] font-bold text-gray-500">{label}</div>
      <JsonEditor value={raw} onChange={(v) => setRaw(v)} rows={4} />
      {err && <div className="mt-1 text-[10px] text-red-500">{err}</div>}
      <div className="mt-1 flex gap-1.5">
        <Btn
          variant="ghost"
          onClick={() => {
            try {
              JSON.parse(raw);
              setErr(null);
              onSave(raw);
            } catch (e: any) {
              setErr(e.message);
            }
          }}
        >
          Save
        </Btn>
        <Btn variant="ghost" onClick={() => setRaw(JSON.stringify(value, null, 2))}>Reset</Btn>
      </div>
    </div>
  );
};
