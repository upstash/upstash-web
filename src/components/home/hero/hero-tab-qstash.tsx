import { HeroTabFeatures } from "@/components/home/hero/hero-tab";
import { PRODUCT_FEATURES } from "@/components/home/product-new/product-features";
import { Product } from "@/utils/type";
import { CodeSnippetsQStash } from "../serverless/code-snippets-qstash";

export function HeroTabQStash() {
  return (
    <>
      <HeroTabFeatures groups={PRODUCT_FEATURES[Product.QSTASH]} />
      <CodeSnippetsQStash />
    </>
  );
}
