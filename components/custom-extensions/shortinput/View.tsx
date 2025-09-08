"use client";

import Component from "@/components/comp-46";
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

const ShortInput = (props: NodeViewProps) => {
  const { label, id, type, isRequired, placeholder, form } = props?.node?.attrs;

  return (
    <>
      <NodeViewWrapper as={"div"}>
        <FormField
          control={form?.control}
          name={label}
          render={({ field }) => (
            <FormItem className="mt-4 field">
              <FormLabel className=" text-2xl" id={id}>
                {label}{" "}
              </FormLabel>
              <FormControl>
                {type === "phone" ? (
                  <Component
                    value={field.value}
                    valueChange={field.onChange}
                    id={id}
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
              {/* <FormDescription>{placeholder?.toString()}</FormDescription> */}
            </FormItem>
          )}
        />
      </NodeViewWrapper>
    </>
  );
};

export default ShortInput;
