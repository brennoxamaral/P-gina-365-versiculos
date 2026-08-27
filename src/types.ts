export interface Verse {
  id: number;
  text: string;
  reference: string;
  category: 'Paz' | 'Gratidão' | 'Esperança' | 'Prosperidade' | 'Amor' | 'Força';
  dailyNumber: number;
}

export interface Testimonial {
  id: number;
  businessName: string;
  segment: string;
  city: string;
  ownerName: string;
  message: string;
  customerFeedback: string;
  rating: number;
  avatarUrl?: string;
  impactTag: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface AbacateCustomer {
  name: string;
  email: string;
  taxId: string;
  cellphone: string;
}

export type AbacatePixStatus =
  | 'PENDING'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'PAID'
  | 'UNDER_DISPUTE'
  | 'REFUNDED'
  | 'REDEEMED'
  | 'APPROVED'
  | 'FAILED';

export interface AbacatePixData {
  id: string;
  amount: number;
  status: AbacatePixStatus;
  devMode?: boolean;
  brCode?: string;
  brCodeBase64?: string;
  platformFee?: number;
  receiptUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
  expiresAt?: string;
  externalId?: string;
  metadata?: Record<string, any>;
}

export interface AbacatePixResponse {
  data: AbacatePixData;
  error: string | null;
  success: boolean;
}

export interface AbacatePixCheckResponse {
  data: {
    id: string;
    status: AbacatePixStatus;
    expiresAt?: string;
  };
  error: string | null;
  success: boolean;
}
