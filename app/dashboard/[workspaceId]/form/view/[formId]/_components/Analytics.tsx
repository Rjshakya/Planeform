"use client";

import { apiClient } from "@/lib/axios";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader, TriangleAlert, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface IAnalytics {
  visitors: IAnalyticsObj[];
  uniqueVisitors: IAnalyticsObj[];
  submissions: IAnalyticsObj[];
  uniqueSubmissions: IAnalyticsObj[];
}

interface IAnalyticsObj {
  count: number;
  date: string;
}

const fetcher = (url: string) =>
  apiClient.get(url).then((res) => res?.data as IAnalytics);

export const Analytics = () => {
  const { formId } = useParams();
  const [interval, setInterval] = useState("today");
  const { data, error, isLoading } = useSWR(
    `/api/analytics/form?formId=${formId}&interval=${interval}`,
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
    <div className="grid gap-2">
      <div className="">
        <Select
          value={interval}
          onValueChange={(val) => {
            setInterval(val);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="1d">Last 24 hr</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className=" grid md:grid-cols-2 grid-cols-1 gap-2">
        <Card className=" rounded-sm border shadow-none">
          <CardHeader>
            <Button size={"icon"} variant={"secondary"}>
              {" "}
              <Users />
            </Button>
          </CardHeader>
          <CardContent className=" px-8">
            {data?.visitors && data?.visitors?.length > 0 ? (
              <TotalCountComp arr={data?.visitors} /> 
            ) : <p>0</p>}

            <p>Vistors</p>
          </CardContent>
        </Card>
        <Card className=" rounded-sm border shadow-none">
          <CardHeader>
            <Button size={"icon"} variant={"secondary"}>
              {" "}
              <Users />
            </Button>
          </CardHeader>
          <CardContent className=" px-8">
            {data?.uniqueVisitors && data?.uniqueVisitors?.length > 0 ? (
              <TotalCountComp arr={data?.uniqueVisitors} /> 
            ): <p>0</p>}

            <p>Unique vistors</p>
          </CardContent>
        </Card>
        <Card className=" rounded-sm border shadow-none">
          <CardHeader>
            <Button size={"icon"} variant={"secondary"}>
              {" "}
              <Users />
            </Button>
          </CardHeader>
          <CardContent className=" px-8">
            {data?.submissions && data?.submissions?.length > 0 ?(
              <TotalCountComp arr={data?.submissions} /> 
            ): <p>0</p>}

            <p>Submissions</p>
          </CardContent>
        </Card>
        <Card className=" rounded-sm border shadow-none">
          <CardHeader>
            <Button size={"icon"} variant={"secondary"}>
              {" "}
              <Users />
            </Button>
          </CardHeader>
          <CardContent className=" px-8">
            {data?.uniqueSubmissions && data?.uniqueSubmissions?.length > 0 ? (
              <TotalCountComp arr={data?.uniqueSubmissions} />
            ) : <p>0</p>}

            <p>Unique submissions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const TotalCountComp = ({ arr }: { arr: IAnalyticsObj[] }) => {
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if(!arr)return;
    const total = arr?.reduce((acc, curr) => acc + curr?.count, 0);
  
    
    setTotalCount(total);
  }, [arr]);

  return <p>{totalCount || 0}</p>;
};
