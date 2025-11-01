import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui//dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCurrentEditor } from "@tiptap/react";
import { JsonDoc } from "@/lib/types";
import { toast } from "sonner";
import { apiClient } from "@/lib/axios";
import { redirect, useParams, useRouter } from "next/navigation";
import { authClient, signOut } from "@/lib/auth-client";
import { mutate } from "swr";
import { Loader } from "lucide-react";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 10 });

export const PublishForm = () => {
  const { editor } = useCurrentEditor();
  const [creating, setCreating] = useState(false);
  const [open, setOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const { workspaceId: workspace } = useParams();
  const { data: session } = authClient.useSession();
  const shortId = uid.rnd();
  const router = useRouter();

  const handlePublish = async (formname: string) => {
    if (!session?.user?.id) {
      toast("sorry ur not authenticated please sign up");
      await signOut();
      return;
    }

    if (!workspace) return;
    const json = editor?.getJSON();
    const form_schema = JSON.stringify(json);
    const creator = session?.user?.id;
    const name = formname;
    const customerId = session?.user?.dodoCustomerId

    setCreating(true);

    try {
      const res = await apiClient.post(`/api/form`, {
        name,
        workspace,
        creator,
        form_schema,
        shortId,
        customerId
      });

      if (res.status === 201) {
        const formId = res?.data?.form?.shortId;
        await postFormFields(json, formId);
        toast(`You have successfully created form : ${formname}`);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast(`failed to create form: ${formname} , error: ${e.message}`);
      } else {
        toast(`failed to create form: ${formname}`);
      }
    }
    mutate(`/api/form/workspace/${workspace}`);
    setCreating(false);
    setOpen(false);
    router.push(`/dashboard/workspace/${workspace}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>Publish</Button>
      </DialogTrigger>
      <DialogContent className="gap-7">
        <DialogHeader>
          <DialogTitle>Create new form</DialogTitle>
        </DialogHeader>
        <div className=" grid gap-7">
          <Label>Form name</Label>
          <Input
            value={formName}
            onChange={(e) => setFormName(e?.currentTarget?.value)}
            placeholder="Please provide form name"
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                await handlePublish(formName);
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button
            disabled={creating}
            onClick={() => setOpen(false)}
            variant={"outline"}
          >
            Cancel
          </Button>
          <Button onClick={async () => await handlePublish(formName)}>
            {creating && <Loader className={`animate-spin`} />}
            <span>Create</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const filterFormFields = (jsonDoc: JsonDoc, formId: string) => {
  const filterInputFields = jsonDoc?.content?.filter((f) =>
    f?.type?.includes("Input")
  );
  const mapFilteredFields = filterInputFields?.map((f, i) => {
    return {
      id: f?.attrs?.id,
      form: formId,
      // @ts-ignore
      label: f?.content?.[0]?.text,
      type: f?.type,
      subType: f?.attrs?.type,
      placeholder: f?.attrs?.placeholder,
      order: i,
      isRequired: f?.attrs?.isRequired,
      file_limit: f?.attrs?.file_limit,
      choices: f?.attrs?.options,
      multiple_select: f?.attrs?.type !== "single",
    };
  });

  return mapFilteredFields;
};

export const postFormFields = async (jsonDoc: JsonDoc, formId: string) => {
  const fields = filterFormFields(jsonDoc, formId);

  try {
    const res = await apiClient.post(`/api/formField`, fields);
    return res?.status === 201;
  } catch (e) {
    await apiClient.delete(`/api/form/${formId}`);
    toast("failed to create form");
    throw new Error("error occurred in creating form");
  }
};
