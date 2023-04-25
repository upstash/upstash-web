import HomeHero from "@/components/home/hero/hero";
import HomeFast from "@/components/home/fast/fast";
import HomeServerless from "@/components/home/serverless";

export default function Home() {
  return (
    <main className="text-center">
      <HomeHero />
      <HomeFast />
      <HomeServerless />
    </main>
  );
}
