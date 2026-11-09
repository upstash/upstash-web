import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import type { SectionWhatIsProps } from "./types";

export default function SectionWhatIs({
  title,
  description,
  children,
}: SectionWhatIsProps) {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-md text-left">
        <PageHeaderTitle as="h2" className="text-center">
          {title}
        </PageHeaderTitle>
        <PageHeaderDesc className="mt-3 text-center">
          {description}
        </PageHeaderDesc>

        <div className="mt-10 space-y-5 text-lg leading-relaxed text-text-mute">
          {children}
        </div>
      </Container>
    </section>
  );
}
