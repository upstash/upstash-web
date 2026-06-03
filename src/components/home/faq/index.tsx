import Bg from "@/components/bg";
import Container from "@/components/container";
import FaqAccordion from "@/components/faq-accordion";
import { HOME_FAQ } from "@/components/home/faq/faq-data";
import PageHeaderTitle from "@/components/page-header-title";
import { generateFaqSchema } from "@/utils/structured-schema-generators";

export default function HomeFaq() {
  const faqSchema = generateFaqSchema({ faq: HOME_FAQ });

  return (
    <section className="relative py-10 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />

      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-md text-left">
        <PageHeaderTitle as="h2" className="text-center">
          Frequently asked questions
        </PageHeaderTitle>

        <div className="mt-10 md:mt-14">
          <FaqAccordion items={HOME_FAQ} />
        </div>
      </Container>
    </section>
  );
}
