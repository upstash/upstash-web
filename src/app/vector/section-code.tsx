"use client";

import Bg from "@/components/bg";
import Container from "@/components/container";
import { CodeSnippetsVector } from "@/components/home/serverless/code-snippets-vector";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";

export default function SectionCode() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-lg">
        <PageHeaderTitle as="h2">Add vector search to your app</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Upsert and query with the{" "}
          <code className="font-mono">@upstash/vector</code> and{" "}
          <code className="font-mono">upstash-vector</code> SDKs, or call the
          REST API from anywhere.
        </PageHeaderDesc>

        <div className="mt-12 text-left md:mt-16">
          <CodeSnippetsVector />
        </div>
      </Container>
    </section>
  );
}
