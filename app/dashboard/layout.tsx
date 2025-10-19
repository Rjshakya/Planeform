"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const { workspaceId } = useParams();

  return (
    <SidebarProvider className="">
      <AppSidebar />
      <SidebarInset>
        <header
          className={cn(
            `flex h-14 shrink-0 items-center gap-2, ${
              workspaceId && pathName?.includes("/form/create") && "hidden"
            }`
          )}
        >
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <div
          className={cn(
            `flex flex-1 flex-col gap-4 px-4  ${
              (workspaceId && pathName?.includes("/form/create")) || "py-10"
            }`
          )}
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
