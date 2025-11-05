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

    if (provider === "Google") {
      await authClient.linkSocial({
        provider: "google",
        scopes: [
          "https://www.googleapis.com/auth/spreadsheets",
          "https://www.googleapis.com/auth/drive.file",
        ],
        callbackURL: `${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`,
      });
    }

    if (provider === "Notion") {
      await authClient.linkSocial({
        provider: "notion",
        callbackURL: `${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`,
      });
    }

    if (provider === "Webhook") {
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
        <CardTitle className=" capitalize">
          {provider === "Google" && (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </div>
          )}

          {provider === "Notion" && (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#fff"
                  fill-rule="evenodd"
                  d="M11.553,11.099c1.232,1.001,1.694,0.925,4.008,0.77 l21.812-1.31c0.463,0,0.078-0.461-0.076-0.538l-3.622-2.619c-0.694-0.539-1.619-1.156-3.391-1.002l-21.12,1.54 c-0.77,0.076-0.924,0.461-0.617,0.77L11.553,11.099z"
                  clip-rule="evenodd"
                ></path>
                <path
                  fill="#fff"
                  fill-rule="evenodd"
                  d="M12.862,16.182v22.95c0,1.233,0.616,1.695,2.004,1.619 l23.971-1.387c1.388-0.076,1.543-0.925,1.543-1.927V14.641c0-1-0.385-1.54-1.234-1.463l-25.05,1.463 C13.171,14.718,12.862,15.181,12.862,16.182L12.862,16.182z"
                  clip-rule="evenodd"
                ></path>
                <path
                  fill="#424242"
                  fill-rule="evenodd"
                  d="M11.553,11.099c1.232,1.001,1.694,0.925,4.008,0.77 l21.812-1.31c0.463,0,0.078-0.461-0.076-0.538l-3.622-2.619c-0.694-0.539-1.619-1.156-3.391-1.002l-21.12,1.54 c-0.77,0.076-0.924,0.461-0.617,0.77L11.553,11.099z M12.862,16.182v22.95c0,1.233,0.616,1.695,2.004,1.619l23.971-1.387 c1.388-0.076,1.543-0.925,1.543-1.927V14.641c0-1-0.385-1.54-1.234-1.463l-25.05,1.463C13.171,14.718,12.862,15.181,12.862,16.182 L12.862,16.182z M36.526,17.413c0.154,0.694,0,1.387-0.695,1.465l-1.155,0.23v16.943c-1.003,0.539-1.928,0.847-2.698,0.847 c-1.234,0-1.543-0.385-2.467-1.54l-7.555-11.86v11.475l2.391,0.539c0,0,0,1.386-1.929,1.386l-5.317,0.308 c-0.154-0.308,0-1.078,0.539-1.232l1.388-0.385V20.418l-1.927-0.154c-0.155-0.694,0.23-1.694,1.31-1.772l5.704-0.385l7.862,12.015 V19.493l-2.005-0.23c-0.154-0.848,0.462-1.464,1.233-1.54L36.526,17.413z M7.389,5.862l21.968-1.618 c2.698-0.231,3.392-0.076,5.087,1.155l7.013,4.929C42.614,11.176,43,11.407,43,12.33v27.032c0,1.694-0.617,2.696-2.775,2.849 l-25.512,1.541c-1.62,0.077-2.391-0.154-3.239-1.232l-5.164-6.7C5.385,34.587,5,33.664,5,32.585V8.556 C5,7.171,5.617,6.015,7.389,5.862z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          )}
          {provider === "Webhook" && (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#37474f"
                  d="M35,37c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S37.2,37,35,37z"
                ></path>
                <path
                  fill="#37474f"
                  d="M35,43c-3,0-5.9-1.4-7.8-3.7l3.1-2.5c1.1,1.4,2.9,2.3,4.7,2.3c3.3,0,6-2.7,6-6s-2.7-6-6-6 c-1,0-2,0.3-2.9,0.7l-1.7,1L23.3,16l3.5-1.9l5.3,9.4c1-0.3,2-0.5,3-0.5c5.5,0,10,4.5,10,10S40.5,43,35,43z"
                ></path>
                <path
                  fill="#37474f"
                  d="M14,43C8.5,43,4,38.5,4,33c0-4.6,3.1-8.5,7.5-9.7l1,3.9C9.9,27.9,8,30.3,8,33c0,3.3,2.7,6,6,6 s6-2.7,6-6v-2h15v4H23.8C22.9,39.6,18.8,43,14,43z"
                ></path>
                <path
                  fill="#e91e63"
                  d="M14,37c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S16.2,37,14,37z"
                ></path>
                <path
                  fill="#37474f"
                  d="M25,19c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S27.2,19,25,19z"
                ></path>
                <path
                  fill="#e91e63"
                  d="M15.7,34L12.3,32l5.9-9.7c-2-1.9-3.2-4.5-3.2-7.3c0-5.5,4.5-10,10-10c5.5,0,10,4.5,10,10 c0,0.9-0.1,1.7-0.3,2.5l-3.9-1c0.1-0.5,0.2-1,0.2-1.5c0-3.3-2.7-6-6-6s-6,2.7-6,6c0,2.1,1.1,4,2.9,5.1l1.7,1L15.7,34z"
                ></path>
              </svg>
            </div>
          )}
          {provider}
        </CardTitle>
        <CardDescription>
          {provider === "Google" && "Get submission in your google sheet"}
          {provider === "Notion" && "Get submission in your notion page"}
          {provider === "Webhook" && "Get submission to webhook url"}
        </CardDescription>
      </CardHeader>

      <CardFooter className=" px-6 ">
        <div className=" w-full flex items-center justify-between gap-2 ">
          <div className="w-full">
            {" "}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" variant={"ghost"}>
                  {provider === "Google" && "Add sheet"}
                  {provider === "Notion" && "Add Page"}
                  {provider === "Webhook" && "Add url"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {provider === "Google" && "Sheet"}
                    {provider === "Notion" && "Page"}
                    {provider === "Webhook" && "WebHook"}
                  </DialogTitle>
                  <DialogDescription>
                    {provider === "Google" && "Integrate new sheet"}
                    {provider === "Notion" && "Integrate new page"}
                    {provider === "Webhook" && "Get responses to your url"}
                  </DialogDescription>
                </DialogHeader>

                {provider === "Notion" && (
                  <div className="w-full grid gap-4 pt-2">
                    <Label>Title</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e?.currentTarget?.value)}
                    />
                  </div>
                )}
                {provider === "Google" && (
                  <div className="w-full grid gap-4 pt-2">
                    <Label>Title</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e?.currentTarget?.value)}
                    />
                  </div>
                )}
                {provider === "Webhook" && (
                  <div className="w-full grid gap-4 pt-2">
                    <Label>Webhook url</Label>
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
                      if (provider === "Google") {
                        createSheet(title);
                      }
                      if (provider === "Notion") {
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
