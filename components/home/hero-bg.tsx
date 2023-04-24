import cx from "@/utils/cx";
import { HeroProduct } from "@/components/home/hero";

export default function HomeHeroBg({
  activeProduct,
}: {
  activeProduct?: HeroProduct;
}) {
  return (
    <div
      className={cx(
        "absolute left-1/2 top-1/2 -z-10 h-[400px] w-[800px]",
        "-translate-x-1/2 -translate-y-1/2",
        "opacity-10 blur-[100px]",
        // default
        "bg-emerald-500",
        activeProduct === HeroProduct.REDIS && "bg-red-500",
        activeProduct === HeroProduct.KAFKA && "bg-blue-500",
        activeProduct === HeroProduct.QSTASH && "bg-purple-500"
      )}
    />
  );
}
