"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormField } from "@/hooks/use-form-fields";
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
import { GmailIntegration, GmailNotifyIntegration, IemailData } from "./_components/Gmail";



export default function Page() {
  const searchParams = useSearchParams();
  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { formId, workspaceId } = useParams();
  const { user } = useUser();
  const router = useRouter();
  const [state, setState] = useState("");
  const [emailData, setEmailData] = useState<IemailData>({
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
      router.replace(
        `${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`
      );
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
      router.replace(
        `${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`
      );
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
      router.replace(
        `${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`
      );
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
    setEmailData({
      subject: "",
      body: "",
      from: "",
      to: "",
    });
    router.replace(`${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`);
    return;
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

  return (
    <div>
      {searchParams && searchParams.get("type") === "sheet" && (
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
      {searchParams && searchParams.get("type") === "notion" && (
        <div className="max-w-lg mx-auto grid gap-3">
          <Label>Page name</Label>
          <Input
            value={state}
            onChange={(e) => setState(e.currentTarget.value)}
            placeholder="type notion page name here"
          />
          <Button
            onClick={() =>
              handleNotion(state, formId as string, user!.dodoCustomerId)
            }
            className=" py-5"
          >
            Submit
          </Button>
        </div>
      )}
      {searchParams && searchParams.get("type") === "webhook" && (
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
      {searchParams && searchParams.get("type") === "gmail-notify" && (
        <GmailNotifyIntegration/>
      )}
      {searchParams && searchParams.get("type") === "gmail" && (
        <GmailIntegration />
      )}
    </div>
  );
}
