"use server";

import { findProperties } from "../queries";
import type { PropertyFilter } from "../types";

export async function searchProperties(filters: PropertyFilter) {
  // Step 1: Spatial SQL filter (PostGIS)
  const candidates = await findProperties(filters);

  // Step 2: AI re-ranking (delegated to features/ai/)
  // TODO: import { rankProperties } from "@/features/ai/actions/rank-properties";
  // const ranked = await rankProperties(candidates, userQuery);

  return candidates;
}
