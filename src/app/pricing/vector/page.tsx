import VectorFaqJson from "@/../public/faq/vector.json";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import ProductToggle from "@/components/pricing/product-toggle";
import CompareTable from "@/components/pricing/vector/compare-table";
import Enterprise from "@/components/pricing/vector/enterprise";
import FAQ from "@/components/pricing/vector/faq";
import PricingTable from "@/components/pricing/vector/pricing-table";
import { PROD_PACK_SECTION_ID } from "@/constants";
import { generateFaqSchema } from "@/utils/structured-schema-generators";

export default function PricingVectorPage() {
  const structuredFaqSchema = generateFaqSchema(VectorFaqJson);

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
          <ProductToggle product={"/vector"} />

          <div className="mt-12 md:mt-20">
            <PricingTable />
          </div>

          {/* PROD PACK */}
          <div
            id={PROD_PACK_SECTION_ID}
            className="mt-6 rounded-4xl bg-white p-4 md:mt-16 dark:bg-bg-mute"
          >
            <Enterprise />
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
