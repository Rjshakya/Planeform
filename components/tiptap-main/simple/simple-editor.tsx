"use client";

import * as React from "react";
import { Editor, EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Focus, Placeholder, Selection } from "@tiptap/extensions";

import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { shortInputNode } from "@/components/custom-extensions/shortinput/node";
import { longInputNode } from "@/components/custom-extensions/longinput/node";
import {
  multipleChoiceNode,
  optionNode,
} from "@/components/custom-extensions/multiple-choices/node";

import { actionButtonNode } from "@/components/custom-extensions/action-btn/node";
import { useEditorStore } from "@/stores/useEditorStore";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useFormStore } from "@/stores/useformStore";
import { TextStyle, FontFamily } from "@tiptap/extension-text-style";

import { dateInputNode } from "@/components/custom-extensions/date-input/node";

import {
  CalendarDays,
  Equal,
  FilePlus,
  ImagePlus,
  Plus,
  SendHorizontal,
  Voicemail,
} from "lucide-react";

import {
  Slash,
  enableKeyboardNavigation,
  createSuggestionsItems,
  SlashCmdProvider,
  SlashCmd,
} from "@harshtalks/slash-tiptap";

import { v4, v7 } from "uuid";
import { Text } from "lucide-react";
import { TiptapToolBar } from "./main-toolbar";
import { EditorDragHandle } from "./drag-handle";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
// import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import UploadImage from "tiptap-extension-upload-image";
import { apiClient } from "@/lib/axios";
import axios from "axios";
import { fileUploadNode } from "@/components/custom-extensions/file-uplaod/node";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PageBreakNode } from "@/components/custom-extensions/page-break/node";
import { toast } from "sonner";

const suggestions = createSuggestionsItems([
  {
    title: "Short Answer",
    searchTerms: [
      "short",
      "text",
      "single line",
      "name",
      "email",
      "short answer",
    ],
    command: ({ editor, range }) => {
      editor
        ?.chain()
        ?.focus()
        ?.deleteRange(range)
        .insertShortInput({
          id: v4(),
          isRequired: true,
          label: "Short Answer",
          placeholder: "",
          type: "text",
        })
        .run();
    },
    description: "Add a one-line text field",
    icon: <Text size={16} />,
  },

  {
    title: "Long Answer",
    searchTerms: ["long", "paragraph", "text area", "feedback", "description"],
    command: ({ editor, range }) => {
      editor
        ?.chain()
        ?.focus()
        ?.deleteRange(range)
        ?.insertLongInput({
          id: v4(),
          isRequired: true,
          label: "Long Answer",
          placeholder: "",
          rows: 6,
        })
        .run();
    },
    description: "Add a larger text box for longer responses",
    icon: <Text size={16} />,
  },

  {
    title: "Phone Number",
    searchTerms: ["phone", "contact", "number", "mobile"],
    command: ({ editor, range }) => {
      editor
        ?.chain()
        ?.focus()
        ?.deleteRange(range)
        ?.insertShortInput({
          id: v4(),
          isRequired: true,
          label: "Phone Number",
          placeholder: "",
          type: "phone",
        })
        .run();
    },
    description: "Add a field for collecting phone numbers from users.",
    icon: <Voicemail size={16} />,
  },

  {
    title: "Date",
    command: ({ editor, range }) => {
      const id = v4();
      editor
        ?.chain()
        ?.focus()
        ?.deleteRange(range)
        ?.insertDateInput({
          id,
          isRequired: true,
          label: "Date",
          placeholder: "date",
          type: "Date",
        })
        ?.run();
    },
    description: "Add a field for taking dates from users",
    searchTerms: ["date", "date-input", "birth of date"],
    icon: <CalendarDays size={16} />,
  },

  {
    title: "Single Choice",
    searchTerms: ["single choice", "radio", "select one", "yes no", "option"],
    command: ({ editor, range }) => {
      const id = v4();
      editor
        ?.chain()
        ?.focus()
        ?.deleteRange(range)
        .insertmultipleChoiceInput({
          id,
          label: "Single Choice",
          type: "single",
        })
        .insertOption({
          parentId: id,
          id: "1",
          label: "Option 1",
          type: "single",
        })
        .insertOption({
          parentId: id,
          id: "2",
          label: "Option 2",
          type: "single",
        })
        .run();
    },
    description: "Add a question where users can select only one answer",
    icon: <Equal size={16} />,
  },

  {
    title: "Multiple Choice",
    searchTerms: [
      "multiple choice",
      "checkbox",
      "select many",
      "choose all",
      "options",
    ],
    command: ({ editor, range }) => {
      const id = v4();
      editor
        ?.chain()
        ?.focus()
        ?.deleteRange(range)
        ?.insertmultipleChoiceInput({
          id,
          label: "Multiple Choice",
          type: "multiple",
        })
        .insertOption({
          parentId: id,
          id: "1",
          label: "Option 1",
          type: "multiple",
        })
        ?.insertOption({
          parentId: id,
          id: "2",
          label: "Option 2",
          type: "multiple",
        })
        ?.run();
    },
    description: "Add a question where users can select multiple answer.",
    icon: <Equal size={16} />,
  },
  {
    title: "Add page",
    command: ({ editor, range }) => {
      editor
        ?.chain()
        ?.focus()
        ?.deleteRange(range)
        .setHorizontalRule()
        .insertLongInput({
          id: v4(),
          isRequired: true,
          label: "Ask anything:",
          placeholder: "Type anything here",
          rows: 4,
        })
        .insertActionButton({ id: v4(), text: "submit", type: "submit" })
        .run();

      const actionBtns = editor.$nodes("actionButton");
      actionBtns?.forEach((btn, i) => {
        if (i === actionBtns.length - 1) {
          return;
        }
        btn.content = "next";
      });
    },
    description: "Add new page for multi-step forms",
    icon: <FilePlus size={16} />,
    searchTerms: [
      "add page",
      "page",
      "break",
      "new page",
      "multi-step",
      "step",
    ],
  },
  {
    title: "Submit button",
    command: ({ editor, range }) => {
      editor
        ?.chain()
        ?.focus()
        ?.deleteRange(range)
        .insertActionButton({ id: v4(), text: "Submit", type: "submit" })
        .run();
    },
    description: "Add Submit button",
    icon: <SendHorizontal size={16} />,
    searchTerms: ["submit", "button", "action button"],
  },
  {
    title: "Add image",
    command: ({ editor, range }) => {
      editor.chain().focus().addImage().run();
    },
    description: "Add images or brand assets in your form",
    icon: <ImagePlus size={16} />,
    searchTerms: ["image", "assets", "brand"],
  },
  {
    title: "Add option",
    command: ({ editor, range }) => {
      const { from } = editor.state.selection;
      const optionNodes = editor.$nodes("optionNode");

      // Filter nodes that are before or contain the cursor, get the last one
      if (optionNodes) {
        const closestNode = optionNodes
          .filter(({ pos, node }) => pos <= from)
          .sort((a, b) => b.pos - a.pos)[0];

        const { parentId, type } = closestNode?.node.attrs;
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertOption({ id: "option", label: "option", parentId, type })
          .run();
        console.log(closestNode?.node.attrs);
      }
    },
    description: "Add new option for multiple choice or single choice",
    icon: <Plus size={16} />,
  },
  {
    title: "File Upload ",
    command: ({ editor, range }) => {
      editor
        ?.chain()
        ?.focus()
        ?.deleteRange(range)
        ?.insertFileUploadInput({
          id: v4(),
          isRequired: true,
          label: "upload file",
          type: "multiple",
          maxFiles: 1,
          maxSize: 5 * 1024 * 1024,
          accept: "*",
        })
        .run();
    },
    description: "Add a file upload field to collect files from users",
    icon: <FilePlus size={16} />,
    searchTerms: ["file upload", "upload", "file", "attachment"],
  },
  {
    title: "Thank-you Page",
    command: ({ editor, range }) => {
      const existings = editor?.$node("pageBreak");
      if (existings?.pos) {
        toast("you can have only one thankyou - page");
        return;
      }

      editor
        ?.chain()
        ?.focus()
        ?.deleteRange(range)
        ?.insertPageBreak({ isThankyouPage: true })
        ?.run();
    },
    description: "Add a custom thankyou page",
    icon: (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 fill-foreground"
          viewBox="0 0 24 24"
          // fill="#121212"
        >
          <g clipPath="url(#clip0_3261_13092)">
            <path
              opacity="0.4"
              d="M17.69 4.30995V12.32L12.54 15.89L11.35 16.25L10.45 16.05L5.01001 12.32V4.30995C5.01001 2.72995 6.28001 1.44995 7.86001 1.44995H14.84C16.42 1.44995 17.69 2.72995 17.69 4.30995Z"
              fill="white"
              style={{ fill: "var(--fillg)" }}
            />
            <path
              d="M14.5101 7.57993C14.5101 9.44993 11.4001 10.9699 11.3501 10.9699C11.2901 10.9699 8.18005 9.44993 8.18005 7.57993C8.18005 6.66993 8.93005 5.67993 10.0401 5.67993C10.6801 5.67993 11.1001 5.96993 11.3501 6.23993C11.5901 5.96993 12.0101 5.67993 12.6501 5.67993C13.7701 5.67993 14.5101 6.65993 14.5101 7.57993Z"
              fill="white"
              style={{ fill: "var(--fillg)" }}
            />
            <path
              d="M22.88 19.0699C22.88 19.1399 22.84 19.2999 22.65 19.3599L21.67 19.6299C20.82 19.8599 20.18 20.4999 19.95 21.3499L19.69 22.3099C19.63 22.5299 19.46 22.5499 19.38 22.5499C19.3 22.5499 19.13 22.5299 19.07 22.3099L18.81 21.3399C18.58 20.4999 17.93 19.8599 17.09 19.6299L16.12 19.3699C15.91 19.3099 15.89 19.1299 15.89 19.0599C15.89 18.9799 15.91 18.7999 16.12 18.7399L17.1 18.4799C17.94 18.2399 18.58 17.5999 18.81 16.7599L19.09 15.7399C19.16 15.5699 19.32 15.5399 19.38 15.5399C19.44 15.5399 19.61 15.5599 19.67 15.7199L19.95 16.7499C20.18 17.5899 20.83 18.2299 21.67 18.4699L22.67 18.7499C22.87 18.8299 22.88 19.0099 22.88 19.0699Z"
              fill="white"
              style={{ fill: "var(--fillg)" }}
            />
            <path
              d="M21.58 9.80994V17.3899C21.25 17.1999 20.99 16.8899 20.9 16.5099L20.59 15.3899C20.4 14.8899 19.96 14.5499 19.39 14.5499C18.84 14.5499 18.35 14.8799 18.17 15.3799L18.1 15.5499L17.85 16.4999C17.71 16.9999 17.34 17.3699 16.83 17.5199L15.86 17.7699C15.27 17.9399 14.89 18.4399 14.89 19.0499C14.89 19.6599 15.28 20.1599 15.85 20.3199L16.83 20.5899C17.18 20.6799 17.46 20.9099 17.65 21.1999H2.89C1.91 21.1999 1.12 20.3899 1.12 19.3999C1.12 19.3999 1.13 9.59994 1.13 9.56994C1.16 9.11994 1.35 8.68994 1.69 8.37994L5.01 5.30994V7.25994L2.66 9.42994C2.55 9.52994 2.54 9.63994 2.55 9.69994C2.55 9.76994 2.58 9.88994 2.7 9.96994L5.01 11.5299L10.57 15.2999C10.77 15.4399 11.02 15.5199 11.27 15.5399C11.57 15.5599 11.89 15.4699 12.15 15.2999L17.69 11.5399L20.01 9.96994C20.13 9.88994 20.15 9.76994 20.16 9.70994C20.16 9.64994 20.16 9.52994 20.05 9.43994L17.69 7.29994V5.37994C17.69 5.37994 17.73 5.39994 17.75 5.41994L21 8.37994C21.41 8.73994 21.62 9.25994 21.58 9.80994Z"
              fill="white"
              style={{ fill: "var(--fillg)" }}
            />
          </g>
          <defs>
            <clipPath id="clip0_3261_13092">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    ),
  },
]);

export function SimpleEditor({
  content,
  isEditable,
}: {
  // parentform: UseFormReturn<FieldValues, any, FieldValues> | null;
  content?: any;
  isEditable?: boolean;
}) {
  const router = useRouter();
  const { formId } = useParams();

  const editorContentRef = React.useRef<HTMLDivElement>(null);
  const { isLastStep, activeStep, maxStep, handleSubmit, getHookForm } =
    useFormStore((s) => s);

  // form init
  const form = getHookForm();

  const uploadFn = async (file: File) => {
    const fileName = file?.name;
    let url = URL.createObjectURL(file);
    const res = await apiClient.post("/api/file", { fileName });
    if (res?.status === 200) {
      const signedUrl = res?.data?.url?.uploadUrl;
      url = res?.data?.url?.fileUrl;
      await axios.put(signedUrl, file);
    }
    return url;
  };

  // editor init
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "on",
        autocorrect: "off",
        autocapitalize: "on",
        "aria-label": "Main content area, start typing to enter text.",
        class: `${isEditable && "pb-0"} flex-1 md:px-12 pt-4`,
      },
      handleDOMEvents: {
        keydown: (_, v) => enableKeyboardNavigation(v),
      },
    },
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: true,
          enableClickSelection: true,
        },
        trailingNode: false,
      }) as any,
      Slash.configure({
        suggestion: {
          items: ({ query, editor }) => {
            if (!query) {
              return suggestions;
            }

            if (!editor) return [];

            const lowerQuery = query.toLowerCase();
            const filtered = suggestions.filter((item) => {
              if (!item || !item.title) {
                console.warn("Invalid item:", item);
                return false;
              }
              return (
                item.title.toLowerCase().includes(lowerQuery) ||
                item.searchTerms?.some((term) =>
                  term.toLowerCase().includes(lowerQuery)
                )
              );
            });

            return filtered;
          },
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      shortInputNode,
      longInputNode,
      multipleChoiceNode,
      optionNode,
      dateInputNode,
      actionButtonNode,
      fileUploadNode,
      PageBreakNode,
      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
      TextStyle,
      FontFamily,
      Placeholder.configure({
        placeholder: "Press / to open menu",
      }),
      UploadImage.configure({
        uploadFn: uploadFn,
      }),
    ],
    autofocus: true,
    editable: isEditable,
    content: content,
    onUpdate(props) {
      setTimeout(() => {
        const json = props.editor.getJSON();
        useEditorStore.setState({ editedContent: json });
      }, 1000);
    },
  });

  const handleActiveIndex = (idx: number) => {
    const index = idx < 0 ? 0 : Math.min(maxStep, idx);

    if (useFormStore.getState().isLastStep) {
      return;
    }

    useFormStore.setState({
      activeStep: idx,
      isLastStep: maxStep === idx,
    });
  };

  const handleOnSubmit = async (values: FieldValues) => {
    handleActiveIndex(activeStep + 1);
    const isSubmitted = await handleSubmit(
      values,
      formId as string,
      activeStep
    );

    if (useFormStore.getState().isLastStep && isSubmitted) {
      // router.push(`/thank-you`);
      useFormStore.setState({ activeStep: activeStep + 1 });
      form?.reset();
      return;
    }
  };

  React.useEffect(() => {
    useEditorStore.setState({ editor: editor });
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full   simple-editor-wrapper selection:bg-blue-200/40 dark:selection:bg-blue-700/40  relative ">
      <EditorContext.Provider value={{ editor }}>
        {isEditable && <TiptapToolBar editor={editor} />}

        <Form {...form!}>
          <form
            onSubmit={form?.handleSubmit?.(handleOnSubmit)}
            className={`w-full h-full px-2 ${
              isEditable && "max-w-3xl"
            } mx-auto`}
          >
            {isEditable && <EditorDragHandle editor={editor} />}

            {isEditable ? (
              <SlashCmdProvider>
                <EditorContent
                  editor={editor}
                  role="presentation"
                  className=" w-full h-full flex flex-col mx-auto  sm:px-4 sm:mt-0  px-2 mt-16 pb-10  relative"
                  ref={editorContentRef}
                />

                <SlashCmd.Root editor={editor}>
                  <SlashCmd.Cmd className="w-[360px] bg-popover backdrop-blur-2xl rounded-md z-50 border dark:border-0 shadow-xl dark:bg-popover">
                    <SlashCmd.Empty className="px-4 py-2">
                      No commands available
                    </SlashCmd.Empty>
                    <ScrollArea className="h-[200px]">
                      <SlashCmd.List className=" w-full grid gap-4 px-2 py-1 rounded-md ">
                        {suggestions?.map?.((item) => {
                          if (!item || !item.title) return null;
                          return (
                            <SlashCmd.Item
                              value={item?.title}
                              onCommand={(val) => {
                                item?.command?.(val);
                              }}
                              key={item.title}
                              className=" dark:hover:bg-accent/30 hover:bg-accent/30 hover:backdrop-blur-lg  rounded-md  dark:border-border/40 my-1"
                            >
                              <div className="flex gap-6 items-start  my-2 py-2 px-4 ">
                                {/* <div className="h-full pt-1 ">
                                  {item.icon}
                                </div> */}
                                <Button variant={"secondary"} size={"icon"}>
                                  {item.icon}
                                </Button>
                                <div className=" ">
                                  <p className="text-sm font-medium">
                                    {item.title}
                                  </p>
                                  <p className=" text-xs font-medium text-muted-foreground mt-1">
                                    {item?.description}
                                  </p>
                                </div>
                              </div>
                            </SlashCmd.Item>
                          );
                        })}

                        {/* </ItemGroup> */}
                      </SlashCmd.List>
                      <ScrollBar orientation="vertical" />
                    </ScrollArea>
                  </SlashCmd.Cmd>
                </SlashCmd.Root>
              </SlashCmdProvider>
            ) : (
              <EditorContent
                editor={editor}
                role="presentation"
                className="  w-full h-full flex flex-col mx-auto  md:px-1"
                ref={editorContentRef}
              />
            )}
          </form>
        </Form>
      </EditorContext.Provider>
    </div>
  );
}
