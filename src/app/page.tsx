"use client";

import "./page.css";
import { ParsedUrlQueryInput } from "querystring";
import HomeCommunity from "@/components/home/community";
import HomeFast from "@/components/home/fast";
import HomeHero from "@/components/home/hero";
import HomeHeroPartner from "@/components/home/hero/hero-customer";
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
        <HomeHeroPartner />
        <HomeServerless />
        <HomeFast />
        <HomeCommunity />
      </main>
    </IntercomProvider>
  );
}
