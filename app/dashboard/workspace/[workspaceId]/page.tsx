"use client";
// import useSwr from "swr";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { apiClient } from "@/lib/axios";
import { use } from "react";
import useSWR from "swr";
import FormCard from "./_components/FormCard";
import { useRouter } from "next/navigation";

const fetcher = (url: string) => apiClient.get(url).then((r) => r?.data);

export default function Page({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = use(params);
  const {
    data: formsData,
    error,
    isLoading,
  } = useSWR(`/api/form/workspace/${workspaceId}`, fetcher);
  const router = useRouter();

  if (error) return <p>error occurred</p>;
  if (isLoading) return <p>loading ...</p>;

  console.log(formsData);

  return (
    <div className="grid gap-16">
      <div className=" header w-full">
        <div className=" w-full flex items-center justify-between p-2">
          <div className=" w-full">
            <h3 className=" text-3xl font-medium">Forms</h3>
          </div>
          <div className="">
            <Button
              onClick={() =>
                router.push(`/dashboard/${workspaceId}/form/create`)
              }
            >
              {" "}
              <PlusIcon /> create
            </Button>
          </div>
        </div>
      </div>

      <div className=" w-full grid md:grid-cols-3 px-2 gap-4">
        {formsData?.forms &&
          formsData?.forms?.length > 0 &&
          formsData?.forms?.map((f: { name: string; shortId: string }) => {
            return (
              <FormCard name={f?.name} shortId={f?.shortId} key={f?.shortId} />
            );
          })}

        {formsData?.forms?.length === 0 && (
          <div className=" col-span-3 text-center ">
            <p className=" text-2xl text-muted-foreground">
              You dont have any forms , please create one
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
