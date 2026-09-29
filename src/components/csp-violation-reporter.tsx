"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function toOrigin(uri: string) {
  try {
    return new URL(uri).origin;
  } catch {
    return uri;
  }
}

const MAX_REPORTED_VIOLATIONS_PER_PAGELOAD = 30;

// GA4 pings the visitor's local google.<ccTLD> for ad-audience cookie
// matching. CSP cannot wildcard a TLD, so these are blocked on purpose.
const GOOGLE_CCTLD_ORIGIN = /^https:\/\/www\.google\.(?:com?\.)?[a-z]{2}$/;

/**
 * Reports enforced CSP violations to GA4 as `csp_violation` events,
 * mirroring the console's reporter (upstash-console-v2#1413): same event
 * name and directive/blocked_origin/source_origin params, so both
 * properties are queryable the same way. Deduped per directive+origin
 * and capped per pageload so a misbehaving extension can't flood
 * analytics.
 */
export function CspViolationReporter() {
  useEffect(() => {
    const seen = new Set<string>();

    const onViolation = (event: SecurityPolicyViolationEvent) => {
      if (/^(?:chrome|moz|safari)-extension/.test(event.blockedURI)) return;

      const blockedOrigin = toOrigin(event.blockedURI);
      if (GOOGLE_CCTLD_ORIGIN.test(blockedOrigin)) return;
      const key = `${event.effectiveDirective}:${blockedOrigin}`;
      if (seen.has(key) || seen.size >= MAX_REPORTED_VIOLATIONS_PER_PAGELOAD)
        return;
      seen.add(key);

      window.gtag?.("event", "csp_violation", {
        directive: event.effectiveDirective,
        blocked_origin: blockedOrigin,
        source_origin: event.sourceFile ? toOrigin(event.sourceFile) : undefined,
      });
    };

    document.addEventListener("securitypolicyviolation", onViolation);
    return () => {
      document.removeEventListener("securitypolicyviolation", onViolation);
    };
  }, []);

  return null;
}
