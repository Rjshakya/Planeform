"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
} from "@/components/ui/shadcn-io/tabs";
import { Submissions } from "./_components/Submissions";
import { apiClient } from "@/lib/axios";
import useSWR from "swr";
import { useParams, useRouter } from "next/navigation";
import { Integrations } from "./_components/Integrations";
import { Analytics } from "./_components/Analytics";
import { authClient, signOut } from "@/lib/auth-client";
import { useUser } from "@/hooks/use-User";

const fetcher = (url: string) => apiClient.get(url);
export default function Page() {
  const { formId } = useParams();

  const { data, error, isLoading } = useSWR(
    `/api/form/${formId}/meta_data`,
    fetcher
  );
  useUser();
  return (
    <main className=" w-full max-w-4xl  mx-auto pb-16">
      <Tabs defaultValue="Submission" className="w-full">
        <div className=" mb-8 ">
          <p className=" text-muted-foreground text-3xl md:text-5xl font-semibold tracking-tighter">
            {data?.data?.form?.name || "form"}
          </p>
        </div>
        <TabsList className=" h-12  rounded-sm ">
          <TabsTrigger
            className=" rounded-sm text-left md:text-lg w-full h-full py-4 px-5"
            value="Submission"
          >
            Submission
          </TabsTrigger>
          <TabsTrigger
            className=" rounded-sm text-left md:text-lg w-full h-full py-4 px-5"
            value="Analytics"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            className=" rounded-sm text-left md:text-lg w-full h-full py-4 px-5 "
            value="Integrations"
          >
            Integrations
          </TabsTrigger>
        </TabsList>
        <TabsContents>
        <TabsContent className="px-1  grid gap-2 mt-4 " value="Submission">
          <Submissions />
        </TabsContent>
        <TabsContent className="px-1 mt-4" value="Analytics">
          <Analytics />
        </TabsContent>
        <TabsContent className="px-1 mt-4" value="Integrations">
          <Integrations
            data={data?.data?.form?.integrations}
            error={error}
            isLoading={isLoading}
          />
        </TabsContent>
        </TabsContents>
      </Tabs>
    </main>
  );
}
