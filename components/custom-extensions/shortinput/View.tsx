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
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import React from "react";

const ShortInput = (props: NodeViewProps) => {
  const { label, id, type, isRequired, placeholder } = props?.node?.attrs;
  const form = useFormStore.getState().getHookForm();

  return (
    <>
      <NodeViewWrapper as={"div"}>
        {form && (
          <FormField
            control={form?.control}
            name={label}
            render={({ field }) => (
              <FormItem className="mt-4 field">
                <FormLabel aria-label={label} className=" text-2xl" id={id}>
                  {label}{" "}
                </FormLabel>
                <FormControl>
                  {type === "phone" ? (
                    <Component
                      value={field?.value}
                      valueChange={field?.onChange}
                      id={id}
                    />
                  ) : type === "Date" ? (
                    <DateComponent
                      value={field?.value}
                      onValueChange={field?.onChange}
                    />
                  ) : (
                    <Input
                      placeholder={placeholder}
                      type={type}
                      required={isRequired}
                      {...field}
                      
                    />
                  )}
                </FormControl>
              </FormItem>
            )}
          />
        )}
      </NodeViewWrapper>
    </>
  );
};

export default ShortInput;
