import formTable from "@/app/db/schema/form";
import { db } from "../../db";
import { eq } from "drizzle-orm";

export const getFormsByWorkspace = async (workspaceId: string) => {
  try {
    const forms = await db
      .select()
      .from(formTable)
      .where(eq(formTable.workspace, workspaceId));
    return forms;
  } catch (e) {
    throw e;
  }
};

export const createNewForm = async (params: typeof formTable.$inferInsert) => {
  try {
    const form = await db
      .insert(formTable)
      .values(params)
      .returning({ id: formTable.shortId, name: formTable.name });

    return form;
  } catch (e) {
    throw e;
  }
};

export const getFormById = async (formId: string) => {
  try {
    const form = await db
      .select()
      .from(formTable)
      .where(eq(formTable.shortId, formId));

    return form;
  } catch (e) {
    throw e;
  }
};

export const deleteFormById = async (formId: string) => {
  try {
    await db.delete(formTable).where(eq(formTable.shortId, formId));
    return true;
  } catch (e) {
    throw e;
  }
};

export const updateFormById = async (params: typeof formTable.$inferInsert) => {
  try {
    const form = await db.update(formTable).set(params).returning({
      id: formTable.shortId,
      name: formTable.name,
      form_schema: formTable.form_schema,
    });

    return form;
  } catch (e) {
    throw e;
  }
};
