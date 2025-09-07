import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./drizzle",
  schema: "./app/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:password@localhost:5432/next-formly",
  },
});
