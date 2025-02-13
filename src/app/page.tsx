"use client";

import "../styles/home.css";
import { ParsedUrlQueryInput } from "querystring";
import HomeCommunity from "@/components/home/community";
import HomeFast from "@/components/home/fast";
import HomeHero from "@/components/home/hero";
import HomeHeroCustomer from "@/components/home/hero/hero-customer";
import HomeProductNew from "@/components/home/product-new";
import HomeServerless from "@/components/home/serverless";
import { useSetAffiliateCodeToSessionStorage } from "@/hooks/use-affiliate-code-session-storage";
import { IntercomProvider } from "react-use-intercom";

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
      <main className="text-center">
        <HomeHero />
        {/* TODO: Redesign */}
        <HomeProductNew />
        <HomeFast />
        <HomeServerless />
        <HomeHeroCustomer />
        {/* TODO: Enterprise */}
        <HomeCommunity />
      </main>
    </IntercomProvider>
  );
}
