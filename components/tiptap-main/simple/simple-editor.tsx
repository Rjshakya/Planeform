"use client";

import * as React from "react";
import {
  EditorContent,
  EditorContext,
  useCurrentEditor,
  useEditor,
} from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Dropcursor, Focus, Selection, TrailingNode } from "@tiptap/extensions";

// --- UI Primitives ---
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
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

// --- Components ---
// import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

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
import { useEditorState } from "@tiptap/react";
import { CutomizationPanel } from "@/components/custom-extensions/CutomizationPanel";
import { toast } from "sonner";
import { dateInputNode } from "@/components/custom-extensions/date-input/node";

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
    <div className=" bg-card flex p-1 rounded-sm mx-auto  overflow-auto ">
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
        class: "simple-editor min-h-[80vh]",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: true,
          enableClickSelection: true,
        },
      }) as any,
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      ImageUploadNode.configure({
        accept: "png",
      }),
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
      FontFamily.configure({
        types: [
          "heading",
          "paragraph",
          "shortInput",
          "node-multipleChoiceInput",
          "textStyle",
        ],
      }),
      TrailingNode,
    ],
    autofocus: true,
    editable: isEditable,
    content: content,
  });

  const rect = useCursorVisibility({
    editor: editor ? editor : null,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  const [editorIsFocused, setEditorIsFocused] = React.useState(false);

  const onSubmit = async (values: any) => {
    if (!formId) return;

    const res = await useFormStore
      .getState()
      .handleSubmit(values, formId as string);
    if (res) {
      router.push(`/thank-you`);
    }
    form.reset();
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

  React.useEffect(() => {
    if (!isMobile) return;

    const editorContentDiv = editorContentRef?.current;
    const handleFocus = () => {
      setEditorIsFocused(true);

      console.log("in focus");
    };

    editorContentDiv?.addEventListener("focusin", handleFocus);
    editorContentDiv?.addEventListener("focusout", () =>
      setEditorIsFocused(false)
    );

    return () => {
      editorContentDiv?.removeEventListener("focusin", handleFocus);
      editorContentDiv?.removeEventListener("focusout", () =>
        setEditorIsFocused(false)
      );
    };
  }, [editorContentRef?.current, isMobile, mobileView]);

  return (
    <div className="simple-editor-wrapper selection:bg-teal-200/30 dark:selection:bg-teal-700/40">
      <EditorContext.Provider value={{ editor }}>
        {isEditable && (
          <Toolbar
            className=""
            ref={toolbarRef}
            style={{
              ...(isMobile && editorIsFocused
                ? {
                    bottom: `calc(100% - ${height - rect.y}px)`,
                  }
                : { display: "none" }),
            }}
          >
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
          </Toolbar>
        )}

        <Form {...form!}>
          <form
            onSubmit={form?.handleSubmit?.(onSubmit)}
            className=" w-full h-full px-2"
          >
            <EditorContent
              editor={editor}
              role="presentation"
              className=" max-w-2xl w-full flex flex-col mx-auto mt-8 md:px-4 md:py-2 py-6"
              ref={editorContentRef}
            />
          </form>
        </Form>
      </EditorContext.Provider>
    </div>
  );
}
