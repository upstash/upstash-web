import * as React from "react";
import PricingToggle from "@/app/pricing/client";

export default function Pricing({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return (
    <div>
      <PricingToggle selectedProducts={params.slug} />

      <p>
        In the global database, the replicas are distributed across multiple
        regions around the world. The clients are routed to the nearest region.
        This helps with minimizing latency for use cases where users can be
        anywhere in the world.
      </p>
    </div>
  );
}
