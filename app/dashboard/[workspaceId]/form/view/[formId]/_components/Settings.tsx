import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/use-User";
import { apiClient } from "@/lib/axios";
import { Loader, TriangleAlert } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

const fetcher = (url: string) => apiClient.get(url).then((d) => d?.data);
export const Settings = () => {
  const { formId } = useParams();
  const { user } = useUser();
  const { data, error, isLoading } = useSWR(
    () => `/api/form/settings/` + formId,
    fetcher
  );
  const [state, setState] = useState({
    closed: data?.settings?.closed || false,
    closedMessage: data?.settings?.closedMessage || "This form is closed",
    disable: true,
  });

  const handleSubmit = async () => {
    if (!formId || !user?.dodoCustomerId) return;
    const payload = {
      customerId: user?.dodoCustomerId,
      formId,
      ...state,
    };

    const { status } = await apiClient.post(
      `/api/form/settings/update`,
      payload
    );
    if (status === 200) {
      toast.success("form settings saved");
    } else {
      toast.error("failed to save form settings");
    }
  };

  if (error) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center gap-4">
        <span>
          <TriangleAlert className=" text-destructive" />
        </span>
        <p>failed to form details</p>
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
    <Card className=" border-none shadow-none bg-background">
      <CardContent className="grid gap-4">
        <Label
          htmlFor="check"
          className=" flex items-center justify-between gap-2  bg-muted rounded-sm py-4 px-2"
        >
          <span className=" text-base font-semibold pl-1">Close form</span>
          <Switch
            id="check"
            checked={state.closed}
            onCheckedChange={(c) => {
              setState({ ...state, closed: c, disable: false });
            }}
          />
        </Label>
        <div className="grid gap-4 bg-muted py-4 px-2">
          <Label className="pl-1 text-base font-semibold">Closed message</Label>
          <Textarea
            className=" appearance-none bg-transparent border-none shadow-none"
            value={state.closedMessage}
            onChange={(e) => {
              setState({
                ...state,
                closedMessage: e?.currentTarget?.value,
                disable: false,
              });
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="">
        <CardAction className="px-1">
          <Button
            onClick={handleSubmit}
            variant={"destructive"}
            className="w-[120px]"
            size={"lg"}
            disabled={state.disable}
          >
            Submit
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};
