import { v4 } from "uuid";
import { JsonDoc } from "./types";

export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        textAlign: null,
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Simple form",
          attrs: {},
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
    },
    {
      type: "shortInput",
      attrs: {
        id: v4(),
        label: "Short Answer",
        placeholder: "Type anything here",
        type: "text",
        isRequired: true,
      },
      content: [
        {
          type: "text",
          text: "Name",
          attrs: {},
        },
      ],
    },
    {
      type: "actionButton",
      attrs: {
        id: v4(),
        type: "submit",
        text: "Submit",
      },
      content: [
        {
          type: "text",
          text: "Submit",
          attrs: {},
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
    },
  ],
  attrs: {},
} satisfies JsonDoc;
