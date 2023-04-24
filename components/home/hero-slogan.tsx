import cx from "@/utils/cx";
import { HeroProduct } from "@/components/home/hero";

export default function HomeHeroSlogan({
  activeProduct,
}: {
  activeProduct?: HeroProduct;
}) {
  return (
    <h1
      className={cx(
        "inline-flex flex-col gap-1 transition",
        "font-display text-6xl font-bold leading-none md:text-[7rem]",
        "bg-gradient-to-r from-20% bg-clip-text text-transparent",
        // default
        "from-emerald-400 to-yellow-300",
        activeProduct === HeroProduct.REDIS && "from-red-500 to-yellow-200",
        activeProduct === HeroProduct.KAFKA && "from-blue-500 to-yellow-200",
        activeProduct === HeroProduct.QSTASH && "from-purple-500 to-yellow-200"
      )}
    >
      <span>Serverless</span>
      <span>Data Platform</span>
    </h1>
  );
}
