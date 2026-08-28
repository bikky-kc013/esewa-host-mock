export type MiniAppStatus = 'draft' | 'pending_review' | 'approved' | 'live' | 'rejected';

export interface RegisteredMiniApp {
  id: string;
  name: string;
  description: string;
  category: string;
  iconLabel: string;
  badge?: string;
  launchMode: 'embedded' | 'iframe';
  launchUrl?: string;
  contactEmail: string;
  businessType: string;
  status: MiniAppStatus;
  merchant_identifier: string;
  vendorIdentifier: string;
  createdAt: string;
  reviewNote?: string;
}

export type CreateMiniAppInput = Omit<
  RegisteredMiniApp,
  'id' | 'status' | 'merchant_identifier' | 'vendorIdentifier' | 'createdAt' | 'reviewNote'
>;
