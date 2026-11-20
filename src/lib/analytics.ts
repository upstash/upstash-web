declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a GA4 event. Safe no-op when gtag is unavailable
 * (dev mode, ad blockers, SSR).
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params);
}

/**
 * Updates Consent Mode v2 after the user accepts the cookie banner. Ad signals
 * stay denied: Upstash runs no ads, as the privacy policy says.
 */
export function grantAnalyticsConsent() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

let oncePath: string | null = null;
const onceKeys = new Set<string>();

/**
 * Returns true the first time a key is seen for the current pathname,
 * false afterwards. The key set resets when the pathname changes.
 */
export function oncePerPageview(key: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  const path = window.location.pathname;
  if (path !== oncePath) {
    oncePath = path;
    onceKeys.clear();
  }
  if (onceKeys.has(key)) {
    return false;
  }
  onceKeys.add(key);
  return true;
}
