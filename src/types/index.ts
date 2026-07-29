export type PhoneCondition = 'Fair' | 'Good' | 'Superb' | 'Like New';

export interface Phone {
  id: string;
  name: string;
  brand: string;
  image: string;
  processor: string;
  display: string;
  ram: string;
  storage: string;
  battery: string;
  camera: string;
  androidVersion?: string;
  condition: PhoneCondition | string;
  cashifyAssurance: boolean;
  originalPrice: number;
  cashifyPrice: number;
  productUrl?: string;
  availability?: boolean;
  dateAdded?: string;
  lastUpdated?: string;
  aiReviewSummary?: string;
}

export interface PriceHistoryRecord {
  id: string;
  phoneId: string;
  price: number;
  recordedAt: string;
}

export interface WatchlistItem {
  phoneId: string;
  priceWhenAdded: number;
  addedAt: string;
}
