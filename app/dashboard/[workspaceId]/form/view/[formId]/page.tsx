"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Submissions } from "./_components/Submissions";
import { Integrations } from "./_components/Integrations";
export default function Page() {
  return (
    <main className=" w-full">
      <Tabs defaultValue="Submission" className="w-full">
        <div className=" mb-4 ">
          <p className=" text-muted-foreground text-6xl font-semibold tracking-tighter">
            Form
          </p>
        </div>
        <TabsList className=" bg-background flex items-center gap-8">
          <TabsTrigger
            className=" p-0 text-left text-lg py-3.5 w-full h-full data-[state=active]:underline  data-[state=active]:underline-offset-4 "
            value="Submission"
          >
            Submission
          </TabsTrigger>
          <TabsTrigger
            className=" p-0 text-left text-lg py-3.5 w-full h-full data-[state=active]:underline  data-[state=active]:underline-offset-4"
            value="Analytics"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            className=" p-0 text-left text-lg py-3.5 w-full h-full data-[state=active]:underline  data-[state=active]:underline-offset-4"
            value="Integrations"
          >
            Integrations
          </TabsTrigger>
        </TabsList>
        <TabsContent className="px-1  grid gap-2 mt-4 " value="Submission">
          <p className="">Your form submissions are here.</p>
          <Submissions />
        </TabsContent>
        <TabsContent className="px-1 mt-4" value="Analytics">
          See analytics of your form here .
        </TabsContent>
        <TabsContent className="px-1 mt-4" value="Integrations">
          <Integrations />
        </TabsContent>
      </Tabs>
    </main>
  );
}
