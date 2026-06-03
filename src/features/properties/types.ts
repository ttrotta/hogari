import { z } from "zod";

export const PropertySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  propertyType: z.enum(["apartment", "house", "ph", "studio"]),
  price: z.number(),
  expenses: z.number(),
  currency: z.enum(["ARS", "USD"]),
  address: z.string(),
  neighborhood: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  rooms: z.number(),
  bathrooms: z.number(),
  area: z.number(),
  amenities: z.array(z.string()),
  imageUrls: z.array(z.string()),
  source: z.string(),
  sourceUrl: z.string(),
  rawMetadata: z.record(z.string(), z.unknown()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Property = z.infer<typeof PropertySchema>;

export const PropertyFilterSchema = z.object({
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  currency: z.enum(["ARS", "USD"]).optional(),
  propertyType: z.array(z.enum(["apartment", "house", "ph", "studio"])).optional(),
  rooms: z.number().optional(),
  minArea: z.number().optional(),
  maxArea: z.number().optional(),
  amenities: z.array(z.string()).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  radiusKm: z.number().optional(),
  limit: z.number().optional(),
});

export type PropertyFilter = z.infer<typeof PropertyFilterSchema>;
