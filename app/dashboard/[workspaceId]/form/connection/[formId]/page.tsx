"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/use-User";
import { apiClient } from "@/lib/axios";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const searchParams = useSearchParams();
  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { formId, workspaceId } = useParams();
  const { user } = useUser();
  const router = useRouter();
  const [state, setState] = useState("");
  const [emailData, setEmailData] = useState({
    subject: "",
    body: "",
    from: "",
    to: "",
  });

  const handleSheet = async (title: string) => {
    try {
      if (!title || !user) return;
      const metaData = JSON.stringify({ title });
      await apiClient.post(`/api/integration/sheet`, {
        type: "google",
        formId,
        metaData,
        customerId: user.dodoCustomerId,
      });
      router.push(`${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`);
    } catch (e) {
      toast("failed to create sheet");
    }
  };

  const handleNotion = async (
    title: string,
    formId: string,
    customerId: string | undefined
  ) => {
    try {
      if (!title || !user || !customerId) return;
      const metaData = JSON.stringify({ title });
      const res = await apiClient.post(`/api/integration/notion/page`, {
        formId,
        metaData,
        customerId,
      });
      router.push(`${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`);
    } catch (e) {
      toast("failed to create notion page");
    }
  };

  const handleWebhook = async (
    url: string,
    formId: string,
    customerId: string | undefined
  ) => {
    try {
      if (!url || !customerId) return;

      const body = {
        formId,
        customerId,
        metaData: JSON.stringify({ url }),
      };
      await apiClient.post(`/api/integration/webhook`, body);
      router.push(`${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`);
    } catch (e) {
      toast("failed to create webhook");
    }
  };

  const handleGmailNotify = async (
    bodyData: { subject: string; body?: string },
    customerId: string
  ) => {
    if (!bodyData?.subject || !customerId) return;
    const body = {
      formId,
      customerId,
      metaData: JSON.stringify(bodyData),
    };
    await apiClient.post(`/api/integration/gmail-notify`, body);
    router.push(`${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`);
  };

  if (!searchParams || !searchParams.get("type")) {
    return (
      <div className="w-full grid place-content-center">
        <p>No integration , please return back</p>
        <Button
          onClick={() => router.replace("/dashboard")}
          variant={"secondary"}
          className="mt-4"
        >
          Back
        </Button>
      </div>
    );
  }

  if(!user){
    return <p>unauthorised</p>
  }

  return (
    <div>
      {searchParams.get("type") === "sheet" && (
        <div className="max-w-lg mx-auto grid gap-3">
          <Label>Sheet name</Label>
          <Input
            value={state}
            onChange={(e) => setState(e?.currentTarget?.value)}
            placeholder="type sheet name here"
          />
          <Button onClick={() => handleSheet(state)} className=" py-5">
            Submit
          </Button>
        </div>
      )}
      {searchParams.get("type") === "notion" && (
        <div className="max-w-lg mx-auto grid gap-3">
          <Label>Page name</Label>
          <Input
            value={state}
            onChange={(e) => setState(e.currentTarget.value)}
            placeholder="type notion page name here"
          />
          <Button
            onClick={() =>
              handleNotion(state, formId as string, user.dodoCustomerId)
            }
            className=" py-5"
          >
            Submit
          </Button>
        </div>
      )}
      {searchParams.get("type") === "webhook" && (
        <div className="max-w-lg mx-auto grid gap-3">
          <Label>Webhook url</Label>
          <Input
            value={state}
            onChange={(e) => setState(e.currentTarget.value)}
            placeholder="type webhook url here"
            type="url"
          />
          <Button
            onClick={() =>
              handleWebhook(state, formId as string, user?.dodoCustomerId)
            }
            className=" py-5"
          >
            Submit
          </Button>
        </div>
      )}
      {searchParams.get("type") === "gmail-notify" && (
        <div className="max-w-lg mx-auto grid gap-3">
          <Label>From</Label>
          <Input
            value={user?.email}
            placeholder="type subject here"
            type="url"
            readOnly
          />
          <Label>To</Label>
          <Input
            value={user?.email}
            placeholder="type subject here"
            type="url"
            readOnly
          />
          <Label>Subject</Label>
          <Input
            value={emailData?.subject}
            onChange={(e) =>
              setEmailData({ ...emailData, subject: e?.currentTarget?.value })
            }
            placeholder="write subject here"
            type="url"
          />
          <Label>Body</Label>
          <Textarea
            maxLength={55}
            value={emailData?.body}
            onChange={(e) =>
              setEmailData({ ...emailData, body: e.currentTarget.value })
            }
            placeholder="write anything here"
          />
          <Button
            onClick={() => handleGmailNotify(emailData, user.dodoCustomerId)}
            className=" py-5"
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
