import HomeHero from "@/components/home/hero";
import HomeFast from "@/components/home/fast";
import HomeServerless from "@/components/home/serverless";
import HomePrice from "@/components/home/price";
import HomeOpenSource from "@/components/home/open-source";
import HomeInvestors from "@/components/home/investor";
import HomeCommunity from "@/components/home/community";

export default function Home() {
  return (
    <main className="overflow-hidden text-center">
      <HomeHero />
      <HomeFast />
      <HomeServerless />
      <HomePrice />
      <HomeOpenSource />
      <HomeInvestors />
      <HomeCommunity />
    </main>
  );
}
