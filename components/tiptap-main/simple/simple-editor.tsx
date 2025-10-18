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

import { Equal, Voicemail } from "lucide-react";

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
    description:
      "Add a one-line text field — great for names, emails, or short responses.",
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
    description:
      "Add a larger text box for longer responses, feedback, or descriptions.",
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
    description:
      "Add a question where users can select only one answer from multiple options.",
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
    description: "Add a question where users can select more than one answer.",
    icon: <Equal size={16} />,
  },
  {
    title: "add page",
    command: ({ editor, range }) => {
      editor?.chain()?.focus()?.deleteRange(range).setHorizontalRule().run();
    },
  },
]);

export function SimpleEditor({
  content,
  isEditable,
}: {
  parentform: UseFormReturn<FieldValues, any, FieldValues> | null;
  content?: any;
  isEditable?: boolean;
}) {
  const router = useRouter();
  const { formId } = useParams();

  const editorContentRef = React.useRef<HTMLDivElement>(null);

  // form init
  const form = useForm();
  const pathName = usePathname();

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
        class: " ",
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
      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
      TextStyle,
      FontFamily,
      Placeholder.configure({
        placeholder: "Press / to add inputs",
      }),
    ],
    autofocus: true,
    editable: isEditable,
    content: content,
    // onUpdate(props) {
    //   debouncedUpdate(props?.editor);
    // },
  });

  const onSubmit = async (values: any) => {
    if (!formId) return;

    const res = await useFormStore
      .getState()
      .handleSubmit(values, formId as string);
    if (res) {
      router.push(`/thank-you`);
      form.reset();
    }
  };

  // const debouncedUpdate = useDebounceCallBack((editor: Editor) => {
  //   if (!editor) return;
  //   if (formId && !pathName.includes("edit")) {
  //     return;
  //   }
  //   const content = editor?.getJSON();
  //   window.localStorage.setItem("formly-content", JSON.stringify(content));
  // } , 500)

  React.useEffect(() => {
    useEditorStore.setState({ editor: editor });
    useFormStore.setState({ form: form });
  }, [editor, form]);

  if (!editor) {
    return null;
  }

  return (
    <div className="simple-editor-wrapper selection:bg-blue-200/30 dark:selection:bg-blue-700/40">
      <EditorContext.Provider value={{ editor }}>
        {isEditable && <TiptapToolBar editor={editor} />}

        <Form {...form!}>
          <form
            onSubmit={form?.handleSubmit?.(onSubmit)}
            className=" w-full h-full px-2"
          >
            <EditorDragHandle editor={editor} />
            {isEditable ? (
              <SlashCmdProvider>
                <EditorContent
                  editor={editor}
                  role="presentation"
                  className=" max-w-2xl w-full flex flex-col mx-auto  md:px-4 md:py-2 px-2"
                  ref={editorContentRef}
                />

                <SlashCmd.Root editor={editor}>
                  <SlashCmd.Cmd className=" rounded-lg bg-secondary overflow-y-auto z-50 border-2 dark:border-0">
                    <SlashCmd.Empty className="px-4 py-2">
                      No commands available
                    </SlashCmd.Empty>
                    <SlashCmd.List className=" w-72 p-2 max-h-44  overflow-y-auto gap-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                      {suggestions?.map?.((item) => {
                        if (!item || !item.title) return null;
                        return (
                          <SlashCmd.Item
                            value={item?.title}
                            onCommand={(val) => {
                              item?.command?.(val);
                            }}
                            key={item.title}
                            className=""
                          >
                            <div className="flex gap-4 items-start border-0 my-2 py-2 px-2 bg-secondary dark:bg-card/50 rounded-md">
                              <div className="h-full pt-2 pl-1">
                                {item.icon}
                              </div>
                              <div className=" ">
                                <p className="text-md font-medium">
                                  {item.title}
                                </p>
                                <p className=" text-xs font-medium text-muted-foreground mt-2">
                                  {item?.description}
                                </p>
                              </div>
                            </div>
                          </SlashCmd.Item>
                        );
                      })}
                      {/* </ItemGroup> */}
                    </SlashCmd.List>
                  </SlashCmd.Cmd>
                </SlashCmd.Root>
              </SlashCmdProvider>
            ) : (
              <EditorContent
                editor={editor}
                role="presentation"
                className=" max-w-2xl w-full flex flex-col mx-auto  md:px-4 md:py-2 px-2"
                ref={editorContentRef}
              />
            )}
          </form>
        </Form>
      </EditorContext.Provider>
    </div>
  );
}
