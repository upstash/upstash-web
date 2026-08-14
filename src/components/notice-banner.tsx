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
        "fixed inset-x-0 bottom-0 z-50 flex w-full items-center justify-between gap-2",
        "bg-emerald-400 px-4 py-2.5 text-[13px] text-zinc-950 shadow-lg",
        // mx-auto rather than left-1/2, so shrink-to-fit gets the whole viewport
        // to measure against and the text stays on one line
        "md:bottom-4 md:mx-auto md:w-fit md:max-w-[min(94vw,880px)]",
        "md:rounded-3xl md:py-1.5 md:pl-4 md:pr-1.5",
      )}
    >
      <p className="leading-snug">
        {showCookies && showTerms ? (
          // Folded into one sentence so the banner stays a single line:
          // "updated" carries the terms notice. This is the widest the banner
          // ever gets (~846px) and is what md:max-w below is sized around; it
          // wraps to two lines under roughly 900px, where there is genuinely
          // no room for it.
          <>
            We use cookies to improve your experience. Read our updated{" "}
            <PolicyLink href="/trust/terms.pdf">Terms</PolicyLink>,{" "}
            <PolicyLink href="/trust/privacy.pdf">Privacy Policy</PolicyLink>{" "}
            and{" "}
            <PolicyLink href="/trust/dpa.pdf">
              Data Protection Agreement
            </PolicyLink>
            .
          </>
        ) : showTerms ? (
          <>
            Our <PolicyLink href="/trust/terms.pdf">Terms</PolicyLink>,{" "}
            <PolicyLink href="/trust/privacy.pdf">Privacy Policy</PolicyLink>{" "}
            and{" "}
            <PolicyLink href="/trust/dpa.pdf">
              Data Protection Agreement
            </PolicyLink>{" "}
            have been updated
          </>
        ) : (
          <>
            We use cookies to improve your experience. Read our{" "}
            <PolicyLink href="/trust/privacy.pdf">privacy policy.</PolicyLink>
          </>
        )}
      </p>

      <div className="flex shrink-0 items-center gap-0.5">
        {showCookies && (
          <button
            onClick={() => {
              setCookieConsent("granted");
              grantAnalyticsConsent();
              acknowledgeTerms();
            }}
            className="rounded-full bg-white px-3 py-1 text-xs font-medium leading-5 transition-colors hover:bg-zinc-100"
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
          className="flex size-7 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-emerald-500"
        >
          <IconX size={15} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};
