"use client";

import { useGlobalStore } from "@/lib/global-store";
import { useEffect, useState } from "react";

export const CookieConsentBanner = () => {
  const { cookieConsent, setCookieConsent, isHydrated } = useGlobalStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;
    if (cookieConsent) {
      setVisible(false);
      return;
    }

    async function checkLocation() {
      const res = await fetch("/api/geolocation");

      const data = await res.json();

      setVisible(data.isEuropean);

      if (!data.isEuropean) {
        setCookieConsent(true);
      }
    }

    checkLocation();
  }, [cookieConsent, isHydrated, setCookieConsent]);

  if (!visible) return;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full bg-emerald-400 py-1.5 pl-4 pr-1.5 text-sm text-zinc-950 shadow-lg">
      <span className="font-normal">
        We use cookies to improve your experience. Read our
        <a
          href="https://upstash.com/trust/privacy.pdf"
          className="ml-1 underline"
        >
          privacy policy.
        </a>
      </span>
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => {
            setCookieConsent(true);
          }}
          className="rounded-full bg-white px-3 py-1.5 text-xs transition-colors hover:bg-gray-100"
        >
          Accept
        </button>
        <button
          onClick={() => {
            setVisible(false);
          }}
          className="flex items-center justify-center w-6 h-6 transition-colors rounded-full hover:bg-emerald-500"
        >
          x
        </button>
      </div>
    </div>
  );
};
