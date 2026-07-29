"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const seen = new Set<string>();
const MAX_REPORTS_PER_PAGELOAD = 10;

/**
 * Reports enforced CSP violations to GA4 as `csp_violation` events,
 * deduped per (directive, blocked origin) and capped per pageload so a
 * misbehaving extension can't flood analytics.
 */
export function CspViolationReporter() {
  useEffect(() => {
    const onViolation = (e: SecurityPolicyViolationEvent) => {
      let blocked = e.blockedURI;
      try {
        blocked = new URL(e.blockedURI).origin;
      } catch {}
      const key = `${e.effectiveDirective} ${blocked}`;
      if (seen.has(key) || seen.size >= MAX_REPORTS_PER_PAGELOAD) return;
      seen.add(key);
      window.gtag?.("event", "csp_violation", {
        directive: e.effectiveDirective,
        blocked_uri: blocked.slice(0, 100),
        source_file: (e.sourceFile ?? "").slice(0, 100),
        page_path: window.location.pathname,
      });
    };
    document.addEventListener("securitypolicyviolation", onViolation);
    return () =>
      document.removeEventListener("securitypolicyviolation", onViolation);
  }, []);

  return null;
}
