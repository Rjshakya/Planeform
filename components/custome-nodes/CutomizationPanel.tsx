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
  InputGroupTextarea,
} from "../ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CutomizationPanel = () => {
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
    { name: "Instrumental serif", value: "var(--font-insturment-serif)" },
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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Bolt />
        </Button>
      </SheetTrigger>
      <SheetContent className=" min-h-screen overflow-x-auto pb-6">
        <SheetTitle className="p-3">Customization Panel</SheetTitle>

        <div className=" px-2 grid gap-6">
          <div className="grid gap-2">
            <Label className=" text-muted-foreground/80 text-sm pl-1">
              Font family
            </Label>
            <FontFamilyBox families={formFontFamily} />
          </div>

          <div className="grid gap-2">
            <Label className=" text-muted-foreground/80 text-sm pl-1">
              Font size
            </Label>
            <FontSizeBox
              sizes={fontSizes}
              currentSize={useEditorStore.getState().formFontSize || ""}
            />
          </div>

          <div className="flex items-center justify-between gap-2 pr-2">
            <Label className=" text-muted-foreground/80 text-sm pl-1">
              Background color
            </Label>
            <FormBackgroundColorBox />
          </div>

          <div className="flex items-center justify-between gap-2 pr-2">
            <Label className=" text-muted-foreground/80 text-sm pl-1">
              Text color
            </Label>
            <FormTextColorBox />
          </div>

          <div className="flex items-center justify-between gap-2 pr-2">
            <Label className=" text-muted-foreground/80 text-sm pl-1">
              Button color
            </Label>
            <ActionBtnColorBox />
          </div>

          <div className="flex items-center justify-between gap-2 pr-2">
            <Label className=" text-muted-foreground/80 text-sm pl-1">
              Button text color
            </Label>
            <ActionBtnTextColorBox />
          </div>

          <div className="flex items-center justify-between gap-2 pr-2">
            <Label className=" text-muted-foreground/80 text-sm pl-1">
              Button border color
            </Label>
            <ActionBtnBorderColorBox />
          </div>

          <div className="flex items-center justify-between gap-2 pr-2">
            <Label className=" text-muted-foreground/80 text-sm pl-1">
              Input background color
            </Label>
            <InputBackgroundColorBox />
          </div>

          <div className="flex items-center justify-between gap-2 pr-2">
            <Label className=" text-muted-foreground/80 text-sm pl-1">
              Input border color
            </Label>
            <InputBorderColorBox />
          </div>

          <div className="flex items-center justify-between gap-3">
            <Label className=" text-muted-foreground/80 text-sm pl-1">
              Form color scheme
            </Label>
            <ColorSchemeBox />
          </div>
          <div className="grid gap-3">
            <Label className=" text-muted-foreground/80 text-sm pl-1">
              Thankyou message
            </Label>
            <CustomThankyouMessageBox />
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
        className={cn(`p-0 mt-2 font-sans `)}
        style={{ width: `${buttonRef?.current?.offsetWidth}px` }}
      >
        <Command className="w-full ">
          <CommandInput placeholder="Search size..." />
          <CommandList>
            <CommandEmpty>No size found.</CommandEmpty>
            <CommandGroup>
              {sizes.map((size) => (
                <CommandItem
                  key={size?.value}
                  value={size?.name}
                  onSelect={() => {
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
  const { formBackgroundColor, setFormBackgroundColor } = useEditorStore(
    (s) => s
  );
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputGroup
      onClick={() => inputRef?.current && inputRef?.current?.click()}
      className={cn("pr-3 size-5 p-0  overflow-hidden")}
    >
      <div
        className=" w-full h-full "
        style={{ backgroundColor: formBackgroundColor || "" }}
      ></div>
      <InputGroupInput
        type="color"
        value={formBackgroundColor || ""}
        onChange={(e) => {
          const val = e?.currentTarget?.value;
          setFormBackgroundColor(val);
        }}
        className="sr-only"
        ref={inputRef}
      />
    </InputGroup>
  );
};

export const ActionBtnColorBox = () => {
  const { actionBtnColor, setActionBtnColor } = useEditorStore((s) => s);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <InputGroup
      onClick={() => inputRef?.current && inputRef?.current?.click()}
      className={cn("pr-3 size-5 p-0  overflow-hidden")}
    >
      <div
        className=" w-full h-full "
        style={{ backgroundColor: actionBtnColor || "" }}
      ></div>
      <InputGroupInput
        type="color"
        value={actionBtnColor || ""}
        onChange={(e) => {
          const val = e?.currentTarget?.value;
          setActionBtnColor(val);
        }}
        className="sr-only"
        ref={inputRef}
      />
    </InputGroup>
  );
};

export const FormTextColorBox = () => {
  const { formTextColor, setFormTextColor } = useEditorStore((s) => s);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <InputGroup
      onClick={() => inputRef?.current && inputRef?.current?.click()}
      className={cn("pr-3 size-5 p-0  overflow-hidden")}
    >
      <div
        className=" w-full h-full "
        style={{ backgroundColor: formTextColor || "" }}
      ></div>
      <InputGroupInput
        type="color"
        value={formTextColor || ""}
        onChange={(e) => {
          const val = e?.currentTarget?.value;
          setFormTextColor(val);
        }}
        className="sr-only"
        ref={inputRef}
      />
    </InputGroup>
  );
};

export const ActionBtnTextColorBox = () => {
  const { actionBtnTextColor, setActionBtnTextColor } = useEditorStore(
    (s) => s
  );
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <InputGroup
      onClick={() => inputRef?.current && inputRef?.current?.click()}
      className={cn("pr-3 size-5 p-0  overflow-hidden")}
    >
      <div
        className=" w-full h-full "
        style={{ backgroundColor: actionBtnTextColor || "" }}
      ></div>
      <InputGroupInput
        type="color"
        value={actionBtnTextColor || ""}
        onChange={(e) => {
          const val = e?.currentTarget?.value;
          setActionBtnTextColor(val);
        }}
        className="sr-only bg-transparent "
        ref={inputRef}
      />
    </InputGroup>
  );
};

export const InputBackgroundColorBox = () => {
  const { inputBackgroundColor, setInputBackgroundColor } = useEditorStore(
    (s) => s
  );
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <InputGroup
      onClick={() => inputRef?.current && inputRef?.current?.click()}
      className={cn("pr-3 size-5 p-0  overflow-hidden")}
    >
      <div
        className=" w-full h-full "
        style={{ backgroundColor: inputBackgroundColor || "" }}
      ></div>
      <InputGroupInput
        type="color"
        value={inputBackgroundColor || ""}
        onChange={(e) => {
          const val = e?.currentTarget?.value;
          setInputBackgroundColor(val);
        }}
        className="sr-only"
        ref={inputRef}
      />
    </InputGroup>
  );
};

export const InputBorderColorBox = () => {
  const { inputBorderColor, setInputBorderColor } = useEditorStore((s) => s);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <InputGroup
      onClick={() => inputRef?.current && inputRef?.current?.click()}
      className={cn("pr-3 size-5 p-0  overflow-hidden")}
    >
      <div
        className=" w-full h-full "
        style={{ backgroundColor: inputBorderColor || "" }}
      ></div>
      <InputGroupInput
        type="color"
        value={inputBorderColor || ""}
        onChange={(e) => {
          const val = e?.currentTarget?.value;
          setInputBorderColor(val);
        }}
        className="sr-only"
        ref={inputRef}
      />
    </InputGroup>
  );
};

export const ActionBtnBorderColorBox = () => {
  const { actionBtnBorderColor, setActionBtnBorderColor } = useEditorStore(
    (s) => s
  );
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <InputGroup
      onClick={() => inputRef?.current && inputRef?.current?.click()}
      className={cn("pr-3 size-5 p-0  overflow-hidden")}
    >
      <div
        className=" w-full h-full "
        style={{ backgroundColor: actionBtnBorderColor || "" }}
      ></div>
      <InputGroupInput
        type="color"
        value={actionBtnBorderColor || ""}
        onChange={(e) => {
          const val = e?.currentTarget?.value;
          setActionBtnBorderColor(val);
        }}
        className="sr-only"
        ref={inputRef}
      />
    </InputGroup>
  );
};

export const ColorSchemeBox = () => {
  const { formColorScheme, setFormColorScheme } = useEditorStore((s) => s);

  useEffect(() => {
    document.documentElement.classList.toggle("dark");
  }, [formColorScheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className=" capitalize" variant="outline">
          {formColorScheme}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 mx-1 mt-2">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={formColorScheme}
          onValueChange={(v) => setFormColorScheme(v)}
        >
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const CustomThankyouMessageBox = () => {
  const { customThankyouMessage, setCustomThankyouMessage } = useEditorStore(
    (s) => s
  );

  return (
    <InputGroup>
      <InputGroupTextarea
        value={customThankyouMessage}
        onChange={(e) => {
          const msg = e?.currentTarget?.value;
          setCustomThankyouMessage(msg);
        }}
      />
    </InputGroup>
  );
};
