"use client";
import { NodeViewProps } from "@tiptap/core";
import { InsertActionButtonParams } from "./node";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { useFormStore } from "@/stores/useformStore";
import { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/stores/useEditorStore";

export const ActionButtonView = (props: NodeViewProps) => {
  const { id, text, type } = props?.node?.attrs as InsertActionButtonParams;
  const { isSubmitting } = useFormStore((s) => s);
  const { actionBtnColor } = useEditorStore((s) => s);

  // bg-pink-400 ring-pink-400 hover:bg-pink-400
  return (
    <NodeViewWrapper className={"mt-3  "}>
      <Button
        size={"sm"}
        className={cn(
          `px-4 py-[18px] hover:bg-[${actionBtnColor}]/70  `
          // `ring-[${actionBtnColor}]`
        )}
        id={id}
        type={"submit"}
        style={
          {
            backgroundColor: actionBtnColor || undefined,
            "--tw-ring-color": actionBtnColor,
          } as React.CSSProperties & Record<`--tw-ring-color`, string>
        }
      >
        <NodeViewContent content="" as="div" className="text-md content " />
        <div>
          {isSubmitting ? <Loader className=" animate-spin" /> : <ArrowRight />}
        </div>
      </Button>
    </NodeViewWrapper>
  );
};
