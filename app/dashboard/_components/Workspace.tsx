"use client";
import { Button } from "@/components/ui/button";

import {
  FilePlus,
  Folder,
  Loader,
  Plus,
  PlusIcon,
  TriangleAlert,
} from "lucide-react";
import { WorkspaceCard } from "./WorkspaceCard";
import useSWR from "swr";
import { apiClient } from "@/lib/axios";
import { createWorkspaceParams } from "@/lib/types";
import { toast } from "sonner";
import { useState } from "react";
import { authClient, signOut } from "@/lib/auth-client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/hooks/use-workspace";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

export default function Workspace() {
  const [creating, setCreating] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const { workspace, error, isLoading, mutate, userId, customerId } =
    useWorkspace();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleCreateWorkspace = async (params: createWorkspaceParams) => {
    if (!params.owner || !params.name) {
      return;
    }
    setCreating(true);
    try {
      const res = await apiClient.post("/api/workspace", params);
      if (res.data) {
        mutate("/api/workspace");
        toast(params.name + " workspace created");
      }
    } catch (e) {
      toast("failed to create workspace");
    }

    setCreating(false);
    toast(`${params.name} created`);
    setOpen(false);
    setWorkspaceName("");
  };

  const handleCreateForm = async () => {
    if (!userId) return;

    try {
      if (workspace && workspace?.length === 0) {
        const workspaceBody = {
          name: "formly-wrkspace",
          owner: userId,
          customerId: customerId,
        } as createWorkspaceParams;
        const { data, status } = await apiClient.post(
          "/api/workspace",
          workspaceBody
        );

        if (status === 201) {
          const { id } = data?.workspace;
          router.push(`/dashboard/${id}/form/create`);
        }
      }

      if (workspace && workspace?.length > 0) {
        router.push(`/dashboard/${workspace[0]?.id}/form/create`);
      }
    } catch (e) {
      toast("failed to create form");
    }
  };

  if (error) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center gap-4">
        <span>
          <TriangleAlert className=" text-destructive" />
        </span>
        <p>failed to get your workspaces</p>
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
    <div className="grid gap-8   w-full ">
      <div className=" header w-full">
        <div className=" w-full flex items-center justify-between p-2">
          <div className=" w-full">
            <h3 className="text-xl md:text-3xl font-medium text-muted-foreground">
              Your workspaces
            </h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 fill-white"
                    viewBox="0 0 24 24"
                    fill="#fffcfc"
                  >
                    <g clipPath="url(#clip0_4418_4716)">
                      <path
                        opacity="0.4"
                        d="M18.5698 22H13.9998C11.7098 22 10.5698 20.86 10.5698 18.57V11.43C10.5698 9.14 11.7098 8 13.9998 8H18.5698C20.8598 8 21.9998 9.14 21.9998 11.43V18.57C21.9998 20.86 20.8598 22 18.5698 22Z"
                        fill="white"
                        style={{ fill: "var(--fillg)" }}
                      />
                      <path
                        d="M13.43 5.43V6.77C10.81 6.98 9.32 8.66 9.32 11.43V16H5.43C3.14 16 2 14.86 2 12.57V5.43C2 3.14 3.14 2 5.43 2H10C12.29 2 13.43 3.14 13.43 5.43Z"
                        fill="white"
                        style={{ fill: "var(--fillg)" }}
                      />
                      <path
                        d="M18.1301 14.2491H17.2501V13.3691C17.2501 12.9591 16.9101 12.6191 16.5001 12.6191C16.0901 12.6191 15.7501 12.9591 15.7501 13.3691V14.2491H14.8701C14.4601 14.2491 14.1201 14.5891 14.1201 14.9991C14.1201 15.4091 14.4601 15.7491 14.8701 15.7491H15.7501V16.6291C15.7501 17.0391 16.0901 17.3791 16.5001 17.3791C16.9101 17.3791 17.2501 17.0391 17.2501 16.6291V15.7491H18.1301C18.5401 15.7491 18.8801 15.4091 18.8801 14.9991C18.8801 14.5891 18.5401 14.2491 18.1301 14.2491Z"
                        fill="white"
                        style={{ fill: "var(--fillg)" }}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4418_4716">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p>New</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="m-1.5">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <FilePlus />
                  <span onClick={handleCreateForm}>New form</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Folder />
                  <span onClick={() => setOpen(true)}>New workspace</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="gap-6 px-5">
              <DialogHeader>
                <DialogTitle>Create new workspace</DialogTitle>
              </DialogHeader>
              <Label className="pl-1">Workspace name</Label>
              <Input
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e?.currentTarget?.value)}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    await handleCreateWorkspace({
                      name: workspaceName,
                      owner: userId || "",
                      customerId: customerId || "",
                    });
                  }
                }}
              />
              <DialogFooter>
                <Button
                  onClick={async () =>
                    handleCreateWorkspace({
                      name: workspaceName,
                      owner: userId || "",
                      customerId: customerId || "",
                    })
                  }
                >
                  {creating && <Loader className={`animate-spin`} />}
                  <span>Submitt</span>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className=" w-full flex-col gap-4">
        {workspace && workspace?.length > 0 ? (
          workspace?.map((w: { id: string; name: string }) => (
            <WorkspaceCard id={w?.id} name={w?.name} key={w?.id} />
          ))
        ) : (
          <EmptyWorkspace
            handleCreateForm={handleCreateForm}
            setOpen={setOpen}
          />
        )}
      </div>
    </div>
  );
}

export const EmptyWorkspace = ({
  setOpen,
  handleCreateForm,
}: {
  setOpen: (val: boolean) => void;
  handleCreateForm: () => Promise<void>;
}) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>No Workspace Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any workspace yet. Get started by creating
          your first workspace.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button variant={"ghost"} onClick={() => setOpen(true)}>
            Create workspace
          </Button>
          <Button variant={"secondary"} onClick={handleCreateForm}>
            Create form
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};
