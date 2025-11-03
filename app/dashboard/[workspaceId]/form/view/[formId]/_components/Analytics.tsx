"use client";

import { apiClient } from "@/lib/axios";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader, TriangleAlert, Users } from "lucide-react";

const fetcher = (url: string) => apiClient.get(url).then((res) => res?.data);

export const Analytics = () => {
  const { formId } = useParams();
  const { data, error, isLoading } = useSWR(
    () => `/api/analytics/form/` + formId,
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
    <div className=" grid md:grid-cols-3 grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <Button size={"icon"} variant={"secondary"}>
            {" "}
            <Users />
          </Button>
        </CardHeader>
        <CardContent className=" px-8">
          <p>{data?.visitors || 0}</p>
          <p>Vistors</p>
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
          <p>{data?.uniqueVisitors || 0}</p>
          <p>Unique vistors</p>
        </CardContent>
      </Card>
    </div>
  );
};
