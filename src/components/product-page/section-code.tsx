import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import type { ReactNode } from "react";

/**
 * Layout for the code samples section. The snippet components use hooks, so
 * each product renders this from its own "use client" section-code file.
 */
export default function SectionCode({
  title,
  description,
  children,
}: {
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-lg">
        <PageHeaderTitle as="h2">{title}</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">{description}</PageHeaderDesc>

        <div className="mt-12 text-left md:mt-16">{children}</div>
      </Container>
    </section>
  );
}
