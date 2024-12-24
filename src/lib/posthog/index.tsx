"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React, { PropsWithChildren, useEffect } from "react";
import { useGlobalStore } from "../global-store";

const getPostHogConfig = () =>
  ({
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false,
    cross_subdomain_cookie: true,
    capture_pageleave: true,
    autocapture: false,
    opt_out_capturing_by_default: true,
    persistence: "cookie",
    rate_limiting: {
      events_burst_limit: 1000,
      events_per_second: 100,
    },
  }) as const;

export const PHProvider = ({ children }: PropsWithChildren<{}>) => {
  const cookieConsent = useGlobalStore((state) => state.cookieConsent);
  const setIsInited = useGlobalStore((state) => state.setIsInited);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production" &&
      cookieConsent
    ) {
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

      if (!posthogKey || !posthogHost) {
        throw new Error(
          "NEXT_PUBLIC_POSTHOG_KEY or NEXT_PUBLIC_POSTHOG_HOST cannot be undefined or empty!",
        );
      }

      if (!posthog.__loaded) {
        posthog.init(posthogKey, getPostHogConfig());

        posthog.opt_in_capturing();
        setIsInited(true)
      }
    }
  }, [cookieConsent]);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};
