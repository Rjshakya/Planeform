import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { v4 } from "uuid";
import { FIleUploadInputView } from "./View";

export interface InsertFileUploadParams {
  label: string;
  id: string;
  type: string;
  isRequired: boolean;
  maxFiles: number;
  maxSize: number;
}

export const fileUploadNode = Node.create({
  name: "fileUploadInput",
  group: "block",
  draggable: true,
  allowGapCursor: true,
  content: "inline*",
  addAttributes() {
    return {
      id: { default: v4() },
      label: { default: "Upload image" },
      isRequired: { default: true },
      type: { default: "single" },
      maxFiles: { default: 2 },
      maxSize: { default: 5 * 1024 * 1024 },
    };
  },

  parseHTML() {
    return [
      {
        tag: "fileUploadInput",
        getAttrs: (element) => {
          if (typeof element === "string") return {};

          return {
            id: element.getAttribute("data-id") || v4(),
            label: element.getAttribute("data-label") || "Label:",
            type: element.getAttribute("data-type") || "multiple",
            isRequired: element.getAttribute("data-required") === "true",
            maxFiles: Number(element.getAttribute("data-max-files")) || 2,
            maxSize:
              Number(element.getAttribute("data-max-size")) || 5 * 1024 * 1024,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      "short-input",
      mergeAttributes(HTMLAttributes, {
        "data-id": node.attrs.id,
        "data-label": node.attrs.label,
        "data-type": node.attrs.type,
        "data-required": node.attrs.isRequired,
        "data-max-files": node.attrs.maxFiles,
        "data-max-size": node.attrs.maxSize,
      }),
      0,
    ];
  },

  addCommands() {
    return {
      insertFileUploadInput:
        ({ id, isRequired, label, type, maxFiles, maxSize }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: "fileUploadInput",
            attrs: { id, isRequired, label, type, maxFiles, maxSize },
            content: label
              ? [{ type: "text", text: label }]
              : [{ type: "text", text: "Upload image" }],
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(FIleUploadInputView);
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
    fileploadInput: {
      insertFileUploadInput: (params: InsertFileUploadParams) => ReturnType;
    };
  }
}
