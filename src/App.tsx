
import { useEffect, useState } from 'react';
import { ESewaProvider, ESewaThemeProvider, useESewaDataProvider } from 'esewa-ui-library';
import { DevPanel } from './host/DevPanel';
import { DiscoveryFeed } from './host/DiscoveryFeed';
import SampleMiniApp from './miniapp/SampleMiniApp';
import EsimRemoteApp from './miniapp/EsimRemoteApp';
import { getApp, listApps, createApp, updateStatus } from './host/onboarding/store';


type AppView = 'discovery' | 'onboarding' | 'miniapp';

function isEsimApp(app: NonNullable<ReturnType<typeof getApp>>) {
  return app.name.toLowerCase().includes('esim') || app.iconLabel.toUpperCase() === 'ES'
}

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

  // Seed eSIM mini-app (MF remote) as live so it appears in DiscoveryFeed without manual onboarding
  useEffect(() => {
    try {
      const existing = listApps().find((a) => a.name.toLowerCase() === 'esim' || a.name.toLowerCase().includes('esim'))
      if (!existing) {
        const created = createApp({
          name: 'eSIM',
          description: 'Buy eSIM data packs for 30+ destinations — same flow as standalone mini-app, now via host bridge (token/user/location/balance + packages).',
          category: 'Travel',
          iconLabel: 'ES',
          badge: 'MF',
          launchMode: 'embedded',
          contactEmail: 'esim@esewa.mock',
          businessType: 'Private Limited',
        })
        // Auto-approve → live so DiscoveryFeed shows it
        updateStatus(created.id, 'approved')
        updateStatus(created.id, 'live')
        console.info('[Host] Seeded eSIM mini-app (MF remote) as live', created)
      } else if (existing.status !== 'live') {
        // Ensure existing eSIM is live
        updateStatus(existing.id, 'approved')
        updateStatus(existing.id, 'live')
      }
    } catch (e) {
      console.warn('[Host] Failed to seed eSIM app', e)
    }
  }, [])

  // CLOSE_APP — the host bridge answers the request and emits this; the shell
  // is what actually navigates back, same as the real app popping the WebView.
  useEffect(() => {
    const onClose = () => {
      setActiveAppId(null);
      setView('discovery');
    };
    window.addEventListener('esewaHostCloseApp', onClose);
    return () => window.removeEventListener('esewaHostCloseApp', onClose);
  }, []);

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

      {view === 'discovery' && (
        <>
          <DiscoveryFeed onLaunchMiniApp={handleLaunch} onOpenOnboarding={() => setView('onboarding')} />
          <DevPanel />
        </>
      )}
      {view === "miniapp" && (
        <ESewaThemeProvider>
          <ESewaProvider>
            {activeApp ? (
              isEsimApp(activeApp) ? (
                <EsimRemoteApp
                  merchantIdentifier={activeApp.merchant_identifier}
                  vendorIdentifier={activeApp.vendorIdentifier}
                />
              ) : (
                <SampleMiniApp
                  merchantIdentifier={activeApp.merchant_identifier}
                  vendorIdentifier={activeApp.vendorIdentifier}
                />
              )
            ) : (
              <div className="p-5 text-[13px]">No app selected.</div>
            )}

            <TitleObserver onChange={setDebugTitle} />
            <DevPanel />
          </ESewaProvider>
        </ESewaThemeProvider>
      )}
    </>
  );
}
