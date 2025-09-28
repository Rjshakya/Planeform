"use client";
import { FormEditor } from "@/app/dashboard/[workspaceId]/form/_components/FormEditor";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { apiClient } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { useFormStore } from "@/stores/useformStore";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
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
