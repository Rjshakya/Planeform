"use client";

import { SimpleEditor } from "@/components/tiptap-main/simple/simple-editor";
import { JsonDoc } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useFormStore } from "@/stores/useformStore";
import { useEffect } from "react";
// import { useFormStore } from "@/stores/useformStore";
// import { useForm, UseFormReturn } from "react-hook-form";

export const FormEditor = ({
  isEditable,
  content,
  className,
  isLast,
  activeStep,
}: {
  isEditable: boolean;
  content?: JsonDoc;
  className?: string;
  isLast?: boolean;
  activeStep?: number;
  maxStep?: number;
}) => {
  const form = useFormStore.getState().form;

  // useEffect(() => {
  //   useFormStore.setState({
  //     activeStep: activeStep,
  //   });
  // }, [activeStep]);

  return (
    <div className={cn(`  w-full ${className || ""} `)}>
      <SimpleEditor
        // parentform={form}
        isEditable={isEditable}
        content={content}
      />
    </div>
  );
};
