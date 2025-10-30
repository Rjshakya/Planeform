import { Editor } from "@tiptap/core";
import DragHandle from "@tiptap/extension-drag-handle-react";
import React, { memo, RefObject, useRef } from "react";
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
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export const EditorDragHandle = memo(function Dragcomp({
  editor,
}: {
  editor: Editor | null;
}) {
  const [isInputNode, setIsInputNode] = React.useState(false);
  const [nodePosition, setNodePosition] = React.useState<number | null>(null);
  const [currentNode, setCurrentNode] = React?.useState<any>(null);
  const [openPopover, setOpenPopover] = React.useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // useOutsideClick(popoverRef as RefObject<HTMLDivElement>, () =>
  //   setOpenPopover(false)
  // );

  return (
    <DragHandle
      computePositionConfig={{ strategy: "fixed" }}
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
      className={cn(``)}
    >
      <div className="pt-1  pl-5 md:px-2">
        <div
          ref={popoverRef}
          onClick={() => setOpenPopover(!openPopover)}
          className="handler"
        ></div>
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
          <PopoverTrigger className=" cursor-pointer">
            <GripVertical size={16} />
          </PopoverTrigger>
          {isInputNode && currentNode && (
            <PopoverContent
              side="left"
              sticky="always"
              className=" w-56  shadow-xl py-4 px-2 grid gap-4 text-sm mx-4"
            >
              {Object?.entries?.(currentNode?.attrs)?.map?.((o: any, i) => {
                if (o?.[0] === "isRequired") {
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 w-full px-1.5"
                    >
                      <Label htmlFor="requiredCheck" className=" ">
                        {"Required"}
                      </Label>
                      <div className="">
                        <Input
                          id="requiredCheck"
                          type="checkbox"
                          defaultChecked={o[1]}
                          onChange={(e) => {
                            const checked = e.currentTarget.checked;
                            editor
                              ?.chain()
                              ?.setNodeSelection(nodePosition!)
                              ?.updateAttributes(currentNode?.type?.name, {
                                [o[0]]: checked,
                              })
                              .run();
                          }}
                          className="size-4 rounded-sm"
                        />
                      </div>
                    </div>
                  );
                }

                if (o[0] === "placeholder") {
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-between gap-3 w-full px-1"
                    >
                      <Label className="w-full flex-1 ">{"Placeholder"}</Label>
                      <Input
                        className={cn(
                          "h-7 text-xs md:text-xs rounded-sm",
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
                        onChange={(e) => {
                          const value = e.currentTarget.value;
                          editor
                            ?.chain()
                            .setNodeSelection(nodePosition!)
                            .updateAttributes(currentNode?.type?.name, {
                              [o[0]]: value,
                            })
                            .run();
                        }}
                      />
                      <Separator
                        orientation="horizontal"
                        className=" dark:bg-accent "
                      />
                    </div>
                  );
                }
              })}
              {currentNode?.type?.name === "multipleChoiceInput" && (
                <div className="flex items-center justify-between gap-2 w-full px-1">
                  <Label className="pl-1">{"Add Option"}</Label>
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
    </DragHandle>
  );
});
