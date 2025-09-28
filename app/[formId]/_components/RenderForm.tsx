"use client";
import { FormEditor } from "@/app/dashboard/[workspaceId]/form/_components/FormEditor";
import { apiClient } from "@/lib/axios";
import { useParams } from "next/navigation";
import React from "react";

import useSWR from "swr";

const fetcher = (url: string) => apiClient.get(url);

export const RenderForm = () => {
  const { formId } = useParams();
  const { data, isLoading, error } = useSWR(`/api/form/${formId}`, fetcher);

  if (error) return <p>error occurred</p>;
  if (isLoading) return <p>loading . . .</p>;

  const form = data?.data?.form;
  const form_schema = form?.form_schema;

  return <FormEditor isEditable={false} content={form_schema} />;
};
