"use client";
import { defaultEditorContent } from "@/lib/content";
import { FormEditor } from "../_components/FormEditor";
import { useEffect, useState } from "react";
import { JsonDoc } from "@/lib/types";

export default function Page() {
  const [content, setContent] = useState<JsonDoc>();

  useEffect(() => {
    window.localStorage.setItem(
      "formly-content",
      JSON.stringify(defaultEditorContent)
    );
    const item = window.localStorage.getItem("formly-content");
    const content = JSON.parse(item || "");
    setContent(content);
    console.log(content);
    
  }, []);
  // @ts-ignore
  return <FormEditor content={content} isEditable={true} />;
}
