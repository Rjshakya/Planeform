import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { UseFormReturn } from "react-hook-form";
import { v4 } from "uuid";
import { MultipleChoiceView, Option } from "./View";

export interface Ioptions {
  label: string;
  id: string;
  parentId: string;
  type: string;
}

export interface InsertMultipleChoiceParams {
  id: string;
  label: string;
  type: string;
}

export const multipleChoiceNode = Node.create({
  name: "multipleChoiceInput",
  group: "block",
  draggable: true,
  allowGapCursor: true,
  content: "inline*",
  isolating: true,
  addAttributes() {
    return {
      id: { default: v4() },
      label: { default: "Label:" },
      type: { default: "multiple" },
      isRequired: { default: true },
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
        ({ label, id, type }) =>
        ({ commands }) => {
          return commands?.insertContent({
            type: "multipleChoiceInput",
            attrs: { label, id, type },
            content: [{ type: "text", text: label || "Question:" }],
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(MultipleChoiceView);
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
    multipleChoice: {
      insertmultipleChoiceInput: (
        params: InsertMultipleChoiceParams
      ) => ReturnType;
    };
  }
}

export const optionNode = Node.create({
  name: "optionNode",
  group: "block",
  draggable: true,
  allowGapCursor: true,
  content: "inline*",

  addAttributes() {
    return {
      id: { default: "id" },
      label: { default: "Label:" },
      parentId: { default: "parentId" },
      type: { default: "single" },
    };
  },

  parseHTML() {
    return [
      {
        tag: "option-node",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["option-node", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      insertOption:
        ({ label, id, parentId, type }) =>
        ({ commands }) => {
          return commands?.insertContent({
            type: "optionNode",
            attrs: { label, id, parentId, type },
            content: [{ type: "text", text: label || "Question:" }],
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(Option);
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
    multipleChoiceOption: {
      insertOption: (params: Ioptions) => ReturnType;
      addOptionToMultipleChoice: () => ReturnType;
    };
  }
}
