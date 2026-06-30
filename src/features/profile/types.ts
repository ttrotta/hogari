export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  createdAt: Date;
}

export interface SavedProperty {
  id: string;
  propertyId: string;
  title: string;
  address: string;
  price: number;
  currency: string;
  imageUrl: string | null;
  savedAt: Date;
}

export interface SavedSearch {
  id: string;
  query: string;
  filters: Record<string, unknown>;
  createdAt: Date;
}
