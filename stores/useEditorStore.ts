import { Editor } from "@tiptap/core";
import { create } from "zustand";

interface editorStore {
  editor: Editor | null;
  getEditor: () => Editor | null;
}

export const useEditorStore = create<editorStore>((set, get) => ({
  editor: null,
  getEditor: () => get().editor,
}));
