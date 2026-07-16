import { oncePerPageview, trackEvent } from "@/lib/analytics";
import { useCallback, useEffect, useRef } from "react";

const MIN_VISIBLE_MS = 2000;

/**
 * Tracks how long a section stays at least 50% visible and fires
 * `section_view` (once per pageview) when the section leaves the viewport
 * or the page is hidden, if the accumulated time is >= 2s.
 *
 * Returns a ref callback to attach to the section root element.
 */
export function useSectionView(section: string) {
  const visibleSinceRef = useRef<number | null>(null);
  const totalMsRef = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const flush = useCallback(() => {
    if (visibleSinceRef.current !== null) {
      totalMsRef.current += Date.now() - visibleSinceRef.current;
      visibleSinceRef.current = null;
    }
    if (
      totalMsRef.current >= MIN_VISIBLE_MS &&
      oncePerPageview(`section_view:${section}`)
    ) {
      trackEvent("section_view", {
        section,
        ms: Math.round(totalMsRef.current),
      });
    }
  }, [section]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") { flush(); }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", flush);
    };
  }, [flush]);

  return useCallback(
    (element: Element | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (!element || typeof IntersectionObserver === "undefined") { return; }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              if (visibleSinceRef.current === null) {
                visibleSinceRef.current = Date.now();
              }
            } else if (visibleSinceRef.current !== null) {
              flush();
            }
          }
        },
        { threshold: 0.5 },
      );
      observer.observe(element);
      observerRef.current = observer;
    },
    [flush],
  );
}
