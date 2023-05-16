import HomeHero from "@/components/home/hero";
import HomeFast from "@/components/home/fast";
import HomeServerless from "@/components/home/serverless";
// import HomeProduct from "@/components/home/product";
import HomePrice from "@/components/home/price";
import HomeOpenSource from "@/components/home/open-source";
import HomeInvestors from "@/components/home/investor";
import HomeCommunity from "@/components/home/community";
import SectionMenu from "@/components/home/section-menu";

export default function Home() {
  return (
    <main className="overflow-x-hidden text-center">
      <HomeHero />
      {/*<SectionMenu />*/}
      <HomeFast />
      <HomeServerless />
      {/*<HomeProduct />*/}
      <HomePrice />
      <HomeOpenSource />
      <HomeInvestors />
      <HomeCommunity />
    </main>
  );
}
