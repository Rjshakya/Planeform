import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/use-User";
import { apiClient } from "@/lib/axios";
import { Loader, TriangleAlert } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
    closed: false,
    closedMessage: "",
  });

  const handleSubmit = async () => {
    if (!formId || !user?.dodoCustomerId) return;
    const payload = {
      customerId: user?.dodoCustomerId,
      formId,
      ...state
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

  useEffect(() => {
    if (!data || !data?.settings) return;

    setState({
      closed: data?.settings?.closed,
      closedMessage: data?.settings?.closedMessage,
    });
  }, [data]);

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
    <div className="grid gap-6 pb-4">
      {/* <p>Form settings</p> */}
      <div className="grid gap-4">
        <Label htmlFor="check" className=" flex items-center justify-between gap-2  p-4 bg-muted rounded-sm">
          <span>Closed</span>
          <Switch
            id="check"
            checked={state.closed}
            onCheckedChange={(c) => {
              setState({ ...state, closed: c });
            }}
          />
        </Label>
        <div className=" flex flex-col   gap-2  p-4 bg-muted rounded-sm">
          <Label>Closing message</Label>
          <Textarea
            className=" appearance-none bg-transparent border-none shadow-none"
            value={state.closedMessage}
            onChange={(e) => {
              setState({ ...state, closedMessage: e?.currentTarget?.value });
            }}
          />
        </div>
        <div className="flex justify-start pl-1 ">
          <Button
            onClick={handleSubmit}
            variant={"destructive"}
            className="w-[120px]"
            size={"lg"}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
