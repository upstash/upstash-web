"use client";

import { CodeSnippetsWorkflow } from "@/components/home/serverless/code-snippets-workflow";
import ProductSectionCode from "@/components/product-page/section-code";

export default function SectionCode() {
  return (
    <ProductSectionCode
      title="Write workflows as code"
      description={
        <>
          Wrap your logic in steps with the{" "}
          <code className="font-mono">@upstash/workflow</code> SDK and serve it
          from any API route.
        </>
      }
    >
      <CodeSnippetsWorkflow />
    </ProductSectionCode>
  );
}
