"use client";

import { SimpleEditor } from "@/components/tiptap-main/simple/simple-editor";
import { JsonDoc } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useFormStore } from "@/stores/useformStore";
// import { useFormStore } from "@/stores/useformStore";
// import { useForm, UseFormReturn } from "react-hook-form";

export const FormEditor = ({
  isEditable,
  content,
  className,
}: // hookForm,
{
  isEditable: boolean;
  content?: JsonDoc;
  className?: string;
}) => {
  const form = useFormStore.getState().form;

  return (
    <div className={cn(` max-w-6xl w-full ${className}`)}>
      <SimpleEditor
        parentform={form}
        isEditable={isEditable}
        content={content}
      />
    </div>
  );
};
