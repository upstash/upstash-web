import { create } from "zustand";
import { persist } from "zustand/middleware";

type GlobalStore = {
  /**
   * A cache of the /api/geolocation response to check whether the user is in the EU
   */
  isEu: boolean | null;
  setIsEu: (isEuCached: boolean | null) => void;

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
      isEu: null,
      setIsEu: (isEuCached) => set({ isEu: isEuCached }),

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
