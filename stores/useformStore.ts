"use client";
import { apiClient } from "@/lib/axios";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";
import { create } from "zustand";

export interface IformStore {
  getHookForm: () => UseFormReturn<FieldValues, any, FieldValues> | null;
  form: UseFormReturn | null;
  setHookForm: (form: UseFormReturn) => UseFormReturn;
  isSubmitting: boolean;
  handleSubmit: (
    values: Record<string, any>,
    formId: string
  ) => Promise<boolean>;
  isSuccess: boolean;
}

export const useFormStore = create<IformStore>((set, get) => ({
  isSuccess: false,
  getHookForm: () => {
    return get()?.form;
  },
  form: null,

  setHookForm: (form) => {
    set({
      form: form,
    });

    return get()?.form!;
  },
  isSubmitting: false,
  handleSubmit: async (values, formId) => {
    // console.log(values);
    // return false;

    set({ isSubmitting: true });

    if (!values) return false;

    try {
      const respondent = await apiClient.post(`/api/respondent`, {
        form: formId,
      });

      if (respondent.status !== 200) return false;

      const respondentId = respondent?.data?.respondent?.id;
      const valuesData = Object.entries(values).map((o) => {
        // formating for day input value , which gives {} rather than string.

        if (o[1]?.day) {
          const dateObject = o[1];
          return {
            form: formId,
            form_field: o[0],
            value: `${dateObject?.day}-${dateObject?.month}-${dateObject?.year}`,
            respondent: respondentId,
          };
        }

        const obj = {
          form: formId,
          form_field: o[0],
          value: o[1],
          respondent: respondentId,
        };

        console.log(obj);

        return obj;
      });

      const response = await apiClient.post(
        `/api/response/multiple`,
        valuesData
      );

      if (response?.status !== 200) {
        await apiClient?.delete(`/api/respondent/${respondentId}`);
        return false;
      }

      mutate(`/api/response/form/${formId}?pageIndex=${0}&pageSize=${20}`)
      return true;
    } catch (e) {
      toast("failed to submit form please try again later;");
      return false;
    } finally {
      set({ isSubmitting: false });
      
    }
  },
}));
