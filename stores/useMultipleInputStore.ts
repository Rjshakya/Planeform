import { defaultEditorContent } from "@/lib/content";
import { JsonDoc } from "@/lib/types";
import { Editor } from "@tiptap/core";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MultipleInputStore {
  getId: () => string;
  setId: (id: string) => void;
  id: string | null;
}

export const useMultipleInputStore = create<MultipleInputStore>((set, get) => ({
  id: null,
  getId: () => get().id as string,
  setId: (_id) => set({ id: _id }),
}));
