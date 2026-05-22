"use server";

import type { Property } from "@/features/properties/types";
import type { RankingResponse } from "../types";

export async function rankProperties(
  _properties: Property[],
  _userQuery: string,
): Promise<RankingResponse> {
  // TODO: Use Vercel AI SDK with structured output
  // const result = await generateObject({
  //   model: openai("gpt-4o-mini"),
  //   schema: RankingResponseSchema,
  //   system: RANKING_SYSTEM_PROMPT,
  //   prompt: buildRankingPrompt(properties, userQuery),
  // });
  return { rankings: [] };
}
