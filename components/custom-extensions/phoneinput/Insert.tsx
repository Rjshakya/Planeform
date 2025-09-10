import { Button } from "@/components/ui/button";
import { useFormStore } from "@/stores/useformStore";
import { useCurrentEditor } from "@tiptap/react";
import React from "react";
import { v4 } from "uuid";

export const InsertPhoneInput = () => {
  const { editor } = useCurrentEditor();

  const handleInsert = () => {
    if (!editor) return;

    editor?.commands?.insertShortInput({
      id: v4(),
      form: useFormStore?.getState()?.getHookForm()!,
      isRequired: true,
      label: "Phone no:",
      placeholder: "",
      type: "phone",
    });
  };

  return (
    <Button onClick={handleInsert} variant={"ghost"} size={"sm"}>
      <p>Phone input</p>
    </Button>
  );
};
