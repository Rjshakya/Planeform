"use client";

import { apiClient } from "@/lib/axios";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { FormEditor } from "../../_components/FormEditor";
import { Loader, TriangleAlert } from "lucide-react";
import { useUser } from "@/hooks/use-User";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormStore } from "@/stores/useformStore";
import { Icustomisation, useEditorStore } from "@/stores/useEditorStore";

const fetcher = (url: string) => apiClient.get(url);

export default function Page() {
  const { formId } = useParams();
  const { data, isLoading, error } = useSWR(`/api/form/${formId}`, fetcher);
  const form = useForm();
  const formData = data?.data?.form;
  const form_schema = formData?.form_schema;
  const customisation = formData?.customisation as Icustomisation;
  // useUser();
  useEffect(() => {
    useFormStore.setState({ form });
    useEditorStore.setState({ ...customisation });
  }, [form, formData ,customisation]);

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

  return <FormEditor isEditable={true} content={form_schema} />;
}
