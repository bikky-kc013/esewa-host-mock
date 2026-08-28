/**
 * SampleMiniApp.tsx — demonstrates real Mini App inside Host
 * Now accepts merchantIdentifier/vendorIdentifier from onboarding record (replaces static env).
 * Falls back to legacy hardcoded for backwards compat if props not provided (e.g. direct dev).
 */

import React, { useEffect, useState } from 'react';
import { ESewaAppBar, useESewaDataProvider, ESewaButton, ESewaCard } from 'esewa-ui-library';
import { requestFromMiniApp, requestMiniApp } from 'esewa-ui-library';

type Props = {
  merchantIdentifier?: string;
  vendorIdentifier?: string;
};

function MiniAppInner({ merchantIdentifier, vendorIdentifier }: Props) {
  const { data, updateData } = useESewaDataProvider();
  const [titleInput, setTitleInput] = useState('Mini App Demo');
  const [lastEnvelope, setLastEnvelope] = useState<any>(null);
  const [log, setLog] = useState<string>('Tap a button to fire a bridge request. Then respond from Host panel.');

  const mid = merchantIdentifier || 'IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=';
  const vid = vendorIdentifier || 'VENDOR-DEFAULT';

  useEffect(() => {
    updateData({ title: titleInput });
  }, []); // eslint-disable-line

  const fire = (requestType: string, callbackKey: string, extra: any = {}) => {
    const payload: any = {
      requestType,
      callbackKey,
      merchant_identifier: mid,
      vendorIdentifier: vid,
      ...extra,
    };
    const token = (() => {
      try { return sessionStorage.getItem('token') || sessionStorage.getItem('miniAppAuthToken'); } catch { return null; }
    })();
    if (token) payload.token = token;

    setLog(`→ ${requestType} (mid=${mid.slice(0, 12)}… awaiting Host panel via ${callbackKey})`);
    requestFromMiniApp(payload, (envelope: any) => {
      setLastEnvelope(envelope);
      if (envelope?.responseType === 'error') {
        setLog(`← ${requestType} error: ${JSON.stringify(envelope.response).slice(0, 200)}`);
      } else {
        setLog(`← ${requestType} success: ${JSON.stringify(envelope?.response).slice(0, 200)}`);
        if (requestType === 'INIT_APP' && envelope?.response?.token) {
          try {
            sessionStorage.setItem('token', envelope.response.token);
            sessionStorage.setItem('miniAppAuthToken', envelope.response.token);
          } catch {}
        }
      }
    });
  };

  const fireNoCallback = (requestType: string, extra: any = {}) => {
    const payload: any = {
      requestType,
      merchant_identifier: mid,
      vendorIdentifier: vid,
      ...extra,
    };
    setLog(`→ ${requestType} (no callback, one-way)`);
    requestMiniApp(payload);
    setLastEnvelope({ info: 'requestMiniApp sent, no callback expected', requestType });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <ESewaAppBar
        title={data.title}
        titleposition="center"
        onBackIconClick={() => setLog('Back icon clicked')}
        onActionIconClick={() => setLog('Action icon clicked')}
        actionIcon="icon-settings"
      />
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <ESewaCard className="border-radius-8">
          <div style={{ fontSize: 11, color: '#5E646B' }}>Identifiers from onboarding record (replaces static env)</div>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, background: '#F5FAFF', border: '1px solid #EEF0F2', borderRadius: 8, padding: 8, marginTop: 6 }}>
            merchant_identifier: {mid}<br />
            vendorIdentifier: {vid}
          </div>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#1C252E', marginTop: 10 }}>Title sync (useESewaDataProvider)</div>
          <div style={{ fontSize: 11, color: '#5E646B', marginTop: 4 }}>
            Host logs this via data.title — ESewaAppBar stays inside Mini App DOM (spec §4 default).
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <input
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="title"
              style={{
                flex: 1,
                border: '1px solid #EEF0F2',
                borderRadius: 8,
                padding: '8px 10px',
                fontSize: 13,
              }}
            />
            <ESewaButton size="small" onClick={() => updateData({ title: titleInput })}>
              Update
            </ESewaButton>
          </div>
          <div style={{ fontSize: 11, marginTop: 6, color: '#576C80' }}>
            Current data.title: <b>{String(data.title || '—')}</b>
          </div>
        </ESewaCard>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <ESewaButton size="small" onClick={() => fire('INIT_APP', 'INIT_APP_CALLBACK')}>INIT_APP</ESewaButton>
          <ESewaButton size="small" variant="secondary" onClick={() => fire('USER_DETAIL_ACCESS', 'USER_DETAIL_ACCESS_CALLBACK')}>USER_DETAIL</ESewaButton>
          <ESewaButton size="small" variant="secondary" onClick={() => fire('LOCATION_ACCESS', 'LOCATION_ACCESS_CALLBACK')}>LOCATION</ESewaButton>
          <ESewaButton size="small" variant="secondary" onClick={() => fire('MEDIA_ACCESS', 'MEDIA_ACCESS_CALLBACK')}>MEDIA</ESewaButton>
          <ESewaButton size="small" variant="secondary" onClick={() => fire('VALIDATE_TRANSACTION', 'VALIDATE_TRANSACTION_CALLBACK')}>VALIDATE_TXN</ESewaButton>
          <ESewaButton size="small" onClick={() => fire('REQUEST_PAYMENT', 'REQUEST_PAYMENT_CALLBACK', { data: { product_code: 'NP-ES-VIANET', amount: 28.48, properties: { productId: '3299' } } })}>PAY</ESewaButton>
          <ESewaButton size="small" variant="secondary" onClick={() => fire('GET_PRODUCT', 'GET_PRODUCT_CALLBACK')}>GET_PRODUCT</ESewaButton>
          <ESewaButton size="small" variant="secondary" onClick={() => fire('VALIDATE_USER', 'VALIDATE_USER_CALLBACK', { data: { esewa_id: '9847474747' } })}>VALIDATE_USER</ESewaButton>
          <ESewaButton size="small" variant="secondary" onClick={() => fire('MERCHANT_DETAIL', 'MERCHANT_DETAIL_CALLBACK')}>MERCHANT</ESewaButton>
          <ESewaButton size="small" variant="secondary" onClick={() => fire('QR_SCANNER_ACCESS', 'QR_SCANNER_ACCESS_CALLBACK')}>QR</ESewaButton>
          <ESewaButton size="small" variant="secondary" onClick={() => fire('FILE_DOWNLOAD_ACCESS', 'FILE_DOWNLOAD_ACCESS_CALLBACK', { data: { fileName: 'Statement-2025.pdf', type: 'url', content: 'https://example.com/sample.pdf' } })}>FILE_DL</ESewaButton>
          <ESewaButton size="small" variant="secondary" onClick={() => fire('PAYMENT_REQUEST', 'PAYMENT_REQUEST_CALLBACK')}>PAYMENT_REQUEST</ESewaButton>
          <ESewaButton size="small" variant="secondary" onClick={() => fire('CONNECTION_REQUEST', 'CONNECTION_REQUEST_CALLBACK')}>CONNECTION</ESewaButton>
          <ESewaButton size="small" variant="secondary" onClick={() => fireNoCallback('CLOSE_APP')}>CLOSE_APP (no cb)</ESewaButton>
        </div>

        <ESewaCard className="border-radius-8">
          <div style={{ fontSize: 11, fontWeight: 700, color: '#5E646B', letterSpacing: 0.5, textTransform: 'uppercase' }}>Last bridge callback</div>
          <div style={{ fontSize: 12, marginTop: 6, wordBreak: 'break-all', whiteSpace: 'pre-wrap', color: '#1C252E' }}>{log}</div>
          {lastEnvelope && (
            <pre style={{ marginTop: 8, background: '#F5FAFF', padding: 8, borderRadius: 8, border: '1px solid #EEF0F2', overflow: 'auto', maxHeight: 200, fontSize: 11 }}>
              {JSON.stringify(lastEnvelope, null, 2)}
            </pre>
          )}
        </ESewaCard>

        <div style={{ fontSize: 10, color: '#5E646B', lineHeight: 1.5 }}>
          Envelope expected: <code>{'{'}requestType, responseType: 'success'|'error', response: any{'}'}</code>. Author response in Host panel then fire <code>*_CALLBACK</code>.
        </div>
      </div>
    </div>
  );
}

export default function SampleMiniApp(props: Props) {
  return <MiniAppInner {...props} />;
}
