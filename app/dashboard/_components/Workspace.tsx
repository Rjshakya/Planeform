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
          <div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant={"secondary"}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 fill-foreground "
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_4418_9825)">
                        <path
                          className="stroke-foreground"
                          d="M6 12H18"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          className="stroke-foreground"
                          d="M12 18V6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4418_9825">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span onClick={() => setOpen(true)}>Workspace</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="gap-4 px-5 font-sans tracking-tighter p-8">
                <DialogHeader>
                  <DialogTitle className="text-base font-medium">Create new workspace</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2">
                <Label className="text-lg">Name</Label>
                <Input
                 placeholder="my-workspace-1"
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
                </div>
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
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="">
                <div>
                 
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_4418_9825)">
                      <path
                        d="M6 12H18"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 18V6"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4418_9825">
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
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=" size-5 fill-foreground"
                      viewBox="0 0 24 24"
                      fill="#fff"
                    >
                      <g clipPath="url(#clip0_4418_4823)">
                        <path
                          opacity="0.4"
                          d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z"
                          fill="white"
                          style={{ fill: "var(--fillg)" }}
                        />
                        <path
                          d="M15.8002 2.21048C15.3902 1.80048 14.6802 2.08048 14.6802 2.65048V6.14048C14.6802 7.60048 15.9202 8.81048 17.4302 8.81048C18.3802 8.82048 19.7002 8.82048 20.8302 8.82048C21.4002 8.82048 21.7002 8.15048 21.3002 7.75048C19.8602 6.30048 17.2802 3.69048 15.8002 2.21048Z"
                          fill="white"
                          style={{ fill: "var(--fillg)" }}
                        />
                        <path
                          d="M11.5299 12.47L9.52994 10.47C9.51994 10.46 9.50994 10.46 9.50994 10.45C9.44994 10.39 9.36994 10.34 9.28994 10.3C9.27994 10.3 9.27994 10.3 9.26994 10.3C9.18994 10.27 9.10994 10.26 9.02994 10.25C8.99994 10.25 8.97994 10.25 8.94994 10.25C8.88994 10.25 8.81994 10.27 8.75994 10.29C8.72994 10.3 8.70994 10.31 8.68994 10.32C8.60994 10.36 8.52994 10.4 8.46994 10.47L6.46994 12.47C6.17994 12.76 6.17994 13.24 6.46994 13.53C6.75994 13.82 7.23994 13.82 7.52994 13.53L8.24994 12.81V17C8.24994 17.41 8.58994 17.75 8.99994 17.75C9.40994 17.75 9.74994 17.41 9.74994 17V12.81L10.4699 13.53C10.6199 13.68 10.8099 13.75 10.9999 13.75C11.1899 13.75 11.3799 13.68 11.5299 13.53C11.8199 13.24 11.8199 12.76 11.5299 12.47Z"
                          fill="white"
                          style={{ fill: "var(--fillg)" }}
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4418_4823">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span onClick={handleCreateForm}>New form</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 fill-foreground"
                      viewBox="0 0 24 24"
                      fill="#fff"
                    >
                      <g clipPath="url(#clip0_4418_4297)">
                        <path
                          opacity="0.4"
                          d="M21.74 9.44H2V6.42C2 3.98 3.98 2 6.42 2H8.75C10.38 2 10.89 2.53 11.54 3.4L12.94 5.26C13.25 5.67 13.29 5.73 13.87 5.73H16.66C19.03 5.72 21.05 7.28 21.74 9.44Z"
                          fill="white"
                          style={{ fill: "var(--fillg)" }}
                        />
                        <path
                          d="M21.99 10.8404C21.97 10.3504 21.89 9.89043 21.74 9.44043H2V16.6504C2 19.6004 4.4 22.0004 7.35 22.0004H16.65C19.6 22.0004 22 19.6004 22 16.6504V11.0704C22 11.0004 22 10.9104 21.99 10.8404ZM14.5 16.2504H12.81V18.0004C12.81 18.4104 12.47 18.7504 12.06 18.7504C11.65 18.7504 11.31 18.4104 11.31 18.0004V16.2504H9.5C9.09 16.2504 8.75 15.9104 8.75 15.5004C8.75 15.0904 9.09 14.7504 9.5 14.7504H11.31V13.0004C11.31 12.5904 11.65 12.2504 12.06 12.2504C12.47 12.2504 12.81 12.5904 12.81 13.0004V14.7504H14.5C14.91 14.7504 15.25 15.0904 15.25 15.5004C15.25 15.9104 14.91 16.2504 14.5 16.2504Z"
                          fill="white"
                          style={{ fill: "var(--fillg)" }}
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4418_4297">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span onClick={() => setOpen(true)}>New workspace</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu> */}
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
