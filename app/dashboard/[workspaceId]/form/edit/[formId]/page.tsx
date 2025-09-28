"use client";

import { apiClient } from "@/lib/axios";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { FormEditor } from "../../_components/FormEditor";

const fetcher = (url: string) => apiClient.get(url);

export default function Page() {
  const { formId } = useParams();
  const { data, isLoading, error } = useSWR(`/api/form/${formId}`, fetcher);

  if (error) return <p>error occurred</p>;
  if (isLoading) return <p>loading . . .</p>;

  const form = data?.data?.form;
  const form_schema = form?.form_schema;

  return <FormEditor  isEditable={true} content={form_schema} />;
}
