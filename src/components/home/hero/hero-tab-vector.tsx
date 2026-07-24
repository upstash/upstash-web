import { HeroTabFeatures } from "@/components/home/hero/hero-tab";
import { PRODUCT_FEATURES } from "@/components/home/product-new/product-features";
import { Product } from "@/utils/type";
import { CodeSnippetsVector } from "../serverless/code-snippets-vector";

export function HeroTabVector() {
  return (
    <>
      <HeroTabFeatures groups={PRODUCT_FEATURES[Product.VECTOR]} />
      <CodeSnippetsVector />
    </>
  );
}
