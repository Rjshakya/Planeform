"use client";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { create } from "zustand";

export interface IformStore {
  getHookForm: () => UseFormReturn<FieldValues, any, FieldValues> | null;
  form: UseFormReturn | null;
  setHookForm: (form: UseFormReturn) => UseFormReturn;
}

export const useFormStore = create<IformStore>((set, get) => ({
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
}));
