import { LoginType, RegisterType, UserType } from "@/app/@types/auth.type";
import { create } from "zustand";
import { API } from "@/app/lib/axios.client";
import * as SecureStore from "expo-secure-store";

interface AuthState {
  user: UserType | null;
  isLoggedIn: boolean;
  isSigningUp: boolean;
  isAuthenticating: boolean;
  login: (data: LoginType) => void;
  signup: (data: RegisterType) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  isLoggedIn: false,
  isSigningUp: false,
  isAuthenticating: false,
  user: null,
  login: async (data: LoginType) => {
    set({ isAuthenticating: true });
    try {
      const response = await API.post("/auth/login", data);
      await SecureStore.setItemAsync("token", response.data.token);
      set({
        user: response.data.user,
        isLoggedIn: true,
        isAuthenticating: false,
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isAuthenticating: false });
    }
  },
  signup: async (data: RegisterType) => {
    set({ isSigningUp: true });
    try {
      const response = await API.post("/auth/register", data);

      set({
        user: response.data.user,
        isLoggedIn: true,
        isSigningUp: false,
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    set({ isAuthenticating: true });
    try {
      await API.post("/auth/logout");
      set({
        user: null,
        isLoggedIn: false,
        isAuthenticating: false,
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Logout failed");
    } finally {
      set({ isAuthenticating: false });
    }
  },
  fetchUser: async () => {
    set({ isAuthenticating: true });
    try {
      const response = await API.get("/auth/status");
      set({
        user: response.data.user,
        isLoggedIn: true,
        isAuthenticating: false,
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Fetch user failed");
    } finally {
      set({ isAuthenticating: false });
    }
  },
}));
