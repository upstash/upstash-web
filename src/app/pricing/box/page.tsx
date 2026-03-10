import BoxFaqJson from "@/../public/faq/box.json";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import CompareTable from "@/components/pricing/box/compare-table";
import FAQ from "@/components/pricing/box/faq";
import PricingTable from "@/components/pricing/box/pricing-table";
import ProductToggle from "@/components/pricing/product-toggle";
import { generateFaqSchema } from "@/utils/structured-schema-generators";

export default function PricingBoxPage() {
  const structuredFaqSchema = generateFaqSchema(BoxFaqJson);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredFaqSchema,
        }}
      />

      <section>
        <Container className="max-w-screen-lg">
          <ProductToggle product={"/box"} />

          <div className="mt-12 md:mt-20">
            <PricingTable />
          </div>

          <div className="mx-auto mt-8 w-3/4 rounded-xl bg-amber-100 px-6 py-3 text-center text-sm text-amber-800">
            Upstash Box is in{" "}
            <span className="font-medium underline underline-offset-2 hover:text-amber-900">
              Developer Preview
            </span>
            ! APIs and pricing may change.
          </div>
        </Container>
      </section>

      {/* Compare Table */}
      <section className="mt-32 md:mt-40">
        <Container className="max-w-screen-xl">
          <header>
            <PageHeaderTitle as="h2" className="md:text-4xl">
              Compare Plans
            </PageHeaderTitle>
            <PageHeaderDesc className="mt-2 md:text-xl">
              Plans that scale to all sizes.
            </PageHeaderDesc>
          </header>

          <div className="mt-12 md:mt-16">
            <CompareTable />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="mt-32 md:mt-40">
        <Container className="max-w-screen-md">
          <PageHeaderTitle as="h2" className="mb md:text-4xl">
            FAQ
          </PageHeaderTitle>
          <div className="mt-10">
            <FAQ />
          </div>
        </Container>
      </section>
    </>
  );
}
