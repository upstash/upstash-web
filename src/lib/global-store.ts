import { create } from "zustand"
import { persist } from "zustand/middleware"

type GlobalStore = {
	cookieConsent: boolean
	setCookieConsent: (consent: boolean) => void
}

export const useGlobalStore = create(
	persist<GlobalStore>(
		(set) => ({
			cookieConsent: false,
			setCookieConsent: (consent) => set({ cookieConsent: consent }),
		}),
		{
			name: "global-store",
			version: 1,
		}
	)
)