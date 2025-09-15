"use client";

import * as React from "react";

// --- Lib ---
import { parseShortcutKeys } from "@/lib/tiptap-utils";

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// --- Tiptap UI ---
import type { UseColorHighlightConfig } from "@/components/tiptap-ui/color-highlight-button";
import {
  COLOR_HIGHLIGHT_SHORTCUT_KEY,
  useColorHighlight,
} from "@/components/tiptap-ui/color-highlight-button";

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button";

// --- Styles ---
import "@/components/tiptap-ui/color-highlight-button/color-highlight-button.scss";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface ColorHighlightButtonProps
  extends Omit<ButtonProps, "type">,
    UseColorHighlightConfig {
  /**
   * Optional text to display alongside the icon.
   */
  text?: string;
  /**
   * Optional show shortcut keys in the button.
   * @default false
   */
  showShortcut?: boolean;
}

export function ColorHighlightShortcutBadge({
  shortcutKeys = COLOR_HIGHLIGHT_SHORTCUT_KEY,
}: {
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

/**
 * Button component for applying color highlights in a Tiptap editor.
 *
 * For custom button implementations, use the `useColorHighlight` hook instead.
 */
export const ColorHighlightButton = React.forwardRef<
  HTMLButtonElement,
  ColorHighlightButtonProps
>(
  (
    {
      editor: providedEditor,
      highlightColor,
      text,
      hideWhenUnavailable = false,
      onApplied,
      showShortcut = false,
      onClick,
      children,
      style,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const {
      isVisible,
      canColorHighlight,
      isActive,
      handleColorHighlight,
      label,
      shortcutKeys,
    } = useColorHighlight({
      editor,
      highlightColor,
      label: text || `Toggle highlight (${highlightColor})`,
      hideWhenUnavailable,
      onApplied,
    });

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleColorHighlight();
      },
      [handleColorHighlight, onClick]
    );

    const buttonStyle = React.useMemo(
      () =>
        ({
          ...style,
          "--highlight-color": highlightColor,
        } as React.CSSProperties),
      [highlightColor, style]
    );

    if (!isVisible) {
      return null;
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={`${isActive && 'bg-muted'}`}
            type="button"
            variant={"ghost"}
            size={"sm"}
            // data-active-state={isActive ? "on" : "off"}

            disabled={!canColorHighlight}
            data-disabled={!canColorHighlight}
            aria-label={label}
            aria-pressed={isActive}
            // tooltip={label}
            onClick={handleClick}
            // style={buttonStyle}
            {...buttonProps}
            ref={ref}
          >
            {children ?? (
              <>
                <span
                  className={`w-4 h-4 rounded-full`}
                  style={{ backgroundColor: highlightColor }}
                />
                {text && <span className="tiptap-button-text">{text}</span>}
                {showShortcut && (
                  <ColorHighlightShortcutBadge shortcutKeys={shortcutKeys} />
                )}
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{highlightColor?.split("highlight-")[1]?.split(")")[0]}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
);

ColorHighlightButton.displayName = "ColorHighlightButton";
