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
    <div className="flex w-full items-center justify-center bg-black px-4 py-3 text-sm text-zinc-200">
      <span className=" ">
        Our{" "}
        <a
          href="/trust/terms.pdf"
          className="text-emerald-300 underline hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms
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
      </span>
      <button
        className="ml-4"
        onClick={() => setIsTermsUpdateAcknowledged(true)}
        aria-label="Close banner"
      >
        <IconX size={20} strokeWidth={1.5} className="opacity-50" />
      </button>
    </div>
  );
};
