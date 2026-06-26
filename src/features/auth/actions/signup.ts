"use server";

import bcrypt from "bcryptjs";
import { pool } from "@/lib/db/client";
import { SignUpSchema } from "@/features/auth/types";

type SignUpResult = { error?: string; success?: boolean };

export async function signup(
  _prevState: SignUpResult | undefined,
  formData: FormData,
): Promise<SignUpResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role") || "TENANT",
  };

  const parsed = SignUpSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((e) => e.message).join(", ") };
  }

  const { name, email, password, role } = parsed.data;

  const existing = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email],
  );
  if (existing.rows.length > 0) {
    return { error: "Ya existe una cuenta con este email" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)`,
    [name, email, hashedPassword, role],
  );

  return { success: true };
}
