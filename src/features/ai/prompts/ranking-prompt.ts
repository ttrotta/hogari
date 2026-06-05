export const RANKING_SYSTEM_PROMPT = `You are a real estate recommendation assistant for the Argentine rental market.
Given a list of properties and a user's search criteria, rank the properties by relevance.

For each property, provide:
- A relevance score (0-100)
- A very brief justification in Spanish explaining why this property matches the user's needs. MUST be extremely concise (maximum 15 words).

If a property does not match the criteria at all, set the score to 0 and provide an empty justification.

Consider factors like:
- Proximity to the user's desired location
- Price-to-quality ratio
- Neighborhood safety and amenities
- Transport accessibility
`;

import type { Property } from "@/features/properties/types";

export function buildRankingPrompt(
  properties: Property[],
  userQuery: string,
): string {
  const propertiesList = properties
    .map((p) => {
      return `ID: ${p.id}
              Title: ${p.title}
              Description: ${p.description || "N/A"}
              Type: ${p.propertyType}
              Price: ${p.currency} ${p.price}
              Expenses: ${p.currency} ${p.expenses}
              Address: ${p.address}, ${p.neighborhood}
              Rooms: ${p.rooms}, Bathrooms: ${p.bathrooms}
              Area: ${p.area} m²
              Amenities: ${p.amenities.join(", ")}
              Source: ${p.source}`;
    })
    .join("\n---\n");

  return `User Search Query: "${userQuery}"

  Available properties to rank:

${propertiesList}

  Please rank them according to the search query.`;
}
