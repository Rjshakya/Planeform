"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { Ioptions } from "./node";
import { PlusIcon, Trash } from "lucide-react";
import { useMultiDialogStore } from "@/stores/useMultiDialogStore";

export const InsertMultipleChoice = ({
  setOpen,
}: {
  setOpen?: (open: boolean) => void;
}) => {
  const { editor } = useCurrentEditor();
  const [label, setlabel] = useState("");

  const [options, setOptions] = useState<Ioptions[]>();
  const handleInsert = (label: string, options: Ioptions[]) => {
    if (!editor) return;
    editor?.commands?.insertmultipleChoiceInput({
      id: v4(),
      form: useFormStore.getState().getHookForm()!,
      label,
      options,
      type: "single",
    });

    setlabel("");
    setOptions(undefined);
    setOpen?.(false);
    console.log("mc:inserted");

    // setOpen?.(false);
  };

  const handleAddOptions = () => {
    const copy = options ? [...options] : [];
    copy?.push({ value: `option-${copy?.length + 1}`, id: copy?.length + 1 });
    setOptions(copy);
  };

  return (
    <>
      <DialogTitle>Configure multiple choice input</DialogTitle>
      <Label>Field Name</Label>
      <Input
        value={label}
        onChange={(e) => setlabel(e?.currentTarget?.value)}
        type="text"
        placeholder="label that you want on input"
      />
      <Label className=" flex items-center justify-between">
        <span>Options</span>
        <Button onClick={handleAddOptions} variant={"ghost"} size={"icon"}>
          <PlusIcon />
        </Button>
      </Label>

      {options && options?.length > 0 && (
        <div className="grid gap-2">
          {options?.map((o, i) => {
            return (
              <div key={i} className=" flex items-center justify-between">
                <Input
                  onChange={(e) => {
                    const copy = [...options];
                    copy[i].value = e?.currentTarget?.value;
                    setOptions(copy);
                  }}
                  value={o?.value}
                  type="text"
                  placeholder={o?.value}
                />
                <Button
                  onClick={() => {
                    const copy = [...options]?.filter((_o) => _o?.id !== o?.id);
                    setOptions(copy);
                  }}
                  variant={"ghost"}
                  size={"icon"}
                >
                  <Trash />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <DialogFooter>
        {/* <DialogClose></DialogClose> */}
        <Button
          variant={"ghost"}
          size={"lg"}
          onClick={() => handleInsert(label, options!)}
        >
          Insert
        </Button>
      </DialogFooter>
    </>
  );
};
