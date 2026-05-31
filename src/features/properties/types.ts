export type Property = {
  id: string;
  title: string;
  description: string;
  propertyType: "apartment" | "house" | "ph" | "studio";
  price: number;
  expenses: number;
  currency: "ARS" | "USD";
  address: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  rooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  imageUrls: string[];
  source: string;
  sourceUrl: string;
  rawMetadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
};

export type PropertyFilter = {
  minPrice?: number;
  maxPrice?: number;
  currency?: "ARS" | "USD";
  propertyType?: ("apartment" | "house" | "ph" | "studio")[];
  rooms?: number;
  minArea?: number;
  maxArea?: number;
  amenities?: string[];
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
};
