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
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Integrations } from "./_components/Integrations";
import { Analytics } from "./_components/Analytics";
import { authClient, signOut } from "@/lib/auth-client";
import { useUser } from "@/hooks/use-User";
import { Settings } from "./_components/Settings";
import { JSX, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const fetcher = (url: string) => apiClient.get(url);
export default function Page() {
  const { formId } = useParams();
  const [value, setValue] = useState("Submission");

  const { data, error, isLoading } = useSWR(
    `/api/form/${formId}/meta_data`,
    fetcher
  );
  useUser();

  return (
    <main className=" w-full pb-12 relative overflow-hidden">
      <div className=" max-w-4xl  mx-auto">
        <div className=" mb-8 ">
          <p className=" text-muted-foreground text-3xl md:text-5xl font-semibold tracking-tighter">
            {data?.data?.form?.name || "form"}
          </p>
        </div>
        <Tabs
          className="w-full px-2 "
          value={value}
          onValueChange={(v) => {
            setValue(v);
          }}
        >
          <TabsList
            activeClassName="bg-transparent border-b-2 border-ring shadow-none rounded-none  "
            className=" h-14 rounded-sm bg-transparent gap-5 w-full sm:w-fit  overflow-auto flex  items-center justify-between px-2"
          >
            <TabsTrigger
              className="border-0  text-base py-4 px-2"
              value="Submission"
            >
              Submission
            </TabsTrigger>
            <TabsTrigger
              className=" border-0 text-left text-base py-4  px-2"
              value="Analytics"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              className=" border-0 text-left text-base py-4  px-2 "
              value="Integrations"
            >
              Integrations
            </TabsTrigger>
            <TabsTrigger
              className=" border-0 text-left text-base py-4  px-2 "
              value="Settings"
            >
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContents className=" ">
            <TabsContent className="px-1  grid gap-2 mt-4  " value="Submission">
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
            <TabsContent className="px-1 mt-4" value="Settings">
              <Settings />
            </TabsContent>
          </TabsContents>
        </Tabs>
      </div>
    </main>
  );
}
