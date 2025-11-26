import { apiClient } from "@/lib/axios";
import useSWR from "swr";
interface IformFields {
  id: string;
  form: string;
  label: string;
  type: string | null;
  isRequired: boolean | null;
}

export const useFormField = (formId: string) => {
  const fetcher = (url: string) => apiClient.get(url).then((d) => d);
  const { data, error, isLoading } = useSWR(
    `/api/formField/form/${formId}`,
    fetcher
  );

  return {
    data: data?.data?.formFields as IformFields[],
    error,
    isLoading,
  };
};
