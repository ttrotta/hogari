import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  DATABASE_URL: z.string().url().optional(),
  MAPBOX_ACCESS_TOKEN: z.string().optional(),
});

export const env = envSchema.parse(process.env);
