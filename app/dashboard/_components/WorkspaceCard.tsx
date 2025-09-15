"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {  ArrowUpRightIcon, Ellipsis, TrashIcon } from "lucide-react";
import workspaceImg from "@/public/workspace-pic.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { apiClient } from "@/lib/axios";
import useSWR from "swr";
import { toast } from "sonner";

interface workspaceCardProps {
  name: string;
  img?: string;
  id: string;
}

export const WorkspaceCard = (props: workspaceCardProps) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const { mutate } = useSWR("/api/workspace");

  const handleDeleteWorkspace = async (id: string) => {
    setDeleting(true);
    try {
      const res = await apiClient.delete(`/api/workspace/${id}`);
      if (res.status === 200) {
        mutate("/api/workspace");
        toast(`${props.name} deleted successfully`);
      }
    } catch (e) {
      toast("failed to delete workspace");
    }

    setDeleting(false);
  };

  return (
    <Card
      // onClick={() => router.push(`/dashboard/workspace/${props?.id}`)}
      className=" py-1.5 px-2 cursor-pointer"
    >
      <CardHeader className=" px-0.5 flex items-center justify-between gap-1">
        <p>{props?.name || "workspace"}</p>
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuItem
              className=""
              onClick={() => router.push(`/dashboard/workspace/${props?.id}`)}
            >
              <ArrowUpRightIcon size={18} /> <p>Go to</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className=""
              onClick={async () => await handleDeleteWorkspace(props?.id)}
            >
              <TrashIcon /> 
              <p>Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className=" px-0 ">
        <div className=" w-full h-44  relative">
          <Image
            src={props?.img || workspaceImg}
            alt="workspace-img"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </CardContent>
    </Card>
  );
};
