import { NodeViewProps } from "@tiptap/core";
import { InsertActionButtonParams } from "./node";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { useFormStore } from "@/stores/useformStore";
import { useCallback, useEffect } from "react";

export const ActionButtonView = (props: NodeViewProps) => {
  const { id, text, type } = props?.node?.attrs as InsertActionButtonParams;
  const { isSubmitting } =
    useFormStore((s) => s);

  return (
    <NodeViewWrapper className={"mt-6"}>
      <Button className="px-6 py-6 " id={id} type={type}>
        {/* {isSubmitting && (
          <div className="">
            <Loader className=" animate-spin" />
          </div>
        )} */}

        <NodeViewContent content="" as="div" className="text-md content " />
        <div>
          {isSubmitting ? <Loader className=" animate-spin" /> : <ArrowRight />}
        </div>
      </Button>
    </NodeViewWrapper>
  );
};
