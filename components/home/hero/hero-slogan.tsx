import cx from "@/utils/cx";
import { Product } from "@/utils/type";
import { motion } from "framer-motion";

export default function HomeHeroSlogan({
  activeProduct,
}: {
  activeProduct?: Product;
}) {
  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 1 }}
      className={cx(
        "inline-flex flex-col gap-1 transition",
        "font-display text-6xl font-bold leading-none md:text-[8rem]",
        "bg-gradient-to-r from-20% bg-clip-text text-transparent",
        // default
        "from-emerald-400 to-yellow-300",
        activeProduct === Product.REDIS && "from-red-500 to-red-200",
        activeProduct === Product.KAFKA && "from-blue-500 to-blue-200",
        activeProduct === Product.QSTASH && "from-purple-500 to-purple-200"
      )}
    >
      <span>Serverless</span>
      <span>Data Platform</span>
    </motion.h1>
  );
}
