"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  ChartColumnIncreasing,
  CircleAlertIcon,
  Edit,
  Ellipsis,
  Link2,
  Loader,
  MoveUpRight,
  Trash,
} from "lucide-react";
// import {
//   ArrowCircleUp,
//   ArrowCircleUp2,
//   ArrowUp,
//   Chart2,
//   Edit,
//   Trash,
// } from "iconsax-reactjs";
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
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const url = process.env.NEXT_PUBLIC_CLIENT_URL;

  return (
    <Item
      // onClick={() => router.push(`/dashboard/workspace/${props?.id}`)}
      className=" py-2.5 px-2 cursor-pointer"
      variant={"default"}
      size={"default"}
    >
      <ItemContent className=" px-0 ">
        <ItemTitle>
          <Link
            className=" hover:underline-offset-2 hover:underline"
            href={`/dashboard/${workspace}/form/view/${props.shortId}`}
          >
            <p className=" capitalize">{props?.name || "form"}</p>
          </Link>
        </ItemTitle>
      </ItemContent>
      <ItemActions>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="">
            <DropdownMenuItem
              // onClick={() => router.push(`/${props.shortId}`)}
              className=""
            >
              <Link
                className="w-full flex items-center gap-2"
                target="_blank"
                href={`${url}/${props.shortId}`}
              >
                {" "}
                <span className=" ">
                  <MoveUpRight />
                </span>
                <span>Go to</span>
              </Link>
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
                <ChartColumnIncreasing />
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
                <Edit />
              </span>
              <span>Edit</span>
            </DropdownMenuItem>

            <AlertDialog
              open={openDeleteDialog}
              onOpenChange={setOpenDeleteDialog}
            >
              <AlertDialogTrigger className="hover:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative cursor-default rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 w-full flex items-center gap-2">
                <Trash />
                <p>Delete</p>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                    aria-hidden="true"
                  >
                    <CircleAlertIcon />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      form
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete()}>
                    {deleting && <Loader className=" animate-spin" />}
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
}
