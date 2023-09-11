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
        A message can be any shape or form: json, xml, binary, anything, that
        can be transmitted in the http request body. We do not impose any
        restrictions other than a size limit of 1 MB (which can be customized at
        your request).
      </p>
    </div>
  );
}
