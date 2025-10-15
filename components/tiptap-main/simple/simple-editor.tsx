"use client";

import * as React from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import {
  Dropcursor,
  Focus,
  Placeholder,
  Selection,
  TrailingNode,
} from "@tiptap/extensions";

// --- UI Primitives ---
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---

import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover";
import { LinkContent } from "@/components/tiptap-ui/link-popover";

import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useIsMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";

// --- Styles ---
import "@/components/tiptap-main/simple/simple-editor.scss";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { shortInputNode } from "@/components/custom-extensions/shortinput/node";
import { longInputNode } from "@/components/custom-extensions/longinput/node";
import {
  multipleChoiceNode,
  optionNode,
} from "@/components/custom-extensions/multiple-choices/node";
import { CustomInputsDropdown } from "@/components/custom-input-dropdown";
import { actionButtonNode } from "@/components/custom-extensions/action-btn/node";
import { useEditorStore } from "@/stores/useEditorStore";
import { Button } from "@/components/ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useFormStore } from "@/stores/useformStore";
import { PreviewForm } from "@/app/dashboard/[workspaceId]/form/create/_components/PreviewForm";
import { TiptapMarkDropdown } from "@/components/tiptap-mark-dropdown";
import { TiptapTextAlignDropdown } from "@/components/tiptap-text-align-dropdown";
import { PublishForm } from "@/app/dashboard/[workspaceId]/form/create/_components/PublishForm";
import { EditForm } from "@/app/dashboard/[workspaceId]/form/edit/[formId]/_components/EditForm";
import { TextStyle, FontFamily } from "@tiptap/extension-text-style";
import { CutomizationPanel } from "@/components/custom-extensions/CutomizationPanel";
import { toast } from "sonner";
import { dateInputNode } from "@/components/custom-extensions/date-input/node";
import { cn } from "@/lib/utils";
import DragHandle from "@tiptap/extension-drag-handle-react";
import {
  Equal,
  GripVertical,
  List,
  ListOrdered,
  Phone,
  Settings,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Node, ResolvedPos } from "@tiptap/pm/model";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Slash,
  enableKeyboardNavigation,
  createSuggestionsItems,
  SlashCmdProvider,
  SlashCmd,
} from "@harshtalks/slash-tiptap";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { v4 } from "uuid";
import { Text } from "lucide-react";

const MainToolbarContent = ({
  onHighlighterClick,
  // onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  const forEditPage = usePathname().includes(`/edit/`);

  return (
    <div className="bg-muted flex px-1 rounded-sm mx-auto  overflow-x-auto overflow-y-hidden pt-2 pb-3 select-none">
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3]} portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList"]}
          portal={isMobile}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TiptapMarkDropdown />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {/* {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />} */}
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* <ToolbarSeparator /> */}

      <ToolbarGroup>
        <TiptapTextAlignDropdown />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <CustomInputsDropdown />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup className="ml-2">
        <PreviewForm />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup className="ml-1">
        {forEditPage ? <EditForm /> : <PublishForm />}
      </ToolbarGroup>

      {/* {isMobile && <ToolbarSeparator />} */}

      <ToolbarGroup>
        <CutomizationPanel />
      </ToolbarGroup>
    </div>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => {
  return (
    <>
      <ToolbarGroup>
        <Button data-style="ghost" onClick={onBack}>
          <ArrowLeftIcon className="tiptap-button-icon" />
          {type === "highlighter" ? (
            <HighlighterIcon className="tiptap-button-icon" />
          ) : (
            <LinkIcon className="tiptap-button-icon" />
          )}
        </Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      {type === "highlighter" ? (
        <ColorHighlightPopoverContent />
      ) : (
        <LinkContent />
      )}
    </>
  );
};

const suggestions = createSuggestionsItems([
  {
    title: "ShortInput",
    searchTerms: ["shortinput", "input", "text", "single line"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertShortInput({
          id: v4(),
          isRequired: true,
          label: "Short Input",
          placeholder: "",
          type: "text",
        })
        .run();
    },
    description: "Insert a short input field",
    icon: <Text />,
  },

  {
    title: "LongInput",
    searchTerms: ["longinput", "input", "text", "single line"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertLongInput({
          id: v4(),
          isRequired: true,
          label: "Long Input",
          placeholder: "",
          rows: 6,
        })
        .run();
    },
    description: "Insert a long input field",
    icon: <Text />,
  },

  {
    title: "Phone Input",
    searchTerms: ["phoneinput", "input", "text", "single line"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertShortInput({
          id: v4(),
          isRequired: true,
          label: "Phone no",
          placeholder: "",
          type: "phone",
        })
        .run();
    },
    description: "Insert a phone no input field",
    icon: <Phone />,
  },

  {
    title: "Single Choice",
    searchTerms: ["single choice", "input", "text", "single line"],
    command: ({ editor, range }) => {
      const id = v4();
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertmultipleChoiceInput({
          id,
          label: "Single Choice",
          type: "single",
        })
        .insertOption({
          parentId: id,
          id: "1",
          label: "1",
          type: "single",
        })
        .insertOption({
          parentId: id,
          id: "2",
          label: "2",
          type: "single",
        })
        .run();
    },
    description: "Insert a single choice input field",
    icon: <Equal />,
  },

  {
    title: "Multiple Choice",
    searchTerms: ["Multiple choice", "input", "text", "single line"],
    command: ({ editor, range }) => {
      const id = v4();
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertmultipleChoiceInput({
          id,
          label: "Multiple Choice",
          type: "multiple",
        })
        .insertOption({
          parentId: id,
          id: "1",
          label: "1",
          type: "multiple",
        })
        .insertOption({
          parentId: id,
          id: "2",
          label: "2",
          type: "multiple",
        })
        .run();
    },
    description: "Insert a multiple choice input field",
    icon: <Equal />,
  },

  {
    title: "Text",
    searchTerms: ["paragraph"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
    description: "Start typing with text",
    icon: <Text />,
  },
  {
    title: "Bullet List",
    searchTerms: ["unordered", "point"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
    description: "Create a simple bullet list",
    icon: <List />,
  },
  {
    title: "Ordered List",
    searchTerms: ["ordered", "point", "numbers"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
    description: "Create a simple ordered list",
    icon: <ListOrdered />,
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
  const isMobile = useIsMobile();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main");
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const editorContentRef = React.useRef<HTMLDivElement>(null);

  // form init
  const form = useForm();

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
        class: "simple-editor min-h-[60vh]",
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
          items: () => suggestions,
        },
      }),
      HorizontalRule,
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
        placeholder: "Press / to see available commands",
      }),
    ],
    autofocus: true,
    editable: isEditable,
    content: content,
  });

  const rect = useCursorVisibility({
    editor: editor ? editor : null,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  const [isInputNode, setIsInputNode] = React.useState(false);
  const [nodePosition, setNodePosition] = React.useState<number | null>(null);
  const [currentNode, setCurrentNode] = React?.useState<any>(null);
  const [openPopover, setOpenPopover] = React.useState(false);
  // editor?.state?.doc?.nodeAt(nodePosition || 0);

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

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  React.useEffect(() => {
    useEditorStore.setState({ editor: editor });
    useFormStore.setState({ form: form });
  }, [editor, form]);

  return (
    <div className="simple-editor-wrapper selection:bg-teal-200/30 dark:selection:bg-teal-700/40">
      <EditorContext.Provider value={{ editor }}>
        {isEditable && (
          <Toolbar
            className={cn(
              " w-full h-20 z-10   mb-2 px-1",
              `${isMobile ? "sticky top-0  pt-2" : "sticky top-0 "}`
            )}
            ref={toolbarRef}
            style={{
              ...(isMobile
                ? {
                    bottom: `calc(100% - ${height - rect.y}px)`,
                  }
                : {}),
            }}
          >
            <div className=" flex flex-wrap items-center gap-2">
              {mobileView === "main" ? (
                <MainToolbarContent
                  onHighlighterClick={() => setMobileView("highlighter")}
                  onLinkClick={() => setMobileView("link")}
                  isMobile={isMobile}
                />
              ) : (
                <MobileToolbarContent
                  type={mobileView === "highlighter" ? "highlighter" : "link"}
                  onBack={() => setMobileView("main")}
                />
              )}
            </div>
          </Toolbar>
        )}

        <Form {...form!}>
          <form
            onSubmit={form?.handleSubmit?.(onSubmit)}
            className=" w-full h-full px-2"
          >
            <DragHandle
              onNodeChange={({ node, pos, editor }) => {
                if (node?.type?.name?.includes("Input")) {
                  setIsInputNode(true);
                  setNodePosition(pos);
                  setCurrentNode(node);
                } else {
                  setIsInputNode(false);
                  setNodePosition(null);
                  setCurrentNode(null);
                }
              }}
              editor={editor!}
              className=""
            >
              <div className="pt-1  pl-5 md:px-2">
                <div
                  onClick={() => setOpenPopover(!openPopover)}
                  className="handler"
                >
                  <Popover open={openPopover} onOpenChange={setOpenPopover}>
                    <PopoverTrigger className=" cursor-pointer">
                      <GripVertical size={16} />
                    </PopoverTrigger>
                    {isInputNode && currentNode && (
                      <PopoverContent className=" w-56  shadow-xl py-2 px-2 grid gap-3 text-sm mx-4">
                        {Object?.entries?.(currentNode?.attrs)?.map?.(
                          (o: any, i) => {
                            if (o?.[0] === "isRequired") {
                              return (
                                <div
                                  key={i}
                                  className="flex items-center justify-between gap-2 w-full"
                                >
                                  <div className=" ">
                                    <span className=" ">{"Required"}</span>
                                  </div>
                                  <div className="">
                                    <Checkbox
                                      checked={o[1]}
                                      onCheckedChange={(c) => {
                                        console.log(
                                          "Node type name:",
                                          currentNode?.type?.name
                                        );
                                        console.log(
                                          "Updating attribute:",
                                          o[1],
                                          "to:",
                                          c
                                        );

                                        editor
                                          ?.chain()
                                          ?.setNodeSelection(nodePosition!)
                                          ?.updateAttributes(
                                            currentNode?.type?.name,
                                            { [o[0]]: c }
                                          )
                                          .run();
                                      }}
                                    />
                                  </div>
                                </div>
                              );
                            }

                            if (o[0] === "placeholder") {
                              return (
                                <div
                                  key={i}
                                  className="flex items-center justify-between gap-6 w-full "
                                >
                                  <div className="w-full flex-1">
                                    {"Placeholder"}
                                  </div>
                                  <Input
                                    className={cn(
                                      "h-5 text-xs md:text-xs rounded-sm",
                                      "focus-visible:outline-none focus-visible:ring-0"
                                    )}
                                    placeholder={o[1]}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();

                                        editor
                                          ?.chain()
                                          .setNodeSelection(nodePosition!)
                                          ?.updateAttributes(
                                            currentNode?.type?.name,
                                            {
                                              [o[0]]: e?.currentTarget?.value,
                                            }
                                          )
                                          .run();
                                      }
                                    }}
                                  />
                                </div>
                              );
                            }
                          }
                        )}
                      </PopoverContent>
                    )}
                  </Popover>
                </div>
              </div>
            </DragHandle>
            <SlashCmdProvider>
              <EditorContent
                editor={editor}
                role="presentation"
                className=" max-w-2xl w-full flex flex-col mx-auto mt-8 md:px-4 md:py-2 py-6 "
                ref={editorContentRef}
              />

              <SlashCmd.Root editor={editor}>
                <SlashCmd.Cmd>
                  <SlashCmd.Empty>No commands available</SlashCmd.Empty>
                  <SlashCmd.List className="">
                    <ItemGroup className="bg-popover w-72 p-2 rounded-md max-h-40 overflow-y-auto gap-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                      {suggestions.map((item) => {
                        return (
                          <SlashCmd.Item
                            value={item.title}
                            onCommand={(val) => {
                              item.command(val);
                            }}
                            key={item.title}
                          >
                            <Item
                              key={item.title}
                              variant={"outline"}
                              size={"sm"}
                              className=" w-full"
                            >
                              <ItemMedia className=" size-4">
                                {item.icon}
                              </ItemMedia>
                              <ItemContent>
                                <ItemTitle>{item?.title}</ItemTitle>
                                <ItemDescription>
                                  {item?.description}
                                </ItemDescription>
                              </ItemContent>
                            </Item>
                          </SlashCmd.Item>
                        );
                      })}
                    </ItemGroup>
                  </SlashCmd.List>
                </SlashCmd.Cmd>
              </SlashCmd.Root>
            </SlashCmdProvider>
          </form>
        </Form>
      </EditorContext.Provider>
    </div>
  );
}
