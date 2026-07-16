"use client";

import { AFFILIATE_CODE } from "@/hooks/use-affiliate-code-session-storage";
import { trackEvent } from "@/lib/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { useEffect } from "react";

function getLinkArea(anchor: HTMLAnchorElement) {
  const areaElement = anchor.closest("[data-area]");
  if (areaElement) {
    return areaElement.getAttribute("data-area");
  }
  if (anchor.closest("header")) {
    return "header";
  }
  if (anchor.closest("footer")) {
    return "footer";
  }
  return window.location.pathname;
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const anchor = target.closest<HTMLAnchorElement>("a[href]");
  if (!anchor) {
    return;
  }

  const href = anchor.getAttribute("href") ?? "";
  const area = getLinkArea(anchor);

  trackEvent("link_click", {
    link_url: href,
    link_text: (anchor.textContent ?? "").trim().slice(0, 100),
    link_area: area,
  });

  if (!href.includes("console.upstash.com")) {
    return;
  }

  const product = anchor
    .closest("[data-product]")
    ?.getAttribute("data-product");
  const plan = anchor.closest("[data-plan]")?.getAttribute("data-plan");

  trackEvent("console_click", {
    area,
    ...(product ? { product } : {}),
    ...(plan ? { plan } : {}),
  });

  // Append the affiliate code to console links before navigation
  try {
    const affiliateCode = sessionStorage.getItem(AFFILIATE_CODE);
    if (affiliateCode) {
      const url = new URL(anchor.href);
      if (!url.searchParams.has(AFFILIATE_CODE)) {
        url.searchParams.set(AFFILIATE_CODE, affiliateCode);
        anchor.href = url.toString();
      }
    }
  } catch {
    // sessionStorage unavailable or invalid href
  }
}

export default function Analytics() {
  useEffect(() => {
    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, []);

  return <VercelAnalytics />;
}
