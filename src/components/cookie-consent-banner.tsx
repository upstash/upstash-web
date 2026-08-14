"use client";

import { grantAnalyticsConsent } from "@/lib/analytics";
import { useGlobalStore } from "@/lib/global-store";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const CookieConsentBanner = () => {
  const { cookieConsent, setCookieConsent, isHydrated } = useGlobalStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(cookieConsent === "pending-eu");
  }, [cookieConsent]);

  useEffect(() => {
    if (!isHydrated) return;

    // No need to check location if consent is already granted or pending-eu
    if (cookieConsent !== "pending") return;

    async function checkLocation() {
      const res = await fetch("/api/geolocation");

      const data = await res.json();

      if (data.isEuropean) {
        setCookieConsent("pending-eu");
      } else {
        setCookieConsent("granted");
      }
    }

    checkLocation();
  }, [isHydrated, setCookieConsent]);

  if (!visible) return;

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between gap-3 bg-emerald-400 px-4 py-3 text-sm text-zinc-950 shadow-lg md:bottom-4 md:left-1/2 md:w-[640px] md:-translate-x-1/2 md:rounded-full md:py-2 md:pl-5 md:pr-2">
      <p className="leading-snug">
        We use cookies to improve your experience. Read our{" "}
        <a
          href="https://upstash.com/trust/privacy.pdf"
          className="underline underline-offset-2 hover:no-underline"
        >
          privacy policy.
        </a>
      </p>
      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={() => {
            setCookieConsent("granted");
            grantAnalyticsConsent();
          }}
          className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium leading-5 transition-colors hover:bg-zinc-100"
        >
          Accept
        </button>
        <button
          onClick={() => {
            setVisible(false);
          }}
          aria-label="Dismiss"
          className="flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-emerald-500"
        >
          <IconX size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};
