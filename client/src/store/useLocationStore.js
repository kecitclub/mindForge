import { create } from "zustand";


export const useLocationStore = create((set) => ({
    policePosition: {},
    userLocationStore: {},
    userLocationUser: {},
    setPolicePosition: (policePosition) => set({ policePosition }),
    setUserLocationStore: (userLocation) => set({ userLocation }),
    setUserLocationUser: (userLocationUser) => set({ userLocationUser }),
}));
