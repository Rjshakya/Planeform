"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Ellipsis, PlusIcon } from "lucide-react";
import workspaceImg from "@/public/workspace-pic.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface workspaceCardProps {
  name: string;
  img?: string;
  id: string;
}

export const WorkspaceCard = (props: workspaceCardProps) => {
  const router = useRouter()

  return (
    <Card
      onClick={() => router.push(`/dashboard/workspace/${props?.id}`)}
      className=" py-1.5 px-2 cursor-pointer"
    >
      <CardHeader className=" px-0.5 flex items-center justify-between gap-1">
        <p>{props?.name || "workspace"}</p>
        <Button size={"icon"} variant={"ghost"}>
          <Ellipsis />
        </Button>
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
