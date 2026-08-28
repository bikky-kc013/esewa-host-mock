/**
 * tokens.ts — exact eSewa design tokens verified against
 * `node_modules/esewa-ui-library/dist/index.css` and `dist/index.js` palette
 * Do not edit without re-verifying against installed package.
 */

export const primary = {
  900: '#104B00',
  800: '#219600',
  700: '#25A800',
  600: '#26AC00',
  500: '#29BB00', // brand primary
  400: '#69CF4D',
  300: '#74D359',
  200: '#BFEBB3',
  100: '#D4F1CC',
  50: '#E7F8E3',
} as const;

export const gray = {
  900: '#080B0E',
  800: '#141A20',
  700: '#161E25',
  600: '#192129',
  500: '#1C252E',
  400: '#2C343D',
  300: '#333B43',
  200: '#495158',
  100: '#5E646B',
  50: '#CFD1D3',
  35: '#E8E9EA',
  25: '#F8F8F8',
} as const;

export const blue = {
  900: '#12314C',
  800: '#246198',
  700: '#3081CB',
  600: '#3692E4',
  500: '#3CA2FE',
  400: '#63B5FE',
  300: '#9DD0FE',
  200: '#C5E3FF',
  100: '#E6F3FF',
  50: '#F5FAFF', // body bg
} as const;

export const red = {
  900: '#260C09',
  800: '#601D15',
  700: '#9A2E22',
  600: '#AD3427',
  500: '#C03A2B', // danger
  400: '#CD6155',
  300: '#DF9C95',
  200: '#ECC4BF',
  100: '#F9EBEA',
  50: '#FCF5F4',
} as const;

export const orange = {
  900: '#432602',
  800: '#593303',
  700: '#B26606',
  600: '#C87206',
  500: '#DE7F07', // warning
  400: '#E59939',
  300: '#EEBF83',
  200: '#F5D9B5',
  100: '#FBEEDF',
  50: '#FDF9F3',
} as const;

export const bluegray = {
  50: '#F7F8F9',
  100: '#EEF0F2', // border
  200: '#ABB5BF',
  300: '#8897A5',
  400: '#798999',
  500: '#576C80',
  600: '#4E6173',
  700: '#465666',
  800: '#3D4C5A',
  900: '#34414D',
} as const;

export const white = '#fff';
export const black = '#000';

export const appBar = {
  'bg-top': primary[500], // #29BB00
  'bg-tool': primary[600], // #26AC00
  'bg-bottom': white,
  fg: white,
} as const;

export const body = {
  'body-bg': blue[50],
  'body-color': gray[500],
} as const;

export const border = bluegray[100];
export const cardBg = white;

// For CSS variable fallback — host outside ThemeProvider uses raw hex,
// inside Mini App we rely on library's CSS variables
export const cssVars = {
  '--primary-500': primary[500],
  '--primary-600': primary[600],
  '--primary-800': primary[800],
  '--gray-500': gray[500],
  '--blue-50': blue[50],
  '--bluegray-100': bluegray[100],
} as const;
