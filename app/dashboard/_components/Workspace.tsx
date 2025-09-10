"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { WorkspaceCard } from "./WorkspaceCard";
import useSWR from "swr";
import { apiClient } from "@/lib/axios";

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

export default function Workspace() {
  const { data, error, isLoading } = useSWR(
    "/api/workspace/",
    fetcher
  );

  if (error) return <p>error</p>;
  if (isLoading) return <p>loading ...</p>;


  return (
    <div className="grid gap-16">
      <div className=" header w-full">
        <div className=" w-full flex items-center justify-between p-2">
          <div className=" w-full">
            <h3 className=" text-3xl font-medium">Workspaces</h3>
          </div>
          <div className="">
            <Button>
              {" "}
              <PlusIcon /> create
            </Button>
          </div>
        </div>
      </div>

      <div className=" w-full grid grid-cols-3 px-2 gap-4">
        {data?.workspace && data?.workspace?.length > 0 ? (
          data?.workspace?.map((w: any) => (
            <WorkspaceCard id={w?.id} name={w?.name} key={w?.id} />
          ))
        ) : (
          <p>no workspaces</p>
        )}
      </div>
    </div>
  );
}
