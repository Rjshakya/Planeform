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
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { useEditorStore } from "@/stores/useEditorStore";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { toast } from "sonner";

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
    currentFontSize = "",
  } = useEditorState({
    editor,
    selector: (ctx) => {
      const marks = editor?.state.selection.$from.marks() || [];
      const textStyleMark = marks.find(
        (mark) => mark.type.name === "textStyle"
      );
      const fontSize = textStyleMark?.attrs?.fontSize || "";

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
        currentFontSize: fontSize,
      };
    },
  }) ?? {};

  const formBackgroundColor = useEditorStore((s) => s.formBackgroundColor);

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

  const formFontFamily = [
    { name: "Default", value: "var(--font-space-grotesk)" },
    { name: "Geist-mono", value: "var(--font-geist-mono)" },
    { name: "Inter", value: "var(--font-inter)" },
    { name: "Playfair Display", value: "var(--font-playfair-display)" },
    { name: "Roboto", value: "var(--font-roboto)" },
    { name: "Roboto Mono", value: "var(--font-roboto-mono)" },
    { name: "Roboto Serif", value: "var(--font-roboto-serif)" },
    { name: "Poppins", value: "var(--font-poppins)" },
    { name: "Acme", value: "var(--font-acme)" },
  ];

  const fontSizes = [
    { name: "8px", value: "8px" },
    { name: "10px", value: "10px" },
    { name: "12px", value: "12px" },
    { name: "14px", value: "14px" },
    { name: "16px", value: "16px" },
    { name: "18px", value: "18px" },
    { name: "20px", value: "20px" },
    { name: "24px", value: "24px" },
    { name: "28px", value: "28px" },
    { name: "32px", value: "32px" },
    { name: "36px", value: "36px" },
    { name: "48px", value: "48px" },
    { name: "64px", value: "64px" },
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
          <div className="grid gap-2">
            <Label className=" text-sm pl-1">Font family</Label>
            <FontFamilyBox families={formFontFamily} />
          </div>

          <div className="grid gap-2">
            <Label className=" text-sm pl-1">Font size</Label>
            <FontSizeBox sizes={fontSizes} currentSize={currentFontSize} />
          </div>

          <div className="grid gap-2">
            <Label className=" text-sm pl-1">Form background color</Label>
            <FormBackgroundColorBox />
          </div>

          <div className="grid gap-2">
            <Label className=" text-sm pl-1">Action Button color</Label>
            <ActionBtnColorBox />
          </div>
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
            ? families?.find((family) => family?.value === value)?.name
            : "Select font family..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(`p-0 mt-2 font-sans`)}
        style={{ width: `${buttonRef?.current?.offsetWidth}px` }}
      >
        <Command className="w-full">
          <CommandInput placeholder="Search font..." />
          <CommandList>
            <CommandEmpty>No family found.</CommandEmpty>
            <CommandGroup>
              {families?.map((family) => (
                <CommandItem
                  key={family?.name}
                  value={family?.name}
                  onSelect={(currentValue) => {
                    setValue(family?.value);
                    useEditorStore.setState({
                      formFontFamliy: family?.value || null,
                    });
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

export const FontSizeBox = ({
  sizes,
  currentSize,
}: {
  sizes: { name: string; value: string }[];
  currentSize: string;
}) => {
  const { editor } = useCurrentEditor();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentSize || "");
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setValue(currentSize || "");
  }, [currentSize]);

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
            ? sizes?.find((size) => size?.value === value)?.name || value
            : "Select font size..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(`p-0 mt-2 font-sans`)}
        style={{ width: `${buttonRef?.current?.offsetWidth}px` }}
      >
        <Command className="w-full">
          <CommandInput placeholder="Search size..." />
          <CommandList>
            <CommandEmpty>No size found.</CommandEmpty>
            <CommandGroup>
              {sizes.map((size) => (
                <CommandItem
                  key={size?.value}
                  value={size?.name}
                  onSelect={(currentValue) => {
                    setValue(size?.value);
                    useEditorStore.setState({
                      formFontSize: size?.value || null,
                    });
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === size.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {size?.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const FormBackgroundColorBox = () => {
  const [color, setColor] = useState("");

  return (
    <InputGroup className="pr-3">
      <InputGroupInput
        type="color"
        value={color}
        onChange={(e) => {
          const val = e?.currentTarget?.value;
          setColor(val);
          // useEditorStore.setState({ actionBtnColor: val });
        }}
        className="size-8"
      />
      <InputGroupButton
        variant={"default"}
        className="text-xs"
        onClick={() => {
          useEditorStore.setState({ formBackgroundColor: color });
          toast.success(color);
        }}
      >
        Apply
      </InputGroupButton>
    </InputGroup>
  );
};

export const ActionBtnColorBox = () => {
  const [color, setColor] = useState("");

  return (
    <InputGroup className="pr-3">
      <InputGroupInput
        type="color"
        value={color}
        onChange={(e) => {
          const val = e?.currentTarget?.value;
          setColor(val);
          // useEditorStore.setState({ actionBtnColor: val });
        }}
        className="size-8"
      />
      <InputGroupButton
        variant={"default"}
        className="text-xs"
        onClick={() => {
          useEditorStore.setState({ actionBtnColor: color });
          toast.success(color);
        }}
      >
        Apply
      </InputGroupButton>
    </InputGroup>
  );
};

