export type SearchQuery = {
  text: string;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
};

export type SearchResult = {
  propertyId: string;
  score: number;
  aiJustification?: string;
};
