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

const fetcher = (url: string) => apiClient.get(url).then((r) => r?.data);

export default function Page() {
  const { workspaceId } = useParams();
  const { data, error, isLoading } = useSWR(
    `/api/form/workspace/${workspaceId}`,
    fetcher
  );
  const router = useRouter();
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
          <Button
            onClick={() => router.push(`/dashboard/${workspaceId}/form/create`)}
          >
           
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 fill-white"
                viewBox="0 0 24 24"
                fill="#fffcfc"
              >
                <g clipPath="url(#clip0_4418_4716)">
                  <path
                    opacity="0.4"
                    d="M18.5698 22H13.9998C11.7098 22 10.5698 20.86 10.5698 18.57V11.43C10.5698 9.14 11.7098 8 13.9998 8H18.5698C20.8598 8 21.9998 9.14 21.9998 11.43V18.57C21.9998 20.86 20.8598 22 18.5698 22Z"
                    fill="white"
                        style={{fill:"var(--fillg)"}}
                  />
                  <path
                    d="M13.43 5.43V6.77C10.81 6.98 9.32 8.66 9.32 11.43V16H5.43C3.14 16 2 14.86 2 12.57V5.43C2 3.14 3.14 2 5.43 2H10C12.29 2 13.43 3.14 13.43 5.43Z"
                    fill="white"
                        style={{fill:"var(--fillg)"}}
                  />
                  <path
                    d="M18.1301 14.2491H17.2501V13.3691C17.2501 12.9591 16.9101 12.6191 16.5001 12.6191C16.0901 12.6191 15.7501 12.9591 15.7501 13.3691V14.2491H14.8701C14.4601 14.2491 14.1201 14.5891 14.1201 14.9991C14.1201 15.4091 14.4601 15.7491 14.8701 15.7491H15.7501V16.6291C15.7501 17.0391 16.0901 17.3791 16.5001 17.3791C16.9101 17.3791 17.2501 17.0391 17.2501 16.6291V15.7491H18.1301C18.5401 15.7491 18.8801 15.4091 18.8801 14.9991C18.8801 14.5891 18.5401 14.2491 18.1301 14.2491Z"
                    fill="white"
                    style={{fill:"var(--fillg)"}}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4418_4716">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p>Form</p>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="forms" className="w-full">
        <TabsList className="h-13 rounded-sm">
          <TabsTrigger
            data-id={"forms"}
            className=" appearance-none border-0 text-left md:text-lg w-full h-full py-4 px-5 "
            value="forms"
          >
            Forms
          </TabsTrigger>
          <TabsTrigger
            data-id={"settings"}
            className=" appearance-none border-0 text-left md:text-lg w-full h-full py-4 px-5 "
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
