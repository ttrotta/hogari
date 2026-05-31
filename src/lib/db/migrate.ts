import { pool } from "./client";
import * as fs from "fs";
import * as path from "path";

async function migrate() {
  const client = await pool.connect();
  try {
    // Create migrations table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    const migrationsDir = path.join(process.cwd(), "src/lib/db/migrations");
    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    const { rows: executed } = await client.query(
      "SELECT name FROM _migrations",
    );
    const executedNames = new Set(executed.map((r) => r.name));

    for (const file of files) {
      if (!executedNames.has(file)) {
        console.log(`Executing migration: ${file}`);
        const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");

        await client.query("BEGIN");
        await client.query(sql);
        await client.query("INSERT INTO _migrations (name) VALUES ($1)", [
          file,
        ]);
        await client.query("COMMIT");
      }
    }
    console.log("All migrations executed successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
