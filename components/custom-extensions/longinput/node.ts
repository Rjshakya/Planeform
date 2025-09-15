import { mergeAttributes, Node } from "@tiptap/core";
import { UseFormReturn } from "react-hook-form";
import { v4 } from "uuid";
import { LongInputView } from "./View";
import { ReactNodeViewRenderer } from "@tiptap/react";

export interface InsertLongInputParams {
  label: string;
  id: string;
  isRequired: boolean;
  placeholder: string;
  rows: number;
}

export const longInputNode = Node.create({
  name: "LongInput",
  group: "block",
  // atom: true,

  draggable: true,
  // allowGapCursor: true,
  selectable: true,
  addAttributes() {
    return {
      id: { default: v4() },
      label: { default: "Label:" },
      placeholder: { default: "" },
      isRequired: { default: true },
      rows: { default: 8 },
    };
  },

  parseHTML() {
    return [
      {
        tag: "long-input",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["long-input", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      insertLongInput:
        ({ label, id, isRequired, placeholder, rows }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: "LongInput",
            attrs: {
              label,
              id,
              isRequired,
              placeholder,
              rows,
            },
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(LongInputView);
  },
});

declare module "@tiptap/core" {
  interface Commands<ReturnType = any> {
    longInput: {
      insertLongInput: (params: InsertLongInputParams) => ReturnType;
    };
  }
}
