import { Editor } from "@tiptap/core";
import DragHandle from "@tiptap/extension-drag-handle-react";
import React, { memo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GripVertical, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const EditorDragHandle = memo(function Dragcomp({
  editor,
}: {
  editor: Editor | null;
}) {
  const [isInputNode, setIsInputNode] = React.useState(false);
  const [nodePosition, setNodePosition] = React.useState<number | null>(null);
  const [currentNode, setCurrentNode] = React?.useState<any>(null);
  const [openPopover, setOpenPopover] = React.useState(false);

  return (
    <DragHandle
      onNodeChange={({ node, pos, editor }) => {
        if (node?.type?.name?.includes("Input")) {
          setIsInputNode(true);
          setNodePosition(pos);
          setCurrentNode(node);
        } else {
          setIsInputNode(false);
          setNodePosition(null);
          setCurrentNode(null);
        }
      }}
      editor={editor!}
      className=""
    >
      <div className="pt-1  pl-5 md:px-2">
        <div onClick={() => setOpenPopover(!openPopover)} className="handler">
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger className=" cursor-pointer">
              <GripVertical size={16} />
            </PopoverTrigger>
            {isInputNode && currentNode && (
              <PopoverContent className=" w-56  shadow-xl py-2 px-2 grid gap-3 text-sm mx-4">
                {Object?.entries?.(currentNode?.attrs)?.map?.((o: any, i) => {
                  if (o?.[0] === "isRequired") {
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-2 w-full"
                      >
                        <div className=" ">
                          <span className=" ">{"Required"}</span>
                        </div>
                        <div className="">
                          <Checkbox
                            checked={o[1]}
                            onCheckedChange={(c) => {
                              editor
                                ?.chain()
                                ?.setNodeSelection(nodePosition!)
                                ?.updateAttributes(currentNode?.type?.name, {
                                  [o[0]]: c,
                                })
                                .run();
                            }}
                          />
                        </div>
                      </div>
                    );
                  }

                  if (o[0] === "placeholder") {
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-6 w-full "
                      >
                        <div className="w-full flex-1">{"Placeholder"}</div>
                        <Input
                          className={cn(
                            "h-5 text-xs md:text-xs rounded-sm",
                            "focus-visible:outline-none focus-visible:ring-0"
                          )}
                          placeholder={o[1]}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();

                              editor
                                ?.chain()
                                .setNodeSelection(nodePosition!)
                                ?.updateAttributes(currentNode?.type?.name, {
                                  [o[0]]: e?.currentTarget?.value,
                                })
                                .run();
                            }
                          }}
                        />
                      </div>
                    );
                  }
                })}
                {currentNode?.type?.name === "multipleChoiceInput" && (
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div className=" ">
                      <span className=" ">{"Add Option"}</span>
                    </div>
                    <div className="">
                      <Button
                        onClick={() => {
                          editor
                            ?.chain()
                            ?.insertOption({
                              id: currentNode?.attrs["type"],
                              label: "option",
                              parentId: currentNode?.attrs["id"],
                              type: currentNode?.attrs["type"],
                            })
                            .run();
                        }}
                        variant={"ghost"}
                        size={"icon"}
                      >
                        <Plus />
                        {/* {currentNode?.attrs["type"]} */}
                      </Button>
                    </div>
                  </div>
                )}
              </PopoverContent>
            )}
          </Popover>
        </div>
      </div>
    </DragHandle>
  );
});
