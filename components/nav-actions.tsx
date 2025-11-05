"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  Bell,
  CheckCheck,
  Edit,
  Link as LinkIcon,
  LogOut,
  Mail,
  MailIcon,
  MoreHorizontal,
  MoveUpRight,
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
import { useParams, usePathname, useRouter } from "next/navigation";
import { fi } from "date-fns/locale";
import Link from "next/link";

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { workspaceId, formId } = useParams();
  const appUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  const [isCopyied, setIsCopied] = React.useState(false);
  const { data: session } = authClient?.useSession();
  const path = usePathname();
  const router = useRouter();

  const [data, setData] = React?.useState([
    [
      {
        label: "name",
        icon: User,
      },
      {
        label: "email",
        icon: MailIcon,
      },
      {
        label: "Log out",
        icon: LogOut,
      },
    ],
  ]);

  return (
    <div className="flex items-center gap-2 text-sm">
      

      {
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

          {formId && path.includes("view") && (
            <PopoverContent
              className="w-56 overflow-hidden rounded-lg p-0"
              align="end"
            >
              <Sidebar collapsible="none" className="bg-transparent">
                <SidebarContent>
                  {
                    <SidebarGroup>
                      {" "}
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              className="w-full flex items-center gap-2"
                              onClick={() => {
                                window.navigator.clipboard.writeText(
                                  `${appUrl}/${formId}`
                                );
                                setIsCopied(true);
                                setTimeout(() => setIsCopied(false), 1000);
                              }}
                            >
                              {isCopyied ? (
                                <CheckCheck className=" dark:text-green-400 text-green-600" />
                              ) : (
                                <LinkIcon />
                              )}
                              <span>copy</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              className="w-full flex items-center gap-2"
                              onClick={() =>
                                router.push(
                                  `/dashboard/${workspaceId}/form/edit/${formId}?name=${formId}`
                                )
                              }
                            >
                              <span>
                                <Edit size={15} />
                              </span>
                              <span>Edit</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton className="w-full ">
                              <Link
                                className="w-full flex items-center gap-2"
                                href={`${appUrl}/${formId}`}
                                target="_blank"
                              >
                                <span>
                                  <MoveUpRight size={15} />
                                </span>
                                <span>Go to</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  }
                  {/* {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton
                            className="w-full flex items-center  gap-2"
                            onClick={async () => {
                              if (item.label === "Log out") {
                                await signOut();
                              }
                            }}
                          >
                            <span>{<item.icon size={15} />}</span>
                            {item.label === "name" && (
                              <span>{session?.user?.name || ""}</span>
                            )}
                            {item.label === "email" && (
                              <span>{session?.user?.email || ""}</span>
                            )}

                            {item.label === "Log out" && (
                              <span>{item.label}</span>
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))} */}
                </SidebarContent>
              </Sidebar>
            </PopoverContent>
          )}
        </Popover>
      }
    </div>
  );
}
