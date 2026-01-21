import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

API.interceptors.request.use(
  async (config) => {
    config.headers["Content-Type"] = "application/json";

    try {
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token from SecureStore", error);
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);
