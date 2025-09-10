import { sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import formTable from "./form";

const formFieldTable = pgTable("form_fields", {
  id: t
    .uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  form: t
    .varchar({ length: 255 })
    .references(() => formTable.shortId, { onDelete: "cascade" })
    .notNull(),
  label: t.varchar({ length: 255 }),
  placeholder: t.varchar({ length: 255 }),
  type: t.varchar({ length: 255 }),
  subType: t.text(),
  order: t.integer(),
  isRequired: t.boolean().default(false),
  min: t.integer().default(1),
  max: t.integer().default(1),
  file_url: t.varchar({ length: 255 }).default(""),
  file_limit: t.varchar({ length: 50 }).default("10mb"),
  accepted_file_types: t.text().array(),
  choices: t.text().array(),
  multiple_select: t.boolean().default(false),
  createdAt: t.timestamp().defaultNow(),
  updatedAt: t.timestamp().defaultNow(),
});

export default formFieldTable;
