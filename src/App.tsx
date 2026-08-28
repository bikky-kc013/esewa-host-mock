/**
 * App.tsx — Host shell with three views: discovery | onboarding | miniapp
 * Persistent dev nav (eSewa Home / Partner Console) outside phone shell
 * DevPanel stays mounted in all views so bridge logs persist.
 */

import React, { useEffect, useState } from 'react';
import { ESewaProvider, ESewaThemeProvider, useESewaDataProvider } from 'esewa-ui-library';
import { PhoneShell } from './host/PhoneShell';
import { DevPanel } from './host/DevPanel';
import { DiscoveryFeed } from './host/DiscoveryFeed';
import { OnboardingConsole } from './host/onboarding/OnboardingConsole';
import SampleMiniApp from './miniapp/SampleMiniApp';
import { getApp } from './host/onboarding/store';
import styled from 'styled-components';
import { gray, primary, white, bluegray } from './host/tokens';

type AppView = 'discovery' | 'onboarding' | 'miniapp';

const TopNav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 20;
  background: ${white};
  border-bottom: 1px solid ${bluegray[100]};
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
`;

const NavBtn = styled.button<{ $active?: boolean }>`
  border: 1px solid ${(p) => (p.$active ? gray[900] : bluegray[100])};
  background: ${(p) => (p.$active ? gray[900] : white)};
  color: ${(p) => (p.$active ? white : gray[500])};
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

function TitleObserver({ onChange }: { onChange: (t: string) => void }) {
  const { data } = useESewaDataProvider();
  useEffect(() => {
    if (data?.title) onChange(String(data.title));
  }, [data?.title, onChange]);
  return null;
}

export default function App() {
  const [view, setView] = useState<AppView>('discovery');
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [debugTitle, setDebugTitle] = useState<string>('');

  useEffect(() => {
    const t = document.documentElement.getAttribute('data-theme');
    if (t !== 'light') {
      console.info('[Host] data-theme is', t, '— expected light after forceLightTheme patch');
    }
  }, [view]);

  const activeApp = activeAppId ? getApp(activeAppId) : null;

  const handleLaunch = (appId: string) => {
    setActiveAppId(appId);
    setView('miniapp');
  };

  return (
    <>
      <TopNav>
        <span style={{ fontWeight: 800, fontSize: 13, color: gray[900], marginRight: 6 }}>Dev Nav</span>
        <NavBtn $active={view === 'discovery'} onClick={() => setView('discovery')}>eSewa Home</NavBtn>
        <NavBtn $active={view === 'onboarding'} onClick={() => setView('onboarding')}>Partner Console</NavBtn>
        {view === 'miniapp' && activeApp && (
          <span style={{ fontSize: 11, color: gray[100], marginLeft: 8 }}>
            Active: <b style={{ color: primary[500] }}>{activeApp.name}</b> ({activeApp.merchant_identifier})
          </span>
        )}
        {view === 'miniapp' && (
          <NavBtn onClick={() => setView('discovery')} style={{ marginLeft: 'auto' }}>← Back to Home</NavBtn>
        )}
      </TopNav>

      {view === 'discovery' && (
        <>
          <DiscoveryFeed onLaunchMiniApp={handleLaunch} onOpenOnboarding={() => setView('onboarding')} />
          <DevPanel />
        </>
      )}

      {view === 'onboarding' && (
        <>
          <OnboardingConsole
            onGoDiscovery={() => setView('discovery')}
            onForceLaunch={(id) => {
              setActiveAppId(id);
              setView('miniapp');
            }}
          />
          <DevPanel />
        </>
      )}

      {view === 'miniapp' && (
        <ESewaThemeProvider>
          <ESewaProvider>
            <PhoneShell debugTitle={debugTitle} onBackToDiscovery={() => setView('discovery')}>
              {activeApp ? (
                activeApp.launchMode === 'iframe' && activeApp.launchUrl ? (
                  <IframeMiniApp app={activeApp} />
                ) : (
                  <SampleMiniApp
                    merchantIdentifier={activeApp.merchant_identifier}
                    vendorIdentifier={activeApp.vendorIdentifier}
                  />
                )
              ) : (
                <div style={{ padding: 20, fontSize: 13 }}>No app selected.</div>
              )}
              <TitleObserver onChange={setDebugTitle} />
            </PhoneShell>
            <DevPanel />
          </ESewaProvider>
        </ESewaThemeProvider>
      )}
    </>
  );
}

/**
 * Iframe launch — same-origin host bridge injection (Task 3.4 option a)
 */
function IframeMiniApp({ app }: { app: NonNullable<ReturnType<typeof getApp>> }) {
  const ref = React.useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;
    const onLoad = () => {
      try {
        const win = iframe.contentWindow as any;
        if (!win) return;
        // Inject same bridge logic into iframe's window
        // We reuse the parent's bridge installer by calling it against iframe window
        // To avoid duplicating code, we forward the parent's bridge handlers via postMessage fallback:
        // For same-origin, we can directly install by copying the parent's bridge functions
        // Simplest: if iframe window doesn't have Android, install a forwarder that postMessages to parent
        // But parent already listens for postMessage? Not yet — we do direct install approach (a).

        // Direct install: replicate installHostBridge against iframe window object
        // We can't import installHostBridge with different window, so we manually patch iframe window to forward to parent bridge
        const parentBridge = (window as any).__ESEWA_HOST__;
        if (!parentBridge) return;

        // Ensure iframe has the three transports that forward to parent's onOutgoing via postMessage or direct call
        // Since iframe is same-origin, we can share the parent's bridge state by forwarding raw JSON to parent's handler
        win.Android = win.Android || {};
        const origAndroid = win.Android.requestApp;
        win.Android.requestApp = (data: string) => {
          // Forward to parent's bridge
          try {
            // call parent's internal onOutgoing via dispatching to parent window's Android shim
            (window as any).Android.requestApp(data);
          } catch {}
          if (typeof origAndroid === 'function' && origAndroid !== win.Android.requestApp) {
            try { origAndroid.call(win.Android, data); } catch {}
          }
        };

        win.webkit = win.webkit || {};
        win.webkit.messageHandlers = win.webkit.messageHandlers || {};
        win.webkit.messageHandlers.iOSNative = win.webkit.messageHandlers.iOSNative || {};
        const origIOS = win.webkit.messageHandlers.iOSNative.postMessage;
        win.webkit.messageHandlers.iOSNative.postMessage = (data: any) => {
          const str = typeof data === 'string' ? data : JSON.stringify(data);
          try { (window as any).webkit.messageHandlers.iOSNative.postMessage(str); } catch {}
          if (typeof origIOS === 'function' && origIOS !== win.webkit.messageHandlers.iOSNative.postMessage) {
            try { origIOS.call(win.webkit.messageHandlers.iOSNative, data); } catch {}
          }
        };

        win.flutter_inappwebview = win.flutter_inappwebview || {};
        const origFlutter = win.flutter_inappwebview.callHandler;
        win.flutter_inappwebview.callHandler = (handlerName: string, data: any) => {
          if (handlerName === 'eSewaHandler') {
            const str = typeof data === 'string' ? data : JSON.stringify(data);
            try { (window as any).flutter_inappwebview.callHandler(handlerName, str); } catch {}
          }
          if (typeof origFlutter === 'function' && origFlutter !== win.flutter_inappwebview.callHandler) {
            try { origFlutter.call(win.flutter_inappwebview, handlerName, data); } catch {}
          }
        };

        // Also mirror callback slots: when parent fires response, it looks for window.Android[callbackKey] in parent window.
        // For iframe, we need to propagate parent's callback invocation into iframe's window.
        // We do this by intercepting fireResponse to also check iframe window.
        // Simpler: monkey-patch parent's fireResponse to also try iframe window — but we can instead
        // make iframe's Android object proxy to parent's Android object for callbacks
        // So when parent does window.Android[cb](envelope), iframe's code sees same function because we share reference
        // We achieve sharing by making iframe's Android === parent's Android for callback keys
        // Instead, we sync: whenever library in iframe does window.Android[cb]=fn, also set in parent
        const parentAndroid = (window as any).Android;
        const iframeAndroid = win.Android;
        // Proxy set — intercept future assignments
        const handler: ProxyHandler<any> = {
          set(target, prop, value) {
            target[prop] = value;
            // also mirror to parent so parent's fireResponse can find it
            if (typeof prop === 'string' && prop.endsWith('_CALLBACK')) {
              parentAndroid[prop] = value;
              // also mirror to parent iOS/flutter for robustness
              const w = window as any;
              w.iOSNative = w.iOSNative || {};
              w.iOSNative[prop] = value;
              w.flutter_inappwebview = w.flutter_inappwebview || {};
              w.flutter_inappwebview[prop] = value;
            }
            return true;
          },
          get(target, prop) {
            return target[prop];
          },
        };
        try {
          win.Android = new Proxy(iframeAndroid, handler);
          // re-assign after proxy creation, keep requestApp
          win.Android.requestApp = iframeAndroid.requestApp;
        } catch {
          // fallback: periodic sync
        }

        console.info('[Host] Bridge forwarded to iframe', app.launchUrl);
      } catch (e) {
        console.warn('[Host] Failed to inject bridge into iframe', e);
      }
    };
    iframe.addEventListener('load', onLoad);
    return () => iframe.removeEventListener('load', onLoad);
  }, [app.launchUrl]);

  return (
    <iframe
      ref={ref}
      src={app.launchUrl}
      title={app.name}
      style={{ width: '100%', height: '100%', minHeight: 640, border: 'none', background: white }}
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    />
  );
}
