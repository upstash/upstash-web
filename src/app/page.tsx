"use client";

import { ParsedUrlQueryInput } from "querystring";
import HomeCommunity from "@/components/home/community";
import HomeFast from "@/components/home/fast";
import HomeHero from "@/components/home/hero";
import HomeOpenSource from "@/components/home/open-source";
import HomeProduct from "@/components/home/product";
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
      <main className="overflow-x-hidden text-center">
        <HomeHero />
        <HomeFast />
        <HomeServerless />
        <HomeProduct />
        <HomeOpenSource />
        <HomeCommunity />
      </main>
    </IntercomProvider>
  );
}
