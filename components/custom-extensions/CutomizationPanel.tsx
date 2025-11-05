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
    isGiestMono = false,
    isInter = false,
    isPlayFair = false,
    isRoboto = false,
    isPoppins = false,
    isAcme = false,
    isRobotoMono = false,
    isRobotoSerif = false,
  } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isGiestMono: editor?.isActive("textStyle", {
          fontFamily: "var(--font-geist-mono)",
        }),
        isInter: editor?.isActive("textStyle", {
          fontFamily: "var(--font-inter)",
        }),
        isPlayFair: editor?.isActive("textStyle", {
          fontFamily: "var(--font-playfair-display)",
        }),
        isRoboto: editor?.isActive("textStyle", {
          fontFamily: "var(--font-roboto)",
        }),
        isPoppins: editor?.isActive("textStyle", {
          fontFamily: "var(--font-poppins)",
        }),
        isAcme: editor?.isActive("textStyle", {
          fontFamily: "var(--font-acme)",
        }),
        isRobotoMono: editor?.isActive("textStyle", {
          fontFamily: "var(--font-roboto-mono)",
        }),
        isRobotoSerif: editor?.isActive("textStyle", {
          fontFamily: "var(--font-roboto-serif)",
        }),
      };
    },
  }) ?? {};

  const fontFamilies = [
    {
      name: "Default",
      onclick: () =>
        editor
          ?.chain()
          .selectAll()
          .setFontFamily("var(--font-space-grotesk)")
          .blur()
          .run(),
      className: "",
      variant: "ghost",
    },
    {
      name: "Geist-mono",
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
      name: "Inter",
      onclick: () =>
        editor?.chain().selectAll().setFontFamily("var(--font-inter)").run(),
      isInter,
      variant: isInter ? "secondary" : "ghost",
      className: "",
    },
    {
      name: "Playfair Display",
      onclick: () =>
        editor
          ?.chain()
          ?.selectAll()
          ?.setFontFamily("var(--font-playfair-display)")
          .run(),
      className: "",
      isPlayFair,
      variant: isPlayFair ? "secondary" : "ghost",
    },
    {
      name: "Roboto",
      onclick: () =>
        editor?.chain()?.selectAll().setFontFamily("var(--font-roboto)").run(),
      className: "",
      isRoboto,
      variant: isRoboto ? "secondary" : "ghost",
    },
    {
      name: "Roboto Mono",
      onclick: () =>
        editor
          ?.chain()
          ?.selectAll()
          .setFontFamily("var(--font-roboto-mono)")
          .run(),
      className: "",
      isRobotoMono,
      variant: isRobotoMono ? "secondary" : "ghost",
    },
    {
      name: "Roboto Serif",
      onclick: () =>
        editor
          ?.chain()
          ?.selectAll()
          .setFontFamily("var(--font-roboto-serif)")
          .run(),
      className: "",
      isRobotoSerif,
      variant: isRobotoSerif ? "secondary" : "ghost",
    },
    {
      name: "Poppins",
      onclick: () =>
        editor
          ?.chain()
          ?.selectAll()
          ?.setFontFamily("var(--font-poppins)")
          .run(),
      className: "",
      isPoppins,
      variant: isPoppins ? "secondary" : "ghost",
    },
    {
      name: "Acme",
      onclick: () =>
        editor?.chain()?.selectAll()?.setFontFamily("var(--font-acme)").run(),
      className: "",
      isAcme,
      variant: isAcme ? "secondary" : "ghost",
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
            ? families?.find((family) => family?.name === value)?.name
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
                    setValue(currentValue);
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
