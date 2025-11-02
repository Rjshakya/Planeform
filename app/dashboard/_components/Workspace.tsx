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
  const { workspace, error, isLoading, mutate, userId } = useWorkspace();
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
              <Button size={"icon"}>
                <Plus />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="m-1.5">
              <DropdownMenuRadioGroup>
                <DropdownMenuItem>
                  <FilePlus />
                  <span onClick={handleCreateForm}>Create form</span>
                </DropdownMenuItem>
              </DropdownMenuRadioGroup>
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
