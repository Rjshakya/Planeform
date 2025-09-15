import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FormEditor } from "@/app/dashboard/[slug]/form/_components/FormEditor";
import { Button } from "./ui/button";
import { useFormStore } from "@/stores/useformStore";
import { useCurrentEditor } from "@tiptap/react";
import { JsonDoc } from "@/lib/types";

export const PreviewForm = () => {
  const [jsonContent, setJsonContent] = useState<JsonDoc>();
  const { editor } = useCurrentEditor();

  const handlePreview = () => {
    if (!editor) return;
    const json = editor.getJSON();
    console.log(json);
    
    setJsonContent(json);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={handlePreview} variant={"outline"} size={"sm"}>
          Preview
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className=" sm:max-w-full w-full h-full overflow-auto"
      >
        <SheetHeader>
          <SheetTitle>Preview form</SheetTitle>
          <FormEditor
            className=" mx-auto max-w-2xl w-full border-2 rounded-2xl"
            isEditable={false}
            content={jsonContent}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
