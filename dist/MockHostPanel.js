import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { useEffect, useState, useCallback } from 'react';
import { REQUEST_TYPE_ENUM, mockEsewaConfig, resetMockSession, setMockConfig, getMockLogs } from './mockEsewaHost';
const ALL_REQUEST_TYPES = Object.values(REQUEST_TYPE_ENUM);
export const MockHostPanel = ({ defaultCollapsed = false, disableDrag = false }) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    const [forceError, setForceError] = useState({});
    const [token, setToken] = useState(mockEsewaConfig.token);
    const [esewaId, setEsewaId] = useState(mockEsewaConfig.esewaId);
    const [amount, setAmount] = useState(String(mockEsewaConfig.amount));
    const [userName, setUserName] = useState(mockEsewaConfig.userName);
    const [mobile, setMobile] = useState(mockEsewaConfig.mobile);
    const [lat, setLat] = useState(String(mockEsewaConfig.latitude));
    const [lng, setLng] = useState(String(mockEsewaConfig.longitude));
    const [validateStatus, setValidateStatus] = useState(mockEsewaConfig.validateStatus);
    const [scope, setScope] = useState([...mockEsewaConfig.scope]);
    const [logs, setLogs] = useState(getMockLogs());
    const [pos, setPos] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [hasToken, setHasToken] = useState(false);
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
        }
        catch {
            setHasToken(!!window.__MOCK_ESEWA__?.state?.token);
        }
        setLogs(getMockLogs());
    }, []);
    useEffect(() => {
        syncFromConfig();
        const onChange = () => syncFromConfig();
        const onLog = (e) => {
            const detail = e.detail;
            setLogs((prev) => [detail, ...prev].slice(0, 50));
        };
        window.addEventListener('mockEsewaConfigChange', onChange);
        window.addEventListener('mockEsewaLogUpdate', onLog);
        return () => {
            window.removeEventListener('mockEsewaConfigChange', onChange);
            window.removeEventListener('mockEsewaLogUpdate', onLog);
        };
    }, [syncFromConfig]);
    // Apply handlers
    const applyToken = () => {
        setMockConfig({ token });
        // also update session state if already issued
        try {
            if (window.__MOCK_ESEWA__?.state?.token) {
                window.__MOCK_ESEWA__.state.token = token;
                sessionStorage.setItem('miniAppAuthToken', token);
            }
        }
        catch { }
    };
    const applyEsewaId = () => setMockConfig({ esewaId });
    const applyAmount = () => {
        const v = parseFloat(amount);
        if (!isNaN(v))
            setMockConfig({ amount: v });
    };
    const applyUserName = () => setMockConfig({ userName });
    const applyMobile = () => setMockConfig({ mobile });
    const applyLatLng = () => {
        const la = parseFloat(lat);
        const ln = parseFloat(lng);
        if (!isNaN(la) && !isNaN(ln))
            setMockConfig({ latitude: la, longitude: ln });
    };
    const applyValidateStatus = (s) => {
        setValidateStatus(s);
        setMockConfig({ validateStatus: s });
    };
    const applyLatency = () => {
        setMockConfig({ latencyMin, latencyMax });
    };
    const toggleScope = (type) => {
        const next = scope.includes(type) ? scope.filter((s) => s !== type) : [...scope, type];
        setScope(next);
        setMockConfig({ scope: next });
        // if session already has scope, update it too
        try {
            if (window.__MOCK_ESEWA__?.state?.scope) {
                window.__MOCK_ESEWA__.state.scope = [...next];
                sessionStorage.setItem('miniAppAuthScope', JSON.stringify(next));
            }
        }
        catch { }
    };
    const toggleForceError = (type) => {
        const next = !forceError[type];
        const updated = { ...mockEsewaConfig.forceError, [type]: next };
        if (!next)
            delete updated[type];
        setMockConfig({ forceError: updated });
        setForceError({ ...updated });
    };
    const handleReset = () => {
        resetMockSession();
        setLogs([]);
    };
    const handleClearLogs = () => {
        window.__MOCK_ESEWA__?.logs && (window.__MOCK_ESEWA__.logs.length = 0);
        setLogs([]);
    };
    // Quick test helper — fire a request directly via mock bridge
    const fireTest = (type) => {
        const w = window;
        if (!w.requestFromMiniApp)
            return;
        const tokenVal = (() => {
            try {
                return sessionStorage.getItem('miniAppAuthToken') ?? mockEsewaConfig.token;
            }
            catch {
                return mockEsewaConfig.token;
            }
        })();
        const req = {
            requestType: type,
            callbackKey: `${type}_CALLBACK`,
            token: tokenVal,
            merchant_identifier: 'IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=',
        };
        if (type === 'VALIDATE_USER')
            req.data = { esewa_id: esewaId };
        if (type === 'REQUEST_PAYMENT')
            req.data = {
                product_code: 'NP-ES-VIANET',
                amount: parseFloat(amount) || 100,
                properties: { productId: '3299', refId: '400005' },
                channel: 'WEB_USER',
            };
        if (type === 'FILE_DOWNLOAD_ACCESS')
            req.data = { fileName: 'Statement-2025.pdf', type: 'url', content: 'https://example.com/sample.pdf' };
        w.requestFromMiniApp(req, (data) => {
            console.log(`[MockHostPanel] Test ${type} callback data:`, data);
        });
    };
    // Drag handling
    const onHeaderMouseDown = (e) => {
        if (disableDrag)
            return;
        setDragging(true);
        const rect = e.currentTarget.parentElement.getBoundingClientRect();
        setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    useEffect(() => {
        if (!dragging)
            return;
        const onMove = (e) => {
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
    const panelStyle = collapsed
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
    const headerStyle = {
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
    const sectionStyle = {
        padding: '12px 14px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    };
    const labelStyle = { fontWeight: 600, fontSize: 11, letterSpacing: 0.6, textTransform: 'uppercase', opacity: 0.7, marginBottom: 8 };
    const inputStyle = {
        width: '100%',
        background: '#1f2937',
        color: '#f9fafb',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 8,
        padding: '7px 10px',
        fontSize: 12.5,
        outline: 'none',
    };
    const rowStyle = { display: 'flex', gap: 8, alignItems: 'center' };
    const btnStyle = {
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
    const btnGhost = {
        background: 'rgba(255,255,255,0.08)',
        color: '#f9fafb',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 8,
        padding: '6px 10px',
        fontWeight: 600,
        fontSize: 11,
        cursor: 'pointer',
    };
    const toggleTrack = {
        width: 34,
        height: 20,
        borderRadius: 999,
        background: '#374151',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.2s',
        flexShrink: 0,
    };
    const toggleTrackOn = { ...toggleTrack, background: '#EF4444' };
    const toggleDot = {
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
    const toggleDotOn = { ...toggleDot, transform: 'translateX(14px)' };
    if (collapsed) {
        return (_jsx("div", { style: panelStyle, onMouseDown: onHeaderMouseDown, children: _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [_jsx("span", { style: {
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: hasToken ? '#22c55e' : '#f59e0b',
                            boxShadow: hasToken ? '0 0 8px rgba(34,197,94,0.6)' : '0 0 8px rgba(245,158,11,0.6)',
                            display: 'inline-block',
                        } }), _jsx("span", { style: { fontWeight: 700, fontSize: 12 }, children: "Mock eSewa" }), _jsx("span", { style: { opacity: 0.6, fontSize: 11 }, children: hasToken ? 'token ✓' : 'no token' }), _jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            setCollapsed(false);
                        }, style: { ...btnGhost, marginLeft: 'auto', padding: '4px 8px' }, children: "Expand" })] }) }));
    }
    return (_jsxs("div", { style: panelStyle, children: [_jsxs("div", { style: headerStyle, onMouseDown: onHeaderMouseDown, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10 }, children: [_jsx("span", { style: {
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: hasToken ? '#22c55e' : '#f59e0b',
                                    boxShadow: hasToken ? '0 0 8px rgba(34,197,94,0.6)' : '0 0 8px rgba(245,158,11,0.6)',
                                } }), _jsxs("div", { children: [_jsx("div", { style: { fontWeight: 800, fontSize: 13, lineHeight: 1 }, children: "Mock eSewa Host" }), _jsx("div", { style: { fontSize: 10, opacity: 0.6 }, children: hasToken ? 'Session active — token issued' : 'No session — call INIT_APP' })] })] }), _jsxs("div", { style: { display: 'flex', gap: 6 }, children: [_jsx("button", { onClick: handleReset, style: btnGhost, title: "Reset token/scope \u2014 forces INIT_APP again", children: "Reset" }), _jsx("button", { onClick: () => setCollapsed(true), style: btnGhost, children: "\u2500" })] })] }), _jsxs("div", { style: sectionStyle, children: [_jsx("div", { style: labelStyle, children: "Identity & Session" }), _jsxs("div", { style: { marginBottom: 10 }, children: [_jsx("div", { style: { fontSize: 11, opacity: 0.7, marginBottom: 4 }, children: "Token (editable)" }), _jsxs("div", { style: rowStyle, children: [_jsx("input", { style: inputStyle, value: token, onChange: (e) => setToken(e.target.value), placeholder: "mock token" }), _jsx("button", { style: btnStyle, onClick: applyToken, children: "Apply" })] }), _jsx("div", { style: { fontSize: 10, opacity: 0.5, marginTop: 4, wordBreak: 'break-all' }, children: "Used for INIT_APP response & token gating. Try editing then Reset \u2192 INIT_APP." })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontSize: 11, opacity: 0.7, marginBottom: 4 }, children: "eSewa ID" }), _jsxs("div", { style: rowStyle, children: [_jsx("input", { style: inputStyle, value: esewaId, onChange: (e) => setEsewaId(e.target.value) }), _jsx("button", { style: btnGhost, onClick: applyEsewaId, children: "\u2713" })] })] }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 11, opacity: 0.7, marginBottom: 4 }, children: "Amount (NPR)" }), _jsxs("div", { style: rowStyle, children: [_jsx("input", { style: inputStyle, value: amount, onChange: (e) => setAmount(e.target.value), type: "number" }), _jsx("button", { style: btnGhost, onClick: applyAmount, children: "\u2713" })] })] })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 8 }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontSize: 11, opacity: 0.7, marginBottom: 4 }, children: "Name" }), _jsxs("div", { style: rowStyle, children: [_jsx("input", { style: inputStyle, value: userName, onChange: (e) => setUserName(e.target.value) }), _jsx("button", { style: btnGhost, onClick: applyUserName, children: "\u2713" })] })] }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 11, opacity: 0.7, marginBottom: 4 }, children: "Mobile" }), _jsxs("div", { style: rowStyle, children: [_jsx("input", { style: inputStyle, value: mobile, onChange: (e) => setMobile(e.target.value) }), _jsx("button", { style: btnGhost, onClick: applyMobile, children: "\u2713" })] })] })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontSize: 11, opacity: 0.7, marginBottom: 4 }, children: "Latitude" }), _jsx("input", { style: inputStyle, value: lat, onChange: (e) => setLat(e.target.value) })] }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 11, opacity: 0.7, marginBottom: 4 }, children: "Longitude" }), _jsx("input", { style: inputStyle, value: lng, onChange: (e) => setLng(e.target.value) })] })] }), _jsxs("div", { style: { marginTop: 8, display: 'flex', gap: 8 }, children: [_jsx("button", { style: btnGhost, onClick: applyLatLng, children: "Apply location" }), _jsxs("select", { value: validateStatus, onChange: (e) => applyValidateStatus(e.target.value), style: { ...inputStyle, width: 'auto', padding: '6px 8px' }, children: [_jsx("option", { value: "COMPLETE", children: "COMPLETE" }), _jsx("option", { value: "PENDING", children: "PENDING" }), _jsx("option", { value: "FAILED", children: "FAILED" })] }), _jsx("span", { style: { fontSize: 10, opacity: 0.6, alignSelf: 'center' }, children: "Validate status" })] }), _jsxs("div", { style: { marginTop: 10, display: 'flex', gap: 8, alignItems: 'center' }, children: [_jsx("span", { style: { fontSize: 11, opacity: 0.7 }, children: "Latency" }), _jsx("input", { type: "number", value: latencyMin, onChange: (e) => setLatencyMin(parseInt(e.target.value) || 0), style: { ...inputStyle, width: 70, padding: '4px 6px' } }), _jsx("span", { style: { opacity: 0.5 }, children: "\u2014" }), _jsx("input", { type: "number", value: latencyMax, onChange: (e) => setLatencyMax(parseInt(e.target.value) || 0), style: { ...inputStyle, width: 70, padding: '4px 6px' } }), _jsx("span", { style: { fontSize: 11, opacity: 0.5 }, children: "ms" }), _jsx("button", { style: btnGhost, onClick: applyLatency, children: "Apply" })] })] }), _jsxs("div", { style: sectionStyle, children: [_jsx("div", { style: labelStyle, children: "Granted Scope (INIT_APP \u2192 scope[])" }), _jsxs("div", { style: { fontSize: 10, opacity: 0.6, marginBottom: 8 }, children: ["Uncheck to simulate permission denied. Calls to unchecked scopes return ", _jsx("code", { children: `{ error_message }` }), "."] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }, children: ALL_REQUEST_TYPES.filter((t) => t !== 'INIT_APP' && t !== 'CLOSE_APP').map((t) => (_jsxs("label", { style: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, cursor: 'pointer', opacity: scope.includes(t) ? 1 : 0.5 }, children: [_jsx("input", { type: "checkbox", checked: scope.includes(t), onChange: () => toggleScope(t), style: { accentColor: '#60A5FA' } }), _jsx("span", { style: { fontFamily: 'ui-monospace, monospace', fontSize: 10 }, children: t })] }, t))) }), _jsxs("div", { style: { marginTop: 8, display: 'flex', gap: 6 }, children: [_jsx("button", { style: btnGhost, onClick: () => {
                                    const all = ALL_REQUEST_TYPES.filter((t) => t !== 'INIT_APP' && t !== 'CLOSE_APP');
                                    setScope(all);
                                    setMockConfig({ scope: all });
                                }, children: "Allow all" }), _jsx("button", { style: btnGhost, onClick: () => {
                                    setScope([]);
                                    setMockConfig({ scope: [] });
                                }, children: "Deny all" })] })] }), _jsxs("div", { style: sectionStyle, children: [_jsx("div", { style: labelStyle, children: "Force Error per RequestType" }), _jsxs("div", { style: { fontSize: 10, opacity: 0.6, marginBottom: 8 }, children: ["Toggle to force ", _jsx("code", { children: `{ error_message }` }), " for that type. Green = success, Red = forced error."] }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 220, overflowY: 'auto', paddingRight: 4 }, children: ALL_REQUEST_TYPES.map((t) => {
                            const on = !!forceError[t];
                            return (_jsxs("div", { style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    background: on ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.04)',
                                    border: `1px solid ${on ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.06)'}`,
                                    borderRadius: 8,
                                    padding: '7px 10px',
                                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }, children: [_jsx("span", { style: { fontFamily: 'ui-monospace, monospace', fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: t }), _jsx("button", { onClick: () => fireTest(t), style: {
                                                    background: 'rgba(96,165,250,0.18)',
                                                    color: '#93c5fd',
                                                    border: '1px solid rgba(96,165,250,0.3)',
                                                    borderRadius: 6,
                                                    padding: '2px 6px',
                                                    fontSize: 9,
                                                    cursor: 'pointer',
                                                    fontWeight: 700,
                                                }, title: `Fire a test ${t} via mock bridge`, children: "TEST" })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [_jsx("span", { style: { fontSize: 10, fontWeight: 700, color: on ? '#FCA5A5' : '#86EFAC' }, children: on ? 'ERROR' : 'SUCCESS' }), _jsx("div", { role: "switch", "aria-checked": on, onClick: () => toggleForceError(t), style: on ? toggleTrackOn : toggleTrack, title: on ? 'Click to force success' : 'Click to force error', children: _jsx("div", { style: on ? toggleDotOn : toggleDot }) })] })] }, t));
                        }) })] }), _jsxs("div", { style: sectionStyle, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }, children: [_jsxs("div", { style: { ...labelStyle, marginBottom: 0 }, children: ["Recent calls (", logs.length, ")"] }), _jsx("button", { style: btnGhost, onClick: handleClearLogs, children: "Clear" })] }), logs.length === 0 ? (_jsx("div", { style: { fontSize: 11, opacity: 0.5, fontStyle: 'italic' }, children: "No calls yet \u2014 try INIT_APP or TEST buttons above." })) : (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 200, overflowY: 'auto' }, children: logs.slice(0, 20).map((l) => (_jsxs("div", { style: {
                                background: l.isError ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)',
                                border: `1px solid ${l.isError ? 'rgba(239,68,68,0.18)' : 'rgba(34,197,94,0.18)'}`,
                                borderRadius: 8,
                                padding: '6px 8px',
                                fontSize: 10,
                                fontFamily: 'ui-monospace, monospace',
                            }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', gap: 8 }, children: [_jsx("span", { style: { fontWeight: 800 }, children: l.requestType }), _jsxs("span", { style: { opacity: 0.6 }, children: [l.latency, "ms"] })] }), _jsxs("div", { style: { opacity: 0.7, marginTop: 2, wordBreak: 'break-all', whiteSpace: 'pre-wrap', maxHeight: 80, overflow: 'hidden' }, children: [typeof l.response === 'string' ? l.response.slice(0, 180) : JSON.stringify(l.response).slice(0, 180), (typeof l.response === 'string' ? l.response.length : JSON.stringify(l.response).length) > 180 ? '…' : ''] }), _jsx("div", { style: { opacity: 0.5, fontSize: 9, marginTop: 2 }, children: new Date(l.ts).toLocaleTimeString() })] }, l.id))) }))] }), _jsxs("div", { style: { padding: '10px 14px', opacity: 0.5, fontSize: 10, lineHeight: 1.5 }, children: [_jsx("div", { children: "Only active in dev. Never overrides real host \u2014 checks `window.requestFromMiniApp` existence." }), _jsxs("div", { children: ["Disable: ", _jsx("code", { children: "?mockEsewa=0" }), " or ", _jsx("code", { children: "localStorage.setItem('mockEsewaDisabled','1')" })] })] })] }));
};
export default MockHostPanel;
