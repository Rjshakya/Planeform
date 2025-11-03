"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { File, Folder, Loader, TriangleAlert, Users } from "lucide-react";
import Workspace from "./Workspace";
import { apiClient } from "@/lib/axios";
import useSWR from "swr";
import { authClient } from "@/lib/auth-client";

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);
export const DashboardComp = () => {
  const { data: session } = authClient.useSession();
  const { data, error, isLoading } = useSWR(
    () => `/api/analytics/` + session?.user?.dodoCustomerId,
    fetcher
  );

  if (error) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center gap-4">
        <span>
          <TriangleAlert className=" text-destructive" />
        </span>
        <p>failed to get your dashboard</p>
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
    <div className="max-w-4xl w-full mx-auto grid gap-3">
      <h1 className=" text-2xl font-semibold">Dashboard</h1>
      <div className=" grid md:grid-cols-3 grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <Button size={"icon"} variant={"secondary"}>
              {" "}
              <Folder />
            </Button>
          </CardHeader>
          <CardContent className=" px-8">
            <p>{data?.TotalWorkspaces || 0}</p>
            <p>Workspace</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Button size={"icon"} variant={"secondary"}>
              {" "}
              <File />
            </Button>
          </CardHeader>
          <CardContent className=" px-8">
            <p>{data?.TotalForms || 0}</p>
            <p>Forms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Button size={"icon"} variant={"secondary"}>
              {" "}
              <Users />
            </Button>
          </CardHeader>
          <CardContent className=" px-8">
            <p>{data?.TotalRespondents || 0}</p>
            <p>Total form visitors</p>
          </CardContent>
        </Card>
      </div>
      <Workspace />
    </div>
  );
};
