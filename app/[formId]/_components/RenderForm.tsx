"use client";
import { FormEditor } from "@/app/dashboard/[workspaceId]/form/_components/FormEditor";
import { apiClient } from "@/lib/axios";
import { Loader, TriangleAlert } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

import useSWR from "swr";

const fetcher = (url: string) => apiClient.get(url);

export const RenderForm = () => {
  const { formId } = useParams();
  const { data, isLoading, error } = useSWR(`/api/form/${formId}`, fetcher);

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
        <Loader className="animate-spin" />
      </div>
    );
  }

  const form = data?.data?.form;
  const form_schema = form?.form_schema;

  return <FormEditor isEditable={false} content={form_schema} />;
};
