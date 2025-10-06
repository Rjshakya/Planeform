import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { v4 } from "uuid";
import { ActionButtonView } from "./View";

export interface InsertActionButtonParams {
  id: string;
  type: string;
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
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["action-button", mergeAttributes(HTMLAttributes)];
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
