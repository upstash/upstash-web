import RedisFaqJson from "@/../public/faq/redis.json";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import Enterprise from "@/components/pricing/enterprise";
import ProductToggle from "@/components/pricing/product-toggle";
import CompareTable from "@/components/pricing/redis/compare-table";
import PricingTable from "@/components/pricing/redis/pricing-table";
import { generateFaqSchema } from "@/utils/structured-schema-generators";

export default function PricingRedisPage() {
  const structuredFaqSchema = generateFaqSchema(RedisFaqJson);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredFaqSchema,
        }}
      />

      <section>
        <Container>
          <ProductToggle product={"/redis"} />

          <div className="mt-12 md:mt-20">
            <PricingTable />
          </div>

          <div className="mt-6 md:mt-16">
            <div>PROD PACK</div>
          </div>
        </Container>
      </section>

      {/* Compare Table */}
      <section className="mt-32 md:mt-40">
        <Container className="max-w-screen-2xl">
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
        <Container>
          <div className="mt-10">
            <Enterprise />
          </div>
        </Container>
      </section>
    </>
  );
}
