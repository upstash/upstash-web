// app/providers.js
"use client";

import React from "react";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
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
    capture_pageview: true,
    cross_subdomain_cookie: true,
    capture_pageleave: true,
    autocapture: false,
    loaded: function (posthog) {
      localStorage.setItem("distinctId", posthog.get_distinct_id());
    },
  });
}

export function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
