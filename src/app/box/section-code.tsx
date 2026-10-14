"use client";

import Bg from "@/components/bg";
import Container from "@/components/container";
import { CodeSnippetsBox } from "@/components/home/serverless/code-snippets-box";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";

export default function SectionCode() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-lg">
        <PageHeaderTitle as="h2">Give your agent a computer</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Build with the <code className="font-mono">@upstash/box</code> SDK for
          TypeScript and Python, the Box CLI, or the Upstash MCP server.
        </PageHeaderDesc>

        <div className="mt-12 text-left md:mt-16">
          <CodeSnippetsBox />
        </div>
      </Container>
    </section>
  );
}
