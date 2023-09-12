import * as React from "react";
import { PricingToggle } from "@/app/pricing/client";

export default function Pricing() {
  return (
    <div>
      <PricingToggle product={"/kafka"} />

      <div className="mt-10">
        <p>
          Upstash offers a REST API alongside TCP-based Kafka clients, enabling
          access to Kafka topics over HTTP. The REST API is particularly
          valuable in restricted environments, such as mobile or edge devices,
          as it provides a lightweight alternative to native Kafka clients. By
          utilizing the REST API, you can eliminate the need for manual
          management of Kafka clients and connections. It offers convenience and
          simplicity for interacting with Kafka topics without the complexities
          associated with native client implementations.
        </p>
      </div>
    </div>
  );
}
