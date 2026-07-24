import { HeroTabFeatures } from "@/components/home/hero/hero-tab";
import { PRODUCT_FEATURES } from "@/components/home/product-new/product-features";
import { Product } from "@/utils/type";
import { CodeSnippetsRedis } from "../serverless/code-snippets-redis";

export function HeroTabRedis() {
  return (
    <>
      <HeroTabFeatures groups={PRODUCT_FEATURES[Product.REDIS]} />
      <CodeSnippetsRedis />
    </>
  );
}
