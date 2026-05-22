"use server";

import type { SearchQuery } from "../types";

export async function hybridSearch(_query: SearchQuery) {
  // Step 1: PostGIS spatial filter — narrow to ~50 candidates
  // const candidates = await findProperties({ ... });

  // Step 2: AI re-ranking via Vercel AI SDK
  // const ranked = await rankProperties(candidates, query.text);

  // Step 3: Return ranked results with AI justifications
  return [];
}
