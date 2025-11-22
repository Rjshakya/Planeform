"use client";

import * as React from "react";
import {
  Command,
  Home,
} from "lucide-react";


import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavWorkspaces } from "@/components/nav-workspaces";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { apiClient } from "@/lib/axios";
import useSWR from "swr";
import { authClient } from "@/lib/auth-client";
import { NavUser } from "./nav-user";
import { Logo } from "./Logo";
import { useUser } from "@/hooks/use-User";

// This is sample data.
const data = {
  teams: [
    {
      name: "Planetform",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    // {
    //   title: "Search",
    //   url: "#",
    //   icon: Search,
    // },
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    // {
    //   title: "Inbox",
    //   url: "#",
    //   icon: Inbox,
    //   badge: "10",
    // },
  ],
  navSecondary: [
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    // },
    // {
    //   title: "Templates",
    //   url: "#",
    //   icon: Blocks,
    // },
    // {
    //   title: "Help",
    //   url: "#",
    //   icon: MessageCircleQuestion,
    // },
  ],
  workspaces: [
    {
      name: "Personal Life Management",
      emoji: "🏠",
      pages: [
        {
          name: "Daily Journal & Reflection",
          url: "#",
          emoji: "📔",
        },
      ],
    },
  ],
};

const fetcher = (url: string) => apiClient.get(url);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()
  const { data: workspaceData } = useSWR(
    `/api/workspace/forms/${user?.id}`,
    fetcher
  );

  return (
    <Sidebar className=" " {...props}>
      <SidebarHeader className="gap-4">
        {/* <TeamSwitcher teams={data.teams} /> */}
        <SidebarMenu>
           <SidebarMenuItem className="pl-2">
             <Logo className="justify-start"/>
           </SidebarMenuItem>
        </SidebarMenu>
        <NavMain  items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavFavorites favorites={data.favorites} /> */}
        <NavWorkspaces workspaces={workspaceData?.data?.workspace} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            avatar: user?.image || "",
            email: user?.email || "user@formly.com",
            name: user?.name || "user",
            customerId: user?.dodoCustomerId || "customer",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
