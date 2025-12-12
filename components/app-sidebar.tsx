"use client";

import * as React from "react";
import { Command, Home } from "lucide-react";

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
  useSidebar,
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
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: false,
    },
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
  const { user } = useUser();
  const { data: workspaceData } = useSWR(
    `/api/workspace/forms/${user?.id}`,
    fetcher
  );
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="" {...props}>
      <SidebarHeader className="gap-4">
        <SidebarMenu>
          <SidebarMenuItem className="pl-2 py-2">
            <Logo hideName={state === "collapsed"} className="justify-start" />
          </SidebarMenuItem>
        </SidebarMenu>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavWorkspaces workspaces={workspaceData?.data?.workspace} />
      </SidebarContent>
      <SidebarFooter><NavUser /></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
