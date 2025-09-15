import { z, ZodSchema, ZodType } from "zod/v4";
import { createInsertSchema } from "drizzle-zod";
import workspaceTable from "@/app/db/schema/workspace";
import formTable from "@/app/db/schema/form";
import formFieldTable from "@/app/db/schema/formField";
import respondentTable from "@/app/db/schema/respondent";
import responsesTable from "@/app/db/schema/responses";
import { DocumentType, MarkType, NodeType, TextType } from "@tiptap/core";

export const insertWorkspaceType = createInsertSchema(workspaceTable);
export const insertFormType = createInsertSchema(formTable);
export const insertFormFieldType = createInsertSchema(formFieldTable);
export const insertRespondentType = createInsertSchema(respondentTable);
export const insertResponsesType = createInsertSchema(responsesTable);

export type createWorkspaceParams = {
  name: string;
  owner: string;
};

export type JsonDoc = DocumentType<
  Record<string, any> | undefined,
  NodeType<
    string,
    Record<string, any> | undefined,
    any,
    (NodeType<any, any, any, any> | TextType<MarkType<any, any>>)[]
  >[]
> | undefined
