import * as React from "react";
import { ProductToggle } from "@/components/pricing/product-toggle";

export default function Pricing() {
  return (
    <div>
      <ProductToggle product={"/kafka"} />
    </div>
  );
}
