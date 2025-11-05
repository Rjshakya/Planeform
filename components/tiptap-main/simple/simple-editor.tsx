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

import { v4 } from "uuid";
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
import { useDebounceCallBack } from "@/hooks/use-Debounce";
import UploadImage from "tiptap-extension-upload-image";
import { ImageExtension, ImageAligner } from "@harshtalks/image-tiptap";
import { apiClient } from "@/lib/axios";
import axios from "axios";
import { fileUploadNode } from "@/components/custom-extensions/file-uplaod/node";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface IformVal {
  name: string;
  value: string;
}

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

  // form init
  const form = useForm();
  const { isLastStep, activeStep, maxStep, handleSubmit } = useFormStore(
    (s) => s
  );

  const uploadFn = async (file: File) => {
    const fileName = file?.name;
    const formData = new FormData();
    formData.append("image", file);
    let url = URL.createObjectURL(file);
    const res = await apiClient.post("/api/file", { fileName });
    if (res?.status === 200) {
      const signedUrl = res?.data?.url?.uploadUrl;
      url = res?.data?.url?.fileUrl;
      console.log(res?.data);

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
        class: `${isEditable && "pb-[20vh]"} flex-1 md:px-12 pt-4`,
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

        // horizontalRule: { HTMLAttributes: { tag: "div" } },
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
      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
      TextStyle,
      FontFamily,
      Placeholder.configure({
        placeholder: "Press / to add inputs",
      }),
      UploadImage.configure({
        uploadFn: uploadFn,
      }),
    ],
    autofocus: true,
    editable: isEditable,
    content: content,
  });

  const handleActiveIndex = React.useCallback(
    (idx: number) => {
      const index = idx < 0 ? 0 : Math.min(maxStep, idx);

      if (isLastStep) return;
      // setActiveStep(index);
      console.log(index, idx);
      console.log(maxStep === index);
      useFormStore.setState({
        activeStep: index,
        isLastStep: maxStep === index,
      });
    },
    [activeStep, maxStep, isLastStep]
  );

  const onSubmit = async (values: FieldValues) => {
    // if (!formId) return;
    console.log(values);

    const isSubmitted = await handleSubmit(values, formId as string);
    handleActiveIndex(activeStep + 1);

    if (isLastStep && isSubmitted) {
      router.push(`/thank-you`);
      form.reset();
    }
  };

  React.useEffect(() => {
    useEditorStore.setState({ editor: editor });
    useFormStore.setState({ form: form });
  }, [editor, form]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full  simple-editor-wrapper selection:bg-blue-200/40 dark:selection:bg-blue-700/40  relative ">
      <EditorContext.Provider value={{ editor }}>
        {isEditable && <TiptapToolBar editor={editor} />}

        <Form {...form!}>
          <form
            onSubmit={form?.handleSubmit?.(onSubmit)}
            className={`w-full h-full px-2 ${isEditable && "max-w-xl"} mx-auto`}
          >
            {isEditable && <EditorDragHandle editor={editor} />}

            {isEditable ? (
              <SlashCmdProvider>
                <EditorContent
                  editor={editor}
                  role="presentation"
                  className=" w-full h-full flex flex-col mx-auto  md:px-4 md:py-2 px-2 mt-18 md:mt-0 relative"
                  ref={editorContentRef}
                />

                <SlashCmd.Root editor={editor}>
                  <SlashCmd.Cmd className="w-[380px] backdrop-blur-3xl rounded-md z-50 border dark:border-0 shadow-xl dark:bg-secondary/30">
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
                              className=" dark:hover:bg-accent/10 hover:bg-accent/30 hover:backdrop-blur-lg  rounded-md border dark:border-border/40 my-1"
                            >
                              <div className="flex gap-4 items-start  my-2 py-2 px-4 ">
                                <div className="h-full pt-2 pl-1">
                                  {item.icon}
                                </div>
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
