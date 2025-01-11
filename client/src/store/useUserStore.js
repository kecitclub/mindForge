import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(persist((set) => ({
    user: null,
    role: null,
    location: {},
    setUserRole: (role) => set({ role }),
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
    setLocation: (location) => set({ location }),
}), {
    name: "userStore",
}));
