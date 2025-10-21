import { DocumentType, MarkType, NodeType, TextType } from "@tiptap/core";

export type createWorkspaceParams = {
  name: string;
  owner: string;
};

export type JsonDoc =
  | DocumentType<
      Record<string, any> | undefined,
      NodeType<
        string,
        Record<string, any> | undefined,
        any,
        (NodeType<any, any, any, any> | TextType<MarkType<any, any>>)[]
      >[]
    >
  | undefined;
