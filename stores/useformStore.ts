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
  handleSubmit: async (values, formId) => {
    const {
      creator,
      customerId,
      isLastStep,
      stepResponses,
      isSingleForm,
      respondentId,
    } = get();

    if (!values || !creator || !customerId) {
      toast("failed to submit form , please try again");
      return false;
    }

    // if this is not last step then push values to stepresponses
    if (!isLastStep) {
      const id = Object.keys(values)[0];
      if (!values[id]) return false;

      const existing = stepResponses?.find((v, i) => {
        const key = Object.keys(v)[0];
        return key === id;
      });
      const existingIdx = stepResponses?.findIndex((v) => {
        const key = Object.keys(v)[0];
        return key === id;
      });

      if (existing) {
        const copy = [...get()?.stepResponses];
        copy[existingIdx] = values;
        set({ stepResponses: copy });
        return true;
      }

      stepResponses?.push(values);
      return true;
    }

    const allStepValues = [...stepResponses, values];

    if (!formId) {
      return false;
    }

    isLastStep && set({ isSubmitting: true });

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

      if (isSingleForm) {
        finalValues = Object.entries(values).map((o) => {
          return {
            form: formId,
            form_field: o[0],
            value: Array?.isArray(o[1]) ? o[1]?.join(",") : o[1],
            respondent: respondent!,
          };
        });
      }

      if (!isSingleForm) {
        allStepValues?.forEach((valueObj) => {
          const keys = Object.keys(valueObj);
          keys?.forEach((key) => {
            finalValues?.push({
              form: formId,
              form_field: key,
              respondent: respondent!,
              value: Array?.isArray(valueObj[key])
                ? valueObj[key]?.join(",")
                : valueObj[key],
            });
          });
        });
      }

      const response = await apiClient.post(`/api/response/multiple`, {
        finalValues,
        creator,
      });

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
  respondentId: null,
}));

// {
//             form: formId,
//             form_field: key,
//             value: Array?.isArray(v[key]) ? v[key]?.join(",") : v[key],
//             respondent: respondentId,
//           };
