import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  DATABASE_URL: z.url(),
  MAPLIBRE_ACCESS_TOKEN: z.string().optional(),
  GEMINI_API_KEY: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);
