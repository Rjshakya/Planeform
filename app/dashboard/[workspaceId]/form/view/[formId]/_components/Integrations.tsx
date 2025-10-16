"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";

import { toast } from "sonner";
import { useRef, useState } from "react";

import useSWR from "swr";
import { IntegrationCard } from "./_components_integrations/IntegrationCard";
import { LiveConnection } from "./_components_integrations/LiveConnection";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Loader, TriangleAlert } from "lucide-react";

const fetcher = (url: string) => apiClient.get(url);

export const Integrations = ({
  data,
  error,
  isLoading,
}: {
  data: any;
  error: any;
  isLoading: boolean;
}) => {
  const { workspaceId, formId } = useParams();

  // const { data, error, isLoading } = useSWR(
  //   `/api/integration/${formId}`,
  //   fetcher
  // );

  const integrations = [
    {
      id: 1,
      provider: "google",
      isConnectedUri: `/api/integration/isConnected?provider=google&scope=spreadsheets&scope=drive.file`,
      workspaceId,
      formId,
    },
    {
      id: 2,
      provider: "notion",
      isConnectedUri: `/api/integration/isConnected?provider=notion`,
      workspaceId,
      formId,
    },
  ];

  if (error) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center gap-4">
        <span>
          <TriangleAlert className=" text-destructive" />
        </span>
        <p>failed to get your integrations</p>
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
    <div className=" w-full grid gap-6 mt-4">
      <Card className="grid gap-4 py-6 bg-transparent">
        <CardHeader className="">
          <CardTitle>
            <p className=" px-1">Live connections</p>
          </CardTitle>
        </CardHeader>
        <CardContent className=" flex flex-col  gap-5 ">
          {data &&
            data?.length > 0 &&
            data?.map((i: any, index: number) => {
              if (i?.metaData) {
                const metaData = JSON.parse(i?.metaData || "");
                return <LiveConnection key={index} metaData={metaData} />;
              }
            })}
        </CardContent>
      </Card>

      <div className=" grid md:grid-cols-3 gap-4">
        <AnimatedBackground
          className="rounded-lg bg-muted/20"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.6,
          }}
          enableHover
          // defaultValue="card-1"
        >
          {integrations?.map((i, index) => {
            return (
              <div key={index} data-id={`card-${i.id}`} className="w-full">
                {/* <div className="flex select-none flex-col space-y-1 p-4">
                  <h3 className="text-base font-medium text-zinc-800 dark:text-zinc-50">
                    {i.provider}
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400">
                    {i.provider}
                  </p>
                </div> */}
                <IntegrationCard
                  i={index}
                  key={index}
                  formId={(i.formId as string) || ""}
                  isConnectedUri={i.isConnectedUri}
                  provider={i.provider}
                  workspaceId={(i.workspaceId as string) || ""}
                />
              </div>
            );
          })}
        </AnimatedBackground>
      </div>
    </div>
  );
};
