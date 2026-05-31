# Database Management Guide

This project uses PostgreSQL with the **PostGIS** extension for spatial data. Database interactions are performed using raw SQL queries via the standard `pg` driver (no ORM).

---

## 1. Local Environment Configuration

Make sure your `*/hogari/.env.local` file contains the database connection string:

```env
DATABASE_URL="postgresql://neondb_owner:PASSWORD@HOST/neondb?sslmode=verify-full"
```

_Note: `.env.local` is ignored by Git to prevent exposing credentials._

---

## 2. Working with Migrations

All database schema modifications are defined as raw SQL files inside `src/lib/db/migrations/`.

### Running Migrations

Every time you pull changes from `main` or check out a teammate's branch, you must apply any new migrations:

1. Update your local branch.
2. Run the migration script:
   ```bash
   pnpm db:migrate
   ```

This script reads the SQL files, checks the `_migrations` table in the database to see which ones are pending, executes them in chronological order inside a transaction, and logs them.

---

## 3. Creating a New Migration

If you need to change the database schema (e.g. create a table, add a column, create an index):

### Step 1: Generate a unique filename using a timestamp

Migrations must start with a `YYYYMMDDHHMMSS` (Year-Month-Day-Hour-Minute-Second) prefix to guarantee unique names and alphabetical execution order.

Generate a timestamp in your terminal:

```bash
# On Linux/macOS:
date +%Y%m%d%H%M%S
```

Create a new file in `src/lib/db/migrations/`:

```
src/lib/db/migrations/YYYYMMDDHHMMSS_describe_change.sql
```

_Example:_ `20260531004500_add_properties_table.sql`

### Step 2: Write raw SQL

Write the SQL statements in the file. Ensure you write queries that are safe to run (e.g., using `CREATE TABLE IF NOT EXISTS` or checking if columns exist where applicable).

### Step 3: Test locally

Apply the migration to your database:

```bash
pnpm db:migrate
```

---

## 4. Querying the Database in Code

Import the `pool` instance from the shared database module:

```typescript
import { pool } from "@/lib/db/client";
import { Property } from "@/features/properties/types";

async function fetchFeaturedProperties(): Promise<Property[]> {
  const query = `
    SELECT 
      id, title, description, price, currency, address, neighborhood,
      ST_Y(geom::geometry) as latitude,
      ST_X(geom::geometry) as longitude,
      rooms, bathrooms, area, amenities, image_urls as "imageUrls",
      source, source_url as "sourceUrl", created_at as "createdAt", updated_at as "updatedAt"
    FROM properties
    ORDER BY created_at DESC
    LIMIT 10;
  `;
  const result = await pool.query(query);
  return result.rows;
}
```

### Key Practices:

1. **Alias columns with camelCase**: Use SQL aliases (`as "imageUrls"`) to map database `snake_case` columns to the `camelCase` properties expected by your TypeScript interfaces.
2. **Prevent SQL Injection**: Never concatenate variables inside SQL query strings. Use parameterized queries:

   ```typescript
   // Correct:
   await pool.query("SELECT * FROM properties WHERE id = $1", [propertyId]);

   // Incorrect:
   await pool.query(`SELECT * FROM properties WHERE id = '${propertyId}'`);
   ```
