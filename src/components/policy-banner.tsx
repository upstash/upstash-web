"use client";

import { useGlobalStore } from "@/lib/global-store";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

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
    <div className="pointer-events-auto flex w-full items-center justify-between gap-3 bg-black px-4 py-3 text-sm text-zinc-200 shadow-lg md:w-[640px] md:rounded-full md:py-2.5 md:pl-5 md:pr-2">
      <p className="leading-snug">
        Our{" "}
        <a
          href="/trust/terms.pdf"
          className="text-emerald-300 underline hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms
        </a>
        ,{" "}
        <a
          href="/trust/privacy.pdf"
          className="text-emerald-300 underline hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="/trust/dpa.pdf"
          className="text-emerald-300 underline hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Data Protection Agreement
        </a>{" "}
        have been updated
      </p>
      <button
        className="flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/10"
        onClick={() => setIsTermsUpdateAcknowledged(true)}
        aria-label="Close banner"
      >
        <IconX size={16} strokeWidth={2} className="opacity-70" />
      </button>
    </div>
  );
};
