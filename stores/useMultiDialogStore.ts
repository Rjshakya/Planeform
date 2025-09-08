import { create } from "zustand";

interface IusemultiDialogStore {
  openShortInput: boolean;
  openLongInput: boolean;
  openMultiChoiceInput: boolean;

  setOpenShortInput: (open: boolean) => void;
  setOpenLongInput: (open: boolean) => void;
  setOpenMultiChoiceInput: (open: boolean) => void;
}

export const useMultiDialogStore = create<IusemultiDialogStore>((set, get) => ({
  openShortInput: false,
  openLongInput: false,
  openMultiChoiceInput: false,

  setOpenShortInput: (open) => {
    set({
      openShortInput: open,
    });
  },
  setOpenLongInput: (open) => {
    set({
      openLongInput: open,
    });
  },
  setOpenMultiChoiceInput: (open) => {
    set({
      openMultiChoiceInput: open,
    });
  },
}));
