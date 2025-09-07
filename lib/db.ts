import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const getDB = async () => {
  const pool = new Pool({
    connectionString: process.env?.DATABASE_URL,
  });

  return drizzle({ client: pool });
};
