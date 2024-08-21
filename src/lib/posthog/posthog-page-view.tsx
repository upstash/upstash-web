"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { usePostHog } from "posthog-js/react";

export default function PostHogPageView() {
  const pathname = usePathname();
  const posthog = usePostHog();

  useEffect(() => {
    // Track pageviews
    if (pathname && posthog && typeof window !== "undefined") {
      const url = window.location.href;
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, posthog]);

  return null;
}
