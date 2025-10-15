"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Submissions } from "./_components/Submissions";
import { apiClient } from "@/lib/axios";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { Integrations } from "./_components/Integrations";

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
        <TabsList className=" bg-background flex items-center gap-8">
          <TabsTrigger
            className=" p-0 text-left md:text-lg py-3.5 w-full h-full data-[state=active]:underline  data-[state=active]:underline-offset-4 "
            value="Submission"
          >
            Submission
          </TabsTrigger>
          <TabsTrigger
            className=" p-0 text-left md:text-lg py-3.5 w-full h-full data-[state=active]:underline  data-[state=active]:underline-offset-4"
            value="Analytics"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            className=" p-0 text-left md:text-lg py-3.5 w-full h-full data-[state=active]:underline  data-[state=active]:underline-offset-4"
            value="Integrations"
          >
            Integrations
          </TabsTrigger>
        </TabsList>
        <TabsContent className="px-1  grid gap-2 mt-4 " value="Submission">
          <Submissions />
        </TabsContent>
        <TabsContent className="px-1 mt-4" value="Analytics">
          See analytics of your form here .
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
