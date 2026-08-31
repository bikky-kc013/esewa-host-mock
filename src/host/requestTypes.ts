/**
 * requestTypes.ts — the wire vocabulary shared by bridge + autoResponder
 *
 * Extracted from bridge.ts so the auto-responder can use the enums without
 * importing bridge.ts (which imports the responder — that would be a cycle).
 * bridge.ts re-exports everything here, so existing `from './bridge'` imports
 * keep working.
 *
 * Exact strings from esewa-ui-library/dist/@types/index.d.ts
 */

export const REQUEST_TYPE_ENUM = {
  INIT_APP: 'INIT_APP',
  REQUEST_PAYMENT: 'REQUEST_PAYMENT',
  USER_DETAIL_ACCESS: 'USER_DETAIL_ACCESS',
  MEDIA_ACCESS: 'MEDIA_ACCESS',
  LOCATION_ACCESS: 'LOCATION_ACCESS',
  VALIDATE_TRANSACTION: 'VALIDATE_TRANSACTION',
  CLOSE_APP: 'CLOSE_APP',
  FILE_DOWNLOAD_ACCESS: 'FILE_DOWNLOAD_ACCESS',
  GET_PRODUCT: 'GET_PRODUCT',
  VALIDATE_USER: 'VALIDATE_USER',
  MERCHANT_DETAIL: 'MERCHANT_DETAIL',
  QR_SCANNER_ACCESS: 'QR_SCANNER_ACCESS',
  PAYMENT_REQUEST: 'PAYMENT_REQUEST',
  CONNECTION_REQUEST: 'CONNECTION_REQUEST',
  CREDIT_ADDITION: 'CREDIT_ADDITION',
  PAYMENT_SETTLEMENT: 'PAYMENT_SETTLEMENT',
  DUE_DATE_REMINDER: 'DUE_DATE_REMINDER',
} as const;

export type RequestType = (typeof REQUEST_TYPE_ENUM)[keyof typeof REQUEST_TYPE_ENUM];

/**
 * Scope the host grants a live mini app on INIT_APP when the registry entry
 * carries no explicit scope list. INIT_APP and CLOSE_APP are never gated, so
 * they are not part of a grant.
 */
export const DEFAULT_GRANTED_SCOPE: string[] = [
  REQUEST_TYPE_ENUM.USER_DETAIL_ACCESS,
  REQUEST_TYPE_ENUM.LOCATION_ACCESS,
  REQUEST_TYPE_ENUM.MEDIA_ACCESS,
  REQUEST_TYPE_ENUM.REQUEST_PAYMENT,
  REQUEST_TYPE_ENUM.VALIDATE_TRANSACTION,
  REQUEST_TYPE_ENUM.GET_PRODUCT,
  REQUEST_TYPE_ENUM.MERCHANT_DETAIL,
  REQUEST_TYPE_ENUM.VALIDATE_USER,
  REQUEST_TYPE_ENUM.QR_SCANNER_ACCESS,
  REQUEST_TYPE_ENUM.FILE_DOWNLOAD_ACCESS,
];
