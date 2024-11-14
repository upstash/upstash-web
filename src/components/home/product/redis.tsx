"use client";

import React from "react";

import { Product } from "@/utils/type";

import { useSegment } from "@/hooks/use-segment";

import { Button, IconRedis } from "@/components";

import {
  ProductBox,
  ProductFeature,
  ProductFeatureItem,
  ProductTitle,
} from "./comp";

export default function ServerlessRedis() {
  const { track } = useSegment();
  return (
    <ProductBox product={Product.REDIS} className="mdd:col-span-2 bg-red-200/5">
      <header>
        <IconRedis className="mb-4" width={40} />
        <ProductTitle>Serverless KV with Redis API</ProductTitle>
      </header>

      <ProductFeature product={Product.REDIS}>
        <ProductFeatureItem>
          Durable and fast with multi tier storage.
        </ProductFeatureItem>
        <ProductFeatureItem>
          Fast anywhere with global replication.
        </ProductFeatureItem>
        <ProductFeatureItem>
          Designed for Edge/Serverless with REST API.
        </ProductFeatureItem>
      </ProductFeature>

      <div className="mt-auto grid gap-4 sm:grid-cols-2">
        <Button
          href="/docs/redis"
          className="bg-red-100 text-red-950 hover:bg-red-100 hover:text-red-950"
          type="button"
          onClick={() => {
            track("button.docs.redis");
          }}
        >
          Docs
        </Button>
        <Button
          href="https://github.com/upstash/examples/tree/main/examples"
          className="hover:bg-red-100 hover:text-red-950"
          type="button"
          onClick={() => {
            track("button.examples.redis");
          }}
        >
          Examples
        </Button>
      </div>
    </ProductBox>
  );
}
