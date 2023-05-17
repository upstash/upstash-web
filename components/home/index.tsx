"use client";

import HomeHero from "./hero";
import HomeFast from "./fast";
import HomeServerless from "./serverless";
import HomeProduct from "./product";
import HomePrice from "./price";
import HomeOpenSource from "./open-source";
import HomeInvestors from "./investor";
import HomeCommunity from "./community";
import SectionMenu from "./section-menu";

export default function Home() {
  return (
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
  );
}
