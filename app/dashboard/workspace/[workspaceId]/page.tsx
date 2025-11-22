"use client";

import { Button } from "@/components/ui/button";
import { Loader, PlusIcon, TriangleAlert } from "lucide-react";
import { apiClient } from "@/lib/axios";

import useSWR from "swr";
import FormCard from "./_components/FormCard";
import { useParams, useRouter } from "next/navigation";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
} from "@/components/ui/shadcn-io/tabs";
import { FormsTab } from "./_components/FormsTab";
import { useUser } from "@/hooks/use-User";
import { AnimatedBackground } from "@/components/ui/animated-background";
import Link from "next/link";

const fetcher = (url: string) => apiClient.get(url).then((r) => r?.data);

export default function Page() {
  const { workspaceId } = useParams();
  const { data, error, isLoading } = useSWR(
    `/api/form/workspace/${workspaceId}`,
    fetcher
  );
  useUser();

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
          <Link href={`/dashboard/${workspaceId}/form/create`}>
            <Button>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_4418_9825)">
                    <path
                      d="M6 12H18"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 18V6"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4418_9825">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p>Form</p>
            </Button>
          </Link>
        </div>
      </div>
      <Tabs defaultValue="forms" className="w-full">
        <TabsList
          activeClassName="bg-transparent border-b-2 border-ring shadow-none rounded-none "
          className="h-14 rounded-sm bg-transparent gap-4"
        >
          <TabsTrigger
            data-id={"forms"}
            className="border-0 text-left text-base w-full h-full py-4  px-2"
            value="forms"
          >
            Forms
          </TabsTrigger>
          <TabsTrigger
            data-id={"settings"}
            className="border-0 text-left text-base w-full h-full py-4  px-2"
            value="settings"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContents>
          <TabsContent className="px-1  grid gap-2 mt-4 " value="forms">
            <FormsTab forms={data?.workspace?.forms || []} />
          </TabsContent>
          <TabsContent className="px-1 mt-4" value="settings">
            settings
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  );
}
