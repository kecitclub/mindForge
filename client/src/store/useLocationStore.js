import { create } from "zustand";


export const useLocationStore = create((set) => ({
    policePosition: {},
    userLocationStore: {},
    setPolicePosition: (policePosition) => set({ policePosition }),
    setUserLocationStore: (userLocation) => set({ userLocation }),
}));
