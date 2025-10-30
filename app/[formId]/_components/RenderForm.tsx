"use client";
import { FormEditor } from "@/app/dashboard/[workspaceId]/form/_components/FormEditor";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/axios";
import { JsonDoc } from "@/lib/types";
import { useFormStore } from "@/stores/useformStore";
import { ArrowLeft, Loader, TriangleAlert } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import useSWR from "swr";

const fetcher = (url: string) => apiClient.get(url);

export const RenderForm = () => {
  const { formId } = useParams();
  const { data, isLoading, error } = useSWR(`/api/form/${formId}`, fetcher);
  const [docs, setDocs] = useState<JsonDoc[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const handleActiveIndex = (idx: number) => {
    const index = idx < 0 ? 0 : Math.min(docs?.length - 1, idx);
    setActiveIdx(index);
  };

  const form = data?.data?.form;
  const form_schema = form?.form_schema;
  const creator = form?.creator;

  useEffect(() => {
    if (activeIdx === undefined) return;

    useFormStore?.setState({
      maxStep: docs?.length - 1,
      setActiveStep: setActiveIdx,
    });
  }, [docs, activeIdx]);

  useEffect(() => {
    if (!form_schema?.content) {
      setDocs([]);
      return;
    }

    const content = [...form_schema?.content];
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

    setDocs(parsedDocs);
    if (parsedDocs?.length === 1) {
      useFormStore.setState({ isSingleForm: true, creator: creator });
    } else {
      useFormStore.setState({ isSingleForm: false, creator: creator });
    }
    setActiveIdx(0); // Reset to first step
  }, [form_schema, creator]);

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
    <div className="pt-3">
      {docs?.length > 1 && activeIdx !== 0 && (
        <div className="w-full max-w-sm mx-auto ">
          <Button
            onClick={() => handleActiveIndex(activeIdx - 1)}
            variant={"secondary"}
            size={"icon"}
          >
            <ArrowLeft size={16} />
          </Button>
        </div>
      )}

      {docs?.map((content, i) => {
        if (activeIdx === i) {
          return (
            <FormEditor
              key={i}
              className=" mx-auto max-w-lg w-full rounded-2xl  dark:bg-accent/0 "
              isEditable={false}
              content={content}
              isLast={docs?.length - 1 === activeIdx}
              activeStep={i}
              maxStep={docs?.length - 1}
            />
          );
        }
        return null;
      })}
    </div>
    // <FormEditor
    //   className="mx-auto max-w-lg w-full rounded-2xl   my-3 "
    //   isEditable={false}
    //   content={form_schema}
    // />
  );
};
