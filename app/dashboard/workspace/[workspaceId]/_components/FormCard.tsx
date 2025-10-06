"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRightIcon, Ellipsis, Loader } from "lucide-react";
import {
  ArrowCircleUp,
  ArrowCircleUp2,
  ArrowUp,
  Chart2,
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
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/axios";
import { mutate } from "swr";

interface formProps {
  shortId: string;
  name: string;
}

export default function FormCard(props: formProps) {
  const router = useRouter();
  const { workspaceId: workspace } = useParams();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    if (!props?.shortId || !workspace) return;

    setDeleting(true);
    try {
      await apiClient.delete(`/api/form/${props?.shortId}`);
    } catch (e) {
      toast("failed to delete this form");
    }

    setDeleting(false);
    toast(`${props.name} deleted!`);
    mutate(`/api/form/workspace/${workspace}`);
  };

  return (
    <Card
      // onClick={() => router.push(`/dashboard/workspace/${props?.id}`)}
      className=" py-2.5 px-2 cursor-pointer"
    >
      <CardHeader className=" px-0.5 flex items-center justify-between gap-1">
        <Link
          className=" hover:underline-offset-2 hover:underline"
          href={`/dashboard/${workspace}/form/view/${props.shortId}`}
        >
          <p className=" capitalize">{props?.name || "workspace"}</p>
        </Link>
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
                  `/dashboard/${workspace}/form/view/${props.shortId}`
                )
              }
              className="w-full flex items-center gap-2"
            >
              <span className=" ">
                <Chart2 className=" size-5 " variant="Bulk" />
              </span>

              <span>Responses</span>
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

            <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
              <DialogTrigger className=" hover:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative cursor-default rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 w-full flex items-center gap-2">
                <Trash variant="Bulk" className=" size-5" />
                <p>Delete</p>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete {props.name}</DialogTitle>
                  Are you sure , you want to delete this form ?
                </DialogHeader>
                <DialogFooter>
                  <Button
                    onClick={() => setOpenDeleteDialog(false)}
                    variant={"secondary"}
                  >
                    cancel
                  </Button>
                  <Button onClick={handleDelete} variant={"destructive"}>
                    {deleting && <Loader className=" animate-spin" />}
                    <p>Yes go ahead</p>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className=" px-0 ">
        <div className=" bg-muted w-full h-44 relative overflow-hidden rounded-2xl">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-95 mix-blend-overlay"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <filter id="noiseFilter">
                {/* fractalNoise produces the grain */}
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.9" /* tweak for grain size */
                  numOctaves="2" /* tweak for complexity */
                  stitchTiles="stitch"
                />
                {/* desaturate (make it grayscale) */}
                <feColorMatrix type="saturate" values="0" />
                {/* control alpha so noise is translucent */}
                <feComponentTransfer>
                  <feFuncA type="table" tableValues="0 0.35" />
                </feComponentTransfer>
              </filter>
            </defs>

            {/* the rect gets the noise filter applied */}
            <rect
              width="100%"
              height="100%"
              filter="url(#noiseFilter)"
              fill="#000"
            />
          </svg>

          <div className="relative z-10 w-full h-full ">
            <p className="w-full absolute bottom-2 right-2 leading-24 opacity-25 text-9xl font-bold tracking-[-0.10em] capitalize -rotate-6 pr-10  ">
              {props.name}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
