"use client";

import { CodeSnippetsQStash } from "@/components/home/serverless/code-snippets-qstash";
import ProductSectionCode from "@/components/product-page/section-code";

export default function SectionCode() {
  return (
    <ProductSectionCode
      title="Send your first message"
      description={
        <>
          Publish, schedule, and queue messages with the{" "}
          <code className="font-mono">@upstash/qstash</code> and{" "}
          <code className="font-mono">qstash</code> SDKs, or call the REST API
          from any language.
        </>
      }
    >
      <CodeSnippetsQStash />
    </ProductSectionCode>
  );
}
