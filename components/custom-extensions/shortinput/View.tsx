"use client";

import DateComponent from "@/components/comp-41";
import Component from "@/components/comp-46";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormStore } from "@/stores/useformStore";
import { parseDate } from "@internationalized/date";
import { NodeViewContent } from "@tiptap/react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import React from "react";

const ShortInput = (props: NodeViewProps) => {
  const { label, id, type, isRequired, placeholder } = props?.node?.attrs;

  const form = useFormStore.getState().getHookForm();

  return (
    <>
      <NodeViewWrapper as={"div"}>
        {
          <FormField
            control={form?.control}
            name={id}
            render={({ field }) => (
              <FormItem className={`mt-4 field gap-3`}>
                <FormLabel
                  htmlFor={label}
                  aria-label={label}
                  className=" text-md pl-1"
                  id={id}
                >
                  {/* {field?.} */}
                  <NodeViewContent
                    onKeyDown={(e) => e?.key === "Enter" && e?.preventDefault()}
                    as="div"
                    className=" min-w-[20px] w-full"
                  />
                </FormLabel>
                <FormControl>
                  {type === "phone" ? (
                    <Component
                      value={field?.value}
                      valueChange={field?.onChange}
                      id={id}
                      placeholder={placeholder}
                    />
                  ) : (
                    <Input
                      placeholder={placeholder}
                      type={type}
                      required={isRequired}
                      value={field?.value}
                      onChange={field?.onChange}
                      name={field?.name}
                      disabled={props?.editor?.isEditable}
                      ref={field?.ref}
                      onBlur={field?.onBlur}
                    />
                  )}
                </FormControl>
              </FormItem>
            )}
          />
        }
      </NodeViewWrapper>
    </>
  );
};

export default ShortInput;
