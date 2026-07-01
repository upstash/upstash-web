"use client";

import "../styles/home.css";
import { ParsedUrlQueryInput } from "querystring";
import ArchitectChatbox from "@/components/home/architect";
import HomeCommunity from "@/components/home/community";
import HomeFaq from "@/components/home/faq";
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
    <main className="text-center">
      <HomeHero />
      {/* TODO: Redesign */}
      <HomeProductNew />
      <HomeFast />
      <HomeServerless />
      <HomeHeroCustomer />
      {/* TODO: Enterprise */}
      <HomeCommunity />
      <HomeFaq />
      <ArchitectChatbox />
    </main>
  );
}
