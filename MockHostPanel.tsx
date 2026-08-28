/**
 * MockHostPanel.tsx
 * -----------------
 * Floating dev control panel for mockEsewaHost.
 * Toggle success/error per request type, edit fake identity/payload at runtime.
 *
 * Usage (only in dev):
 * ```tsx
 * // App.tsx
 * import { MockHostPanel } from './MockHostPanel';
 * ...
 * {import.meta.env.DEV && <MockHostPanel />}
 * ```
 *
 * Or lazy loaded:
 * ```tsx
 * if (import.meta.env.DEV) {
 *   const { MockHostPanel } = await import('./MockHostPanel');
 * }
 * ```
 */

import React, { useEffect, useState, useCallback } from 'react';
import {
  REQUEST_TYPE_ENUM,
  mockEsewaConfig,
  resetMockSession,
  setMockConfig,
  getMockLogs,
} from './mockEsewaHost';
import type { MockCallLog, ValidateStatus } from './mockEsewaHost';

const ALL_REQUEST_TYPES: string[] = Object.values(REQUEST_TYPE_ENUM);

// Optional: import types from installed lib instead of local if you prefer
// import { REQUEST_TYPE_ENUM } from 'esewa-ui-library';

type PanelProps = {
  /** Start collapsed */
  defaultCollapsed?: boolean;
  /** Disable drag */
  disableDrag?: boolean;
};

export const MockHostPanel: React.FC<PanelProps> = ({
  defaultCollapsed = false,
  disableDrag = false,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [forceError, setForceError] = useState<Record<string, boolean>>({});
  const [token, setToken] = useState(mockEsewaConfig.token);
  const [esewaId, setEsewaId] = useState(mockEsewaConfig.esewaId);
  const [amount, setAmount] = useState<string>(String(mockEsewaConfig.amount));
  const [userName, setUserName] = useState(mockEsewaConfig.userName);
  const [mobile, setMobile] = useState(mockEsewaConfig.mobile);
  const [lat, setLat] = useState(String(mockEsewaConfig.latitude));
  const [lng, setLng] = useState(String(mockEsewaConfig.longitude));
  const [validateStatus, setValidateStatus] = useState<ValidateStatus>(
    mockEsewaConfig.validateStatus,
  );
  const [scope, setScope] = useState<string[]>([...mockEsewaConfig.scope]);
  const [logs, setLogs] = useState<MockCallLog[]>(getMockLogs());
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [latencyMin, setLatencyMin] = useState(mockEsewaConfig.latencyMin);
  const [latencyMax, setLatencyMax] = useState(mockEsewaConfig.latencyMax);

  const syncFromConfig = useCallback(() => {
    setToken(mockEsewaConfig.token);
    setEsewaId(mockEsewaConfig.esewaId);
    setAmount(String(mockEsewaConfig.amount));
    setUserName(mockEsewaConfig.userName);
    setMobile(mockEsewaConfig.mobile);
    setLat(String(mockEsewaConfig.latitude));
    setLng(String(mockEsewaConfig.longitude));
    setValidateStatus(mockEsewaConfig.validateStatus);
    setScope([...mockEsewaConfig.scope]);
    setForceError({ ...mockEsewaConfig.forceError });
    setLatencyMin(mockEsewaConfig.latencyMin);
    setLatencyMax(mockEsewaConfig.latencyMax);
    try {
      const t = sessionStorage.getItem('miniAppAuthToken');
      setHasToken(!!t);
    } catch {
      setHasToken(!!(window as any).__MOCK_ESEWA__?.state?.token);
    }
    setLogs(getMockLogs());
  }, []);

  useEffect(() => {
    syncFromConfig();
    const onChange = () => syncFromConfig();
    const onLog = (e: Event) => {
      const detail = (e as CustomEvent).detail as MockCallLog;
      setLogs((prev) => [detail, ...prev].slice(0, 50));
    };
    window.addEventListener('mockEsewaConfigChange', onChange);
    window.addEventListener('mockEsewaLogUpdate', onLog as EventListener);
    return () => {
      window.removeEventListener('mockEsewaConfigChange', onChange);
      window.removeEventListener('mockEsewaLogUpdate', onLog as EventListener);
    };
  }, [syncFromConfig]);

  // Apply handlers
  const applyToken = () => {
    setMockConfig({ token });
    // also update session state if already issued
    try {
      if ((window as any).__MOCK_ESEWA__?.state?.token) {
        (window as any).__MOCK_ESEWA__.state.token = token;
        sessionStorage.setItem('miniAppAuthToken', token);
      }
    } catch {}
  };

  const applyEsewaId = () => setMockConfig({ esewaId });
  const applyAmount = () => {
    const v = parseFloat(amount);
    if (!isNaN(v)) setMockConfig({ amount: v });
  };
  const applyUserName = () => setMockConfig({ userName });
  const applyMobile = () => setMockConfig({ mobile });
  const applyLatLng = () => {
    const la = parseFloat(lat);
    const ln = parseFloat(lng);
    if (!isNaN(la) && !isNaN(ln)) setMockConfig({ latitude: la, longitude: ln });
  };
  const applyValidateStatus = (s: ValidateStatus) => {
    setValidateStatus(s);
    setMockConfig({ validateStatus: s });
  };
  const applyLatency = () => {
    setMockConfig({ latencyMin, latencyMax });
  };

  const toggleScope = (type: string) => {
    const next = scope.includes(type) ? scope.filter((s) => s !== type) : [...scope, type];
    setScope(next);
    setMockConfig({ scope: next });
    // if session already has scope, update it too
    try {
      if ((window as any).__MOCK_ESEWA__?.state?.scope) {
        (window as any).__MOCK_ESEWA__.state.scope = [...next];
        sessionStorage.setItem('miniAppAuthScope', JSON.stringify(next));
      }
    } catch {}
  };

  const toggleForceError = (type: string) => {
    const next = !forceError[type];
    const updated = { ...mockEsewaConfig.forceError, [type]: next };
    if (!next) delete updated[type];
    setMockConfig({ forceError: updated });
    setForceError({ ...updated });
  };

  const handleReset = () => {
    resetMockSession();
    setLogs([]);
  };

  const handleClearLogs = () => {
    (window as any).__MOCK_ESEWA__?.logs && ((window as any).__MOCK_ESEWA__.logs.length = 0);
    setLogs([]);
  };

  // Quick test helper — fire a request directly via mock bridge
  const fireTest = (type: string) => {
    const w = window as any;
    if (!w.requestFromMiniApp) return;
    const tokenVal = (() => {
      try {
        return sessionStorage.getItem('miniAppAuthToken') ?? mockEsewaConfig.token;
      } catch {
        return mockEsewaConfig.token;
      }
    })();
    const req: any = {
      requestType: type,
      callbackKey: `${type}_CALLBACK`,
      token: tokenVal,
      merchant_identifier: 'IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=',
    };
    if (type === 'VALIDATE_USER') req.data = { esewa_id: esewaId };
    if (type === 'REQUEST_PAYMENT')
      req.data = {
        product_code: 'NP-ES-VIANET',
        amount: parseFloat(amount) || 100,
        properties: { productId: '3299', refId: '400005' },
        channel: 'WEB_USER',
      };
    if (type === 'FILE_DOWNLOAD_ACCESS')
      req.data = {
        fileName: 'Statement-2025.pdf',
        type: 'url',
        content: 'https://example.com/sample.pdf',
      };

    w.requestFromMiniApp(req, (data: any) => {
      console.log(`[MockHostPanel] Test ${type} callback data:`, data);
    });
  };

  // Drag handling
  const onHeaderMouseDown = (e: React.MouseEvent) => {
    if (disableDrag) return;
    setDragging(true);
    const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging, dragOffset]);

  // Styles (inline to keep zero deps)
  const panelStyle: React.CSSProperties = collapsed
    ? {
        position: 'fixed',
        ...(pos ? { left: pos.x, top: pos.y } : { right: 16, bottom: 16 }),
        zIndex: 99999,
        background: '#111827',
        color: '#f9fafb',
        borderRadius: 12,
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
        padding: '10px 14px',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        fontSize: 13,
        cursor: disableDrag ? 'default' : dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        minWidth: 220,
      }
    : {
        position: 'fixed',
        ...(pos ? { left: pos.x, top: pos.y } : { right: 16, bottom: 16 }),
        zIndex: 99999,
        width: 380,
        maxHeight: '86vh',
        overflowY: 'auto',
        background: '#111827',
        color: '#f9fafb',
        borderRadius: 16,
        boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        fontSize: 12.5,
        border: '1px solid rgba(255,255,255,0.08)',
      };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: collapsed ? 0 : '12px 14px 10px',
    cursor: disableDrag ? 'default' : dragging ? 'grabbing' : 'grab',
    borderBottom: collapsed ? 'none' : '1px solid rgba(255,255,255,0.08)',
    position: 'sticky',
    top: 0,
    background: '#111827',
    zIndex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  };

  const sectionStyle: React.CSSProperties = {
    padding: '12px 14px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  };
  const labelStyle: React.CSSProperties = {
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    opacity: 0.7,
    marginBottom: 8,
  };
  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#1f2937',
    color: '#f9fafb',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 8,
    padding: '7px 10px',
    fontSize: 12.5,
    outline: 'none',
  };
  const rowStyle: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center' };
  const btnStyle: React.CSSProperties = {
    background: '#60A5FA',
    color: '#0f172a',
    border: 'none',
    borderRadius: 8,
    padding: '6px 10px',
    fontWeight: 700,
    fontSize: 11,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };
  const btnGhost: React.CSSProperties = {
    background: 'rgba(255,255,255,0.08)',
    color: '#f9fafb',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 8,
    padding: '6px 10px',
    fontWeight: 600,
    fontSize: 11,
    cursor: 'pointer',
  };
  const toggleTrack: React.CSSProperties = {
    width: 34,
    height: 20,
    borderRadius: 999,
    background: '#374151',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background 0.2s',
    flexShrink: 0,
  };
  const toggleTrackOn: React.CSSProperties = { ...toggleTrack, background: '#EF4444' };
  const toggleDot: React.CSSProperties = {
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: 'white',
    position: 'absolute',
    top: 2,
    left: 2,
    transition: 'transform 0.2s',
    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
  };
  const toggleDotOn: React.CSSProperties = { ...toggleDot, transform: 'translateX(14px)' };

  if (collapsed) {
    return (
      <div style={panelStyle} onMouseDown={onHeaderMouseDown}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: hasToken ? '#22c55e' : '#f59e0b',
              boxShadow: hasToken ? '0 0 8px rgba(34,197,94,0.6)' : '0 0 8px rgba(245,158,11,0.6)',
              display: 'inline-block',
            }}
          />
          <span style={{ fontWeight: 700, fontSize: 12 }}>Mock eSewa</span>
          <span style={{ opacity: 0.6, fontSize: 11 }}>{hasToken ? 'token ✓' : 'no token'}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(false);
            }}
            style={{ ...btnGhost, marginLeft: 'auto', padding: '4px 8px' }}
          >
            Expand
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={panelStyle}>
      {/* Header */}
      <div style={headerStyle} onMouseDown={onHeaderMouseDown}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: hasToken ? '#22c55e' : '#f59e0b',
              boxShadow: hasToken ? '0 0 8px rgba(34,197,94,0.6)' : '0 0 8px rgba(245,158,11,0.6)',
            }}
          />
          <div>
            <div style={{ fontWeight: 800, fontSize: 13, lineHeight: 1 }}>Mock eSewa Host</div>
            <div style={{ fontSize: 10, opacity: 0.6 }}>
              {hasToken ? 'Session active — token issued' : 'No session — call INIT_APP'}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={handleReset}
            style={btnGhost}
            title="Reset token/scope — forces INIT_APP again"
          >
            Reset
          </button>
          <button onClick={() => setCollapsed(true)} style={btnGhost}>
            ─
          </button>
        </div>
      </div>

      {/* Token / identity */}
      <div style={sectionStyle}>
        <div style={labelStyle}>Identity & Session</div>

        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>Token (editable)</div>
          <div style={rowStyle}>
            <input
              style={inputStyle}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="mock token"
            />
            <button style={btnStyle} onClick={applyToken}>
              Apply
            </button>
          </div>
          <div style={{ fontSize: 10, opacity: 0.5, marginTop: 4, wordBreak: 'break-all' }}>
            Used for INIT_APP response & token gating. Try editing then Reset → INIT_APP.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>eSewa ID</div>
            <div style={rowStyle}>
              <input
                style={inputStyle}
                value={esewaId}
                onChange={(e) => setEsewaId(e.target.value)}
              />
              <button style={btnGhost} onClick={applyEsewaId}>
                ✓
              </button>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>Amount (NPR)</div>
            <div style={rowStyle}>
              <input
                style={inputStyle}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
              />
              <button style={btnGhost} onClick={applyAmount}>
                ✓
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>Name</div>
            <div style={rowStyle}>
              <input
                style={inputStyle}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <button style={btnGhost} onClick={applyUserName}>
                ✓
              </button>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>Mobile</div>
            <div style={rowStyle}>
              <input
                style={inputStyle}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <button style={btnGhost} onClick={applyMobile}>
                ✓
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>Latitude</div>
            <input style={inputStyle} value={lat} onChange={(e) => setLat(e.target.value)} />
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>Longitude</div>
            <input style={inputStyle} value={lng} onChange={(e) => setLng(e.target.value)} />
          </div>
        </div>
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <button style={btnGhost} onClick={applyLatLng}>
            Apply location
          </button>
          <select
            value={validateStatus}
            onChange={(e) => applyValidateStatus(e.target.value as ValidateStatus)}
            style={{ ...inputStyle, width: 'auto', padding: '6px 8px' }}
          >
            <option value="COMPLETE">COMPLETE</option>
            <option value="PENDING">PENDING</option>
            <option value="FAILED">FAILED</option>
          </select>
          <span style={{ fontSize: 10, opacity: 0.6, alignSelf: 'center' }}>Validate status</span>
        </div>

        <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, opacity: 0.7 }}>Latency</span>
          <input
            type="number"
            value={latencyMin}
            onChange={(e) => setLatencyMin(parseInt(e.target.value) || 0)}
            style={{ ...inputStyle, width: 70, padding: '4px 6px' }}
          />
          <span style={{ opacity: 0.5 }}>—</span>
          <input
            type="number"
            value={latencyMax}
            onChange={(e) => setLatencyMax(parseInt(e.target.value) || 0)}
            style={{ ...inputStyle, width: 70, padding: '4px 6px' }}
          />
          <span style={{ fontSize: 11, opacity: 0.5 }}>ms</span>
          <button style={btnGhost} onClick={applyLatency}>
            Apply
          </button>
        </div>
      </div>

      {/* Scope */}
      <div style={sectionStyle}>
        <div style={labelStyle}>Granted Scope (INIT_APP → scope[])</div>
        <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 8 }}>
          Uncheck to simulate permission denied. Calls to unchecked scopes return{' '}
          <code>{`{ error_message }`}</code>.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {ALL_REQUEST_TYPES.filter((t) => t !== 'INIT_APP' && t !== 'CLOSE_APP').map((t) => (
            <label
              key={t}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                cursor: 'pointer',
                opacity: scope.includes(t) ? 1 : 0.5,
              }}
            >
              <input
                type="checkbox"
                checked={scope.includes(t)}
                onChange={() => toggleScope(t)}
                style={{ accentColor: '#60A5FA' }}
              />
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10 }}>{t}</span>
            </label>
          ))}
        </div>
        <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
          <button
            style={btnGhost}
            onClick={() => {
              const all = ALL_REQUEST_TYPES.filter((t) => t !== 'INIT_APP' && t !== 'CLOSE_APP');
              setScope(all);
              setMockConfig({ scope: all });
            }}
          >
            Allow all
          </button>
          <button
            style={btnGhost}
            onClick={() => {
              setScope([]);
              setMockConfig({ scope: [] });
            }}
          >
            Deny all
          </button>
        </div>
      </div>

      {/* Force error toggles */}
      <div style={sectionStyle}>
        <div style={labelStyle}>Force Error per RequestType</div>
        <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 8 }}>
          Toggle to force <code>{`{ error_message }`}</code> for that type. Green = success, Red =
          forced error.
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            maxHeight: 220,
            overflowY: 'auto',
            paddingRight: 4,
          }}
        >
          {ALL_REQUEST_TYPES.map((t) => {
            const on = !!forceError[t];
            return (
              <div
                key={t}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: on ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${on ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 8,
                  padding: '7px 10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: 10,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {t}
                  </span>
                  <button
                    onClick={() => fireTest(t)}
                    style={{
                      background: 'rgba(96,165,250,0.18)',
                      color: '#93c5fd',
                      border: '1px solid rgba(96,165,250,0.3)',
                      borderRadius: 6,
                      padding: '2px 6px',
                      fontSize: 9,
                      cursor: 'pointer',
                      fontWeight: 700,
                    }}
                    title={`Fire a test ${t} via mock bridge`}
                  >
                    TEST
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{ fontSize: 10, fontWeight: 700, color: on ? '#FCA5A5' : '#86EFAC' }}
                  >
                    {on ? 'ERROR' : 'SUCCESS'}
                  </span>
                  <div
                    role="switch"
                    aria-checked={on}
                    onClick={() => toggleForceError(t)}
                    style={on ? toggleTrackOn : toggleTrack}
                    title={on ? 'Click to force success' : 'Click to force error'}
                  >
                    <div style={on ? toggleDotOn : toggleDot} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Logs */}
      <div style={sectionStyle}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <div style={{ ...labelStyle, marginBottom: 0 }}>Recent calls ({logs.length})</div>
          <button style={btnGhost} onClick={handleClearLogs}>
            Clear
          </button>
        </div>
        {logs.length === 0 ? (
          <div style={{ fontSize: 11, opacity: 0.5, fontStyle: 'italic' }}>
            No calls yet — try INIT_APP or TEST buttons above.
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              maxHeight: 200,
              overflowY: 'auto',
            }}
          >
            {logs.slice(0, 20).map((l) => (
              <div
                key={l.id}
                style={{
                  background: l.isError ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)',
                  border: `1px solid ${l.isError ? 'rgba(239,68,68,0.18)' : 'rgba(34,197,94,0.18)'}`,
                  borderRadius: 8,
                  padding: '6px 8px',
                  fontSize: 10,
                  fontFamily: 'ui-monospace, monospace',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontWeight: 800 }}>{l.requestType}</span>
                  <span style={{ opacity: 0.6 }}>{l.latency}ms</span>
                </div>
                <div
                  style={{
                    opacity: 0.7,
                    marginTop: 2,
                    wordBreak: 'break-all',
                    whiteSpace: 'pre-wrap',
                    maxHeight: 80,
                    overflow: 'hidden',
                  }}
                >
                  {typeof l.response === 'string'
                    ? l.response.slice(0, 180)
                    : JSON.stringify(l.response).slice(0, 180)}
                  {(typeof l.response === 'string'
                    ? l.response.length
                    : JSON.stringify(l.response).length) > 180
                    ? '…'
                    : ''}
                </div>
                <div style={{ opacity: 0.5, fontSize: 9, marginTop: 2 }}>
                  {new Date(l.ts).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '10px 14px', opacity: 0.5, fontSize: 10, lineHeight: 1.5 }}>
        <div>
          Only active in dev. Never overrides real host — checks `window.requestFromMiniApp`
          existence.
        </div>
        <div>
          Disable: <code>?mockEsewa=0</code> or{' '}
          <code>localStorage.setItem('mockEsewaDisabled','1')</code>
        </div>
      </div>
    </div>
  );
};

export default MockHostPanel;
