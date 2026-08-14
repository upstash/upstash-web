"use client";

import { grantAnalyticsConsent } from "@/lib/analytics";
import { useGlobalStore } from "@/lib/global-store";
import cx from "@/utils/cx";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const PolicyLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline underline-offset-2 hover:no-underline"
  >
    {children}
  </a>
);

/**
 * The site's single bottom overlay. It carries two independent notices —
 * cookie consent (EU visitors only) and the terms-update acknowledgement
 * (everyone) — so that they can never stack on top of each other. Each notice
 * keeps its own trigger and its own persistence:
 *
 * - cookie consent shows while `cookieConsent === "pending-eu"`; only Accept
 *   grants it. Closing hides the banner for this page view only, so consent is
 *   asked again on the next visit.
 * - the terms notice shows while `isTermsUpdateAcknowledged` is false, and any
 *   dismissal (Accept or close) acknowledges it for good — the user has seen it.
 */
export const NoticeBanner = () => {
  const {
    cookieConsent,
    setCookieConsent,
    isTermsUpdateAcknowledged,
    setIsTermsUpdateAcknowledged,
    isHydrated,
  } = useGlobalStore();
  const [closed, setClosed] = useState(false);

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
  }, [isHydrated, cookieConsent, setCookieConsent]);

  const showCookies = isHydrated && cookieConsent === "pending-eu";
  const showTerms = isHydrated && !isTermsUpdateAcknowledged;

  if (closed || (!showCookies && !showTerms)) return;

  const acknowledgeTerms = () => {
    if (showTerms) setIsTermsUpdateAcknowledged(true);
  };

  return (
    <div
      className={cx(
        "fixed bottom-0 left-0 z-50 flex w-full items-center justify-between gap-3",
        "bg-emerald-400 px-4 py-3 text-sm text-zinc-950 shadow-lg",
        "md:bottom-4 md:left-1/2 md:w-[640px] md:-translate-x-1/2 md:py-2 md:pl-5 md:pr-2",
        // both notices need two lines, so soften the pill instead of stretching it
        showCookies && showTerms ? "md:rounded-2xl" : "md:rounded-full",
      )}
    >
      <p className="leading-snug">
        {showCookies && <>We use cookies to improve your experience. </>}
        {showTerms ? (
          <>
            Our <PolicyLink href="/trust/terms.pdf">Terms</PolicyLink>,{" "}
            <PolicyLink href="/trust/privacy.pdf">Privacy Policy</PolicyLink>{" "}
            and{" "}
            <PolicyLink href="/trust/dpa.pdf">
              Data Protection Agreement
            </PolicyLink>{" "}
            have {showCookies && "also "}been updated
          </>
        ) : (
          <>
            Read our{" "}
            <PolicyLink href="/trust/privacy.pdf">privacy policy.</PolicyLink>
          </>
        )}
      </p>

      <div className="flex shrink-0 items-center gap-1">
        {showCookies && (
          <button
            onClick={() => {
              setCookieConsent("granted");
              grantAnalyticsConsent();
              acknowledgeTerms();
            }}
            className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium leading-5 transition-colors hover:bg-zinc-100"
          >
            Accept
          </button>
        )}
        <button
          onClick={() => {
            acknowledgeTerms();
            setClosed(true);
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
