"use server";

import { findProperties } from "@/features/properties/queries";
import { rankProperties } from "@/features/ai/actions/rank-properties";
import type { SearchQuery, HybridSearchResult } from "../types";

export async function hybridSearch(
  query: SearchQuery,
): Promise<HybridSearchResult[]> {
  console.log("[Hybrid Search] Starting search with query:", query.text);
  const latitude = query.latitude ?? -38.7183;
  const longitude = query.longitude ?? -62.2663;
  const radiusKm = query.radiusKm ?? 10;

  console.log(
    `[Hybrid Search] Querying DB for candidates within ${radiusKm}km of (${latitude}, ${longitude})...`,
  );
  const candidates = await findProperties({
    latitude,
    longitude,
    radiusKm,
  });

  console.log(`[Hybrid Search] DB returned ${candidates.length} properties.`);
  if (candidates.length === 0) {
    return [];
  }

  console.log("[Hybrid Search] Calling Gemini to rank candidates...");
  const rankingResponse = await rankProperties(candidates, query.text);
  console.log(
    `[Hybrid Search] Gemini ranked ${rankingResponse.rankings.length} properties.`,
  );

  const rankingsMap = new Map(
    rankingResponse.rankings.map((r) => [r.propertyId, r]),
  );

  const results: HybridSearchResult[] = candidates
    .map((property) => {
      const ranking = rankingsMap.get(property.id);
      return {
        ...property,
        score: ranking ? ranking.score : 0,
        aiJustification: ranking ? ranking.justification : "",
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  console.log(`[Hybrid Search] Finished. Returning ${results.length} results.`);
  return results;
}
