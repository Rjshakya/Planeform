import workspaceTable from "@/app/db/schema/workspace";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import formTable from "@/app/db/schema/form";

export const getWorkspaces = async (userId: string) => {
  try {
    const workspaces = await db
      .select({
        id: workspaceTable.id,
        name: workspaceTable.name,
      })
      .from(workspaceTable)
      .where(eq(workspaceTable.owner, userId));

    return workspaces;
  } catch (e) {
    throw e;
  }
};

export const createWorkspace = async (userId: string) => {
  try {
    const workspace = await db
      .insert(workspaceTable)
      .values({ owner: userId })
      .returning();
    return workspace;
  } catch (e) {
    throw e;
  }
};

export const deleteWorkspace = async (workspaceId: string) => {
  try {
    await db.delete(workspaceTable).where(eq(workspaceTable.id, workspaceId));
    return true;
  } catch (e) {
    throw e;
  }
};


