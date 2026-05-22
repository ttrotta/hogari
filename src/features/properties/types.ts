export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: "ARS" | "USD";
  address: string;
  latitude: number;
  longitude: number;
  rooms: number;
  bathrooms: number;
  area: number;
  imageUrls: string[];
  source: string;
  sourceUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PropertyFilter = {
  minPrice?: number;
  maxPrice?: number;
  currency?: "ARS" | "USD";
  rooms?: number;
  minArea?: number;
  maxArea?: number;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
};
