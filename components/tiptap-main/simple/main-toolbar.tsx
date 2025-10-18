import { usePathname } from "next/navigation";
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
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
// import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";
import { CustomInputsDropdown } from "@/components/custom-input-dropdown";
import { TiptapMarkDropdown } from "@/components/tiptap-mark-dropdown";
import { TiptapTextAlignDropdown } from "@/components/tiptap-text-align-dropdown";
import { CutomizationPanel } from "@/components/custom-extensions/CutomizationPanel";
import { PreviewForm } from "@/app/dashboard/[workspaceId]/form/create/_components/PreviewForm";
import { EditForm } from "@/app/dashboard/[workspaceId]/form/edit/[formId]/_components/EditForm";
import { PublishForm } from "@/app/dashboard/[workspaceId]/form/create/_components/PublishForm";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, HighlighterIcon, LinkIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";
import React, { memo } from "react";
import { Editor } from "@tiptap/core";
import { cn } from "@/lib/utils";

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
    <div className="bg-muted flex pr-4 pl-2 rounded-sm mx-auto  overflow-x-auto overflow-y-hidden pt-2 pb-3 select-none">
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />
      <ToolbarGroup>
        <CustomInputsDropdown />
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
        <CutomizationPanel />
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

export const TiptapToolBar = memo(({ editor }: { editor: Editor | null }) => {
  const isMobile = useIsMobile();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main");
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const rect = useCursorVisibility({
    editor: editor ? editor : null,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <Toolbar
      className={cn(
        " w-full h-20 z-10   mb-2 px-1",
        `${isMobile ? "fixed top-0 inset-x-0 z-50" : "sticky top-0 "}`
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
  );
});
