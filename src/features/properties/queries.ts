import type { PropertyFilter } from "./types";

export async function findProperties(_filters: PropertyFilter) {
  // TODO: PostGIS spatial query with ST_DWithin
  // Example:
  // SELECT * FROM properties
  // WHERE ST_DWithin(
  //   geom,
  //   ST_SetSRID(ST_MakePoint($longitude, $latitude), 4326)::geography,
  //   $radiusKm * 1000
  // )
  // AND price BETWEEN $minPrice AND $maxPrice
  // LIMIT 50;
  return [];
}

export async function findPropertyById(_id: string) {
  // TODO: Simple SELECT by ID
  return null;
}
