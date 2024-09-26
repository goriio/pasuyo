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
  isTokenExpired: () => boolean;
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      login: (user: User) => {
        set({ user });
      },
      logout: () => {
        set({ user: null });
      },
      isTokenExpired: () => {
        const user = get().user;
        if (!user) return true;

        const currentTime = new Date().getTime();
        return new Date(user.expiry).getTime() <= currentTime;
      },
    }),
    {
      name: "user",
    }
  )
);
