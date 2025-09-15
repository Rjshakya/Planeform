import { NodeViewProps } from "@tiptap/core";
import { InsertActionButtonParams } from "./node";
import { NodeViewWrapper } from "@tiptap/react";
import { Button } from "@/components/ui/button";

export const ActionButtonView = (props: NodeViewProps) => {
  const { id, text, type } = props?.node?.attrs as InsertActionButtonParams;
  return (
    <NodeViewWrapper as={"div"}>
      <Button size={"lg"} className=" mt-6" id={id} type={"submit"}>
        {text}
      </Button>
    </NodeViewWrapper>
  );
};
