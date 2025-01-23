import { create } from "zustand";
import { persist } from "zustand/middleware";

type GlobalStore = {
  cookieConsent: boolean;
  setCookieConsent: (consent: boolean) => void;

  isHydrated: boolean;
  setIsHydrated: (isHydrated: boolean) => void;

  isInited: boolean;
  setIsInited: (isInited: boolean) => void;

  isTermsUpdateAcknowledged: boolean;
  setIsTermsUpdateAcknowledged: (isTermsUpdateAcknowledged: boolean) => void;
};

export const useGlobalStore = create(
  persist<GlobalStore>(
    (set) => ({
      cookieConsent: false,
      setCookieConsent: (consent) => set({ cookieConsent: consent }),

      isHydrated: false,
      setIsHydrated: (isHydrated) => set({ isHydrated }),

      isInited: false,
      setIsInited: (isInited: boolean) => set({ isInited }),

      isTermsUpdateAcknowledged: false,
      setIsTermsUpdateAcknowledged: (isTermsUpdateAcknowledged) =>
        set({ isTermsUpdateAcknowledged }),

    }),
    {
      name: "global-store",
      version: 1,
      onRehydrateStorage: (state) => {
        return () => state.setIsHydrated(true);
      },
    },
  ),
);
