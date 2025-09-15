"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRightIcon, Ellipsis } from "lucide-react";
import {
  ArrowCircleUp,
  ArrowCircleUp2,
  ArrowUp,
  Edit,
  Trash,
} from "iconsax-reactjs";
import { useParams, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface formProps {
  shortId: string;
  name: string;
}

export default function FormCard(props: formProps) {
  const router = useRouter();
  const { workspaceId: workspace } = useParams();

  return (
    <Card
      // onClick={() => router.push(`/dashboard/workspace/${props?.id}`)}
      className=" py-1.5 px-2 cursor-pointer"
    >
      <CardHeader className=" px-0.5 flex items-center justify-between gap-1">
        <p>{props?.name || "workspace"}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuItem
              onClick={() => router.push(`/${props.shortId}`)}
              className="w-full flex items-center gap-2"
            >
              <span className=" ">
                <ArrowCircleUp2
                  // size={"60"}
                  variant="Bulk"
                  className=" rotate-45 size-5 "
                />
              </span>

              <span>Go to</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/dashboard/${workspace}/form/edit/${props.shortId}?name=${props.name}`
                )
              }
              className="w-full flex items-center gap-2"
            >
              <span>
                <Edit className=" size-5" variant="Bulk" />
              </span>
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full flex items-center gap-2">
              <Trash variant="Bulk" className=" size-5" />
              <p>Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className=" px-0 ">
        <div className=" w-full h-44  relative bg-accent">
          {/* <Image
            src={workspaceImg}
            alt="workspace-img"
            className="w-full h-full object-cover rounded-2xl"
          /> */}
        </div>
      </CardContent>
    </Card>
  );
}
