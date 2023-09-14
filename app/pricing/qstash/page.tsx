import * as React from "react";
import { PricingToggle } from "@/app/pricing/client";

export default function Pricing() {
  return (
    <div>
      <PricingToggle product={"/qstash"} />
    </div>
  );
}
