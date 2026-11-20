"use client";

import { CodeSnippetsVector } from "@/components/home/serverless/code-snippets-vector";
import ProductSectionCode from "@/components/product-page/section-code";

export default function SectionCode() {
  return (
    <ProductSectionCode
      title="Add vector search to your app"
      description={
        <>
          Upsert and query with the{" "}
          <code className="font-mono">@upstash/vector</code> and{" "}
          <code className="font-mono">upstash-vector</code> SDKs, or call the
          REST API from anywhere.
        </>
      }
    >
      <CodeSnippetsVector />
    </ProductSectionCode>
  );
}
