import * as React from "react";
import {
  PricingBadge,
  PricingTableBody,
  PricingTableRow,
  PricingToggle,
} from "@/app/pricing/client";

export default function Pricing() {
  return (
    <div>
      <PricingToggle product={"/"} />

      <div className="mt-10">
        <div className="grid grid-cols-4 gap-6">
          <PricingTableBody>
            <PricingTableRow>
              <PricingBadge>Free</PricingBadge>
            </PricingTableRow>
            <PricingTableRow>
              <p>123123</p>
            </PricingTableRow>
          </PricingTableBody>

          <PricingTableBody>
            <PricingTableRow>
              <PricingBadge>Pay as you go</PricingBadge>
            </PricingTableRow>
            <PricingTableRow>
              <p>123123</p>
            </PricingTableRow>
          </PricingTableBody>

          <PricingTableBody>
            <PricingTableRow>
              <PricingBadge>Pro 2K</PricingBadge>
            </PricingTableRow>
            <PricingTableRow>
              <p>123123</p>
            </PricingTableRow>
          </PricingTableBody>

          <PricingTableBody>
            <PricingTableRow>
              <PricingBadge>Pro 10K</PricingBadge>
            </PricingTableRow>
            <PricingTableRow>
              <p>123123</p>
            </PricingTableRow>
          </PricingTableBody>
        </div>

        <p>
          1 In the global database, the replicas are distributed across multiple
          regions around the world. The clients are routed to the nearest
          region. This helps with minimizing latency for use cases where users
          can be anywhere in the world.
        </p>
      </div>
    </div>
  );
}
