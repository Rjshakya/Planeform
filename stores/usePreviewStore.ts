import { JsonDoc } from "@/lib/types";
import { create } from "zustand";

export interface IusePreviewStore {
  content: JsonDoc | null;
  setContent: (content: JsonDoc) => void;
}

export const usePreviewStore = create<IusePreviewStore>((set) => ({
  content: null,
  setContent: (content) => set({ content }),
}));
