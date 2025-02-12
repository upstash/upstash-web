import Button from "@/components/button";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";

export default function SectionContact() {
  return (
    <section className="relative py-10 md:py-24">
      <Container className="max-w-screen-lg">
        <div className="rounded-4xl bg-bg-mute p-12 md:py-20">
          <PageHeaderTitle as="h2">Get an Enterprise trial.</PageHeaderTitle>
          <PageHeaderDesc className="mt-2">
            Discover the value of Vercel for your organization. We’ll give you a
            product trial and discuss your requirements.
          </PageHeaderDesc>

          <Button asChild variant="primary" className="mt-6">
            <a href="https://calendly.com/upstash" target="_blank">
              Book a Meeting
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
