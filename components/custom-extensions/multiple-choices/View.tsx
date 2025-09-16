"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import React from "react";
import { InsertMultipleChoiceParams } from "./node";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/stores/useformStore";

export const MultipleChoiceView = (props: NodeViewProps) => {
  const { id, label, options, type } = props?.node
    ?.attrs as InsertMultipleChoiceParams;

  const form = useFormStore.getState().getHookForm();
  return (
    <>
      <NodeViewWrapper as={"div"}>
        <FormField
          control={form?.control}
          name={id}
          render={({ field }) => (
            <FormItem className="mt-4 field">
              <FormLabel htmlFor={label} className=" text-2xl" id={id}>
                {label}{" "}
              </FormLabel>
              <FormControl>
                <ToggleGroup
                  type={"single"}
                  value={field?.value}
                  onValueChange={field?.onChange}
                  className=" grid grid-cols-2"
                >
                  {options &&
                    options?.length > 0 &&
                    options?.map?.((o, i) => {
                      return (
                        <FormItem key={i}>
                          {" "}
                          <FormControl>
                            <Option value={o?.label} index={i} />
                          </FormControl>{" "}
                        </FormItem>
                      );
                    })}
                </ToggleGroup>
              </FormControl>
              {/* <FormDescription>{placeholder?.toString()}</FormDescription> */}
            </FormItem>
          )}
        />
      </NodeViewWrapper>
    </>
  );
};

export const Option = ({ value, index }: { value: string; index: number }) => {
  return (
    <ToggleGroupItem
      asChild
      value={value}
      className="rounded-sm py-6 flex items-center gap-1 border w-fit  pl-3   relative group/option"
    >
      <div className="flex items-center gap-1 border">
        <span className=" bg-secondary px-2 rounded-[4px]">{index + 1}</span>
        <Button
          type="button"
          variant={"ghost"}
          className="md:px-4 md:py-2  py-1.5 px-1.5 rounded-[8px] flex items-center w-fit  hover:bg-transparent dark:hover:bg-transparent hover:text-foreground cursor-pointer"
        >
          <span
            // onKeyDown={onKeyChange}
            // contentEditable={editable}
            suppressContentEditableWarning
            className=" flex-1 text-lg"
          >
            {value}
          </span>
        </Button>

        {/* {editable && (
          <div className="w-16  absolute -right-14  hidden group-hover/option:flex">
            {" "}
            <Btn
              onClick={() => deleteOption?.(optionValue)}
              type="button"
              data-style=""
              role="button"
              className=" mx-auto"
            >
              <Trash2Icon size={16} />
            </Btn>
          </div>
        )} */}
      </div>
    </ToggleGroupItem>
  );
};
