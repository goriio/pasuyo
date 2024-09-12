import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id?: string;
  token: string;
  expiry: string;
};

type AuthState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user: User) => {
        set({ user });
      },
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "user",
    }
  )
);
