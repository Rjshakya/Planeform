import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { UseFormReturn } from "react-hook-form";
import { v4 } from "uuid";
import { MultipleChoiceView } from "./View";

export interface Ioptions {
  value: string;
  id:number
}

export interface InsertMultipleChoiceParams {
  id: string;
  label: string;
  type: string;
  form: UseFormReturn;
  options: Ioptions[];
}

export const multipleChoiceNode = Node.create({
  name: "multipleChoiceInput",
  group: "block",
  // atom: true,

  draggable: true,
  // allowGapCursor: true,
  selectable: true,
  addAttributes() {
    return {
      id: { default: v4() },
      label: { default: "Label:" },
      type: { default: "multiple" },
      isRequired: { default: true },
      form: { default: null },
      options: { default: [{ value: "option-1" }] },
    };
  },

  parseHTML() {
    return [
      {
        tag: "multipleChoice-input",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["multipleChoice-input", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      insertmultipleChoiceInput:
        ({ label, id, type,  form, options }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: "multipleChoiceInput",
            attrs: { label, id, type,  form, options },
          });
        },
    };
  },

    addNodeView() {
      return ReactNodeViewRenderer(MultipleChoiceView);
    },
});

declare module "@tiptap/core" {
  interface Commands<ReturnType = any> {
    multipleChoice: {
      insertmultipleChoiceInput: (
        params: InsertMultipleChoiceParams
      ) => ReturnType;
    };
  }
}
