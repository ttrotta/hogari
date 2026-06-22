# Authentication Guide

This project uses **Auth.js v5** (`next-auth@beta`) for authentication with a custom PostgreSQL adapter (`@auth/pg-adapter`).

---

## 1. Overview

| Feature               | Implementation                              |
| --------------------- | ------------------------------------------- |
| Library               | Auth.js v5 (`next-auth@5.0.0-beta.31`)      |
| Database adapter      | `@auth/pg-adapter` (raw `pg` Pool)          |
| Password hashing      | `bcryptjs` (12 rounds)                      |
| User roles            | `ADMIN`, `TENANT`, `AGENCY`                 |
| Session strategy      | JWT (no database sessions)                  |
| Auth providers        | Credentials (email + password) + Google OAuth |

### Auth is optional

Authentication is **not required** to browse the platform. All routes are public:
- `/` — landing page
- `/search` — search and browse properties
- `/property/[id]` — property details
- `/profile/[id]` — user profile (public info always visible)
- `/signin` — sign in
- `/signup` — sign up

Auth is used for personalized features (saved searches, query history, agency dashboards, etc.)

---

## 2. Database Schema

### `users` table

| Column          | Type        | Notes                                    |
| --------------- | ----------- | ---------------------------------------- |
| `id`            | UUID        | `gen_random_uuid()`, primary key         |
| `name`          | TEXT        |                                          |
| `email`         | TEXT        | UNIQUE                                   |
| `emailVerified` | TIMESTAMPTZ | Set by OAuth providers (camelCase, quoted) |
| `image`         | TEXT        | Avatar URL (from Google OAuth)           |
| `password`      | TEXT        | bcrypt hash (null for OAuth-only users)  |
| `role`          | TEXT        | `CHECK (role IN ('ADMIN','TENANT','AGENCY'))`, default `'TENANT'` |
| `created_at`    | TIMESTAMPTZ | `DEFAULT NOW()`                          |
| `updated_at`    | TIMESTAMPTZ | `DEFAULT NOW()`                          |

### Auth.js internal tables

Managed by the `@auth/pg-adapter` — do not modify manually:

- `accounts` — OAuth account links (Google, etc.)
- `sessions` — Database sessions (not used with JWT strategy)
- `verification_token` — Email verification tokens

### User data tables

| Table | Purpose |
|---|---|
| `saved_properties` | Properties saved by a user (`user_id`, `property_id`, UNIQUE pair) |
| `saved_searches` | Search queries saved by a user (`user_id`, `query`, `filters` JSONB) |

---

## 3. Architecture

```
                    ┌─────────────────────────────┐
                    │     src/lib/auth/config.ts    │
                    │  (providers, callbacks, pages)│
                    └──────────────┬──────────────┘
                                   │ satisfies NextAuthConfig
                    ┌──────────────▼──────────────┐
                    │     src/lib/auth/index.ts     │
                    │  NextAuth(config + adapter)   │
                    │  exports: auth, handlers,     │
                    │           signIn, signOut     │
                    └──────┬──────────────────┬────┘
                           │                  │
                           │          ┌───────▼────────┐
                           │          │ app/api/auth/   │
                           │          │ [...nextauth]/  │
                           │          │   route.ts      │
                           │          │  GET / POST     │
                           │          └────────────────┘
                    ┌──────▼──────────────────────┐
                    │   useSession() / signIn()    │
                    │   from next-auth/react       │
                    │   (client-side hooks)        │
                    └──────────────────────────────┘
```

---

## 4. Key Files

| File | Role |
|---|---|
| `src/lib/auth/config.ts` | Provider config (Credentials + Google), JWT/session callbacks, pages config |
| `src/lib/auth/index.ts` | Creates the NextAuth instance with `PgAdapter`; exports `auth`, `handlers`, `signIn`, `signOut` |
| `src/app/api/auth/[...nextauth]/route.ts` | Auth.js API route (handles sign-in, callback, sign-out) |
| `src/features/auth/types.ts` | Zod schemas + TypeScript types for auth |
| `src/features/auth/actions/signup.ts` | Server action for user registration |
| `src/features/auth/components/SignInForm.tsx` | Client component for login |
| `src/features/auth/components/SignUpForm.tsx` | Client component for registration |
| `src/components/providers/SessionProvider.tsx` | Client wrapper wrapping all children with `SessionProvider` from `next-auth/react` |
| `src/types/next-auth.d.ts` | Type augmentation adding `id` and `role` to `Session.user` |
| `src/features/profile/types.ts` | `UserProfile`, `SavedProperty`, `SavedSearch` types |
| `src/features/profile/queries.ts` | DB queries (`getUserById`, `getSavedProperties`, `getSavedSearches`) |
| `src/features/profile/components/ProfileHeader.tsx` | Profile avatar, name, email, role badge, member since |
| `src/features/profile/components/ProfileTabs.tsx` | Tabs for saved properties / saved searches (client-side) |
| `src/app/(platform)/profile/[id]/page.tsx` | Profile page — server component, public info + owner-only sections |

---

## 5. Flow: Sign Up

```
User fills form → signup() server action
  ├─ Zod validates input
  ├─ Checks for existing email
  ├─ bcrypt.hash(password, 12)
  └─ INSERT INTO users (name, email, password, role)

On success → useEffect redirects to /signin?registered=true
  └─ SignIn page shows "Account created" banner
```

---

## 6. Flow: Sign In

### Credentials (email + password)

```
User submits form → handleSubmit (onSubmit handler, NOT useActionState)
  └─ signIn("credentials", { email, password, redirect: false })
       └─ POST /api/auth/callback/credentials
            └─ authorize() in config.ts:
                 ├─ SELECT user by email
                 ├─ bcrypt.compare(password, user.password)
                 └─ Returns user (id, name, email, role, image)

  On error → show error message in form
  On success → window.location.href = "/search"

JWT callback attaches role to token (via token.role)
Session callback exposes { id: token.sub, role: token.role } on session.user
```

> **Important:** The sign-in form uses a plain `onSubmit` handler with `signIn("credentials", { redirect: false })` from `next-auth/react`. It does NOT use `useActionState` — that pattern conflicts with Auth.js client-side redirect handling.

### Google OAuth

```
User clicks "Continue with Google" → onSubmit calls signIn("google", ...)
  └─ Redirects to Google consent screen
  └─ On callback: PgAdapter creates/links user in accounts table
       └─ Adapter only returns { id, name, email, emailVerified, image }
       └─ jwt callback detects missing role → queries users table
       └─ token.role = result from DB (defaults to 'TENANT')
```

### Session strategy: JWT

Sessions use **JWT strategy** (`session: { strategy: "jwt" }` in config), NOT database sessions. This means:

- Session data is stored in an encrypted JWT cookie — no DB lookup needed on each page load
- The `jwt` and `session` callbacks fire on every request, ensuring `id` and `role` are always available
- The `sessions` table in the DB is not used
- The adapter is still used for creating users and linking OAuth accounts

Without JWT strategy, the `jwt`/`session` callbacks would not fire and custom fields (`id`, `role`) would never reach the session object.

### OAuth role edge case

When signing in with Google (or any OAuth provider), the `@auth/pg-adapter` returns a minimal user object `{ id, name, email, emailVerified, image }` — it does NOT include `role`. The `jwt` callback handles this by querying the DB directly:

```typescript
async jwt({ token, user }) {
  if (user) {
    if (!("role" in user)) {
      // OAuth: adapter doesn't return role
      const r = await pool.query("SELECT role FROM users WHERE id = $1", [user.id]);
      token.role = r.rows[0]?.role ?? "TENANT";
    } else {
      // Credentials: authorize() returns role in user object
      token.role = (user as any).role;
    }
  }
  return token;
}
```

---

## 7. Role System

Roles are stored as `TEXT` in the `users.role` column with a CHECK constraint:

```sql
CHECK (role IN ('ADMIN', 'TENANT', 'AGENCY'))
```

### Accessing the role

**Server component:**
```typescript
import { auth } from "@/lib/auth";

const session = await auth();
const role = session?.user?.role; // "ADMIN" | "TENANT" | "AGENCY"
```

**Client component:**
```typescript
import { useSession } from "next-auth/react";

const { data: session } = useSession();
const role = session?.user?.role;
```

---

## 8. Environment Variables

| Variable | Required | Description |
|---|---|---|
| `AUTH_SECRET` | Yes | Auth.js encryption secret (generate with `openssl rand -base64 32`) |
| `AUTH_GOOGLE_ID` | No | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | No | Google OAuth client secret |

---

## 9. NavBar Auth UI

The NavBar (`src/components/layout/NavBar.tsx`) changes based on auth state:

| State | UI |
|---|---|
| **Unauthenticated** | "Sign in" (ghost button) + "Sign up" (primary button) |
| **Authenticated** | Avatar circle → dropdown with name, role, Profile link, Sign out |

The avatar shows:
- **OAuth users**: Google profile photo (`session.user.image`)
- **Credentials users**: Initials (first 2 letters of name), falling back to `UserRound` icon

Dropdown links:
- `/profile/[id]` — user's profile page
- Sign out — calls `signOut()` from `next-auth/react`

## 10. Route Protection

There is **no route protection**. The proxy/middleware file was removed because authentication is optional. All routes are publicly accessible. Guard specific features (e.g., saved searches, dashboards) at the component level by checking `session.user` from `useSession()` / `auth()`.

### Public vs owner-only data

The profile page at `/profile/[id]` is public but shows different content based on ownership:

- **Any visitor**: name, avatar, role badge, "Miembro desde" date
- **Profile owner only**: email address, saved properties, saved searches

Ownership is determined by comparing `session.user.id` to the profile ID in the URL.

---

## 11. Adding a New Provider

1. Import the provider in `src/lib/auth/config.ts` (e.g., GitHub, Apple)
2. Add required env vars to `src/lib/env.ts` and `.env.local`
3. Run `pnpm build` to verify

---

## 12. Creating an Admin User

Admin accounts must be inserted directly into the database (no self-registration UI for ADMIN role):

```sql
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@hogari.com', '$2b$12$...', 'ADMIN');
```
