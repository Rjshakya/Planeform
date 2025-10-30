import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { File, Folder, Users } from "lucide-react";
import Workspace from "./Workspace";

export const DashboardComp = () => {
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
            <p>4</p>
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
            <p>6</p>
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
            <p>50</p>
            <p>Responses</p>
          </CardContent>
        </Card>
      </div>
      <Workspace />
    </div>
  );
};
