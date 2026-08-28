import type { RegisteredMiniApp, MiniAppStatus, CreateMiniAppInput } from './types';

const STORAGE_KEY = 'esewa_dev_registered_miniapps';
const EVENT_NAME = 'esewaMiniAppRegistryUpdate';

function randomAlphaNum(len: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function load(): RegisteredMiniApp[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(apps: RegisteredMiniApp[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  } catch {}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }
}

export function listApps(): RegisteredMiniApp[] {
  return load();
}

export function getApp(id: string): RegisteredMiniApp | undefined {
  return load().find((a) => a.id === id);
}

export function createApp(input: CreateMiniAppInput): RegisteredMiniApp {
  const now = new Date().toISOString();
  const app: RegisteredMiniApp = {
    id: (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? (crypto as any).randomUUID() : `app_${Date.now()}_${randomAlphaNum(4)}`),
    name: input.name,
    description: input.description,
    category: input.category,
    iconLabel: input.iconLabel.slice(0, 2).toUpperCase() || 'AP',
    badge: input.badge?.trim() || undefined,
    launchMode: input.launchMode,
    launchUrl: input.launchMode === 'iframe' ? input.launchUrl?.trim() : undefined,
    contactEmail: input.contactEmail,
    businessType: input.businessType,
    status: 'pending_review',
    merchant_identifier: `NP-ES-DEV-${randomAlphaNum(6).toUpperCase()}`,
    vendorIdentifier: `VENDOR-${randomAlphaNum(8).toUpperCase()}`,
    createdAt: now,
  };
  const apps = load();
  apps.unshift(app);
  save(apps);
  return app;
}

export function updateStatus(id: string, status: MiniAppStatus, note?: string): RegisteredMiniApp | undefined {
  const apps = load();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx === -1) return undefined;
  const prevNote = apps[idx].reviewNote;
  const nextNote = status === 'rejected' ? (note ?? prevNote) : status === 'pending_review' && note ? note : undefined;
  apps[idx] = {
    ...apps[idx],
    status,
    reviewNote: nextNote,
  };
  // When resubmitting from rejected, clear note if not provided
  if (status === 'pending_review' && !note) {
    // keep existing note? spec says rejected shows note editable by reviewer; on resubmit keep or clear? clear for fresh review
    // leave as is unless explicitly cleared
  }
  save(apps);
  return apps[idx];
}

export function deleteApp(id: string): void {
  const apps = load().filter((a) => a.id !== id);
  save(apps);
}

export function subscribeRegistry(fn: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => fn();
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}

export const REGISTRY_EVENT = EVENT_NAME;
export const REGISTRY_STORAGE_KEY = STORAGE_KEY;
