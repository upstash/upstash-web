"use client";

import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";

const MIN_VISIBLE_MS = 10_000;

/**
 * Fires `blog_read` after the post has been visible for 10s cumulative
 * AND the user has scrolled at least once. Fires once per mount; unique
 * readers are deduped at query time via user_pseudo_id in BigQuery.
 */
export default function ReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    let visibleSince: number | null =
      document.visibilityState === "visible" ? Date.now() : null;
    let accumulatedMs = 0;
    let hasScrolled = false;
    let fired = false;

    const totalVisibleMs = () =>
      accumulatedMs + (visibleSince !== null ? Date.now() - visibleSince : 0);

    const cleanup = () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };

    const check = () => {
      if (fired || !hasScrolled || totalVisibleMs() < MIN_VISIBLE_MS) {
        return;
      }
      fired = true;
      cleanup();
      trackEvent("blog_read", { slug });
    };

    const onScroll = () => {
      hasScrolled = true;
      check();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        visibleSince = Date.now();
      } else if (visibleSince !== null) {
        accumulatedMs += Date.now() - visibleSince;
        visibleSince = null;
      }
    };

    const interval = window.setInterval(check, 1000);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return cleanup;
  }, [slug]);

  return null;
}
