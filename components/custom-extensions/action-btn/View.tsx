import { NodeViewProps } from "@tiptap/core";
import { InsertActionButtonParams } from "./node";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useFormStore } from "@/stores/useformStore";

export const ActionButtonView = (props: NodeViewProps) => {
  const { id, text, type } = props?.node?.attrs as InsertActionButtonParams;
  const { isSubmitting } = useFormStore((s) => s);
  return (
    <NodeViewWrapper className={"mt-6"}>
      <Button className="px-6 py-6 w-full" id={id} type={"submit"}>
        {isSubmitting && (
          <div className="">
            <Loader className=" animate-spin" />
          </div>
        )}

        <NodeViewContent as="div" className="text-md content " />
      </Button>
    </NodeViewWrapper>
  );
};
