import * as React from "react";
import { PricingToggle } from "@/app/pricing/client";

export default function Pricing() {
  return (
    <div>
      <PricingToggle product={"/qstash"} />

      <div className="mt-10">
        <p>
          A message can be any shape or form: json, xml, binary, anything, that
          can be transmitted in the http request body. We do not impose any
          restrictions other than a size limit of 1 MB (which can be customized
          at your request).
        </p>
      </div>
    </div>
  );
}
