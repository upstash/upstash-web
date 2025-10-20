"use client";

import { useGlobalStore } from "@/lib/global-store";
import { useEffect, useState } from "react";

export const CookieConsentBanner = () => {
  const { isEu, setIsEu, cookieConsent, setCookieConsent, isHydrated } =
    useGlobalStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;
    if (cookieConsent) {
      setVisible(false);
      return;
    }

    async function checkLocation() {
      if (isEu !== null && isEu !== undefined) {
        setVisible(isEu);
        return;
      }

      const res = await fetch("/api/geolocation");

      const data = await res.json();

      setVisible(data.isEuropean);
      setIsEu(data.isEuropean);

      if (!data.isEuropean) {
        setCookieConsent(true);
      }
    }

    checkLocation();
  }, [cookieConsent, isHydrated, setCookieConsent, isEu, setIsEu]);

  if (!visible) return;

  return (
    <div className="gap:2 fixed bottom-0 left-0 z-50 flex w-full items-center justify-between bg-emerald-400 py-1.5 pl-4 pr-20 text-sm text-zinc-950 shadow-lg md:bottom-4 md:left-1/2 md:w-[600px] md:-translate-x-1/2 md:gap-4 md:rounded-full md:pr-1.5">
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
          className="flex items-center rounded-full bg-white px-3 pb-1 pt-1.5 text-xs transition-colors hover:bg-gray-100"
        >
          <p>Accept</p>
        </button>
        <button
          onClick={() => {
            setVisible(false);
          }}
          className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-emerald-500"
        >
          x
        </button>
      </div>
    </div>
  );
};
