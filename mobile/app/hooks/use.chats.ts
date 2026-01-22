import { create } from "zustand";
import { ChatType } from "../@types/chat.type";
import { API } from "../lib/axios.client";

interface ChatsState {
  chats: ChatType[];
  isLoadingChats: boolean;
  isLoadingMessages: boolean;
  getChats: () => Promise<void>;
}

export const useChats = create<ChatsState>((set, get) => ({
  chats: [],
  isLoadingChats: false,
  isLoadingMessages: false,
  getChats: async () => {
    set({ isLoadingChats: true });
    try {
      const response = await API.get(`/chats/`);
      console.log(JSON.stringify(response.data?.chats));

      set({ chats: response.data?.chats || [] });
    } catch (error: any) {
      console.log(error);

      throw new Error(error.response?.data?.message || "Failed to get chats");
    } finally {
      set({ isLoadingChats: false });
    }
  },
}));
