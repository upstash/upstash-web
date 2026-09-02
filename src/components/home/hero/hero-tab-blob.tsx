import { HeroTabFeatures } from "@/components/home/hero/hero-tab";
import { PRODUCT_FEATURES } from "@/components/home/product-new/product-features";
import { Product } from "@/utils/type";
import { CodeSnippetsBlob } from "../serverless/code-snippets-blob";

export function HeroTabBlob() {
  return (
    <>
      <HeroTabFeatures groups={PRODUCT_FEATURES[Product.BLOB]} />
      <CodeSnippetsBlob />
    </>
  );
}
