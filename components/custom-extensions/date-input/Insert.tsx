import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStore } from "@/stores/useformStore";
import { useCurrentEditor } from "@tiptap/react";
import React, { useState } from "react";
import { v4 } from "uuid";

export const InsertDateInput = ({
  setOpen,
}: {
  setOpen?: (open: boolean) => void;
}) => {
  const { editor } = useCurrentEditor();
  const [label, setLabel] = useState("");

  const handleInsert = (label: string) => {
    if (!editor) return;

    editor?.commands?.insertShortInput({
      id: v4(),
      isRequired: true,
      label: label,
      placeholder: "m",
      type: "Date",
    });

    setOpen?.(false);
  };
  
  return (
    <>
      <DialogTitle>Configure date input</DialogTitle>
      <Label>Field Name</Label>
      <Input
        value={label}
        onChange={(e) => setLabel(e?.currentTarget?.value)}
        type="text"
        placeholder="label that you want on input"
      />

      <Button variant={"ghost"} size={"lg"} onClick={() => handleInsert(label)}>
        Insert
      </Button>
    </>
  );
};
