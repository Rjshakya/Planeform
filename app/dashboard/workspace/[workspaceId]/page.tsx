"use client";

import { Button } from "@/components/ui/button";
import { Loader, PlusIcon, TriangleAlert } from "lucide-react";
import { apiClient } from "@/lib/axios";

import useSWR from "swr";
import FormCard from "./_components/FormCard";
import { useParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormsTab } from "./_components/FormsTab";
import { useUser } from "@/hooks/use-User";

const fetcher = (url: string) => apiClient.get(url).then((r) => r?.data);

export default function Page() {
  const { workspaceId } = useParams();
  const { data, error, isLoading } = useSWR(
    `/api/form/workspace/${workspaceId}`,
    fetcher
  );
  const router = useRouter();
  useUser()

  if (error) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center gap-4">
        <span>
          <TriangleAlert className=" text-destructive" />
        </span>
        <p>failed to get your forms</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 max-w-4xl w-full mx-auto">
      <div className=" mb-8  flex justify-between items-center gap-2">
        <div className=" text-muted-foreground text-3xl md:text-5xl font-semibold tracking-tighter">
          {data?.workspace?.name || "Your workspace"}
        </div>

        <div className="">
          <Button
            onClick={() => router.push(`/dashboard/${workspaceId}/form/create`)}
          >
            {" "}
            <PlusIcon /> form
          </Button>
        </div>
      </div>
      <Tabs defaultValue="forms" className="w-full">
        <TabsList className="h-12  bg-accent rounded-sm">
          <TabsTrigger
            className=" rounded-sm text-left md:text-lg w-full h-full py-4 px-5  data-[state=active]:bg-card dark:data-[state=active]:bg-card"
            value="forms"
          >
            Forms
          </TabsTrigger>
          <TabsTrigger
            className=" rounded-sm text-left md:text-lg w-full h-full py-4 px-5 data-[state=active]:bg-card dark:data-[state=active]:bg-card"
            value="settings"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent className="px-1  grid gap-2 mt-4 " value="forms">
          <FormsTab forms={data?.workspace?.forms || []} />
        </TabsContent>
        <TabsContent className="px-1 mt-4" value="settings">
          settings
        </TabsContent>
      </Tabs>
    </div>
  );
}
