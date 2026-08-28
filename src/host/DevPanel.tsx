/**
 * DevPanel.tsx — collapsible side drawer per spec
 *  - live log of every outgoing bridge request
 *  - form to author mocked response for each pending request and fire *_CALLBACK
 *  - current simulated user/session state (token, user, product, merchant) with editable JSON
 *  - platform picker (Android / iOS / Flutter)
 */

import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { primary, blue, gray, bluegray, white, red, orange } from './tokens';
import {
  getBridgeRequests,
  getPendingRequests,
  getSessionState,
  setSessionState,
  fireResponse,
  clearBridgeLog,
  DEFAULT_RESPONSES,
  REQUEST_TYPE_ENUM,
} from './bridge';
import type { BridgeRequest, SessionState } from './bridge';
import { getStoredPlatform, setStoredPlatform, PLATFORM_LABEL } from './platform';
import type { HostPlatform } from './platform';

const Drawer = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100vh;
  background: ${white};
  border-left: 1px solid ${bluegray[100]};
  box-shadow: -8px 0 24px rgba(28, 37, 46, 0.08);
  transform: translateX(${(p) => (p.$open ? '0' : '100%')});
  transition: transform 0.24s ease;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
`;

const DrawerHandle = styled.button<{ $open: boolean }>`
  position: fixed;
  top: 50%;
  right: ${(p) => (p.$open ? '420px' : '0')};
  transform: translateY(-50%);
  background: ${primary[500]};
  color: ${white};
  border: none;
  border-radius: 8px 0 0 8px;
  padding: 12px 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.6px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  box-shadow: -4px 0 12px rgba(41, 187, 0, 0.25);
  z-index: 9999;
  transition: right 0.24s ease;
`;

const Header = styled.div`
  padding: 14px 16px 12px;
  background: ${primary[500]};
  color: ${white};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.4px;
`;

const Sub = styled.div`
  font-size: 11px;
  opacity: 0.9;
  margin-top: 2px;
`;

const PlatformRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`;

const PlatformBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid ${(p) => (p.$active ? white : 'rgba(255,255,255,0.5)')};
  background: ${(p) => (p.$active ? white : 'rgba(255,255,255,0.15)')};
  color: ${(p) => (p.$active ? primary[600] : white)};
  font-weight: 700;
  font-size: 11px;
  cursor: pointer;
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 12px 0;
  background: ${blue[50]};
`;

const Section = styled.div`
  background: ${white};
  border: 1px solid ${bluegray[100]};
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 10px;
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${gray[500]};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogItem = styled.div<{ $pending?: boolean; $success?: boolean }>`
  border: 1px solid ${(p) => (p.$pending ? orange[500] : p.$success === false ? red[500] : bluegray[100])};
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 6px;
  background: ${(p) => (p.$pending ? orange[50] : white)};
  font-size: 11px;
  font-family: ui-monospace, monospace;
`;

const Badge = styled.span<{ $tone: 'green' | 'blue' | 'orange' | 'red' | 'gray' }>`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.4px;
  background: ${(p) =>
    p.$tone === 'green' ? primary[50] : p.$tone === 'blue' ? blue[100] : p.$tone === 'orange' ? orange[50] : p.$tone === 'red' ? red[50] : gray[25]};
  color: ${(p) =>
    p.$tone === 'green' ? primary[500] : p.$tone === 'blue' ? blue[500] : p.$tone === 'orange' ? orange[500] : p.$tone === 'red' ? red[500] : gray[100]};
  border: 1px solid ${(p) =>
    p.$tone === 'green' ? primary[500] : p.$tone === 'blue' ? blue[500] : p.$tone === 'orange' ? orange[500] : p.$tone === 'red' ? red[500] : bluegray[100]};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 84px;
  font-family: ui-monospace, monospace;
  font-size: 11px;
  border: 1px solid ${bluegray[100]};
  border-radius: 8px;
  padding: 8px;
  background: ${white};
  color: ${gray[500]};
  outline: none;
  &:focus { border-color: ${primary[500]}; box-shadow: 0 0 0 2px ${primary[50]}; }
`;

const Select = styled.select`
  border: 1px solid ${bluegray[100]};
  border-radius: 8px;
  padding: 6px 8px;
  font-size: 11px;
  font-weight: 600;
  background: ${white};
  color: ${gray[500]};
`;

const Btn = styled.button<{ $variant?: 'primary' | 'ghost' | 'danger' }>`
  border: none;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  background: ${(p) => (p.$variant === 'danger' ? red[500] : p.$variant === 'ghost' ? white : primary[500])};
  color: ${(p) => (p.$variant === 'ghost' ? gray[500] : white)};
  border: 1px solid ${(p) => (p.$variant === 'ghost' ? bluegray[100] : 'transparent')};
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const JsonEditor = styled.textarea`
  width: 100%;
  min-height: 72px;
  font-family: ui-monospace, monospace;
  font-size: 11px;
  border: 1px solid ${bluegray[100]};
  border-radius: 8px;
  padding: 8px;
  background: #f8fafc;
  color: ${gray[500]};
`;

export const DevPanel: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [logs, setLogs] = useState<BridgeRequest[]>(getBridgeRequests());
  const [pending, setPending] = useState<BridgeRequest[]>(getPendingRequests());
  const [session, setSession] = useState<SessionState>(getSessionState());
  const [platform, setPlatform] = useState<HostPlatform>(getStoredPlatform());
  const [drafts, setDrafts] = useState<Record<string, { json: string; responseType: 'success' | 'error' }>>({});

  const refresh = useCallback(() => {
    setLogs(getBridgeRequests());
    setPending(getPendingRequests());
    setSession(getSessionState());
  }, []);

  useEffect(() => {
    refresh();
    const onLog = () => refresh();
    const onPending = () => refresh();
    const onSession = () => refresh();
    window.addEventListener('esewaHostLogUpdate', onLog);
    window.addEventListener('esewaHostPendingUpdate', onPending);
    window.addEventListener('esewaHostSessionUpdate', onSession);
    return () => {
      window.removeEventListener('esewaHostLogUpdate', onLog);
      window.removeEventListener('esewaHostPendingUpdate', onPending);
      window.removeEventListener('esewaHostSessionUpdate', onSession);
    };
  }, [refresh]);

  // Initialize drafts for new pending entries — honors bridge suggested error for non-live INIT_APP
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
      // cleanup removed
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
    // try parse if looks like JSON
    const trimmed = raw.trim();
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']')) || trimmed.startsWith('"')) {
      try { parsed = JSON.parse(raw); } catch { /* keep raw */ }
    } else if (trimmed === 'null') parsed = null;
    setSessionState({ [key]: parsed } as any);
  };

  return (
    <>
      <DrawerHandle $open={open} onClick={() => setOpen((v) => !v)}>
        {open ? '◀ HIDE HOST' : 'HOST ▶'}
      </DrawerHandle>
      <Drawer $open={open}>
        <Header>
          <div>
            <Title>eSewa Host — Dev Panel</Title>
            <Sub>Bridge log · Pending queue · Session</Sub>
            <PlatformRow>
              {(Object.keys(PLATFORM_LABEL) as HostPlatform[]).map((p) => (
                <PlatformBtn
                  key={p}
                  $active={platform === p}
                  onClick={() => {
                    setPlatform(p);
                    setStoredPlatform(p);
                  }}
                  title={`Switch to ${PLATFORM_LABEL[p]} — reloads to re-evaluate UA sniff`}
                >
                  {PLATFORM_LABEL[p]}
                </PlatformBtn>
              ))}
            </PlatformRow>
            <div style={{ fontSize: 10, opacity: 0.85, marginTop: 4 }}>
              Current UA: {typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 48) + '…' : '—'} (reload on change)
            </div>
          </div>
          <Btn $variant="ghost" onClick={() => { clearBridgeLog(); }} style={{ background: 'white', color: primary[600] }}>
            Clear
          </Btn>
        </Header>

        <Body>
          {/* Pending Queue */}
          <Section>
            <SectionLabel>
              Pending — needs response ({pending.length})
              <span style={{ fontWeight: 400, textTransform: 'none', fontSize: 10, color: gray[100] }}>
                Author JSON + pick success/error → Fire
              </span>
            </SectionLabel>
            {pending.length === 0 ? (
              <div style={{ fontSize: 11, color: gray[100], fontStyle: 'italic' }}>No pending callbacks. Trigger a Mini App action.</div>
            ) : (
              pending.map((p) => {
                const d = drafts[p.id];
                return (
                  <LogItem key={p.id} $pending>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                      <Badge $tone="orange">{p.requestType}</Badge>
                      <span style={{ fontSize: 10, color: gray[100] }}>{p.platform}</span>
                      <span style={{ fontSize: 10, color: gray[100] }}>{new Date(p.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div style={{ color: gray[400], marginBottom: 6, wordBreak: 'break-all' }}>
                      <div style={{ fontWeight: 700, fontSize: 10, color: gray[500] }}>outgoing payload:</div>
                      <pre style={{ margin: '4px 0', whiteSpace: 'pre-wrap', fontSize: 10, background: white, padding: 6, borderRadius: 6, border: `1px solid ${bluegray[100]}` }}>
                        {JSON.stringify(p.data, null, 2).slice(0, 800)}
                      </pre>
                      <div style={{ fontSize: 10 }}>callbackKey: <code>{p.callbackKey}</code></div>
                    </div>
                    {d && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <Select value={d.responseType} onChange={(e) => setDrafts((prev) => ({ ...prev, [p.id]: { ...d, responseType: e.target.value as any } }))}>
                            <option value="success">success</option>
                            <option value="error">error</option>
                          </Select>
                          <Btn onClick={() => handleFire(p.id)}>{p.callbackKey}</Btn>
                          <Btn $variant="ghost" onClick={() => setDrafts((prev) => ({ ...prev, [p.id]: { ...d, json: JSON.stringify(DEFAULT_RESPONSES[p.requestType] ?? { message: 'ok' }, null, 2) } }))}>
                            Reset
                          </Btn>
                        </div>
                        <TextArea value={d.json} onChange={(e) => setDrafts((prev) => ({ ...prev, [p.id]: { ...d, json: e.target.value } }))} />
                      </div>
                    )}
                  </LogItem>
                );
              })
            )}
          </Section>

          {/* Live Log */}
          <Section>
            <SectionLabel>
              Live log ({logs.length})
              <Btn $variant="ghost" onClick={() => clearBridgeLog()}>Clear log</Btn>
            </SectionLabel>
            <div style={{ maxHeight: 260, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {logs.length === 0 ? (
                <div style={{ fontSize: 11, color: gray[100], fontStyle: 'italic' }}>No requests yet.</div>
              ) : (
                logs.slice(0, 30).map((r) => (
                  <LogItem key={r.id} $success={r.response?.responseType === 'error' ? false : r.responded ? true : undefined}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                      <Badge $tone={r.responded ? (r.response?.responseType === 'error' ? 'red' : 'green') : 'gray'}>{r.requestType}</Badge>
                      <span style={{ fontSize: 10, color: gray[100] }}>{r.platform} · {r.hasCallback ? r.callbackKey : 'no-cb'}</span>
                    </div>
                    <div style={{ fontSize: 10, color: gray[300], marginTop: 4, wordBreak: 'break-all' }}>
                      {r.responded ? `→ ${r.response?.responseType}: ${JSON.stringify(r.response?.response).slice(0, 140)}` : '… pending'}
                    </div>
                    <div style={{ fontSize: 9, color: gray[100], marginTop: 2 }}>{new Date(r.timestamp).toLocaleTimeString()}</div>
                  </LogItem>
                ))
              )}
            </div>
          </Section>

          {/* Session State */}
          <Section>
            <SectionLabel>Session state — editable JSON</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: gray[500], marginBottom: 4 }}>token (string | null)</div>
                <JsonEditor
                  value={session.token ?? 'null'}
                  onChange={(e) => setSession((s) => ({ ...s, token: e.target.value === 'null' ? null : e.target.value }))}
                  onBlur={(e) => handleSessionSave('token', e.target.value === 'null' ? 'null' : JSON.stringify(e.target.value))}
                  rows={1}
                />
                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                  <Btn $variant="ghost" onClick={() => handleSessionSave('token', JSON.stringify('mock_token_' + Math.random().toString(36).slice(2, 8)))}>Gen token</Btn>
                  <Btn $variant="ghost" onClick={() => handleSessionSave('token', 'null')}>Clear</Btn>
                </div>
              </div>
              <EditableJsonBlock label="user (USER_DETAIL_ACCESS)" value={session.user} onSave={(v) => handleSessionSave('user', v)} />
              <EditableJsonBlock label="product (GET_PRODUCT)" value={session.product} onSave={(v) => handleSessionSave('product', v)} />
              <EditableJsonBlock label="merchant (MERCHANT_DETAIL)" value={session.merchant} onSave={(v) => handleSessionSave('merchant', v)} />
            </div>
          </Section>

          <div style={{ fontSize: 10, color: gray[100], padding: '8px 2px 12px', lineHeight: 1.5 }}>
            Host does NOT create callback slots — library does. Host only calls <code>window.Android[callbackKey]</code> etc with <code>{'{'}requestType, responseType, response{'}'}</code>. Reload after platform switch so library re-evaluates UA.
          </div>
        </Body>
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
      <div style={{ fontSize: 10, fontWeight: 700, color: gray[500], marginBottom: 4 }}>{label}</div>
      <JsonEditor value={raw} onChange={(e) => setRaw(e.target.value)} rows={4} />
      {err && <div style={{ fontSize: 10, color: red[500], marginTop: 4 }}>{err}</div>}
      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
        <Btn
          $variant="ghost"
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
        <Btn $variant="ghost" onClick={() => setRaw(JSON.stringify(value, null, 2))}>Reset</Btn>
      </div>
    </div>
  );
};
