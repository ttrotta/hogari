// TODO: Insert normalized properties into PostgreSQL
// export async function loadToDatabase(properties: NormalizedProperty[]) {
//   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
//   for (const prop of properties) {
//     await pool.query(
//       `INSERT INTO properties (title, price, geom, ...)
//        VALUES ($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326), ...)`,
//       [prop.title, prop.price, prop.longitude, prop.latitude, ...]
//     );
//   }
//   await pool.end();
// }

export {};
