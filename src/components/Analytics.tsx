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

function findAnchor(event: Event): HTMLAnchorElement | null {
  const target = event.target;
  if (!(target instanceof Element)) {
    return null;
  }
  return target.closest<HTMLAnchorElement>("a[href]");
}

function trackAnchor(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href") ?? "";
  const product = anchor
    .closest("[data-product]")
    ?.getAttribute("data-product");
  const plan = anchor.closest("[data-plan]")?.getAttribute("data-plan");

  trackEvent("link_click", {
    link_url: href,
    link_text: (anchor.textContent ?? "").trim().slice(0, 100),
    link_area: getLinkArea(anchor),
    ...(product ? { product } : {}),
    ...(plan ? { plan } : {}),
  });
}

// Append the affiliate code to console links before navigation
function appendAffiliateCode(anchor: HTMLAnchorElement) {
  if (!anchor.href.includes("console.upstash.com")) {
    return;
  }
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

function onDocumentClick(event: MouseEvent) {
  const anchor = findAnchor(event);
  if (!anchor) {
    return;
  }
  trackAnchor(anchor);
  appendAffiliateCode(anchor);
}

// Middle clicks fire auxclick, not click. Track them too since they
// open the link in a new tab.
function onDocumentAuxClick(event: MouseEvent) {
  if (event.button !== 1) {
    return;
  }
  const anchor = findAnchor(event);
  if (!anchor) {
    return;
  }
  trackAnchor(anchor);
}

// Rewrite the href before any navigation can start, so middle clicks and
// right click > "Open in new tab" also carry the affiliate code.
function onDocumentPointerDown(event: PointerEvent) {
  const anchor = findAnchor(event);
  if (anchor) {
    appendAffiliateCode(anchor);
  }
}

export default function Analytics() {
  useEffect(() => {
    document.addEventListener("click", onDocumentClick, true);
    document.addEventListener("auxclick", onDocumentAuxClick, true);
    document.addEventListener("pointerdown", onDocumentPointerDown, true);
    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      document.removeEventListener("auxclick", onDocumentAuxClick, true);
      document.removeEventListener("pointerdown", onDocumentPointerDown, true);
    };
  }, []);

  return <VercelAnalytics />;
}
