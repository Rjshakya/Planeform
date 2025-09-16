import { NodeViewProps } from "@tiptap/core";
import { InsertActionButtonParams } from "./node";
import { NodeViewWrapper } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useFormStore } from "@/stores/useformStore";

export const ActionButtonView = (props: NodeViewProps) => {
  const { id, text, type } = props?.node?.attrs as InsertActionButtonParams;
  return (
    <NodeViewWrapper as={"div"}>
      <Button className=" mt-6 py-6 w-28" id={id} type={"submit"}>
        {useFormStore.getState().isSubmitting && (
          <Loader className=" animate-spin" />
        )}

        <p className="">{text}</p>
      </Button>
    </NodeViewWrapper>
  );
};
