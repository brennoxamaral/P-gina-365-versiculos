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
