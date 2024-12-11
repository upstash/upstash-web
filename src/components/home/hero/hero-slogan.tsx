import cx from "@/utils/cx";
import { Product } from "@/utils/type";

export default function HomeHeroSlogan({
  activeProduct,
}: {
  activeProduct?: Product;
}) {
  return (
    <h1
      className={cx(
        "tracking-tight transition",
        "font-display text-6xl font-bold leading-none md:text-[8rem]",
        "bg-gradient-to-r from-20% bg-clip-text text-transparent",
        "from-emerald-400 to-yellow-300",
        activeProduct === Product.REDIS && "from-red-500 to-red-200",
        activeProduct === Product.VECTOR && "from-orange-500 to-orange-200",
        activeProduct === Product.QSTASH && "from-blue-500 to-blue-200",
        activeProduct === Product.WORKFLOW && "from-purple-500 to-purple-200",
      )}
    >
      Serverless <br />
      Data Platform
    </h1>
  );
}
