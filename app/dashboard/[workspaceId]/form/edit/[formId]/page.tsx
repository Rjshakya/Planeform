"use client";

import { apiClient } from "@/lib/axios";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { FormEditor } from "../../_components/FormEditor";
import { Loader, TriangleAlert } from "lucide-react";
import { useUser } from "@/hooks/use-User";

const fetcher = (url: string) => apiClient.get(url);

export default function Page() {
  const { formId } = useParams();
  const { data, isLoading, error } = useSWR(`/api/form/${formId}`, fetcher);
  useUser();
  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span>
          <TriangleAlert className=" text-destructive" />
        </span>
        <p>failed to get form</p>
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

  return <FormEditor isEditable={true} content={form_schema} />;
}
