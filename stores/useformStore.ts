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
  isLastStep: boolean;
  stepResponses: any[];
  activeStep: number;
  maxStep: number;
  setActiveStep: (params: any) => void;
  isSingleForm: boolean;
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
  stepResponses: [],
  isSubmitting: false,
  handleSubmit: async (values, formId) => {
    if (!values) {
      toast("failed to submit form , please try again");
      return false;
    }

    get()?.isLastStep && set({ isSubmitting: true });

    if (get()?.isLastStep === false) {
      const id = Object.keys(values)[0];
      if (!values[id]) return false;

      const existing = get()?.stepResponses?.find((v, i) => {
        const key = Object.keys(v)[0];
        return key === id;
      });
      const existingIdx = get()?.stepResponses?.findIndex((v) => {
        const key = Object.keys(v)[0];
        return key === id;
      });

      if (existing) {
        const copy = [...get()?.stepResponses];
        copy[existingIdx] = values;
        set({ stepResponses: copy });
        return true;
      }

      get()?.stepResponses?.push(values);
      return true;
    }

    const valuesArr = [...get()?.stepResponses, values];
    if (!formId) {
      toast("form not found , please try again!");
      return false;
    }

    try {
      const respondent = await apiClient.post(`/api/respondent`, {
        form: formId,
      });

      if (respondent.status !== 200) return false;

      const respondentId = respondent?.data?.respondent?.id;

      let finalValues = valuesArr?.map((v) => {
        const key = Object.keys(v)[0];
        return {
          form: formId,
          form_field: key,
          value: Array?.isArray(v[key]) ? v[key]?.join(",") : v[key],
          respondent: respondentId,
        };
      });

      if (get().isSingleForm) {
        finalValues = Object.entries(values).map((o) => {
          const obj = {
            form: formId,
            form_field: o[0],
            value: Array?.isArray(o[1]) ? o[1]?.join(",") : o[1],
            respondent: respondentId,
          };

          return obj;
        });
      }

      const response = await apiClient.post(
        `/api/response/multiple`,
        finalValues
      );

      if (response?.status !== 200) {
        await apiClient?.delete(`/api/respondent/${respondentId}`);
        return false;
      }

      mutate(`/api/response/form/${formId}?pageIndex=${0}&pageSize=${20}`);
      return true;
    } catch (e) {
      toast("failed to submit form please try again later;");
      return false;
    } finally {
      set({ isSubmitting: false });
    }
  },
  isLastStep: true,
  activeStep: 0,
  maxStep: 0,
  setActiveStep: () => {},
  isSingleForm: true,
}));

// const valuesData = Object.entries(values).map((o) => {
//       const obj = {
//         form: formId,
//         form_field: o[0],
//         value: Array?.isArray(o[1]) ? o[1]?.join(",") : o[1],
//         respondent: respondentId,
//       };

//       return obj;
//     });
