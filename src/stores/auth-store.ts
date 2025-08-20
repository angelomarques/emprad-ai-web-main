import { LoginResponse } from "@/services/auth/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface User {
  name: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (response: LoginResponse) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null,

        login: async (response: LoginResponse) => {
          set({
            isAuthenticated: true,
            user: response.user,
            token: response.token,
            isLoading: false,
            error: null,
          });
        },

        logout: () => {
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            error: null,
          });
        },

        clearError: () => {
          set({ error: null });
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          token: state.token,
        }),
      }
    )
  )
);
