
import { NodeViewProps } from "@tiptap/core";
import React from "react";
import { InsertLongInputParams } from "./node";
import { NodeViewWrapper } from "@tiptap/react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormStore } from "@/stores/useformStore";

export const LongInputView = (props: NodeViewProps) => {
  const { label, id, isRequired, placeholder,  rows } = props?.node
    ?.attrs as InsertLongInputParams;

    const form = useFormStore.getState().getHookForm()

  return (
    <>
      <NodeViewWrapper as={"div"}>
        <FormField
          control={form?.control}
          name={label}
          render={({ field }) => (
            <FormItem className="mt-4 field">
              <FormLabel className=" text-2xl" id={id}>{label} </FormLabel>
              <FormControl>
                <Textarea
                  required={isRequired}
                  placeholder={placeholder}
                  {...field}
                  rows={rows}
                />
              </FormControl>
              {/* <FormDescription>{placeholder?.toString()}</FormDescription> */}
            </FormItem>
          )}
        />
      </NodeViewWrapper>
    </>
  );
};
