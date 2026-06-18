import NextAuth from "next-auth";
import PgAdapter from "@auth/pg-adapter";
import { pool } from "@/lib/db/client";
import { config } from "./config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...config,
  adapter: PgAdapter(pool),
});
