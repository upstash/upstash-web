"use client";

import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";

const STORAGE_KEY = "upstash_read_posts";
const MIN_VISIBLE_MS = 10_000;
const MAX_STORED_SLUGS = 500;

function getReadSlugs(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Fires `blog_read` after the post has been visible for 10s cumulative
 * AND the user has scrolled at least once. Fires once per post per user
 * (deduped via localStorage).
 */
export default function ReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const readSlugs = getReadSlugs();
    if (readSlugs.includes(slug)) {
      return;
    }

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
      try {
        const next = [...getReadSlugs().filter((s) => s !== slug), slug].slice(
          -MAX_STORED_SLUGS,
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage unavailable, still fire the event
      }
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
