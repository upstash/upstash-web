"use client";

import { CodeSnippetsBox } from "@/components/home/serverless/code-snippets-box";
import ProductSectionCode from "@/components/product-page/section-code";

export default function SectionCode() {
  return (
    <ProductSectionCode
      title="Give your agent a computer"
      description={
        <>
          Build with the <code className="font-mono">@upstash/box</code> SDK for
          TypeScript and Python, the Box CLI, or the Upstash MCP server.
        </>
      }
    >
      <CodeSnippetsBox />
    </ProductSectionCode>
  );
}
