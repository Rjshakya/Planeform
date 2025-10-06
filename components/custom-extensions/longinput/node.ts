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
  draggable: true,
  allowGapCursor: true,
  content: "inline*",
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
            content: label
              ? [{ type: "text", text: label}]
              : [{ type: "text", text: "Label:" }],
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(LongInputView);
  },

  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }) => {
        const { selection } = editor.state;
        const { $from, empty } = selection;

        // Check if cursor is at the start of the node content
        if ($from.parent.type.name === this.name && $from.parentOffset === 0) {
          // Delete the entire node
          return editor.commands.deleteNode(this.name);
        }

        return false; // Let default behavior handle it
      },
      Delete: ({ editor }) => {
        const { selection } = editor.state;
        const { $from } = selection;

        // Check if cursor is at the end of the node content
        if (
          $from.parent.type.name === this.name &&
          $from.parentOffset === $from.parent.content.size
        ) {
          // Delete the entire node
          return editor.commands.deleteNode(this.name);
        }

        return false;
      },
    };
  },
});

declare module "@tiptap/core" {
  interface Commands<ReturnType = any> {
    longInput: {
      insertLongInput: (params: InsertLongInputParams) => ReturnType;
    };
  }
}
