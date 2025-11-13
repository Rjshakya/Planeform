"use client";
import { FormEditor } from "@/app/dashboard/[workspaceId]/form/_components/FormEditor";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/axios";
import { thankyouPageContent } from "@/lib/content";
import { JsonDoc } from "@/lib/types";
import { useFormStore } from "@/stores/useformStore";
import { ArrowLeft, Loader, TriangleAlert } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import useSWR from "swr";

const fetcher = (url: string) => apiClient.get(url);

export const RenderForm = ({ docs }: { docs: JsonDoc[] }) => {
  const { activeStep, maxStep, isLastStep } = useFormStore((s) => s);
  const handleActiveIndex = useCallback(
    (idx: number) => {
      const index = idx < 0 ? 0 : Math.min(docs?.length - 1, idx);
      useFormStore.setState({
        activeStep: index,
        isLastStep: maxStep === index,
      });
    },
    [activeStep, isLastStep, maxStep , docs?.length]
  );

  return (
    <div className="pt-3 w-full">
      {docs?.length > 1 &&
        activeStep !== 0 &&
        activeStep < docs?.length - 1 && (
          <div className="w-full max-w-lg mx-auto fixed top-4 inset-x-0 ">
            <Button
              onClick={() => handleActiveIndex(activeStep - 1)}
              variant={"secondary"}
              size={"icon"}
            >
              <ArrowLeft size={16} />
            </Button>
          </div>
        )}

      {docs?.map((content, i) => {
        if (activeStep === i) {
          return (
            <FormEditor
              key={activeStep}
              className="max-w-xl mx-auto  w-full rounded-2xl  dark:bg-accent/0 "
              isEditable={false}
              content={content}
            />
          );
        }
        return null;
      })}
    </div>
  );
};
