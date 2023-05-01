import {
  ProductFeature,
  ProductFeatureItem,
  ServerlessBox,
  ServerlessTitle,
} from "./comp";
import Button from "@/components/button";
import React from "react";
import { Product } from "@/utils/type";

export default function ServerlessKafka() {
  return (
    <ServerlessBox className="bg-emerald-100/5 md:col-span-3">
      <header>
        <ServerlessTitle>Kafka</ServerlessTitle>
      </header>

      <ProductFeature product={Product.KAFKA}>
        <ProductFeatureItem>
          Per message pricing with zero fixed cost
        </ProductFeatureItem>
        <ProductFeatureItem>
          Managed Kafka Connectors with zero cost
        </ProductFeatureItem>
        <ProductFeatureItem>
          REST support in addition to Kafka API
        </ProductFeatureItem>
      </ProductFeature>

      <div className="mt-4 grid gap-2 md:mt-auto md:grid-cols-2 md:gap-1">
        <Button
          href={"/docs/kafka"}
          className="md:rounded-r-none"
          type="button"
        >
          Read the docs
        </Button>
        <Button
          href="https://github.com/upstash/kafka-examples"
          className="md:rounded-l-none"
          type="button"
        >
          View examples
        </Button>
      </div>
    </ServerlessBox>
  );
}
