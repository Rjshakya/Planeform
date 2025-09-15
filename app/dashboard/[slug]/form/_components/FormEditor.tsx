"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
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
  content?: any;
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
