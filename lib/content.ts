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
  ],
  attrs: {},
} satisfies JsonDoc;

export const thankyouPageContent = {
  type: "pageBreak",
  attrs: {
    isThankyouPage: true,
  },
  content: [
    {
      type: "paragraph",
      attrs: {
        textAlign: "center",
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "textStyle",
              attrs: {
                fontFamily: "var(--font-playfair-display)",
              },
            },
          ],
          text: "    ",
        },
        {
          type: "text",
          marks: [
            {
              type: "textStyle",
              attrs: {
                fontFamily: "var(--font-playfair-display)",
              },
            },
            {
              type: "italic",
            },
          ],
          text: "Thankyou for responding",
        },
      ],
    },
  ],
};
