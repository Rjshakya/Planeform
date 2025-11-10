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
            content:[  { type: "paragraph", content:[{type:"text" , text:"thankyou page"}] }]
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(PageBreak);
  },

  onCreate({ editor }) {
    const actionBtns = editor.$nodes("actionButton");
    actionBtns?.forEach((btn, i) => {
      if (i === actionBtns.length - 1) {
        return;
      }
      btn.content = "next";
    });
  },


});

declare module "@tiptap/core" {
  interface Commands<ReturnType = any> {
    pageBreak: {
      insertPageBreak: (params: InsertPageBreakParams) => ReturnType;
    };
  }
}
