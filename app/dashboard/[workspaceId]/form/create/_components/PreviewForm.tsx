import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FormEditor } from "@/app/dashboard/[workspaceId]/form/_components/FormEditor";
import { Button } from "@/components/ui/button";
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
            className=" mx-auto max-w-lg w-full rounded-2xl bg-accent/40 dark:bg-accent/15 "
            isEditable={false}
            content={jsonContent}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
