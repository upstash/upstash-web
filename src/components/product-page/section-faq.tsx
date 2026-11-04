import Bg from "@/components/bg";
import Container from "@/components/container";
import FaqAccordion from "@/components/faq-accordion";
import PageHeaderTitle from "@/components/page-header-title";

export default function SectionFaq({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-md text-left">
        <PageHeaderTitle as="h2" className="text-center">
          Frequently asked questions
        </PageHeaderTitle>

        <div className="mt-10 md:mt-14">
          <FaqAccordion items={items} />
        </div>
      </Container>
    </section>
  );
}
