import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/lib/axios";
import useSWR from "swr";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const fetcher = (url: string) => apiClient.get(url);
export const IntegrationCard = ({
  provider,
  isConnectedUri,
  workspaceId,
  formId,
  i,
}: {
  provider: string;
  isConnectedUri: string;
  workspaceId: string;
  formId: string;
  i: number;
}) => {
  const { data, error, isLoading } = useSWR(isConnectedUri, fetcher);
  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  const handleLinkSocial = async () => {
    if (data?.data?.isConnected) return;

    if (provider === "google") {
      await authClient.linkSocial({
        provider: "google",
        scopes: [
          "https://www.googleapis.com/auth/spreadsheets",
          "https://www.googleapis.com/auth/drive.file",
        ],
        callbackURL: `${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`,
      });
    }

    if (provider === "notion") {
      await authClient.linkSocial({
        provider: "notion",
        callbackURL: `${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`,
      });
    }
  };

  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const createNotion = async (title: string) => {
    setCreating(true);
    try {
      if (!title) return;
      const res = await apiClient.post(`/api/integration/notion/page`, {
        formId,
        title,
      });

      console.log(res?.data?.data);
    } catch (e) {
      toast("failed to create notion page");
    }

    setCreating(false);
    setDialogOpen(false);
  };

  const createSheet = async (title: string) => {
    setCreating(true);
    try {
      if (!title) return;
      const metaData = JSON.stringify({ title });
      const res = await apiClient.post(`/api/integration/sheet`, {
        type: "google",
        formId,
        metaData,
      });

      console.log(res?.data?.data);
    } catch (e) {
      toast("failed to create sheet");
    }

    setCreating(false);
    setDialogOpen(false);
  };

  if (error) {
    return <div>Error loading integrations</div>;
  }

  return (
    <Card
      // onClick={() => router.push(`/dashboard/workspace/${props?.id}`)}
      className="py-4 cursor-pointer grid gap-6 bg-transparent w-full"
    >
      <CardHeader className=" ">
        <CardTitle className=" capitalize">{provider}</CardTitle>
        <CardDescription>
          {provider === "google" && "Get submission in your google sheet"}
          {provider === "notion" && "Get submission in your notion page"}
        </CardDescription>
      </CardHeader>

      <CardFooter className=" px-6 ">
        <div className=" w-full flex items-center justify-between gap-2 ">
          <div className="w-full">
            {" "}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" variant={"ghost"}>
                  {provider === "google" && "Add sheet"}
                  {provider === "notion" && "Add Page"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {provider === "google" && "Sheet"}
                    {provider === "notion" && "Page"}
                  </DialogTitle>
                  <DialogDescription>
                    {provider === "google" && "Integrate new sheet"}
                    {provider === "notion" && "Integrate new page"}
                  </DialogDescription>
                </DialogHeader>

                {provider === "notion" && (
                  <div className="w-full grid gap-4 pt-2">
                    <Label>Title</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e?.currentTarget?.value)}
                    />
                  </div>
                )}
                {provider === "google" && (
                  <div className="w-full grid gap-4 pt-2">
                    <Label>Title</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e?.currentTarget?.value)}
                    />
                  </div>
                )}
                <DialogFooter>
                  <Button
                    className="flex items-center gap-2"
                    onClick={() => {
                      if (provider === "google") {
                        createSheet(title);
                      }
                      if (provider === "notion") {
                        createNotion(title);
                      }
                    }}
                    variant={"default"}
                  >
                    {creating && (
                      <div>
                        <Loader className="animate-spin" />
                      </div>
                    )}
                    <div>Submit</div>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full">
            {" "}
            <Button
              className="w-full"
              onClick={handleLinkSocial}
              variant={"secondary"}
            >
              {data?.data?.isConnected ? "connected" : "connect"}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
