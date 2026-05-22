import { z } from "zod";

export const RankedPropertySchema = z.object({
  propertyId: z.string(),
  score: z.number().min(0).max(100),
  justification: z.string(),
});

export const RankingResponseSchema = z.object({
  rankings: z.array(RankedPropertySchema),
});

export type RankedProperty = z.infer<typeof RankedPropertySchema>;
export type RankingResponse = z.infer<typeof RankingResponseSchema>;
