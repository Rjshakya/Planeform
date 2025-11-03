"use client";

import * as React from "react";
import {
  Blocks,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
} from "lucide-react";

// import { NavFavorites } from "@/components/nav-favorites";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavWorkspaces } from "@/components/nav-workspaces";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { url } from "node:inspector";
import { apiClient } from "@/lib/axios";
import useSWR from "swr";
import { authClient } from "@/lib/auth-client";
import { redirect, useParams, usePathname } from "next/navigation";
import { NavUser } from "./nav-user";
import { Logo } from "./Logo";

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
  const { data: session } = authClient.useSession();
  const { data: workspaceData } = useSWR(
    `/api/workspace/forms/${session?.user?.id}`,
    fetcher
  );

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader className="gap-4">
        {/* <TeamSwitcher teams={data.teams} /> */}
        <SidebarMenu>
           <SidebarMenuItem>
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
            avatar: session?.user?.image || "",
            email: session?.user?.email || "user@formly.com",
            name: session?.user?.name || "user",
            customerId: session?.user?.dodoCustomerId || "customer",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
