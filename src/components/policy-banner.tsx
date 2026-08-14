"use client";

import { useGlobalStore } from "@/lib/global-store";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

/**
 * Rendered inline at the bottom of the footer, next to the legal links it is
 * about — deliberately not a floating overlay, so it never competes with the
 * cookie consent banner.
 */
export const PolicyBanner = () => {
  const {
    isTermsUpdateAcknowledged,
    setIsTermsUpdateAcknowledged,
    isHydrated,
  } = useGlobalStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;
    setVisible(!isTermsUpdateAcknowledged);
  }, [isHydrated, isTermsUpdateAcknowledged]);

  if (!visible) return;

  return (
    <div className="mt-4 flex items-center gap-1 rounded-2xl bg-emerald-400/10 py-1.5 pl-4 pr-1.5 text-xs text-text-mute md:rounded-full">
      <p className="text-balance">
        Our{" "}
        <a
          href="/trust/terms.pdf"
          className="text-emerald-500 underline hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms
        </a>
        ,{" "}
        <a
          href="/trust/privacy.pdf"
          className="text-emerald-500 underline hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="/trust/dpa.pdf"
          className="text-emerald-500 underline hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Data Protection Agreement
        </a>{" "}
        have been updated
      </p>
      <button
        className="flex size-6 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-emerald-400/20"
        onClick={() => setIsTermsUpdateAcknowledged(true)}
        aria-label="Dismiss notice"
      >
        <IconX size={14} strokeWidth={2} className="opacity-70" />
      </button>
    </div>
  );
};
