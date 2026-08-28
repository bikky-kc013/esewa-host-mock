/**
 * platform.ts — UA spoof for library's UserAgent sniffing
 * Library does (dist/index.js:7965-7967):
 *   isFlutterWebView = /wv|Flutter/i.test(navigator.userAgent)
 *   isAndroid        = /Android/i.test(navigator.userAgent)
 *   isiOS            = /iPhone|iPad|iPod/i.test(navigator.userAgent)
 *
 * Host must let dev pick Android / iOS / Flutter. Since library evaluates
 * these constants at import time, we must spoof UA *before* the library is
 * imported. The earliest point is a synchronous script in index.html that
 * reads localStorage and defines navigator.userAgent getter.
 *
 * This module also provides helpers for the control panel to switch platform
 * (stores choice + reloads).
 */

export type HostPlatform = 'android' | 'ios' | 'flutter';

export const PLATFORM_UA: Record<HostPlatform, string> = {
  android: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  flutter: 'Mozilla/5.0 (Linux; Android 13; Pixel 7 Build/TQ3A.230805.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 Mobile Safari/537.36 Flutter',
};

export const PLATFORM_LABEL: Record<HostPlatform, string> = {
  android: 'Android',
  ios: 'iOS',
  flutter: 'Flutter (wv)',
};

const STORAGE_KEY = 'esewa-host-platform';

export function getStoredPlatform(): HostPlatform {
  try {
    const v = localStorage.getItem(STORAGE_KEY) as HostPlatform | null;
    if (v && PLATFORM_UA[v]) return v;
  } catch {}
  return 'android'; // default as per most eSewa devices
}

export function setStoredPlatform(p: HostPlatform): void {
  try {
    localStorage.setItem(STORAGE_KEY, p);
  } catch {}
  // Need reload so library re-evaluates UA sniff synchronously
  window.location.reload();
}

/**
 * Synchronously spoof navigator.userAgent.
 * Must be called before `import 'esewa-ui-library'`.
 * Safe to call multiple times.
 */
export function spoofUserAgent(platform: HostPlatform): void {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
  const ua = PLATFORM_UA[platform];
  try {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: ua,
      configurable: true,
    });
    // Some libs also check navigator.vendor / platform, keep minimal
    Object.defineProperty(window.navigator, 'vendor', {
      value: platform === 'ios' ? 'Apple Computer, Inc.' : 'Google Inc.',
      configurable: true,
    });
  } catch {
    // fallback — try direct assignment (may fail in strict mode)
    try {
      // @ts-ignore
      window.navigator.userAgent = ua;
    } catch {}
  }
}

/**
 * Detect current platform from actual UA (after spoof, this reflects host choice)
 */
export function detectPlatformFromUA(): HostPlatform {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  if (/Flutter/i.test(ua) || /wv/i.test(ua)) {
    // Flutter UA also contains Android, but we treat wv|Flutter as flutter
    // to disambiguate, check flutter token first
    if (/Flutter/i.test(ua)) return 'flutter';
    // wv without Flutter is still considered flutter per spec
    return 'flutter';
  }
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'android';
}
