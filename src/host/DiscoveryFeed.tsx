/**
 * DiscoveryFeed.tsx — eSewa Home clone (https://esewa.com.np/#/home)
 * Now data-driven from onboarding registry: renders one tile per live RegisteredMiniApp.
 * Keeps one decorative filler section separate (Merchant Spotlight) so dummy tiles stay distinct.
 */

import React, { useEffect, useState } from 'react';
import { orange } from './tokens';
import type { RegisteredMiniApp } from './onboarding/types';
import { listApps, subscribeRegistry } from './onboarding/store';

const pageClass = 'min-h-screen flex flex-col bg-blue-50';

type ShowcaseItemProps = {
  appName: string;
  iconLabel?: string;
  category?: string;
  icon?: string;
  offer?: string;
  offerBg?: string;
  clickable?: boolean;
  onClick?: () => void;
  testId?: string;
  ariaLabel?: string;
  muted?: boolean;
};

function ShowcaseItem({
  appName,
  iconLabel,
  category,
  icon,
  offer,
  offerBg,
  clickable = false,
  onClick,
  testId,
  ariaLabel,
  muted = true,
}: ShowcaseItemProps) {
  const isLive = clickable;
  const offerClass = offerBg
    ? ''
    : 'bg-primary-500 text-white';
  return (
    <figure
      className="relative flex-none w-37 max-[860px]:w-33 box-border flex flex-col items-center text-center select-none"
      role={isLive ? 'button' : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      data-testid={testId}
    >
      {offer && (
        <div className={`absolute left-1.5 top-1.5 max-w-20 overflow-hidden truncate rounded-full px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.4px] ${offerClass}`} style={offerBg ? {
          background: offerBg,
        } : undefined}>
          {offer}
        </div>
      )}
      <div className={`flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-bluegray-100 bg-blue-50 mt-1.5`}>
        {iconLabel ? (
          <span className="text-[22px] font-extrabold text-primary-500">{iconLabel}</span>
        ) : (
          <span className="text-[22px]">{icon}</span>
        )}
      </div>
      <figcaption className="mt-2">
        <h5 className="mh-[32px] m-0 text-[12px] font-semibold leading-[1.3] text-gray-900 captions">
          {appName}
        </h5>
        {category && <p className="mt-0.5 m-0 text-[10px] leading-[1.2] min-h-3.5 text-gray-100 caption-main">{category}</p>}
      </figcaption>
      <button
        type="button"
        className={`mt-2 w-full rounded-md border px-2.5 py-1.25 text-[11px] font-bold cursor-pointer ${muted ? 'border-bluegray-100 bg-white text-gray-100' : 'border-primary-500 bg-primary-500 text-white hover:bg-primary-600'}`}
        onClick={onClick}
      >
        View Details
      </button>
    </figure>
  );
}

const showcaseSectionClass = 'mb-3.5 rounded-xl border border-bluegray-100 bg-white p-3.5 pb-2.5';

type ShowcaseSectionProps = {
  header: string;
  badge?: string;
  onLaunch?: (id: string) => void;
  tileClick?: (id: string) => void;
  hideTileButton?: boolean;
  emptyState?: React.ReactNode;
  children?: React.ReactNode;
};

function ShowcaseSection({ header, badge, emptyState, children }: ShowcaseSectionProps) {
  return (
    <section className={showcaseSectionClass}>
      <header className="mb-2.5 flex items-center justify-between">
        <h4 className="m-0 text-[15px] font-bold tracking-[0.2px] text-gray-900">
          {header}
          {badge && (
            <span
              className="ml-1.5 rounded-full border border-blue-200 bg-blue-100 px-1.75 py-0.5 text-[11px] font-medium text-gray-100"
              aria-label={badge}
            >
              {badge}
            </span>
          )}
        </h4>
      </header>
      {children}
    </section>
  );
}

export type DiscoveryFeedProps = {
  onLaunchMiniApp: (appId: string) => void;
  onOpenOnboarding?: () => void;
};

export const DiscoveryFeed: React.FC<DiscoveryFeedProps> = ({ onLaunchMiniApp, onOpenOnboarding }) => {
  const [liveApps, setLiveApps] = useState<RegisteredMiniApp[]>(() => listApps().filter((a) => a.status === 'live'));

  useEffect(() => {
    const refresh = () => setLiveApps(listApps().filter((a) => a.status === 'live'));
    refresh();
    const unsub = subscribeRegistry(refresh);
    return unsub;
  }, []);

  return (
    <div className={pageClass}>
      {/* SiteHeader — dark top bar (eSewa Home official header) */}
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-gray-900 text-white">
        <div className="mx-auto flex items-center gap-4.5 max-w-290 px-2 py-2 max-[860px]:gap-2.5 max-[860px]:px-3">
          <a
            className="flex items-center gap-2 text-white"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <img
              src="https://esewa.com.np/common/images/esewa_logo.png"
              alt="eSewa"
              className="object-contain"
              onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
            />
          </a>

          {/* search box */}
          <div className="mx-auto flex max-w-130 max-[860px]:max-w-none h-7  flex-1  items-center rounded-md bg-white px-2.5 text-gray-100">
            <span className="mr-2" aria-hidden>🔍</span>
            <input
              type="search"
              className="flex-1 border-none outline-none text-[13px] text-gray-500 bg-transparent"
              placeholder="Search services, bills, merchants…"
              aria-label="Search"
            />
            <button
              type="button"
              className="ml-1.5 items-center justify-center flex rounded max-h-5 bg-primary-500 px-2.5 py-1.25 text-[12px] font-bold text-white cursor-pointer border-none"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* SubNav — white secondary nav under the dark header (real eSewa has this) */}
      <nav className="overflow-x-auto whitespace-nowrap border-b border-bluegray-100 bg-primary-500 py-2">
        <div className="mx-auto flex gap-4.5 max-w-290 px-5 text-[13px] font-semibold">
          {(
            [
              // { label: 'Home', active: true },
              { label: 'Top Up' },
              { label: 'Electricity' },
              { label: 'Internet Bills' },
              { label: 'Airlines' },
            ] as { label: string; active?: boolean }[]
          ).map((t) => (
            <a
              key={t.label}
              title={t.label}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`px-1 py-1 border-b-2 text-white ${t.active ? 'border-primary-500 text-primary-500' : 'border-transparent'}`}
            >
              {t.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="mx-auto w-full max-w-290 box-border px-5 pt-4 pb-10 max-[860px]:px-3 max-[860px]:pt-3 max-[860px]:pb-7.5">
        <ShowcaseSection
          header="Mini Apps"
          badge="Dev-only"
        >
          {liveApps.length === 0 ? (
            <div className="rounded-[10px] border border-dashed border-bluegray-100 bg-blue-50 p-4.5 text-center text-[13px] text-gray-100">
              <div className="font-bold text-gray-500">No Mini Apps live yet — register one in the Partner Console</div>
              <div className="mt-1">Create → approve → go live, then it appears here as a tile.</div>
              {onOpenOnboarding && (
                <button
                  type="button"
                  className="mt-2.5 cursor-pointer rounded-lg border-none bg-gray-900 px-3.5 py-1.75 text-[12px] font-bold text-white"
                  onClick={onOpenOnboarding}
                >
                  Open Partner Console
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-none gap-3.5 max-[860px]:gap-3 overflow-x-auto pb-1.5 snap-x snap-proximity">
              {liveApps.map((app) => (
                <ShowcaseItem
                  key={app.id}
                  appName={app.name}
                  iconLabel={app.iconLabel}
                  category={app.category}
                  offer={app.badge}
                  clickable
                  onClick={() => onLaunchMiniApp(app.id)}
                  testId={`tile-miniapp-${app.id}`}
                  ariaLabel={`Open ${app.name}`}
                />
              ))}
            </div>
          )}
        </ShowcaseSection>


        <ShowcaseSection header="Popular Services">
          <div className="flex flex-none gap-3.5 max-[860px]:gap-3 overflow-x-auto pb-1.5 snap-x snap-proximity">
            <ShowcaseItem appName="Mobile Topup" icon="📞" offer="5% off" />
            <ShowcaseItem appName="Electricity" icon="💡" />
            <ShowcaseItem appName="Khanepani" icon="💧" />
            <ShowcaseItem appName="Internet" icon="🌐" offer="New" offerBg={orange[500] as string} />
            <ShowcaseItem appName="Airlines" icon="✈️" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection header="Insurance">
          <div className="flex flex-none gap-3.5 max-[860px]:gap-3 overflow-x-auto pb-1.5 snap-x snap-proximity">
            <ShowcaseItem appName="Life Insurance" icon="🏥" offer="New" offerBg={orange[500] as string} />
            <ShowcaseItem appName="Vehicle" icon="🚗" />
            <ShowcaseItem appName="Travel" icon="🧳" offer="10% off" />
            <ShowcaseItem appName="Health Cover" icon="❤️" />
          </div>
        </ShowcaseSection>

        <div className="mt-2.5 border-t border-dashed border-bluegray-100 pt-2.5 text-[11px] leading-[1.6] text-gray-100">
          Clone of{' '}
          <a
            className="text-primary-500 no-underline"
            href="https://esewa.com.np/#/home"
            target="_blank"
            rel="noreferrer"
          >
            esewa.com.np/#/home
          </a>{' '}
          — only Mini Apps tiles with <code>live</code> status launch the PhoneShell; others are decorative.
        </div>
      </main>
    </div>
  );
};
