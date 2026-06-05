"use server";

import { generateText, Output } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "@/lib/env";
import type { Property } from "@/features/properties/types";
import type { RankingResponse } from "../types";
import { RankingResponseSchema } from "../types";
import { RANKING_SYSTEM_PROMPT, buildRankingPrompt } from "../prompts/ranking-prompt";

const googleProvider = createGoogleGenerativeAI({
  apiKey: env.GEMINI_API_KEY,
});

export async function rankProperties(
  properties: Property[],
  userQuery: string,
): Promise<RankingResponse> {
  if (properties.length === 0) {
    return { rankings: [] };
  }

  const result = await generateText({
    model: googleProvider("gemini-2.5-flash"),
    system: RANKING_SYSTEM_PROMPT,
    prompt: buildRankingPrompt(properties, userQuery),
    output: Output.object({
      schema: RankingResponseSchema,
    }),
  });

  return result.output;
}
