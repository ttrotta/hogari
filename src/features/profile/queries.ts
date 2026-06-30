import { pool } from "@/lib/db/client";
import type { UserProfile, SavedProperty, SavedSearch } from "./types";

export async function getUserById(id: string): Promise<UserProfile | null> {
  const result = await pool.query(
    "SELECT id, name, email, image, role, created_at FROM users WHERE id = $1",
    [id],
  );
  if (!result.rows[0]) return null;
  const row = result.rows[0];
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    image: row.image,
    role: row.role,
    createdAt: row.created_at,
  };
}

export async function getSavedProperties(
  userId: string,
): Promise<SavedProperty[]> {
  const result = await pool.query(
    `SELECT sp.id, sp.property_id, sp.created_at,
            p.title, p.address, p.price, p.currency, p.image_urls
     FROM saved_properties sp
     JOIN properties p ON p.id = sp.property_id
     WHERE sp.user_id = $1
     ORDER BY sp.created_at DESC`,
    [userId],
  );
  return result.rows.map((r) => ({
    id: r.id,
    propertyId: r.property_id,
    title: r.title,
    address: r.address,
    price: Number(r.price),
    currency: r.currency,
    imageUrl: r.image_urls?.[0] ?? null,
    savedAt: r.created_at,
  }));
}

export async function getSavedSearches(
  userId: string,
): Promise<SavedSearch[]> {
  const result = await pool.query(
    `SELECT id, query, filters, created_at
     FROM saved_searches
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId],
  );
  return result.rows.map((r) => ({
    id: r.id,
    query: r.query,
    filters: r.filters ?? {},
    createdAt: r.created_at,
  }));
}
