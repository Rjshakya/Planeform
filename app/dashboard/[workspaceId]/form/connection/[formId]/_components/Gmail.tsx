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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormField } from "@/hooks/use-form-fields";
import { useUser } from "@/hooks/use-User";
import { apiClient } from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export interface IemailData {
  subject: string;
  body: string;
  from: string;
  to: string;
}

export const GmailNotifyIntegration = () => {
  const [emailData, setEmailData] = useState<IemailData>({
    subject: " ",
    body: " ",
    from: " ",
    to: " ",
  });
  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { formId, workspaceId } = useParams();
  const { user } = useUser();
  const router = useRouter();
  const handleGmailNotify = async (
    bodyData: { subject: string; body?: string },
    customerId: string
  ) => {
    if (!bodyData?.subject || !customerId) return;

    const metaData = {
      ...bodyData,
      url: `Gmail notification - ` + user?.email,
    };

    try {
      const body = {
        formId,
        customerId,
        metaData: JSON.stringify(metaData),
      };
      await apiClient.post(`/api/integration/gmail-notify`, body);
      setEmailData({
        subject: "",
        body: "",
        from: "",
        to: "",
      });
      router.replace(
        `${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`
      );
    } catch (e) {
      toast.error(
        "failed to create gmail notification integration , you can have only one gmail notification integration"
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto grid gap-2">
      <Label>From</Label>
      <Input
        value={user?.email || " "}
        placeholder="type subject here"
        readOnly
      />
      <Label>To</Label>
      <Input
        value={user?.email || " "}
        placeholder="type subject here"
        readOnly
      />
      <Label>Subject</Label>
      <Input
        value={emailData?.subject}
        onChange={(e) =>
          setEmailData({ ...emailData, subject: e?.target?.value })
        }
        placeholder="write subject here"
        type="url"
      />
      <Label>Body</Label>
      <Textarea
        maxLength={55}
        value={emailData?.body}
        onChange={(e) => setEmailData({ ...emailData, body: e.target?.value })}
        placeholder="write anything here"
      />
      <Button
        onClick={() => handleGmailNotify(emailData, user!.dodoCustomerId)}
        className=" py-5"
        size={"lg"}
      >
        Submit
      </Button>
    </div>
  );
};

export const GmailIntegration = () => {
  const [emailData, setEmailData] = useState<IemailData>({
    subject: " ",
    body: " ",
    from: " ",
    to: " ",
  });
  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  const { formId, workspaceId } = useParams();
  const { user } = useUser();
  const { data, error, isLoading } = useFormField(formId as string);
  const emailFields = data ? data?.filter((f) => f.type === "emailInput") : [];
  const router = useRouter();

  const handleGmail = async (
    email: IemailData,
    formId: string,
    customerId: string
  ) => {
    if (!email || !formId || !customerId) {
      return;
    }

    try {
      const emailField = data.find((f) => f.type === "emailInput");
      const metaData = {
        ...email,
        to: emailField?.id,
        url: "Gmail - " + user?.email,
      };

      const body = {
        metaData: JSON.stringify(metaData),
        formId,
        customerId,
      };
      await apiClient.post(`/api/integration/gmail`, body);
      setEmailData({
        subject: "",
        body: "",
        from: "",
        to: "",
      });
      router.replace(
        `${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`
      );
    } catch (error) {
      toast.error(
        "failed to create gmail integration , you can have only one gmail integration"
      );
    }
  };

  if (!emailFields || !emailFields?.length) {
    return (
      <div className=" max-w-lg mx-auto grid gap-2">
        <h2 className="text-lg font-medium">
          No email field found in the form
        </h2>
        <p className="text-sm">
          please add one email field in your form to send email to repondents.
        </p>
        <Button
          size={"lg"}
          onClick={() =>
            router.replace(
              `${clientUrl}/dashboard/${workspaceId}/form/view/${formId}`
            )
          }
        >
          Return back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto grid gap-2">
      <Label>From</Label>
      <Input value={user?.email} readOnly />
      <Label>To</Label>
      {data && data.length > 0 ? (
        data
          ?.filter((f) => f.type === "emailInput")
          .map((f) => <Input readOnly key={f.id} value={f.label} />)
      ) : (
        <Input />
      )}
      <Label>Subject</Label>
      <Input
        value={emailData?.subject}
        onChange={(e) => {
          setEmailData((p) => ({ ...p, subject: e.target?.value }));
        }}
      />
      <Label>Body</Label>
      <Textarea
        value={emailData?.body}
        onChange={(e) => {
          setEmailData((p) => ({ ...p, body: e.target?.value }));
        }}
      />
      <Button
        size={"lg"}
        onClick={() =>
          handleGmail(
            emailData,
            formId as string,
            user?.dodoCustomerId as string
          )
        }
      >
        Submit
      </Button>
      <Card className="mt-4 shadow-none">
        <CardHeader>
          <CardTitle className=" capitalize text-destructive">
            Gmail Integration limit
          </CardTitle>
        </CardHeader>
        <CardContent>
          Gmail has limit on how much emails you can send . we do not recommend
          it for bulk emails.
        </CardContent>
      </Card>
    </div>
  );
};
