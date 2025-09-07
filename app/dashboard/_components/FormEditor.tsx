"use client";

import ShortInput from "@/components/custom-extensions/shortinput/View";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useFormStore } from "@/stores/useformStore";
import { useForm } from "react-hook-form";

export const FormEditor = () => {
  const form = useFormStore.getState().setHookForm(useForm());

  return (
    <div className=" max-w-6xl w-full">
      <SimpleEditor form={form} />
    </div>
  );
};
