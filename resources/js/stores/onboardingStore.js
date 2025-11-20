import { create } from 'zustand';

export const useOnboardingStore = create((set) => ({
    isChatHighlighted: false,
    setIsChatHighlighted: (highlighted) => set({ isChatHighlighted: highlighted }),
    
    onboardingStatus: null,
    setOnboardingStatus: (status) => set({ onboardingStatus: status }),
}));