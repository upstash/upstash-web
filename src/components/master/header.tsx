"use client";

import React, { HTMLProps, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import cx from "@/utils/cx";
import { useMotionValueEvent, useScroll } from "framer-motion";
import posthog from "posthog-js";

import { useGetAffiliateCodeFromApi } from "@/hooks/use-affiliate-code";

import Button from "@/components/button";
import Container from "@/components/container";
import { Logo } from "@/components/logo";

import NewNavigation from "./new-nav";

export default function Header({ className, ...props }: HTMLProps<any>) {
  const [posthogDistinctId, setPosthogDistinctId] = useState("");
  const segment = useSelectedLayoutSegment();
  const { affiliateCode } = useGetAffiliateCodeFromApi();
  const [fix, setFix] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setFix(latest > 10);
  });

  useEffect(() => {
    const getDistinctId = () => {
      if (typeof window !== "undefined") {
        const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
        const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
        if (!posthogKey || !posthogHost) {
          throw new Error(
            "NEXT_PUBLIC_POSTHOG_KEY or NEXT_PUBLIC_POSTHOG_HOST cannot be undefined or empty!",
          );
        }

        const posthogInstance = posthog.init(posthogKey, {
          api_host: posthogHost,
          person_profiles: "identified_only",
          capture_pageview: false,
          capture_pageleave: true,
        });
        if (posthogInstance?.get_distinct_id()) {
          setPosthogDistinctId(posthogInstance.get_distinct_id());
        } else {
          setTimeout(getDistinctId, 100);
        }
      }
    };
    getDistinctId();
  }, [posthog]);

  const loginUrl = useMemo(() => {
    if (!posthogDistinctId) return "#";
    const baseUrl =
      "https://upstash-console-v2-git-posthog-web-test-console-upstash.vercel.app/";
    const params = new URLSearchParams({
      landingDistinctId: posthogDistinctId,
    });
    if (affiliateCode) params.append("code", affiliateCode);
    return `${baseUrl}?${params.toString()}`;
  }, [posthogDistinctId, affiliateCode]);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 hidden bg-zinc-950/80 backdrop-blur transition will-change-auto md:block",
        segment === "pricing" && "absolute",
        className,
      )}
      {...props}
    >
      <Container>
        <div
          className={cx(
            "flex items-center border-b border-b-white/5 py-5 md:grid md:grid-cols-6",
          )}
        >
          <div className="flex">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <NewNavigation />
          <div className="flex justify-end">
            <Button
              target="_self"
              type="button"
              hideIcon
              href={loginUrl}
              className={cx(
                "",
                fix ? "bg-emerald-500" : "",
                !posthogDistinctId && "cursor-not-allowed opacity-50",
              )}
              disabled={!posthogDistinctId}
              onClick={(e) => {
                if (!posthogDistinctId) {
                  e.preventDefault();
                }
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
