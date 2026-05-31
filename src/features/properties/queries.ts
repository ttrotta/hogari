import { pool } from "@/lib/db/client";
import type { Property, PropertyFilter } from "./types";

export async function findProperties(
  filters: PropertyFilter,
): Promise<Property[]> {
  const queryParts: string[] = [];
  const params: unknown[] = [];
  let paramIndex = 1;

  if (filters.minPrice !== undefined) {
    queryParts.push(`price >= $${paramIndex++}`);
    params.push(filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    queryParts.push(`price <= $${paramIndex++}`);
    params.push(filters.maxPrice);
  }
  if (filters.currency) {
    queryParts.push(`currency = $${paramIndex++}`);
    params.push(filters.currency);
  }
  if (filters.propertyType && filters.propertyType.length > 0) {
    queryParts.push(`property_type = ANY($${paramIndex++})`);
    params.push(filters.propertyType);
  }
  if (filters.rooms !== undefined) {
    queryParts.push(`rooms = $${paramIndex++}`);
    params.push(filters.rooms);
  }
  if (filters.minArea !== undefined) {
    queryParts.push(`area >= $${paramIndex++}`);
    params.push(filters.minArea);
  }
  if (filters.maxArea !== undefined) {
    queryParts.push(`area <= $${paramIndex++}`);
    params.push(filters.maxArea);
  }
  if (filters.amenities && filters.amenities.length > 0) {
    queryParts.push(`amenities @> $${paramIndex++}`);
    params.push(filters.amenities);
  }
  if (
    filters.latitude !== undefined &&
    filters.longitude !== undefined &&
    filters.radiusKm !== undefined
  ) {
    queryParts.push(
      `ST_DWithin(geom, ST_SetSRID(ST_MakePoint($${paramIndex++}, $${paramIndex++}), 4326)::geography, $${paramIndex++})`,
    );
    params.push(filters.longitude);
    params.push(filters.latitude);
    params.push(filters.radiusKm * 1000);
  }

  const whereClause =
    queryParts.length > 0 ? `WHERE ${queryParts.join(" AND ")}` : "";

  const query = `
    SELECT 
      id,
      title,
      description,
      property_type AS "propertyType",
      price,
      expenses,
      currency,
      address,
      neighborhood,
      ST_X(geom::geometry) AS longitude,
      ST_Y(geom::geometry) AS latitude,
      rooms,
      bathrooms,
      area,
      amenities,
      image_urls AS "imageUrls",
      source,
      source_url AS "sourceUrl",
      raw_metadata AS "rawMetadata",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM properties
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT 50;
  `;

  const result = await pool.query(query, params);

  return result.rows.map((row) => ({
    ...row,
    price: Number(row.price),
    expenses: Number(row.expenses),
    area: Number(row.area),
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
  }));
}

export async function findPropertyById(id: string): Promise<Property | null> {
  const query = `
    SELECT 
      id,
      title,
      description,
      property_type AS "propertyType",
      price,
      expenses,
      currency,
      address,
      neighborhood,
      ST_X(geom::geometry) AS longitude,
      ST_Y(geom::geometry) AS latitude,
      rooms,
      bathrooms,
      area,
      amenities,
      image_urls AS "imageUrls",
      source,
      source_url AS "sourceUrl",
      raw_metadata AS "rawMetadata",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM properties
    WHERE id = $1;
  `;
  const result = await pool.query(query, [id]);
  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  return {
    ...row,
    price: Number(row.price),
    expenses: Number(row.expenses),
    area: Number(row.area),
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
  };
}
