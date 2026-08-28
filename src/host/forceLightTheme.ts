/**
 * forceLightTheme.ts — patch window.matchMedia to force light theme
 *
 * Root cause: ESewaThemeProvider auto-detects OS dark mode via
 *   window.matchMedia('(prefers-color-scheme: dark)').matches
 * in a useEffect and switches to darkTheme where appBar bg-top is
 * rgba(15,17,20,1) (near-black) instead of primary[500] #29BB00.
 *
 * The library has no prop to force light mode, so we intercept matchMedia.
 * Must run BEFORE importing 'esewa-ui-library' or its CSS — ESewaThemeProvider
 * reads matchMedia synchronously in its first effect. Import this as the very
 * first line of src/main.tsx.
 */

const realMatchMedia = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia.bind(window) : null;

if (typeof window !== 'undefined') {
  const prev = realMatchMedia;
  window.matchMedia = ((query: string): MediaQueryList => {
    if (query.includes('prefers-color-scheme: dark')) {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      } as unknown as MediaQueryList;
    }
    if (prev) return prev(query);
    // fallback if no real matchMedia (e.g. JSDOM without)
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    } as unknown as MediaQueryList;
  }) as typeof window.matchMedia;
}
