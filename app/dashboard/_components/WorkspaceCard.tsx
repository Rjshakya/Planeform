"use client";
import { Button } from "@/components/ui/button";

import {
  CircleAlertIcon,
  Edit,
  Ellipsis,
  Loader,
  MoveUpRight,
  Trash,
} from "lucide-react";

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
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

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

interface workspaceCardProps {
  name: string;
  img?: string;
  id: string;
}

export const WorkspaceCard = (props: workspaceCardProps) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const { mutate } = useSWR("/api/workspace");
  const { data } = authClient.useSession();

  const handleDeleteWorkspace = async (id: string) => {
    setDeleting(true);
    try {
      const res = await apiClient.delete(`/api/workspace/${id}`);
      if (res.status === 200) {
        mutate(`/api/workspace/${data?.user?.id}`);
        toast(`${props.name} deleted successfully`);
      }
    } catch (e) {
      toast("failed to delete workspace");
    }

    setDeleting(false);
  };

  return (
    <Item
      // onClick={() => router.push(`/dashboard/workspace/${props?.id}`)}
      className=" py-2.5 px-2 cursor-pointer"
    >
      <ItemContent className=" px-0.5 ">
        <ItemTitle>
          <Link
            className=" hover:underline-offset-2 hover:underline"
            href={`/dashboard/workspace/${props?.id}`}
          >
            <p className=" capitalize">{props?.name || "workspace"}</p>
          </Link>
        </ItemTitle>
      </ItemContent>
      <ItemActions className=" px-0 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="">
            <DropdownMenuItem
              className="w-full flex items-center gap-2"
              onClick={() => router.push(`/dashboard/workspace/${props?.id}`)}
            >
              <span className=" ">
                <MoveUpRight />
              </span>

              <span>Go to</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full flex items-center gap-2">
              <span>
                <Edit />
              </span>
              <span>Edit</span>
            </DropdownMenuItem>

            <AlertDialog>
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
                    <CircleAlertIcon className="opacity-80" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      workspace
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteWorkspace(props?.id)}
                  >
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
};
