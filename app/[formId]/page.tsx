"use client";
import { cn } from "@/lib/utils";
import { RenderForm } from "./_components/RenderForm";
import { ThemeToggle } from "@/components/tiptap-main/simple/theme-toggle";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/stores/useformStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiClient } from "@/lib/axios";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { JsonDoc } from "@/lib/types";
import { thankyouPageContent } from "@/lib/content";
import { Loader, TriangleAlert } from "lucide-react";
import {
  Icustomisation,
  IeditorStore,
  useEditorStore,
} from "@/stores/useEditorStore";

const fetcher = (url: string) => apiClient.get(url);
export default function Page() {
  const form = useForm({});
  const { formId } = useParams();
  const { data, isLoading, error } = useSWR(`/api/form/${formId}`, fetcher);
  const [docs, setDocs] = useState<JsonDoc[]>([]);

  const handleCreateRespondent = async (formId: string, customerId: string) => {
    const resp = await apiClient.post(`/api/respondent`, {
      form: formId,
      customerId: customerId,
    });

    const respondentId = resp?.data?.respondent?.id;
    useFormStore?.setState({ respondentId });
  };

  useEffect(() => {
    useFormStore.setState({ activeStep: 0, form: form });
  }, [form]);

  useEffect(() => {
    if (!data) return;
    const formData = data.data?.form;
    const form_schema = formData?.form_schema;
    const creator = formData?.creator;
    const customerId = formData?.customerId;
    const customisation = formData?.customisation as Icustomisation;

    if (!form_schema?.content) {
      setDocs([]);
      return;
    }

    const thankyouPage = [...form_schema?.content]?.find(
      (c) => c.type === "pageBreak"
    );
    const content = [...form_schema?.content].filter(
      (c) => c?.type !== "pageBreak"
    );
    const breakIndices: number[] = [0];

    content?.forEach((node, i) => {
      if (node.type === "horizontalRule") {
        breakIndices.push(i);
      }
    });

    breakIndices?.push(content?.length - 1);

    const parsedDocs = [] as any[];
    for (let i = 0; i < breakIndices.length - 1; i++) {
      const stepContent = content
        .slice(breakIndices[i], breakIndices[i + 1])
        .filter((n) => n?.type !== "horizontalRule");

      if (stepContent.length > 0) {
        parsedDocs.push({ type: "doc", content: stepContent });
      }
    }

    if (thankyouPage) {
      parsedDocs.push({ type: "doc", content: [thankyouPage] });
    } else {
      parsedDocs.push({ type: "doc", content: [thankyouPageContent] });
    }

    setDocs(parsedDocs);

    if (parsedDocs?.length === 1) {
      useFormStore.setState({
        isSingleForm: true,
        creator: creator,
        customerId: customerId,
        isLastStep: true,
        maxStep: parsedDocs?.length - 1,
      });
    } else {
      useFormStore.setState({
        isSingleForm: false,
        creator: creator,
        customerId: customerId,
        isLastStep: false,
        maxStep: parsedDocs?.length - 1,
      });
    }
    useEditorStore.setState({ ...customisation });
    handleCreateRespondent(formId as string, customerId);
  }, [data]);

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span>
          <TriangleAlert className=" text-destructive" /> failed to get form
        </span>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="animate-spin " />
      </div>
    );
  }

  return (
    <div className=" w-full relative">
      <div
        className={cn(
          ` max-w-6xl w-full mx-auto px-2 min-h-screen flex items-center justify-center relative`
        )}
      >
        <RenderForm docs={docs} />
      </div>
    </div>
  );
}
