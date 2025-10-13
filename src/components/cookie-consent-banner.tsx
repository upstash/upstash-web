"use client";

import { useGlobalStore } from "@/lib/global-store";
import { useEffect, useState } from "react";
import { z } from "zod";

export const CookieConsentBanner = () => {
  const { cookieConsent, setCookieConsent, isHydrated } = useGlobalStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;
    if (cookieConsent) {
      setVisible(false);
      return;
    }

    const GEO_CACHE_KEY = "geo:is_eu";
    const GEO_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

    const cacheSchema = z.object({
      isEuropean: z.boolean(),
      expiresAt: z.number().int().nonnegative(),
    });

    function getCachedIsEuropean(): boolean | null {
      try {
        const raw = localStorage.getItem(GEO_CACHE_KEY);
        if (!raw) return null;
        const parsed = cacheSchema.safeParse(JSON.parse(raw));
        if (!parsed.success) {
          localStorage.removeItem(GEO_CACHE_KEY);
          return null;
        }
        if (Date.now() > parsed.data.expiresAt) {
          localStorage.removeItem(GEO_CACHE_KEY);
          return null;
        }
        return parsed.data.isEuropean;
      } catch {
        return null;
      }
    }

    function setCachedIsEuropean(isEuropean: boolean) {
      const expiresAt = Date.now() + GEO_CACHE_TTL_MS;
      localStorage.setItem(
        GEO_CACHE_KEY,
        JSON.stringify({ isEuropean, expiresAt }),
      );
    }

    async function checkLocation() {
      const cached = getCachedIsEuropean();
      if (cached !== null) {
        setVisible(cached);
        if (!cached) {
          setCookieConsent(true);
        }
        return;
      }

      const res = await fetch("/api/geolocation");
      const data = (await res.json()) as { isEuropean: boolean };

      setCachedIsEuropean(data.isEuropean);
      setVisible(data.isEuropean);

      if (!data.isEuropean) {
        setCookieConsent(true);
      }
    }

    checkLocation();
  }, [cookieConsent, isHydrated, setCookieConsent]);

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
