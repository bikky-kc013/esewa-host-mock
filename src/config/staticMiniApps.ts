/**
 * staticMiniApps.ts
 * Static registry for production mini-apps that are loaded via Module Federation at runtime.
 * This is the source of truth for the eSIM mini-app hosted at Vercel, so the host does not
 * need to rely on localStorage seeding or onboarding for this app.
 *
 * The runtime loader in `src/miniapp/EsimRemoteApp.tsx` uses the same MF mechanism
 * (`import('esim_mini_app/App')` via @module-federation/vite) — the only difference is
 * the bundle URL is now the production Vercel URL, not localhost.
 */

export type StaticMiniApp = {
  id: string
  name: string
  description: string
  category: string
  iconLabel: string
  badge?: string
  bundleUrl: string
  scope: string
  module: string
  merchant_identifier: string
  vendorIdentifier: string
  contactEmail: string
}

export const STATIC_MINI_APPS: StaticMiniApp[] = [
  {
    id: 'esim-mini-app',
    name: 'eSIM',
    description: 'Buy eSIM data packs for 30+ destinations — via host bridge (token/user/location/balance + packages). Hosted at Vercel.',
    category: 'Travel',
    iconLabel: 'ES',
    badge: 'MF',
    bundleUrl: 'https://esewa-esim-mini-app.vercel.app/remoteEntry.js',
    // bundleUrl: ' http://localhost:5174/remoteEntry.js',
    scope: 'esim_mini_app',
    module: './App',
    merchant_identifier: 'NP-ES-DEV-ESIM-VERCEL',
    vendorIdentifier: 'VENDOR-ESIM-VERCEL',
    contactEmail: 'esim@esewa.mock',
  },
]

// Helper to find a static app by id
export function getStaticApp(id: string): StaticMiniApp | undefined {
  return STATIC_MINI_APPS.find((a) => a.id === id)
}
