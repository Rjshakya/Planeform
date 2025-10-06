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
    <div
      className="hover:bg-accent hover:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 "
      onClick={handleInsert}
      role="button"
    >
      Submit button
    </div>
  );
};
