"use client";

import Bg from "@/components/bg";
import Container from "@/components/container";
import { CodeSnippetsQStash } from "@/components/home/serverless/code-snippets-qstash";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";

export default function SectionCode() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-lg">
        <PageHeaderTitle as="h2">Send your first message</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Publish, schedule, and queue messages with the{" "}
          <code className="font-mono">@upstash/qstash</code> and{" "}
          <code className="font-mono">qstash</code> SDKs, or call the REST API
          from any language.
        </PageHeaderDesc>

        <div className="mt-12 text-left md:mt-16">
          <CodeSnippetsQStash />
        </div>
      </Container>
    </section>
  );
}
