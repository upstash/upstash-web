import { trackEvent } from "@/lib/analytics";
import { useCallback, useEffect, useRef } from "react";

const MIN_VISIBLE_MS = 2000;

/**
 * Tracks how long a section stays at least 50% visible and fires
 * `section_view` (once per mount) when the section leaves the viewport,
 * the page is hidden, or the component unmounts, if the accumulated time
 * is >= 2s.
 *
 * Returns a ref callback to attach to the section root element.
 */
export function useSectionView(section: string) {
  const visibleSinceRef = useRef<number | null>(null);
  const totalMsRef = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentRef = useRef(false);
  // Captured at mount: on a client-side route change the component unmounts
  // *after* the URL has already changed, so location.pathname would name the
  // page the user went to rather than the one the section was on.
  const pageRef = useRef<string | null>(null);
  if (pageRef.current === null && typeof window !== "undefined") {
    pageRef.current = window.location.pathname;
  }

  const flush = useCallback(() => {
    if (visibleSinceRef.current !== null) {
      totalMsRef.current += Date.now() - visibleSinceRef.current;
      visibleSinceRef.current = null;
    }
    if (sentRef.current || totalMsRef.current < MIN_VISIBLE_MS) {
      return;
    }
    sentRef.current = true;
    trackEvent("section_view", {
      section,
      ms: Math.round(totalMsRef.current),
      ...(pageRef.current ? { page: pageRef.current } : {}),
    });
  }, [section]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flush();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", flush);
      // Client-side navigation unmounts the section while it may still be
      // visible, which fires neither of the listeners above.
      flush();
    };
  }, [flush]);

  return useCallback(
    (element: Element | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (!element || typeof IntersectionObserver === "undefined") {
        return;
      }

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
