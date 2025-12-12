import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/lib/axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

interface IworkspaceData {
  name: string;
}

export const WorkspaceSettings = ({
  workspaceName,
}: {
  workspaceName: string;
}) => {
  const [workspaceData, setWorkspaceData] = useState<IworkspaceData>({
    name: workspaceName || " ",
  });
  const [disable, setDisable] = useState(true);
  const { workspaceId } = useParams();

  const handleWorkspaceUpdate = async (params: IworkspaceData) => {
    try {
      const body = {
        data: params,
        workspaceId,
      };
      const { status } = await apiClient.patch(`/api/workspace`, body);
      if (status === 200) {
        toast.success("workspace updated");
        mutate(`/api/form/workspace/${workspaceId}`);
      }
    } catch (e) {
      toast.error("failed to update workspace");
    }
  };

  return (
    <Card className="border-none shadow-none rounded-sm bg-background ">
      <CardContent className="grid gap-3">
        <Label>Name</Label>
        <Input
          value={workspaceData.name}
          onChange={(e) => {
            setWorkspaceData({
              ...workspaceData,
              name: e.target?.value,
            });
            if (workspaceName !== e.target.value) {
              setDisable(false);
            } else {
              setDisable(true);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleWorkspaceUpdate(workspaceData);
              setDisable(true)
            }
          }}
          placeholder="Workspace Name"
          className=""
        />
      </CardContent>
      <CardFooter>
        <CardAction className="px-0.5">
          <Button
            onClick={() => handleWorkspaceUpdate(workspaceData)}
            variant={"destructive"}
            className="w-[120px]"
            size={"lg"}
            disabled={disable}
          >
            Submit
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};
