import { create } from "zustand";
import apiRequest from "../lib/apiRequest";

export const useNotificationsStore = create((set) => ({
  number: 0,
  fetch: async () => {
    const res = await apiRequest("/users/notifications");
    set({ number: res.data.data.notificationsCount });
  },
  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },
  reset: () => {
    set({ number: 0 });
  },
}));
