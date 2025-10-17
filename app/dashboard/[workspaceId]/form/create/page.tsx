'use client'
import { defaultEditorContent } from "@/lib/content";
import { FormEditor } from "../_components/FormEditor";

export default function Page() {
  // @ts-ignore
  return <FormEditor content={defaultEditorContent} isEditable={true} />;
}
