// app/providers.js
"use client";

import React from "react";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
) {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!posthogKey || !posthogHost) {
    throw new Error(
      "NEXT_PUBLIC_POSTHOG_KEY or NEXT_PUBLIC_POSTHOG_HOST cannot be undefined or empty!",
    );
  }

  posthog.init(posthogKey, {
    api_host: posthogHost,
    person_profiles: "identified_only",
    capture_pageview: false,
    cross_subdomain_cookie: true,
    capture_pageleave: true,
    autocapture: false,
    persistence: "cookie",
    rate_limiting: {
      events_burst_limit: 1000,
      events_per_second: 100,
    },
  });
}

export function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
