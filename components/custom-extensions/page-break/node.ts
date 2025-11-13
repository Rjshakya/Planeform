import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { PageBreak } from "./View";

export interface InsertPageBreakParams {
  isThankyouPage: boolean;
}

export const PageBreakNode = Node.create({
  name: "pageBreak",
  group: "block",
  draggable: true,
  allowGapCursor: true,
  content: "block*",
  addAttributes() {
    return {
      isThankyouPage: { default: false },
    };
  },

  parseHTML() {
    return [
      {
        tag: "pageBreak",
        getAttrs(node) {
          if (typeof node === "string") return {};

          return {
            isThankyouPage: node.getAttribute("data-is-thankyou-page") || false,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      "pageBreak",
      mergeAttributes(HTMLAttributes, {
        "data-is-thankyou-page": node.attrs?.isThankyouPage,
      }),
    ];
  },

  addCommands() {
    return {
      insertPageBreak:
        ({ isThankyouPage }) =>
        ({ commands, editor }) => {
          return commands.insertContent({
            type: "pageBreak",
            attrs: { isThankyouPage },
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "thankyou page" }],
              },
            ],
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(PageBreak);
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
    pageBreak: {
      insertPageBreak: (params: InsertPageBreakParams) => ReturnType;
    };
  }
}
