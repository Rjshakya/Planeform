import { Bolt, CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

export const CutomizationPanel = () => {
  const { editor } = useCurrentEditor();

  const {
    isSerif = false,
    isMonospace = false,
    isGiestMono = false,
  } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isSerif: editor?.isActive("textStyle", { fontFamily: "serif" }),
        isMonospace: editor?.isActive("textStyle", {
          fontFamily: "monospace",
        }),
        isGiestMono: editor?.isActive("textStyle", {
          fontFamily: "var(--font-geist-mono)",
        }),
      };
    },
  }) ?? {};

  const fontFamilies = [
    {
      name: "Serif",
      onclick: () => editor?.chain().selectAll().setFontFamily("serif").run(),
      isSerif,
      variant: isSerif ? "secondary" : "ghost",
      className: "",
    },
    {
      name: "Monospace",
      onclick: () =>
        editor?.chain().selectAll().setFontFamily("monospace").run(),
      isMonospace,
      variant: isMonospace ? "secondary" : "ghost",
      className: "",
    },
    {
      name: "geist-mono",
      onclick: () =>
        editor
          ?.chain()
          .selectAll()
          .setFontFamily("var(--font-geist-mono)")
          .run(),
      isGiestMono,
      variant: isGiestMono ? "secondary" : "ghost",
      className: "",
    },
    {
      name: "Default",
      onclick: () => editor?.chain().selectAll().unsetFontFamily().run(),
      className: "",
      variant: "ghost",
    },
  ];

  if (!editor) return;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Bolt />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="p-3">Customization Panel</SheetTitle>
        {/* <div className="button-group grid gap-2 px-4 py-2">
          <div>
            {" "}
            <p className="">Font family</p>
          </div>
          <div className=" w-full  gap-1 grid border rounded-md px-1 py-2">
            
            {fontFamilies?.map((f, i) => {
              return (
                <div key={i} className="w-full text-left">
                  <Button
                    key={i}
                    variant={f?.variant as any}
                    onClick={f?.onclick}
                    size={"sm"}
                    className=" w-full"
                  >
                    <p className="w-full text-left">{f?.name}</p>
                  </Button>
                </div>
              );
            })}
          </div>
        </div> */}

        <div className=" px-2 grid gap-4">
          <Label className=" text-md">Font family</Label>
          <FontFamilyBox families={fontFamilies} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const FontFamilyBox = ({ families }: { families: any[] }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" w-full justify-between text-sm"
        >
          {value
            ? families.find((family) => family?.name === value)?.name
            : "Select font family..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[365px] p-0 mt-2">
        <Command className="">
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {families.map((family) => (
                <CommandItem
                  key={family?.name}
                  value={family?.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    family?.onclick?.();
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === family.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {family?.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
