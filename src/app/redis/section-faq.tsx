import Bg from "@/components/bg";
import Container from "@/components/container";
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

        <div className="mt-10 divide-y divide-bg-mute md:mt-14">
          {items.map(({ question, answer }, index) => (
            <div key={index} className="py-6">
              <h3 className="font-display text-lg font-semibold md:text-xl">
                {question}
              </h3>
              <p className="mt-2 text-text-mute">{answer}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
