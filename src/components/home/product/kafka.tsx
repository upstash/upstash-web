"use client";

import React from "react";

import { Product } from "@/utils/type";

import { useSegment } from "@/hooks/use-segment";

import Button from "@/components/button";
import IconKafka from "@/components/icon-kafka";

import {
  ProductBox,
  ProductFeature,
  ProductFeatureItem,
  ProductTitle,
} from "./comp";

export default function ServerlessKafka() {
  const { track } = useSegment();
  return (
    <ProductBox
      product={Product.KAFKA}
      className="mdd:col-span-2 bg-blue-200/5"
    >
      <header>
        <IconKafka className="mb-4" width={40} />
        <ProductTitle>Serverless Kafka with no barriers</ProductTitle>
      </header>

      <ProductFeature product={Product.KAFKA}>
        <ProductFeatureItem>
          Per message pricing with zero fixed cost.
        </ProductFeatureItem>
        <ProductFeatureItem>
          Managed Kafka Connectors with no cost.
        </ProductFeatureItem>
        <ProductFeatureItem>
          REST support in addition to Kafka API.
        </ProductFeatureItem>
      </ProductFeature>

      <div className="mt-auto grid gap-4 sm:grid-cols-2">
        <Button
          href="/docs/kafka"
          className="bg-blue-100 text-blue-950 hover:bg-blue-100 hover:text-blue-950"
          type="button"
          onClick={() => {
            track("button.docs.kafka");
          }}
        >
          Read the docs
        </Button>
        <Button
          href="https://github.com/upstash/examples/tree/main/examples"
          className="hover:bg-blue-100 hover:text-blue-950"
          type="button"
          onClick={() => {
            track("button.examples.kafka");
          }}
        >
          View examples
        </Button>
      </div>
    </ProductBox>
  );
}
