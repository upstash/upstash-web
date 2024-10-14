"use client";

import VectorFaqJson from "@/../public/faq/vector.json";
import { generateFaqSchema } from "@/utils/structured-schema-generators";

import {
  CompareTable,
  Enterprise,
  FAQ,
  PricingTable,
  ProductToggle,
} from "@/components/pricing";
import { Container, PageHeaderDesc, PageHeaderTitle } from "@/components";

export default function PricingVectorPage() {
  const structuredFaqSchema = generateFaqSchema(VectorFaqJson);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredFaqSchema,
        }}
      />
      <ProductToggle product={"/vector"} />

      <div className="mt-16 md:mt-20">
        <PricingTable />

        <div className="mt-10 md:mt-20">
          <Enterprise />
        </div>

        <div className="mt-32 md:mt-40">
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
        </div>

        <div className="mt-32 md:mt-40">
          <Container className="max-w-screen-md">
            <PageHeaderTitle as="h2" className="mb md:text-4xl">
              FAQ
            </PageHeaderTitle>
            <div className="mt-10">
              <FAQ />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
