"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions";
import { ThemeToggle } from "@/components/tiptap-main/simple/theme-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authClient, signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const { workspaceId } = useParams();

  return (
    <SidebarProvider className="">
      <AppSidebar className="font-sans" />
      <SidebarInset className=" min-h-screen bg-sidebar ">
        <main className=" h-full bg-card ">
          <header
            className={cn(
              `flex h-9 pb-2 mb-8 pt-4 shrink-0 items-center gap-2 max-w-5xl mx-auto w-full sticky top-0 bg-card `,
              `${
                workspaceId && pathName?.includes("/form/create") && "hidden"
              }`,
              `${workspaceId && pathName?.includes(`form/edit`) && "hidden"}`
            )}
          >
            <div className="flex flex-1 items-center gap-2 ">
              <SidebarTrigger />
            </div>
            <div className={cn(`ml-auto  flex items-center gap-2`)}>
              <NavActions />
              <div className="">
                <ThemeToggle />
              </div>
            </div>
          </header>
          {/* <Separator className="mb-8 mt-1"/> */}
          <div
            className={cn(
              `flex flex-1 flex-col gap-4 px-4 font-sans`,
              `${workspaceId && pathName?.includes("/form/create") && "py-0"}`,
              `${workspaceId && pathName?.includes(`/form/edit`) && "py-0"}`
            )}
          >
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
