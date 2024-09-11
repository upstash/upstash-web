import * as React from "react";
import { ChangeEvent, HTMLProps } from "react";

import { PricingPlans } from "@/utils/type";

export default function CompareSelect({
  product = "redis",
  selectedPlans,
  className = "",
  value,
  onChange = () => {},
  ...props
}: HTMLProps<HTMLSelectElement> & {
  value: PricingPlans;
  product: "redis" | "qstash";
  selectedPlans: PricingPlans[];
}) {
  const onChangeEvent = (
    event: ChangeEvent<HTMLSelectElement>,
    plan: PricingPlans,
  ) => {
    const value = event.target.value as PricingPlans;
    const index = selectedPlans.indexOf(plan);

    if (index === 0) {
      // return onChange([value, selectedPlans[1]]);
    }

    // return onChange([selectedPlans[0], value]);
  };

  return (
    <select
      className="bg-transparent px-4 py-2 font-semibold md:hidden"
      onChange={(e) => onChangeEvent(e, value)}
      {...props}
    >
      <option
        value={PricingPlans.Free}
        disabled={selectedPlans.includes(PricingPlans.Free)}
      >
        Free
      </option>

      <option
        value={PricingPlans.PayAsYouGo}
        disabled={selectedPlans.includes(PricingPlans.PayAsYouGo)}
      >
        Pay as you go
      </option>

      {["redis"].includes(product) && (
        <>
          <option
            value={PricingPlans.Pro2K}
            disabled={selectedPlans.includes(PricingPlans.Pro2K)}
          >
            Pro 2K
          </option>

          <option
            value={PricingPlans.Pro10K}
            disabled={selectedPlans.includes(PricingPlans.Pro10K)}
          >
            Pro 2K
          </option>
        </>
      )}

      {product === "qstash" && (
        <option
          value={PricingPlans.Enterprise}
          disabled={selectedPlans.includes(PricingPlans.Enterprise)}
        >
          Pro 10K
        </option>
      )}
    </select>
  );
}
