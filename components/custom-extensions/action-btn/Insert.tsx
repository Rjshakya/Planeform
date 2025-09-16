import { Button } from "@/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { v4 } from "uuid";

export const InsertActionBtn = () => {
  const { editor } = useCurrentEditor();

  const handleInsert = () => {
    if (!editor) return;
    editor?.commands?.insertActionButton({
      id: v4(),
      text: "Submit",
      type: "submit",
    });
  };

  return (
    <Button onClick={handleInsert} variant={"ghost"} size={"sm"}>
      Action Button
    </Button>
  );
};
