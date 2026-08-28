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
import React from 'react';
type PanelProps = {
    /** Start collapsed */
    defaultCollapsed?: boolean;
    /** Disable drag */
    disableDrag?: boolean;
};
export declare const MockHostPanel: React.FC<PanelProps>;
export default MockHostPanel;
