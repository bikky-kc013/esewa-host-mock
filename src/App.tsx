import { useEffect, useState } from 'react';
import { REQUEST_TYPE_ENUM, CALLBACK_TYPE_ENUM } from '../mockEsewaHost';
import { MockHostPanel } from '../MockHostPanel';

declare global {
  function requestFromMiniApp(requestData: any, callback?: (data: any) => void): void;
}

export default function App() {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('miniAppAuthToken'));
  const [log, setLog] = useState<string>(
    'Click INIT_APP first. Open browser console for [Mock eSewa Host] logs.',
  );
  const [dataView, setDataView] = useState<any>(null);

  useEffect(() => {
    // Auto INIT on mount like real Mini App does
    const initApp = () => {
      requestFromMiniApp(
        {
          merchant_identifier: 'IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=',
          requestType: REQUEST_TYPE_ENUM.INIT_APP,
          callbackKey: CALLBACK_TYPE_ENUM.INIT_APP_CALLBACK,
        },
        (data) => {
          try {
            const res = JSON.parse(data);
            if (res.error_message) {
              setLog(`INIT_APP error: ${res.error_message}`);
              return;
            }
            sessionStorage.setItem('miniAppAuthToken', res.token);
            sessionStorage.setItem('miniAppAuthScope', JSON.stringify(res.scope));
            setToken(res.token);
            setDataView(res);
            setLog(
              `INIT_APP success: token ${res.token.slice(0, 16)}... scope [${res.scope.join(', ')}]`,
            );
          } catch (e) {
            setLog(`INIT_APP parse error: ${e}`);
          }
        },
      );
    };
    initApp();
  }, []);

  const call = (requestType: string, extra: any = {}, isRaw = false) => {
    const t = sessionStorage.getItem('miniAppAuthToken');
    setLog(`Calling ${requestType}... (token: ${t ? t.slice(0, 8) + '...' : 'none'})`);
    requestFromMiniApp(
      {
        requestType,
        token: t,
        callbackKey: `${requestType}_CALLBACK`,
        merchant_identifier: 'IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=',
        ...extra,
      },
      (data) => {
        if (isRaw) {
          if ((data as any)?.error_message) {
            setLog(`${requestType} error: ${(data as any).error_message}`);
            setDataView(data);
          } else {
            const preview =
              typeof data === 'string'
                ? `${data.slice(0, 80)}... (${data.length} chars)`
                : JSON.stringify(data, null, 2);
            setLog(`${requestType} success (raw): ${preview.slice(0, 120)}`);
            setDataView(data);
          }
        } else {
          try {
            const res = JSON.parse(data);
            if (res.error_message) {
              setLog(`${requestType} error: ${res.error_message}`);
            } else {
              setLog(`${requestType} success`);
            }
            setDataView(res);
          } catch (e) {
            setLog(`${requestType} parse error: ${e} raw=${String(data).slice(0, 100)}`);
            setDataView(data);
          }
        }
      },
    );
  };

  const btn: React.CSSProperties = {
    padding: '8px 14px',
    borderRadius: 8,
    border: '1px solid #ddd',
    background: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
  };
  const btnPrimary: React.CSSProperties = {
    ...btn,
    background: '#60a5fa',
    color: '#0f172a',
    borderColor: '#60a5fa',
  };

  return (
    <div
      style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 860, margin: '0 auto', padding: 24 }}
    >
      <h1 style={{ margin: 0 }}>eSewa Mini App — Mock Host Playground</h1>
      <p style={{ opacity: 0.7, marginTop: 6 }}>
        Mock from <code>mockEsewaHost.ts</code> is active in DEV only. Check console for{' '}
        <code>[Mock eSewa Host]</code> logs (300-800ms latency).
      </p>

      <div
        style={{
          background: '#111827',
          color: '#f9fafb',
          padding: 12,
          borderRadius: 10,
          fontSize: 13,
          fontFamily: 'monospace',
          wordBreak: 'break-all',
        }}
      >
        token: {token ? `${token.slice(0, 24)}...` : 'none — call INIT_APP'} | scope:{' '}
        {(sessionStorage.getItem('miniAppAuthScope') || '[]').slice(0, 80)}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
        <button
          style={btnPrimary}
          onClick={() => call(REQUEST_TYPE_ENUM.INIT_APP, { merchant_identifier: 'IAAAAAB...' })}
        >
          INIT_APP
        </button>
        <button style={btn} onClick={() => call(REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS)}>
          USER_DETAIL
        </button>
        <button style={btn} onClick={() => call(REQUEST_TYPE_ENUM.LOCATION_ACCESS)}>
          LOCATION
        </button>
        <button style={btn} onClick={() => call(REQUEST_TYPE_ENUM.MEDIA_ACCESS, {}, true)}>
          MEDIA (raw)
        </button>
        <button style={btn} onClick={() => call(REQUEST_TYPE_ENUM.VALIDATE_TRANSACTION)}>
          VALIDATE_TXN
        </button>
        <button
          style={btn}
          onClick={() =>
            call(REQUEST_TYPE_ENUM.REQUEST_PAYMENT, {
              data: {
                product_code: 'NP-ES-VIANET',
                amount: 28.48,
                properties: { productId: '3299', refId: '400005' },
                channel: 'WEB_USER',
              },
            })
          }
        >
          REQUEST_PAYMENT
        </button>
        <button style={btn} onClick={() => call(REQUEST_TYPE_ENUM.GET_PRODUCT)}>
          GET_PRODUCT
        </button>
        <button
          style={btn}
          onClick={() => call(REQUEST_TYPE_ENUM.VALIDATE_USER, { data: { esewa_id: 9847474747 } })}
        >
          VALIDATE_USER
        </button>
        <button style={btn} onClick={() => call(REQUEST_TYPE_ENUM.MERCHANT_DETAIL)}>
          MERCHANT_DETAIL
        </button>
        <button style={btn} onClick={() => call(REQUEST_TYPE_ENUM.QR_SCANNER_ACCESS)}>
          QR_SCANNER
        </button>
        <button
          style={btn}
          onClick={() =>
            call(
              REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS,
              {
                data: {
                  fileName: 'Statement-2025.pdf',
                  type: 'url',
                  content: 'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf',
                },
              },
              true,
            )
          }
        >
          FILE_DOWNLOAD (raw)
        </button>
        <button
          style={{ ...btn, background: '#fee2e2' }}
          onClick={() => call(REQUEST_TYPE_ENUM.CLOSE_APP, {}, true)}
        >
          CLOSE_APP
        </button>
      </div>

      <div
        style={{
          marginTop: 16,
          padding: 12,
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 10,
          minHeight: 60,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 12,
            opacity: 0.6,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          Last callback
        </div>
        <div style={{ fontSize: 13, marginTop: 6, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {log}
        </div>
        {dataView && (
          <pre
            style={{
              marginTop: 10,
              background: '#fff',
              padding: 10,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              overflow: 'auto',
              maxHeight: 300,
              fontSize: 12,
            }}
          >
            {typeof dataView === 'string'
              ? dataView.slice(0, 2000)
              : JSON.stringify(dataView, null, 2)}
          </pre>
        )}
      </div>

      <div style={{ marginTop: 16, fontSize: 12, opacity: 0.6, lineHeight: 1.6 }}>
        <div>
          • Most callbacks return JSON string → `JSON.parse(data)`. Exceptions: `MEDIA_ACCESS`
          (base64 string), `FILE_DOWNLOAD_ACCESS`/`CLOSE_APP` (raw object) — see
          README-mock-host.md.
        </div>
        <div>
          • Token gating: before INIT_APP calls fail with{' '}
          <code>{"{ error_message: 'Token not found...' }"}</code>. Scope gating via panel.
        </div>
        <div>
          • Disable mock: <code>?mockEsewa=0</code> or{' '}
          <code>localStorage.setItem('mockEsewaDisabled','1')</code> then reload.
        </div>
      </div>

      {/* Floating dev panel - only in DEV */}
      {import.meta.env.DEV && <MockHostPanel />}
    </div>
  );
}
