"use client";

import Bg from "@/components/bg";
import Container from "@/components/container";
import { CodeSnippetsBlob } from "@/components/home/serverless/code-snippets-blob";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";

export default function SectionCode() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-lg">
        <PageHeaderTitle as="h2">One SDK, three entrypoints</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Write objects from the server with{" "}
          <code className="font-mono">@upstash/blob</code>, let browsers upload
          straight to storage, and drive it from React with typed hooks.
        </PageHeaderDesc>

        <div className="mt-12 text-left md:mt-16">
          <CodeSnippetsBlob />
        </div>
      </Container>
    </section>
  );
}
