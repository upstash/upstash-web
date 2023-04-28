import HomeHero from "@/components/home/hero";
import HomeFast from "@/components/home/fast";
import HomeServerless from "@/components/home/serverless";
import HomePrice from "@/components/home/price";
import HomeOpenSource from "@/components/home/open-source";

export default function Home() {
  return (
    <main className="text-center">
      <HomeHero />
      <HomeFast />
      <HomeServerless />
      <HomePrice />
      <HomeOpenSource />
    </main>
  );
}
