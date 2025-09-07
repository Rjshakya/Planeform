"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStore } from "@/stores/useformStore";
import { useCurrentEditor } from "@tiptap/react";
import { useState } from "react";
import { v4 } from "uuid";

export const InsertShortInput = () => {
  const { editor } = useCurrentEditor();
  const [label, setlabel] = useState("");
  const [placeholder, setPlaceHolder] = useState("");
  const [open, setOpen] = useState(false)
  const handleInsert = (label: string, placeholder: string) => {

    

    editor?.commands?.insertShortInput({
      id: v4(),
      isRequired: false,
      label,
      placeholder,
      type: "text",
      form: useFormStore.getState()?.getHookForm()!,
    });

    setlabel("")
    setPlaceHolder("")
    setOpen(false)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          Short Input
        </Button>
      </DialogTrigger>
      {/* <DialogHeader>
        <DialogTitle>Configure short input</DialogTitle>
      </DialogHeader> */}
      <DialogContent>
        <DialogTitle>Configure short input</DialogTitle>
        <Label>Field Name</Label>
        <Input
          value={label}
          onChange={(e) => setlabel(e?.currentTarget?.value)}
          type="text"
          placeholder="label that you want on input"
        />
        <Label>Placeholder</Label>
        <Input
          value={placeholder}
          onChange={(e) => setPlaceHolder(e?.currentTarget?.value)}
          type="text"
          placeholder="place holder for input field"
        />

        <Button
          variant={"ghost"}
          size={"lg"}
          onClick={() => handleInsert(label, placeholder)}
        >
          Insert
        </Button>
      </DialogContent>
    </Dialog>
  );
};
