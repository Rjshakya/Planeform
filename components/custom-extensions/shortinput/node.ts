"use client";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { v4 } from "uuid";
import ShortInput from "./View";

interface InsertShortInputParams {
  label: string;
  id: string;
  type: string;
  isRequired: boolean;
  placeholder: string;
}

// Extend the Commands interface to include your custom command

export const shortInputNode = Node.create({
  name: "shortInput",
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
      type: { default: "text" },
      isRequired: { default: true },
    };
  },

  parseHTML() {
    return [
      {
        tag: "short-input",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["short-input", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      insertShortInput:
        ({ label, id, type, isRequired, placeholder }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: "shortInput",
            attrs: { label, id, type, isRequired, placeholder },
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ShortInput);
  },
});

declare module "@tiptap/core" {
  interface Commands<ReturnType = any> {
    shortInput: {
      insertShortInput: (params: InsertShortInputParams) => ReturnType;
    };
  }
}
