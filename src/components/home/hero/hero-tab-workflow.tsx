import { HeroTabFeatures } from "@/components/home/hero/hero-tab";
import { PRODUCT_FEATURES } from "@/components/home/product-new/product-features";
import { Product } from "@/utils/type";
import { CodeSnippetsWorkflow } from "../serverless/code-snippets-workflow";

export function HeroTabWorkflow() {
  return (
    <>
      <HeroTabFeatures groups={PRODUCT_FEATURES[Product.WORKFLOW]} />
      <CodeSnippetsWorkflow />
    </>
  );
}
