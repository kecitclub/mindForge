import { create } from "zustand";

export const useSocket = create((set) => ({
    socket: null,
    ambulanceList: [],
    ambulanceLocation: [],
    userDetail: null,
    fireDecision: null,
    userDetailPolice: null,

    setSocket: (socket) => set({ socket }),
    setAmbulanceList: (ambulanceList) => set({ ambulanceList }),
    setAmbulanceLocation: (ambulanceLocation) => set({ ambulanceLocation }),
    setUserDetail: (userDetail) => set({ userDetail }),
    setFireDecision: (fireDecision) => set({ fireDecision }),
    setUserDetailPolice: (userDetailPolice) => set({ userDetailPolice }),
}));
