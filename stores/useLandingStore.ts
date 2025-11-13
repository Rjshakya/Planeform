import { defaultEditorContent } from "@/lib/content";
import { JsonDoc } from "@/lib/types";
import { create } from "zustand";

export interface IlandingStore {
  landingEditorContent: JsonDoc | null;
  setContent:(content:JsonDoc|null) => void
}

export const useLandingStore = create<IlandingStore>((set, get) => ({
  landingEditorContent: defaultEditorContent,
  setContent:(content) => set({landingEditorContent:content})
}));
