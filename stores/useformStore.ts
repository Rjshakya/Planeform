"use client";
import { apiClient } from "@/lib/axios";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";
import { create } from "zustand";

interface IsubmissionObj {
  form: string;
  form_field: string;
  value: string;
  respondent: string;
}

export interface IformStore {
  getHookForm: () => UseFormReturn<FieldValues, any, FieldValues> | null;
  form: UseFormReturn | null;
  setHookForm: (form: UseFormReturn) => UseFormReturn;
  isSubmitting: boolean;
  handleSubmit: ({
    values,
    formId,
    step,
    isEdit,
  }: {
    values: Record<string, any>;
    formId: string;
    step: number;
    isEdit: boolean;
  }) => Promise<boolean>;
  isSuccess: boolean;
  isLastStep: boolean;
  stepResponses: any[];
  activeStep: number;
  maxStep: number;
  isSingleForm: boolean;
  creator: string | null;
  customerId: string | null;
  respondentId: string | null;
}

export const useFormStore = create<IformStore>((set, get) => ({
  isSuccess: false,
  creator: null,
  customerId: null,
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
  stepResponses: [],
  isSubmitting: false,
  handleSubmit: async ({ values, formId, step, isEdit }) => {
    const { creator, customerId, respondentId } = get();

    if (!values || !creator || !customerId) {
      return false;
    }

    if (!get().isLastStep) {
      return true;
    }
    if (!formId || isEdit) {
      toast.success("Everything seems good! :)");
      return true;
    }

    get().isLastStep && set({ isSubmitting: true });

    try {
      let respondent = respondentId;

      if (!respondent) {
        // create respondent
        const resp = await apiClient.post(`/api/respondent`, {
          form: formId,
          customerId: customerId,
        });

        if (resp.status !== 200) {
          toast("failed to submit form please try again later;");
          return false;
        }

        respondent = resp?.data?.respondent?.id;
      }

      let finalValues = [] as IsubmissionObj[];

      finalValues = Object.entries(values).map((o) => {
        return {
          form: formId,
          form_field: o[0],
          value: Array?.isArray(o[1]) ? o[1]?.join(",") : o[1],
          respondent: respondent!,
        };
      });

      console.log(finalValues);

      const response = await apiClient.post(`/api/response/multiple`, {
        finalValues,
        creator,
      });

      if (response?.status !== 200) {
        await apiClient?.delete(`/api/respondent/${respondent}`);
        return false;
      }

      mutate(`/api/response/form/${formId}?pageIndex=${0}&pageSize=${20}`);
      toast.success("form submitted successfully");
      set({ isSubmitting: false });
      return true;
    } catch (e) {
      toast.error("failed to submit form please try again later;");
      return false;
    }
  },
  isLastStep: true,
  activeStep: 0,
  maxStep: 0,
  isSingleForm: true,
  respondentId: null,
}));
