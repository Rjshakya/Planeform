"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Link,
  LogOut,
  MoreHorizontal,
  Settings2,
  Star,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut } from "@/lib/auth-client";
import { ThemeToggle } from "./tiptap-templates/simple/theme-toggle";
import { useEditorStore } from "@/stores/useEditorStore";
import { FormEditor } from "@/app/dashboard/[slug]/form/_components/FormEditor";
import { useFormStore } from "@/stores/useformStore";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";

const data = [
  [
    {
      label: "Customize Page",
      icon: Settings2,
    },
  ],
  [
    {
      label: "Copy Link",
      icon: Link,
    },
  ],
  [
    {
      label: "Show delete pages",
      icon: Trash,
    },
    {
      label: "Notifications",
      icon: Bell,
    },
  ],
  [
    {
      label: "Import",
      icon: ArrowUp,
    },
    {
      label: "Export",
      icon: ArrowDown,
    },
    {
      label: "Log out",
      icon: LogOut,
    },
  ],
];

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [jsonContent, setJsonContent] = React.useState<any>();
  const pathName = usePathname();

  const handlePreview = () => {
    const editor = useEditorStore.getState().getEditor();

    console.log(editor);

    if (!editor) return;

    const json = editor.getJSON();
    console.log(json);

    setJsonContent(json);
  };

  // console.log(form);

  return (
    <div className="flex items-center gap-2 text-sm">
      {/* <div className="text-muted-foreground hidden font-medium md:inline-block">
        Edit Oct 08
      </div> */}

      

      <Button variant="ghost" size="icon" className="h-7 w-7">
        <Star />
      </Button>
      <ThemeToggle />

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-accent h-7 w-7"
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton
                            onClick={async () => {
                              if (item.label === "Log out") {
                                await signOut();
                              } else {
                                return;
                              }
                            }}
                          >
                            <item.icon /> <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  );
}
