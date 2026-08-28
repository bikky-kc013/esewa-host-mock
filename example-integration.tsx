/**
 * example-integration.tsx
 * -----------------------
 * How to wire mockEsewaHost into a Vite + React Mini App.
 */

import React, { useEffect, useState } from 'react';

// ---------------------------------------------------------------------
// 1) main.tsx — install mock BEFORE your app renders (Vite)
// ---------------------------------------------------------------------

// // src/main.tsx
// if (import.meta.env.DEV) {
//   // side-effect import — installs window.requestFromMiniApp if missing
//   await import('./mocks/mockEsewaHost');
//   // optional: pre-configure for your test session
//   // const { setMockConfig } = await import('./mocks/mockEsewaHost');
//   // setMockConfig({ esewaId: '9841112222', amount: 5000 });
// }
//
// import { createRoot } from 'react-dom/client';
// import App from './App';
// createRoot(document.getElementById('root')!).render(<App />);

// For CRA / webpack:
// if (process.env.NODE_ENV !== 'production') {
//   require('./mocks/mockEsewaHost');
// }

// ---------------------------------------------------------------------
// 2) App.tsx — use esewa-ui-library services exactly as in production
// ---------------------------------------------------------------------

import { REQUEST_TYPE_ENUM, CALLBACK_TYPE_ENUM } from './mockEsewaHost';
import { MockHostPanel } from './MockHostPanel';

declare global {
  function requestFromMiniApp(requestData: any, callback?: (data: any) => void): void;
}

export function App() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loc, setLoc] = useState<any>(null);

  // INIT_APP — mirrors README exactly
  useEffect(() => {
    const initAppCallback = (data: any) => {
      try {
        if (!data) throw new Error('null response');
        const res = JSON.parse(data);
        if (res.error_message) {
          console.error('INIT_APP error:', res.error_message);
          return;
        }
        sessionStorage.setItem('miniAppAuthToken', res.token);
        sessionStorage.setItem('miniAppAuthScope', JSON.stringify(res.scope));
        setToken(res.token);
        console.log('INIT_APP success', res);
      } catch (e) {
        console.error('INIT_APP parse error', e);
      }
    };

    requestFromMiniApp(
      {
        merchant_identifier: 'IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=',
        requestType: REQUEST_TYPE_ENUM.INIT_APP,
        callbackKey: CALLBACK_TYPE_ENUM.INIT_APP_CALLBACK,
      },
      initAppCallback
    );
  }, []);

  const onUserDetail = () => {
    requestFromMiniApp(
      {
        requestType: REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS,
        token: sessionStorage.getItem('miniAppAuthToken'),
        merchant_identifier: 'IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=',
        callbackKey: CALLBACK_TYPE_ENUM.USER_DETAIL_ACCESS_CALLBACK,
      },
      (data) => {
        const res = JSON.parse(data);
        if (res.error_message) throw new Error(res.error_message);
        setUser(res);
      }
    );
  };

  const onLocation = () => {
    requestFromMiniApp(
      {
        requestType: REQUEST_TYPE_ENUM.LOCATION_ACCESS,
        token: sessionStorage.getItem('miniAppAuthToken'),
        callbackKey: CALLBACK_TYPE_ENUM.LOCATION_ACCESS_CALLBACK,
      },
      (data) => {
        const res = JSON.parse(data);
        if (res.error_message) throw new Error(res.error_message);
        setLoc(res);
      }
    );
  };

  const onMedia = () => {
    requestFromMiniApp(
      {
        requestType: REQUEST_TYPE_ENUM.MEDIA_ACCESS,
        token: sessionStorage.getItem('miniAppAuthToken'),
        callbackKey: CALLBACK_TYPE_ENUM.MEDIA_ACCESS_CALLBACK,
      },
      (data) => {
        // NOTE: no JSON.parse — raw base64 string
        if ((data as any)?.error_message) throw new Error((data as any).error_message);
        console.log('media base64 length', (data as string).length);
      }
    );
  };

  const onPay = () => {
    requestFromMiniApp(
      {
        requestType: REQUEST_TYPE_ENUM.REQUEST_PAYMENT,
        merchant_identifier: 'IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=',
        token: sessionStorage.getItem('miniAppAuthToken'),
        data: {
          product_code: 'NP-ES-VIANET',
          amount: 28.48,
          properties: { productId: '3299', refId: '400005' },
          channel: 'WEB_USER',
        },
        callbackKey: CALLBACK_TYPE_ENUM.REQUEST_PAYMENT_CALLBACK,
      },
      (data) => {
        const res = JSON.parse(data);
        console.log('payment', res);
      }
    );
  };

  const onFileDownload = () => {
    requestFromMiniApp(
      {
        requestType: REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS,
        callbackKey: CALLBACK_TYPE_ENUM.FILE_DOWNLOAD_ACCESS_CALLBACK,
        data: {
          fileName: 'Statement-2025.pdf',
          type: 'url',
          content: 'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf',
        },
      },
      (data) => {
        // raw object
        if (data.error_message) throw new Error(data.error_message);
        console.log(data.message); // Download simulated
      }
    );
  };

  const onClose = () => {
    requestFromMiniApp({
      requestType: REQUEST_TYPE_ENUM.CLOSE_APP,
      callbackKey: CALLBACK_TYPE_ENUM.CLOSE_APP_CALLBACK,
    });
    // mock logs "App would close here"
  };

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1>eSewa Mini App (mock host)</h1>
      <p>Token: {token ? `${token.slice(0, 16)}…` : 'none (call INIT_APP)'}</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={onUserDetail}>User Detail</button>
        <button onClick={onLocation}>Location</button>
        <button onClick={onMedia}>Media (raw)</button>
        <button onClick={onPay}>Request Payment</button>
        <button onClick={onFileDownload}>File Download (raw)</button>
        <button onClick={onClose}>Close App</button>
      </div>

      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
      {loc && <pre>{JSON.stringify(loc, null, 2)}</pre>}

      {/* Dev panel — only in dev */}
      {import.meta.env.DEV && <MockHostPanel />}
    </div>
  );
}

export default App;
