import { defaultEditorContent } from "@/lib/content";
import { JsonDoc } from "@/lib/types";
import { Editor } from "@tiptap/core";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface editorStore {
  editor: Editor | null;
  getEditor: () => Editor | null;
  content: JsonDoc | null;
  editedContent: JsonDoc | null;
}

export const useEditorStore = create<editorStore>()(
  persist(
    (set, get) => ({
      editor: null,
      getEditor: () => get().editor,
      content: defaultEditorContent,
      editedContent: null,
    }),
    {
      name: "editor",
      partialize: (s) => ({ editedContent: s.editedContent }),
    }
  )
);
