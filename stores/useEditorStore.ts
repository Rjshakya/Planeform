import { defaultEditorContent } from "@/lib/content";
import { JsonDoc } from "@/lib/types";
import { Editor } from "@tiptap/core";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IeditorStore {
  editor: Editor | null;
  getEditor: () => Editor | null;
  content: JsonDoc | null;
  editedContent: JsonDoc | null;
  formBackgroundColor: string | null;
  setFormBackgroundColor: (color: string | null) => void;
  formFontFamliy: string | null;
  setFormFontFamliy: (famliy: string | null) => void;
  formFontSize: string | null;
  setFormFontSize: (fontSize: string | null) => void;
  actionBtnSize: "icon" | "default" | "sm" | "lg" | null | undefined;
  setActionBtnSize: (
    size: "icon" | "default" | "sm" | "lg" | null | undefined
  ) => void;
  actionBtnColor: string | null;
  setActionBtnColor: (color: string | null) => void;
  formColorScheme: string;
  setFormColorScheme: (scheme: string) => void;
}

export interface Icustomisation {
  formBackgroundColor: string | null;
  formFontFamliy: string | null;
  formFontSize: string | null;
  actionBtnSize: "icon" | "default" | "sm" | "lg" | null | undefined;
}

export const useEditorStore = create<IeditorStore>()(
  persist(
    (set, get) => ({
      editor: null,
      getEditor: () => get().editor,
      content: defaultEditorContent,
      editedContent: null,
      formBackgroundColor: null,
      setFormBackgroundColor: (color: string | null) =>
        set({ formBackgroundColor: color }),
      formFontFamliy: null,
      formFontSize: null,
      actionBtnSize: null,
      actionBtnColor: null,
      formColorScheme: "dark",
      setFormFontFamliy: (family) => set({ formFontFamliy: family }),
      setFormFontSize: (size) => set({ formFontSize: size }),
      setActionBtnSize: (size) => set({ actionBtnSize: size }),
      setActionBtnColor: (color) => set({ actionBtnColor: color }),
      setFormColorScheme: (scheme) => set({ formColorScheme: scheme }),
    }),

    {
      name: "planetform-editor",
      partialize: (s) => ({ editedContent: s.editedContent }),
    }
  )
);
