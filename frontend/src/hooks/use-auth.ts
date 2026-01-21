import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginType, RegisterType, UserType } from "../@types/auth.type";
import { API } from "../lib/axios-client";
import toast from "react-hot-toast";

interface AuthState {
  user: UserType | null;
  isLoggedIn: boolean;
  isSigningUp: boolean;
  isAuthenticating: boolean;
  login: (data: LoginType) => void;
  signup: (data: RegisterType) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isSigningUp: false,
      isAuthenticating: false,
      login: async (data: LoginType) => {
        set({ isAuthenticating: true });
        try {
          const response = await API.post("/auth/login", data);
          set({ user: response.data.user, isLoggedIn: true });
        } catch (error: any) {
          // Reeturn error
          toast.error(error.response?.data?.message || "Login failed");
        } finally {
          set({ isAuthenticating: false });
        }
      },
      signup: async (data: RegisterType) => {
        set({ isSigningUp: true });
        try {
          const response = await API.post("/auth/resgister", data);
          set({ user: response.data.user, isLoggedIn: true });
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Register failed");
        } finally {
          set({ isSigningUp: true });
        }
      },
      logout: async () => {},
    }),
    {
      name: "whop:root",
    }
  )
);
