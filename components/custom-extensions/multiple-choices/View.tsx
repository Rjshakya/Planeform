"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import React, { useRef, useState } from "react";
import { InsertMultipleChoiceParams, Ioptions } from "./node";

import { useFormStore } from "@/stores/useformStore";
import { NodeViewContent } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export const MultipleChoiceView = (props: NodeViewProps) => {
  const { id, label, isDropdown, type, isRequired } = props?.node
    ?.attrs as InsertMultipleChoiceParams;
  const [open, setOpen] = useState(true);
  const form = useFormStore.getState().getHookForm();

  return (
    <>
      <NodeViewWrapper as={"div"} className={"w-full relative "}>
        <FormField
          control={form?.control}
          name={id}
          render={({ field }) => (
            <FormItem className="mt-4 field mb-3 gap-3 ">
              <FormLabel
                htmlFor={label}
                aria-label={label}
                className=" text-md grid gap-1"
                id={id}
              >
                <div className="flex items-center gap-1">
                  {props?.editor?.isEditable ? (
                    <input
                      className="flex-1 appearance-none  bg-card focus-visible:ring-0 focus:outline-none"
                      value={label}
                      onChange={(e) => {
                        props.updateAttributes({
                          label: e.currentTarget.value,
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          return e.preventDefault();
                        }
                        if (label === "" && e.key === "Backspace") {
                          props.deleteNode();
                        }
                      }}
                    />
                  ) : (
                    <p
                      className="flex-1"
                      onClick={() => {
                        if (!props?.editor?.isEditable && isDropdown) {
                          return setOpen(!open);
                        }
                      }}
                    >
                      {label}
                    </p>
                  )}
                  {isDropdown && (
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      type="button"
                      onClick={() => setOpen(!open)}
                      className="size-6"
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className=" size-5 fill-foreground"
                          viewBox="0 0 24 24"
                          fill="#fff"
                        >
                          <path
                            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.06 11.17L12.53 14.7C12.38 14.85 12.19 14.92 12 14.92C11.81 14.92 11.62 14.85 11.47 14.7L7.94 11.17C7.65 10.88 7.65 10.4 7.94 10.11C8.23 9.82 8.71 9.82 9 10.11L12 13.11L15 10.11C15.29 9.82 15.77 9.82 16.06 10.11C16.35 10.4 16.35 10.87 16.06 11.17Z"
                            fill="white"
                            style={{ fill: "var(--fillg)" }}
                          />
                        </svg>
                      </div>
                    </Button>
                  )}
                </div>

                {isDropdown ? (
                  open && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className={`${
                        props?.editor?.isEditable === false &&
                        isDropdown &&
                        "absolute inset-x-0  top-8 bg-card p-1  pr-2 rounded-md shadow-xl border"
                      }`}
                    >
                      <NodeViewContent
                        className={`content pl-1 max-w-3xl w-full`}
                      />
                    </motion.div>
                  )
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <NodeViewContent
                      className={`content pl-1 max-w-3xl w-full`}
                    />
                  </motion.div>
                )}
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </NodeViewWrapper>
    </>
  );
};

export const Option = (props: NodeViewProps) => {
  const { parentId, type  , isRequired} = props?.node?.attrs as Ioptions;
  const optionLabel = props?.node?.content?.content[0]?.text;
  const isEditable = props.editor.isEditable;

  return (
    <NodeViewWrapper as={"div"} className="w-full">
      <FormField
        name={parentId}
        render={({ field }) => (
          <FormItem className=" relative flex w-full items-center gap-2 rounded-md border-2 border-secondary bg-input/80 dark:bg-input/50 p-2 shadow-xs outline-none  my-2 has-[:checked]:border-secondary has-[:checked]:ring-[2px] has-[:checked]:ring-ring/50 ">
            <FormControl>
              {type === "single" ? (
                <Input
                  id={optionLabel}
                  className=" size-0 h-7 after:absolute after:inset-0 "
                  type="radio"
                  value={optionLabel}
                  checked={field?.value === optionLabel}
                  onChange={(e) => field?.onChange?.(e?.target?.value)}
                  disabled={isEditable}
                  // required={isRequired}
                />
              ) : (
                <Input
                  id={optionLabel}
                  checked={field?.value?.includes?.(optionLabel) || false}
                  className=" size-0 h-7 after:absolute after:inset-0  "
                  type="checkbox"
                  onChange={(e) => {
                    const checked = e.currentTarget?.checked;

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
                  // required={isRequired}
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
            {/* <FormMessage/> */}
          </FormItem>
        )}
      />
    </NodeViewWrapper>
  );
};
