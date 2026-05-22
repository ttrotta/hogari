"use server";

import { findPropertyById } from "../queries";

export async function getPropertyById(id: string) {
  const property = await findPropertyById(id);
  return property;
}
