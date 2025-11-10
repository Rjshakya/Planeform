import { NodeViewProps } from "@tiptap/core";
import { InsertPageBreakParams } from "./node";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { cn } from "@/lib/utils";

export const PageBreak = (props: NodeViewProps) => {
  const { isThankyouPage } = props?.node?.attrs as InsertPageBreakParams;
  const editor = props?.editor

  return (
    <NodeViewWrapper as={"div"} className={cn(`${editor.isEditable && 'border-2 bg-border/20'} bg-border/5 rounded-md my-8 h-full w-full `)}>
      {/* <div className="w-full flex items-center justify-center border-2 border-dashed rounded-xs my-6 ">
         
      </div> */}
      <NodeViewContent className="p-3 text-xl"/>
    </NodeViewWrapper>
  );
};
