"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Submissions } from "./_components/Submissions";
import { apiClient } from "@/lib/axios";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { Integrations } from "./_components/Integrations";
import { Analytics } from "./_components/Analytics";

const fetcher = (url: string) => apiClient.get(url);
export default function Page() {
  const { formId } = useParams();

  const { data, error, isLoading } = useSWR(
    `/api/form/${formId}/meta_data`,
    fetcher
  );

  return (
    <main className=" w-full max-w-4xl  mx-auto">
      <Tabs defaultValue="Submission" className="w-full">
        <div className=" mb-8 ">
          <p className=" text-muted-foreground text-3xl md:text-5xl font-semibold tracking-tighter">
            {data?.data?.form?.name || "form"}
          </p>
        </div>
        <TabsList className="  bg-accent ">
          <TabsTrigger
            className=" rounded-sm text-left md:text-lg w-full h-full py-4 px-5  data-[state=active]:bg-card dark:data-[state=active]:bg-card"
            value="Submission"
          >
            Submission
          </TabsTrigger>
          <TabsTrigger
            className=" rounded-sm text-left md:text-lg w-full h-full py-4 px-5  data-[state=active]:bg-card dark:data-[state=active]:bg-card"
            value="Analytics"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            className=" rounded-sm text-left md:text-lg w-full h-full py-4 px-5  data-[state=active]:bg-card dark:data-[state=active]:bg-card "
            value="Integrations"
          >
            Integrations
          </TabsTrigger>
        </TabsList>
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
      </Tabs>
    </main>
  );
}
