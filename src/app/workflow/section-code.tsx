"use client";

import Bg from "@/components/bg";
import Container from "@/components/container";
import { CodeSnippetsWorkflow } from "@/components/home/serverless/code-snippets-workflow";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";

export default function SectionCode() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-lg">
        <PageHeaderTitle as="h2">Write workflows as code</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Wrap your logic in steps with the{" "}
          <code className="font-mono">@upstash/workflow</code> SDK and serve it
          from any API route.
        </PageHeaderDesc>

        <div className="mt-12 text-left md:mt-16">
          <CodeSnippetsWorkflow />
        </div>
      </Container>
    </section>
  );
}
