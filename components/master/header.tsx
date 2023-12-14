"use client";

import React, { HTMLProps } from "react";
import Link from "next/link";

import cx from "@/utils/cx";

import { useGetAffiliateCodeFromApi } from "@/hooks/use-affiliate-code";

import Button from "@/components/button";
import Container from "@/components/container";
import { Logo } from "@/components/logo";

import NewNavigation from "./new-nav";

export default function Header({
  className,
  ...props
}: HTMLProps<HTMLHeadElement>) {
  const { affiliateCode } = useGetAffiliateCodeFromApi();

  return (
    <header className={cx("hidden md:block", className)} {...props}>
      <Container>
        <div className="flex items-center border-b border-b-white/5 py-5 md:grid md:grid-cols-6">
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
                  ? `https://console.upstash.com/?code=${affiliateCode}`
                  : "https://console.upstash.com"
              }
              className="backdrop-blur"
            >
              Login
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
