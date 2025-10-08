"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  Bell,
  CheckCheck,
  Link,
  LogOut,
  Mail,
  MoreHorizontal,
  Settings2,
  Star,
  Trash,
  User,
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

import { authClient, signOut } from "@/lib/auth-client";
import { ThemeToggle } from "./tiptap-main/simple/theme-toggle";
import { useParams } from "next/navigation";
import { fi } from "date-fns/locale";

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { formId } = useParams();
  const appUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  const [isCopyied, setIsCopied] = React.useState(false);
  const { data: session } = authClient?.useSession();

  const [data, setData] = React?.useState([
    [
      {
        label: "Copy Link",
        icon: Link,
      },
    ],
    [
      {
        label: "Log out",
        icon: LogOut,
      },
    ],
  ]);

  React.useEffect(() => {
    if (session?.user) {
      const copy = [...data];
      copy?.[1]?.unshift({ label: session?.user?.email, icon: Mail });
      copy?.[1]?.unshift({ label: session?.user?.name, icon: User });

      setData(copy);
    }
  }, [session?.user]);

  return (
    <div className="flex items-center gap-2 text-sm">
      <Button variant="ghost" size="icon" className="h-7 w-7">
        <Star />
      </Button>
      <ThemeToggle />

      <Popover
        open={isOpen}
        onOpenChange={(o) => {
          setIsOpen(o);
          setIsCopied(false);
        }}
      >
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
                              }

                              if (item.label === "Copy Link" && formId) {
                                window.navigator.clipboard.writeText(
                                  `${appUrl}/${formId}`
                                );
                                setIsCopied(true);
                              }
                            }}
                          >
                            {item.label === "Copy Link" ? (
                              isCopyied ? (
                                <CheckCheck className=" dark:text-green-400 text-green-600" />
                              ) : (
                                <item.icon />
                              )
                            ) : (
                              <item.icon />
                            )}

                            <span>{item.label}</span>
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
