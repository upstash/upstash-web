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
        "absolute left-1/2 top-1/2 -z-10 h-[400px] w-[800px]",
        "-translate-x-1/2 -translate-y-1/2",
        "opacity-10 blur-[100px]",
        // default
        "bg-emerald-500",
        activeProduct === Product.REDIS && "bg-red-500",
        activeProduct === Product.QSTASH && "bg-purple-500",
        activeProduct === Product.VECTOR && "bg-orange-500",
      )}
    />
  );
}
