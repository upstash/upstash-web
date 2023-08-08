"use client"
import {
  ProductBox,
  ProductFeature,
  ProductFeatureItem,
  ProductTitle,
} from "./comp";
import Button from "@/components/button";
import React from "react";
import { Product } from "@/utils/type";
import IconKafka from "@/components/icon-kafka";
import { useSegment } from "@/hooks/use-segment";

export default function ServerlessKafka() {
  const {track} = useSegment()
  return (
    <ProductBox
      product={Product.KAFKA}
      className="mdd:col-span-2 bg-blue-200/5"
    >
      <header>
        <IconKafka className="mb-6" width={54} />
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

      <div className="grid gap-4 mt-auto">
        <Button
          href="https://github.com/upstash/kafka-examples"
          className="hover:bg-blue-100 hover:text-blue-950"
          type="button"
          onClick={()=>{
            track("button.examples.kafka")
          }}
        >
          View examples
        </Button>
        <Button
          href="/docs/kafka"
          className="bg-blue-100 text-blue-950 hover:bg-blue-100 hover:text-blue-950"
          type="button"
          onClick={()=>{
            track("button.docs.kafka")
          }}
        >
          Read the docs
        </Button>
      </div>
    </ProductBox>
  );
}
