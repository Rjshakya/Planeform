import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { v4 } from "uuid";
import { ActionButtonView } from "./View";

export interface InsertActionButtonParams {
  id: string;
  type: "submit" | "reset" | "button";
  text: string;
}

export const actionButtonNode = Node.create({
  name: "actionButton",
  draggable: true,
  group: "block",
  allowGapCursor: true,
  content: "inline*",
  addAttributes() {
    return {
      id: { default: v4() },
      type: { default: "submit" },
      text: { default: "submit" },
    };
  },

  parseHTML() {
    return [
      {
        tag: "action-button",
        getAttrs: (element) => {
          if (typeof element === "string") return {};

          return {
            id: element.getAttribute("data-id") || v4(),
            type: element.getAttribute("data-type") || "text",
            text: element.getAttribute("data-text") || "submit",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      "action-button",
      mergeAttributes(HTMLAttributes, {
        "data-id": node.attrs.id,
        "data-type": node.attrs.type,
        "data-text": node.attrs.text,
      }),
      0,
    ];
  },

  addCommands() {
    return {
      insertActionButton(params) {
        return ({ commands }) => {
          return commands.insertContent({
            type: "actionButton",
            attrs: { ...params },
            content: [{ type: "text", text: params?.text || "Submit" }],
          });
        };
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ActionButtonView);
  },
});

declare module "@tiptap/core" {
  interface Commands<ReturnType = any> {
    actionButton: {
      insertActionButton: (params: InsertActionButtonParams) => ReturnType;
    };
  }
}
