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

      isTermsUpdateAcknowledged: false,
      setIsTermsUpdateAcknowledged: (isTermsUpdateAcknowledged) =>
        set({ isTermsUpdateAcknowledged }),
    }),
    {
      name: "global-store",
      version: 3,
      // v3: UK and Swiss visitors used to be granted consent without a banner,
      // and an automatic grant can't be told from an Accept, so every earlier
      // grant (and v1's boolean) goes back to pending and is asked again.
      migrate: (state, version) => {
        const persisted = state as GlobalStore;
        if (version < 3 && persisted.cookieConsent !== "pending-eu") {
          return { ...persisted, cookieConsent: "pending" };
        }
        return persisted;
      },
      onRehydrateStorage: (state) => {
        return () => state.setIsHydrated(true);
      },
    },
  ),
);
