"use client";
import { defaultEditorContent } from "@/lib/content";
import { FormEditor } from "../_components/FormEditor";
import { useEffect, useState } from "react";
import { JsonDoc } from "@/lib/types";
import { useEditorStore } from "@/stores/useEditorStore";
import { useUser } from "@/hooks/use-User";

export default function Page() {
  const [content, setContent] = useState<JsonDoc>();
 useUser()
  useEffect(() => {
    useEditorStore.setState({ content: defaultEditorContent });
  }, []);
  // @ts-ignore
  return (
    <FormEditor
      content={
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
