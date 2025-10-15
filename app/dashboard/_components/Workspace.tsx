"use client";
import { Button } from "@/components/ui/button";

import { Loader, PlusIcon, TriangleAlert } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

export default function Workspace() {
  const [creating, setCreating] = useState(false);
  const { data: session, error: sessionError } = authClient.useSession();
  const [workspaceName, setWorkspaceName] = useState("");
  const { data, error, isLoading, mutate } = useSWR(
    `/api/workspace/${session?.user?.id}`,
    fetcher
  );
  const [open, setOpen] = useState(false);

  if (sessionError) {
    signOut();
  }
  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span>
          <TriangleAlert className=" text-destructive" />
        </span>
        <p>failed to get workspaces</p>
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

  return (
    <div className="grid gap-16  max-w-4xl w-full mx-auto">
      <div className=" header w-full">
        <div className=" w-full flex items-center justify-between p-2">
          <div className=" w-full">
            <p>Hi ! {session?.user?.name}</p>
            <h3 className=" text-3xl font-medium text-muted-foreground">
              Your Workspaces
            </h3>
          </div>
          <div className="">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  {" "}
                  <PlusIcon /> create
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create new workspace</DialogTitle>
                </DialogHeader>
                <Label>Name</Label>
                <Input
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e?.currentTarget?.value)}
                />
                <DialogFooter>
                  <Button
                    onClick={async () =>
                      handleCreateWorkspace({
                        name: workspaceName,
                        owner: session?.user?.id || "",
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
      </div>

      <div className=" w-full flex-col gap-4">
        {data?.workspace && data?.workspace?.length > 0 ? (
          data?.workspace?.map((w: { id: string; name: string }) => (
            <WorkspaceCard id={w?.id} name={w?.name} key={w?.id} />
          ))
        ) : (
          <p>no workspaces</p>
        )}
      </div>
    </div>
  );
}
