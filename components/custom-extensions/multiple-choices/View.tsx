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
import React, { useState } from "react";
import { InsertMultipleChoiceParams, Ioptions } from "./node";

import { useFormStore } from "@/stores/useformStore";
import { NodeViewContent } from "@tiptap/react";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { validationFn } from "../FormFieldValidations";

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
          rules={{
            validate: validationFn({ isRequired, type: "multipleChoiceInput" }),
          }}
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
                </div>

                {isDropdown && (
                  <div className="flex w-full h-9 items-start  gap-2 max-w-sm ">
                    <div className="flex-1  h-full ">
                      <Input className="h-9" readOnly defaultValue={field.value} />
                    </div>
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      type="button"
                      onClick={() => {
                        if (props.editor.isEditable) return;
                        setOpen(!open);
                      }}
                      className="h-full"
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M19.92 8.9502L13.4 15.4702C12.63 16.2402 11.37 16.2402 10.6 15.4702L4.07996 8.9502"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </Button>
                  </div>
                )}

                <AnimatePresence>
                  {isDropdown ? (
                    open && (
                      <motion.div
                        initial={{ opacity: 0, filter: "blur(2px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`${
                          props?.editor?.isEditable === false &&
                          isDropdown &&
                          "absolute z-[99] max-w-[325px] inset-x-0 top-20 bg-card p-1 mb-8  rounded-sm shadow-xl border"
                        }`}
                      >
                        <NodeViewContent
                          className={`content px-2 w-full overflow-y-auto ${
                            props.editor.isEditable || "h-[180px]"
                          }`}
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
                </AnimatePresence>
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
  const { parentId, type, isRequired } = props?.node?.attrs as Ioptions;
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
