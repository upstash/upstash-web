"use client";

import React, { HTMLProps, useEffect, useState } from "react";
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
  const [posthogDistincId, setPosthogDistincId] = useState("");
  const segment = useSelectedLayoutSegment();

  const { affiliateCode } = useGetAffiliateCodeFromApi();
  const [fix, setFix] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 10) {
      setFix(true);
    } else {
      setFix(false);
    }
  });

  useEffect(() => {
    if (posthog.__loaded) setPosthogDistincId(posthog.get_distinct_id());
  }, []);

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
              href={
                affiliateCode
                  ? `https://console.upstash.com/?code=${affiliateCode}&landingDistinctId=${posthogDistincId}`
                  : `https://console.upstash.com/?landingDistinctId=${posthogDistincId}`
              }
              className={cx("", fix ? "bg-emerald-500" : "")}
            >
              Login
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
