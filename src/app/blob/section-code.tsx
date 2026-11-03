"use client";

import { CodeSnippetsBlob } from "@/components/home/serverless/code-snippets-blob";
import ProductSectionCode from "@/components/product-page/section-code";

export default function SectionCode() {
  return (
    <ProductSectionCode
      title="Add file uploads to your app"
      description={
        <>
          Build with the fully typesafe{" "}
          <code className="font-mono">@upstash/blob</code> SDK. Upload from your
          server or browser, and track progress with React hooks.
        </>
      }
    >
      <CodeSnippetsBlob />
    </ProductSectionCode>
  );
}
