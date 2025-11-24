"use client";

import { FormEditor } from "../_components/FormEditor";
import { useEditorStore } from "@/stores/useEditorStore";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useFormStore } from "@/stores/useformStore";

export default function Page() {
  const form = useForm();
  useEffect(() => {
    useFormStore.setState({ form });
  }, [form]);

  return (
    <FormEditor
      content={
        useEditorStore.getState().editedContent ||
        useEditorStore.getState().content || {
          type: "doc",
          attrs: {},
          content: [],
        }
      }
      isEditable={true}
      className=""
    />
  );
}
