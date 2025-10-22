import { create } from "zustand";
import { persist } from "zustand/middleware";

// Pending: initial state
// Pending-eu: user is in the EU, but consent is pending
// Granted: user has granted consent
type CookieConsentState = "pending" | "pending-eu" | "granted";

type GlobalStore = {
  cookieConsent: CookieConsentState;
  setCookieConsent: (consent: CookieConsentState) => void;

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
      cookieConsent: "pending",
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
      version: 2,
      migrate: (state, version) => {
        if (version === 1) {
          const stateV1 = state as { cookieConsent: boolean } & Omit<
            GlobalStore,
            "cookieConsent"
          >;
          return {
            ...stateV1,
            cookieConsent:
              stateV1.cookieConsent === true ? "granted" : "pending",
          };
        }
        return state as GlobalStore;
      },
      onRehydrateStorage: (state) => {
        return () => state.setIsHydrated(true);
      },
    },
  ),
);
