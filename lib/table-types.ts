import { z, ZodSchema, ZodType } from "zod/v4";
import { createInsertSchema } from "drizzle-zod";
import workspaceTable from "@/app/db/schema/workspace";
import formTable from "@/app/db/schema/form";
import formFieldTable from "@/app/db/schema/formField";
import respondentTable from "@/app/db/schema/respondent";
import responsesTable from "@/app/db/schema/responses";

export const insertWorkspaceType = createInsertSchema(workspaceTable);
export const insertFormType = createInsertSchema(formTable);
export const insertFormFieldType = createInsertSchema(formFieldTable);
export const insertRespondentType = createInsertSchema(respondentTable);
export const insertResponsesType = createInsertSchema(responsesTable);

export const validateInputs = async (schema: ZodType, data: any) => {
  try {
    await schema?.parseAsync(data);
  } catch (e) {
    throw e;
  }
};
