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
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

export const CutomizationPanel = () => {
  const { editor } = useCurrentEditor();

  const {
    isSerif = false,
    isGiestMono = false,
    isInter = false,
  } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isSerif: editor?.isActive("textStyle", { fontFamily: "serif" }),
        isGiestMono: editor?.isActive("textStyle", {
          fontFamily: "var(--font-geist-mono)",
        }),
        isInter: editor?.isActive("textStyle", {
          fontFamily: "var(--font-inter)",
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
      name: "inter",
      onclick: () =>
        editor?.chain().selectAll().setFontFamily("var(--font-inter)").run(),
      isInter,
      variant: isInter ? "secondary" : "ghost",
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

        <div className=" px-2 grid gap-4">
          <Label className=" text-sm pl-1">Font family</Label>
          <FontFamilyBox families={fontFamilies} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const FontFamilyBox = ({ families }: { families: any[] }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" w-full justify-between text-sm"
          ref={buttonRef}
        >
          {value
            ? families.find((family) => family?.name === value)?.name
            : "Select font family..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(`p-0 mt-2`)}
        style={{ width: `${buttonRef?.current?.offsetWidth}px` }}
      >
        <Command className="w-full">
          <CommandInput placeholder="Search font..." />
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
