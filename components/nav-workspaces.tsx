import { ChevronRight, MoreHorizontal, Plus } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { apiClient } from "@/lib/axios";
import Link from "next/link";

// const fetcher = (url: string) => apiClient.get(url)

export function NavWorkspaces({
  workspaces,
}: {
  workspaces: {
    id: string;
    name: string;
    forms: {
      name: string;
      shortId: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {workspaces?.map((workspace) => (
            <Collapsible key={workspace?.name}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`/dashboard/workspace/${workspace?.id}`}>
                    <span className=" pl-6">{workspace?.name}</span>
                  </Link>
                </SidebarMenuButton>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction
                    className="bg-sidebar-accent text-sidebar-accent-foreground left-2 data-[state=open]:rotate-90"
                    showOnHover
                  >
                    <ChevronRight />
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <SidebarMenuAction showOnHover>
                  <Link href={`/dashboard/${workspace?.id}/form/create`}>
                    <Plus size={15} />
                  </Link>
                </SidebarMenuAction>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {workspace?.forms?.map((form) => (
                      <SidebarMenuSubItem key={form?.name}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={`/dashboard/${workspace?.id}/form/view/${form?.shortId}`}
                          >
                            <span>{form?.name}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
