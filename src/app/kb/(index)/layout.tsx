import Bg from "@/components/bg";
import Container from "@/components/container";
import KbTopicToggle from "@/components/kb/topic-toggle";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import { getKbArticles, KB_DESCRIPTION, kbTopics } from "@/lib/kb";
import type { ReactNode } from "react";

// The index and the topic pages share the header, so moving between topics
// only swaps the grid.
export default async function KbIndexLayout({
  children,
}: {
  children: ReactNode;
}) {
  const topics = kbTopics(await getKbArticles());

  return (
    <main className="relative z-0">
      <Bg />

      <header className="pt-10 text-center md:pt-20">
        <Container>
          <PageHeaderTitle>Knowledge Base</PageHeaderTitle>
          <PageHeaderDesc className="mt-2">{KB_DESCRIPTION}</PageHeaderDesc>

          {topics.length > 0 && (
            <div className="mt-10">
              <KbTopicToggle topics={topics} />
            </div>
          )}
        </Container>
      </header>

      <section className="mt-10 md:mt-16">
        <Container>{children}</Container>
      </section>
    </main>
  );
}
