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
 * Reports enforced CSP violations to GA4 as `exception` events with
 * error_name "csp_violation", the same schema the console uses for
 * client errors (upstash-console-v2#1410), so both properties are
 * queryable the same way. Deduped per (directive, blocked origin) and
 * capped per pageload so a misbehaving extension can't flood analytics.
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
      window.gtag?.("event", "exception", {
        error_name: "csp_violation",
        directive: e.effectiveDirective,
        blocked_uri: blocked.slice(0, 100),
        source_file: (e.sourceFile ?? "").slice(0, 100),
        page: window.location.pathname,
        fatal: false,
      });
    };
    document.addEventListener("securitypolicyviolation", onViolation);
    return () =>
      document.removeEventListener("securitypolicyviolation", onViolation);
  }, []);

  return null;
}
