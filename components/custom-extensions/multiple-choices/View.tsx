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
import { InsertMultipleChoiceParams, Ioptions } from "./node";

import { useFormStore } from "@/stores/useformStore";
import { NodeViewContent } from "@tiptap/react";
import { cn } from "@/lib/utils";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const MultipleChoiceView = (props: NodeViewProps) => {
  const { id, label } = props?.node?.attrs as InsertMultipleChoiceParams;

  const form = useFormStore.getState().getHookForm();

  return (
    <>
      <NodeViewWrapper as={"div"}>
        <FormField
          control={form?.control}
          name={id}
          render={({ field }) => (
            <FormItem className="mt-4 field mb-3 gap-3">
              <FormLabel
                htmlFor={label}
                aria-label={label}
                className=" text-md "
                id={id}
              >
                <NodeViewContent
                  // onKeyDown={(e) => e?.key === "Enter" && e?.preventDefault()}
                  className="content pl-1"
                />
              </FormLabel>
            </FormItem>
          )}
        />
      </NodeViewWrapper>
    </>
  );
};

export const Option = (props: NodeViewProps) => {
  const { parentId, id, label, type } = props?.node?.attrs as Ioptions
  const optionLabel = props?.node?.content?.content[0]?.text;
  const isEditable = props.editor.isEditable;

  return (
    <NodeViewWrapper>
      <FormField
        name={parentId}
        render={({ field }) => (
          <FormItem className=" relative flex w-full items-center gap-2 rounded-md border-2 border-secondary bg-input/80 dark:bg-input/50 p-4 shadow-xs outline-none  my-3 has-[:checked]:border-secondary has-[:checked]:ring-[4px] has-[:checked]:ring-ring/50 ">
            <FormControl>
              {type === "single" ? (
                <Input
                  id={optionLabel}
                  className=" size-0  after:absolute after:inset-0 "
                  type="radio"
                  value={optionLabel}
                  checked={field?.value === optionLabel}
                  onChange={(e) => field?.onChange?.(e?.target?.value)}
                  disabled={isEditable}
                />
              ) : (
                <Input
                  id={optionLabel}
                  checked={field?.value?.includes?.(optionLabel)||false}
                  className=" size-0  after:absolute after:inset-0  "
                  type="checkbox"
                  onChange={(e) => {
                    const checked = e.currentTarget?.checked;
                    console.log(checked);

                    if (!field.value) {
                      field.value = [];
                    }

                    return checked
                      ? field?.onChange([...field?.value, optionLabel])
                      : field?.onChange(
                          field?.value?.filter((v: any) => v !== optionLabel)
                        );
                  }}
                  disabled={isEditable}
                />
              )}
            </FormControl>
            <FormLabel
              htmlFor={optionLabel}
              aria-label={optionLabel}
              className=" text-sm w-full"
            >
              <NodeViewContent
                // onKeyDown={(e) => e?.key === "Enter" && e?.preventDefault()}
                className=" w-full"
              />
            </FormLabel>
          </FormItem>
        )}
      />
    </NodeViewWrapper>
  );
};
