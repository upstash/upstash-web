import { HeroTabFeatures } from "@/components/home/hero/hero-tab";
import { PRODUCT_FEATURES } from "@/components/home/product-new/product-features";
import { Product } from "@/utils/type";
import { CodeSnippetsBox } from "../serverless/code-snippets-box";

export function HeroTabBox() {
  return (
    <>
      <HeroTabFeatures groups={PRODUCT_FEATURES[Product.BOX]} />
      <CodeSnippetsBox />
    </>
  );
}
