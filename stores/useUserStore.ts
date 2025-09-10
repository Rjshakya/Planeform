import { create } from "zustand";

interface Iuser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
}

type UserStore = {
  user: Iuser | null;
};

export const useUserStore = create<UserStore>(() => ({
  user: null,
}));
