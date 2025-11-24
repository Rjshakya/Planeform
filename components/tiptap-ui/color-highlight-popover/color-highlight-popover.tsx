"use client";

import * as React from "react";
import { type Editor } from "@tiptap/react";

// --- Hooks ---
import { useMenuNavigation } from "@/hooks/use-menu-navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// --- Icons ---
import { BanIcon } from "@/components/tiptap-icons/ban-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";

// --- UI Primitives ---




// --- Tiptap UI ---
import type {
  HighlightColor,
  UseColorHighlightConfig,
} from "@/components/tiptap-ui/color-highlight-button";
import {
  ColorHighlightButton,
  pickHighlightColorsByValue,
  useColorHighlight,
} from "@/components/tiptap-ui/color-highlight-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

export interface ColorHighlightPopoverContentProps {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null;
  /**
   * Optional colors to use in the highlight popover.
   * If not provided, defaults to a predefined set of colors.
   */
  colors?: HighlightColor[];
}

export interface ColorHighlightPopoverProps
  extends Omit<any, "type">,
    Pick<
      UseColorHighlightConfig,
      "editor" | "hideWhenUnavailable" | "onApplied"
    > {
  /**
   * Optional colors to use in the highlight popover.
   * If not provided, defaults to a predefined set of colors.
   */
  colors?: HighlightColor[];
}

export const ColorHighlightPopoverButton = React.forwardRef<
  HTMLButtonElement,
  any
>(({ className, children, ...props }, ref) => (
  <Button
    type="button"
    className={className}
    variant={"ghost"}
    aria-label="Highlight text"
    ref={ref}
    {...props}
  >
    {children ?? <HighlighterIcon className="tiptap-button-icon" />}
  </Button>
));

ColorHighlightPopoverButton.displayName = "ColorHighlightPopoverButton";

export function ColorHighlightPopoverContent({
  editor,
  colors = pickHighlightColorsByValue([
    "var(--tt-color-highlight-green)",
    "var(--tt-color-highlight-blue)",
    "var(--tt-color-highlight-red)",
    "var(--tt-color-highlight-purple)",
    "var(--tt-color-highlight-yellow)",
  ]),
}: ColorHighlightPopoverContentProps) {
  const { handleRemoveHighlight } = useColorHighlight({ editor });
  const isMobile = useIsMobile();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const menuItems = React.useMemo(
    () => [...colors, { label: "Remove highlight", value: "none" }],
    [colors]
  );

  const { selectedIndex } = useMenuNavigation({
    containerRef,
    items: menuItems,
    orientation: "both",
    onSelect: (item) => {
      if (!containerRef.current) return false;
      const highlightedElement = containerRef.current.querySelector(
        '[data-highlighted="true"]'
      ) as HTMLElement;
      if (highlightedElement) highlightedElement.click();
      if (item.value === "none") handleRemoveHighlight();
    },
    autoSelectFirstItem: false,
  });

  return (
    <div
      ref={containerRef}
      className=" flex p-1  shadow-none rounded-none"
      style={isMobile ? { boxShadow: "none", border: 0 } : {}}
    >
      {/* <CardContent
        className=" flex items-center  gap-0.5 bg-transparent"
        style={isMobile ? { padding: 0 } : {}}
      > */}
      {colors.map((color, index) => (
        <ColorHighlightButton
          key={color.value}
          editor={editor}
          highlightColor={color.value}
          tooltip={color.value}
          aria-label={`${color.label} highlight color`}
          tabIndex={index === selectedIndex ? 0 : -1}
          data-highlighted={selectedIndex === index}
        />
      ))}

      <Separator />

      <Button
        onClick={handleRemoveHighlight}
        aria-label="Remove highlight"
        variant={"ghost"}
        size={"sm"}
        // tooltip="Remove highlight"
        tabIndex={selectedIndex === colors.length ? 0 : -1}
        type="button"
        role="menuitem"
        data-style="ghost"
        data-highlighted={selectedIndex === colors.length}
      >
        <BanIcon className="tiptap-button-icon" />
      </Button>
      {/* </CardContent> */}
    </div>
  );
}

export function ColorHighlightPopover({
  editor: providedEditor,
  colors = pickHighlightColorsByValue([
    "var(--tt-color-highlight-green)",
    "var(--tt-color-highlight-blue)",
    "var(--tt-color-highlight-red)",
    "var(--tt-color-highlight-purple)",
    "var(--tt-color-highlight-yellow)",
  ]),
  hideWhenUnavailable = false,
  onApplied,
  ...props
}: ColorHighlightPopoverProps) {
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = React.useState(false);
  const { isVisible, canColorHighlight, isActive, label, Icon } =
    useColorHighlight({
      editor,
      hideWhenUnavailable,
      onApplied,
    });

  if (!isVisible) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <ColorHighlightPopoverButton
              disabled={!canColorHighlight}
              data-active-state={isActive ? "on" : "off"}
              data-disabled={!canColorHighlight}
              aria-pressed={isActive}
              aria-label={label}
              tooltip={label}
              {...props}
            >
              <Icon className="tiptap-button-icon" />
            </ColorHighlightPopoverButton>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Highlight</TooltipContent>
      </Tooltip>

      <PopoverContent className=" p-0 w-full " aria-label="Highlight colors">
        <ColorHighlightPopoverContent editor={editor} colors={colors} />
      </PopoverContent>
    </Popover>
  );
}

export default ColorHighlightPopover;
