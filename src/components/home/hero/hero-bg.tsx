import cx from "@/utils/cx";
import { Product } from "@/utils/type";

export default function HomeHeroBg({
  activeProduct,
}: {
  activeProduct?: Product;
}) {
  return (
    <div
      className={cx(
        "absolute left-1/2 top-1/2 -z-10 h-3/4 w-full max-w-screen-xl md:top-2/3",
        "-translate-x-1/2 -translate-y-1/2",
        "radius-full opacity-10 blur-[50px] md:blur-[100px]",
        "bg-emerald-500",
        activeProduct === Product.REDIS && "bg-red-500",
        activeProduct === Product.QSTASH && "bg-purple-500",
        activeProduct === Product.VECTOR && "bg-orange-500",
      )}
    />
  );
}
