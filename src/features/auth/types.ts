import { z } from "zod";

export type UserRole = "ADMIN" | "TENANT" | "AGENCY";

export const UserRoleEnum = z.enum(["ADMIN", "TENANT", "AGENCY"]);

export const SignUpSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  role: UserRoleEnum.default("TENANT"),
});

export const SignInSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
