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
                  onKeyDown={(e) => e?.key === "Enter" && e?.preventDefault()}
                  className="content"
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
  const { parentId, id, label, type } = props?.node?.attrs;
  const contentLabel = props?.node?.content?.content[0]?.text;

  return (
    <NodeViewWrapper>
      <FormField
        name={parentId}
        render={({ field }) => (
          <FormItem className=" flex items-center">
            <FormControl>
              {type === "single" ? (
                <Input
                  id={contentLabel}
                  className=" size-4"
                  type="radio"
                  value={contentLabel}
                  checked={field?.value === contentLabel}
                  onChange={(e) => field?.onChange?.(e?.target?.value)}
                />
              ) : (
                <Checkbox
                  id={contentLabel}
                  checked={field?.value?.includes?.(contentLabel)}
                  className=""
                  onCheckedChange={(checked) => {
                    if (!field.value) {
                      field.value = [];
                    }

                    return checked
                      ? field?.onChange([...field?.value, contentLabel])
                      : field?.onChange(
                          field?.value?.filter((v: any) => v !== contentLabel)
                        );
                  }}
                />
              )}
            </FormControl>
            <FormLabel
              htmlFor={contentLabel}
              aria-label={contentLabel}
              className=" text-md "
            >
              <NodeViewContent
                onKeyDown={(e) => {
                  if (e?.key === "Enter") {
                    e?.preventDefault();
                  }
                }}
                className="content"
              />
            </FormLabel>
          </FormItem>
        )}
      />
    </NodeViewWrapper>
  );
};
