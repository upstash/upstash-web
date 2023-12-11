"use client";

import { ParsedUrlQueryInput } from "querystring";
import * as React from "react";

import { IntercomProvider } from "react-use-intercom";

import { useSetAffiliateCodeToSessionStorage } from "@/hooks/use-affiliate-code-session-storage";

import HomeCommunity from "@/components/home/community";
import HomeFast from "@/components/home/fast";
import HomeHero from "@/components/home/hero";
import HomeInvestors from "@/components/home/investor";
import HomeOpenSource from "@/components/home/open-source";
import HomePrice from "@/components/home/price";
import HomeProduct from "@/components/home/product";
import SectionMenu from "@/components/home/section-menu";
import HomeServerless from "@/components/home/serverless";

export default function Home({
  searchParams,
}: {
  searchParams: ParsedUrlQueryInput;
}) {
  useSetAffiliateCodeToSessionStorage(searchParams);

  return (
    <IntercomProvider
      appId={process.env.NEXT_PUBLIC_INTERCOM_APP_ID as string}
      autoBoot
    >
      <main className="overflow-x-hidden text-center">
        <HomeHero />
        <HomeFast />
        <HomeServerless />
        <HomeProduct />
        <HomePrice />
        <HomeOpenSource />
        <HomeInvestors />
        <HomeCommunity />

        <SectionMenu />
      </main>
    </IntercomProvider>
  );
}
