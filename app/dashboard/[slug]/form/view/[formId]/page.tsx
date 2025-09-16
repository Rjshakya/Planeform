"use client";
import TanStackTable from "@/components/comp-485";
import { Submissions } from "@/components/Submissions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function Page() {
  return (
    <main className=" w-full">
      <Tabs defaultValue="Submission" className="w-full">
        <div className=" mb-4 ">
          <p className=" text-muted-foreground text-6xl font-semibold tracking-tighter">
            Form
          </p>
        </div>
        <TabsList className=" bg-background w-2xs h-full">
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
        </TabsList>
        <TabsContent className="px-1  grid gap-2 " value="Submission">
          <p>Your form submissions are here.</p>
          <Submissions />
        </TabsContent>
        <TabsContent className="px-1 mt-8" value="Analytics">
          See analytics of your form here .
        </TabsContent>
      </Tabs>
    </main>
  );
}
