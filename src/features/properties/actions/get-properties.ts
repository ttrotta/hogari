"use server";

import { findProperties } from "../queries";
import type { PropertyFilter } from "../types";

export async function getProperties(filters: PropertyFilter) {
  const properties = await findProperties(filters);
  return properties;
}
