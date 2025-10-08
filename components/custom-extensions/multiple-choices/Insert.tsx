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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

export const InsertMultipleChoice = ({
  setOpen,
}: {
  setOpen?: (open: boolean) => void;
}) => {
  const { editor } = useCurrentEditor();
  const [label, setlabel] = useState("");
  const [parentId, setParentId] = useState(v4());
  const [options, setOptions] = useState<Ioptions[]>();
  const [type, setType] = useState("single");
  const handleInsert = (label: string, options: Ioptions[]) => {
    toast(type);
    if (!editor) return;
    editor?.commands?.insertmultipleChoiceInput({
      id: parentId,
      label,
      type,
    });

    options?.forEach((o) => editor?.commands?.insertOption(o));

    setlabel("");
    setOptions(undefined);
    setOpen?.(false);
  };

  const handleAddOptions = (pId: string, type: string) => {
    const copy = options ? [...options] : [];
    copy?.push({
      label: `${copy?.length + 1}`,
      id: `${copy?.length + 1}`,
      parentId: pId,
      type,
    });
    setOptions(copy);
  };

  return (
    <div className=" grid gap-6">
      <DialogTitle className="mb-4">
        Configure multiple choice input
      </DialogTitle>
      <div className=" grid gap-4">
        <Label>Field Name</Label>
        <Input
          value={label}
          onChange={(e) => setlabel(e?.currentTarget?.value)}
          type="text"
          placeholder="label that you want on input"
        />
      </div>

      <div className="w-full grid gap-4 mb-2">
        <Label>
          <span>Type</span>
          <p className=" text-muted-foreground text-sm">
            {"(first select type then add options)"}
          </p>
        </Label>
        <RadioGroup
          onValueChange={(v) => setType(v)}
          className="flex items-center gap-3"
          defaultValue="single"
        >
          <Label className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-1 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 w-16">
            <RadioGroupItem
              // id={`${id}-${item.value}`}
              value={"single"}
              className="sr-only after:absolute after:inset-0"
            />
            <p className="text-foreground text-sm leading-none font-medium">
              Single
            </p>
          </Label>
          <Label className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-1 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 w-16">
            <RadioGroupItem
              // id={`${id}-${item.value}`}
              value={"multiple"}
              className="sr-only after:absolute after:inset-0"
            />
            <p className="text-foreground text-sm leading-none font-medium">
              Multiple
            </p>
          </Label>
        </RadioGroup>
      </div>

      <Label className=" flex items-center justify-between">
        <span>Options</span>
        <Button
          onClick={() => handleAddOptions(parentId, type)}
          variant={"ghost"}
          size={"icon"}
        >
          <PlusIcon />
        </Button>
      </Label>

      {options && options?.length > 0 && (
        <div className="grid gap-2 max-h-48 overflow-y-auto">
          {options?.map((o, i) => {
            return (
              <div key={i} className=" flex items-center justify-between gap-2">
                <Input
                  onChange={(e) => {
                    const copy = [...options];
                    copy[i].label = e?.currentTarget?.value;
                    setOptions(copy);
                  }}
                  value={o?.label}
                  type="text"
                  placeholder={o?.label}
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
          variant={"secondary"}
          size={"lg"}
          onClick={() => handleInsert(label, options!)}
        >
          Insert
        </Button>
      </DialogFooter>
    </div>
  );
};
