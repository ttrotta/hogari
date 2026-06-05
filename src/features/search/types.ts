import { z } from "zod";
import { PropertySchema } from "@/features/properties/types";

export const SearchQuerySchema = z.object({
  text: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  radiusKm: z.number().optional(),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;

export const SearchResultSchema = z.object({
  propertyId: z.string(),
  score: z.number(),
  aiJustification: z.string().optional(),
});

export type SearchResult = z.infer<typeof SearchResultSchema>;

export const HybridSearchResultSchema = PropertySchema.extend({
  score: z.number(),
  aiJustification: z.string(),
});

export type HybridSearchResult = z.infer<typeof HybridSearchResultSchema>;
