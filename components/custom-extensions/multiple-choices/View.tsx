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
            <FormItem className="mt-4 field mb-3">
              <FormLabel
                htmlFor={label}
                aria-label={label}
                className=" text-2xl "
                id={id}
              >
                <NodeViewContent className="content" />
              </FormLabel>
            </FormItem>
          )}
        />
      </NodeViewWrapper>
    </>
  );
};

export const Option = (props: NodeViewProps) => {
  const { parentId, id, label, type } = props?.node?.attrs;

  return (
    <NodeViewWrapper>
      <FormField
        name={parentId}
        render={({ field }) => (
          <FormItem className=" flex items-center">
            <FormControl>
              {type === "single" ? (
                <Input
                  id={label}
                  className=" size-4"
                  type="radio"
                  value={label}
                  checked={field?.value === label}
                  onChange={(e) => field?.onChange?.(e?.target?.value)}
                />
              ) : (
                <Checkbox
                  id={label}
                  checked={field?.value?.includes?.(label)}
                  className=""
                  onCheckedChange={(checked) => {
                    if (!field.value) {
                      field.value = [];
                    }

                    return checked
                      ? field?.onChange([...field?.value, label])
                      : field?.onChange(
                          field?.value?.filter((v: any) => v !== label)
                        );
                  }}
                />
              )}
            </FormControl>
            <FormLabel
              htmlFor={label}
              aria-label={label}
              className=" text-2xl "
            >
              <NodeViewContent className="content" />
            </FormLabel>
          </FormItem>
        )}
      />
    </NodeViewWrapper>
  );
};
