"use client";
import { apiClient } from "@/lib/axios";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { create } from "zustand";

export interface IformStore {
  getHookForm: () => UseFormReturn<FieldValues, any, FieldValues> | null;
  form: UseFormReturn | null;
  setHookForm: (form: UseFormReturn) => UseFormReturn;
  isSubmitting: boolean;
  handleSubmit: (
    values: Record<string, string>,
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
    set({ isSubmitting: true });

    if (!values) return false;

    try {
      const respondent = await apiClient.post(`/api/respondent`, {
        form: formId,
      });

      if (respondent.status === 200) {
        const respondentId = respondent?.data?.respondent?.id;
        const valuesData = Object.entries(values).map((o) => {
          return {
            form: formId,
            form_field: o[0],
            value: o[1],
            respondent: respondentId,
          };
        });

        await apiClient.post(`/api/response/multiple`, valuesData);
        return true;
      }

      return false;
    } catch (e) {
      toast("failed to submit form please try again later;");
      return false;
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
