"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useCurrentEditor } from "@tiptap/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { filterFormFields } from "./PublishForm";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/axios";

export const EditForm = () => {
  const { editor } = useCurrentEditor();
  const { slug: workspaceId, formId } = useParams();
  const searchParams = useSearchParams();
  const [creating, setCreating] = useState(false);
  const [open, setOpen] = useState(false);

  const [formName, setFormName] = useState(searchParams.get("name") || "");
  const router = useRouter();

  const handleSaveEditForm = async () => {
    if (!editor) return;
    const json = editor.getJSON();
    const fields = filterFormFields(json, formId as string);

    setCreating(true);
    try {

      const promises = [
        await apiClient.patch(`/api/form/`, {
          formId,
          formName,
          form_schema: JSON.stringify(json),
        }),
        await apiClient.patch(`/api/formField`, { formId, fields }),
      ];
      await Promise.all(promises);
      toast(`form updated. successfully`);
      setOpen(false)
      router.push(`/dashboard/workspace/${workspaceId}`);
    } catch (e) {
      toast(`failed to save the form`);
    }

    setCreating(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>Save</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new form</DialogTitle>
        </DialogHeader>
        <div className=" grid gap-2.5">
          <Label>Form name</Label>
          <Input
            value={formName}
            onChange={(e) => setFormName(e?.currentTarget?.value)}
            placeholder="please provide form name"
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
          <Button onClick={async () => await handleSaveEditForm()}>
            {creating && <Loader className={`animate-spin`} />}
            <span>Ship it</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
