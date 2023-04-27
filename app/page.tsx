import HomeHero from "@/components/home/hero/hero";
import HomeFast from "@/components/home/fast/fast";
import HomeServerless from "@/components/home/serverless";
import HomePrice from "@/components/home/price";

export default function Home() {
  return (
    <main className="text-center">
      {/*<HomeHero />*/}
      {/*<HomeFast />*/}
      {/*<HomeServerless />*/}
      <HomePrice />
    </main>
  );
}
