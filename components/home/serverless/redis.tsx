import {
  ProductFeature,
  ProductFeatureItem,
  ServerlessBox,
  ServerlessTitle,
} from "./comp";
import Button from "@/components/button";
import React from "react";
import { Product } from "@/utils/type";

export default function ServerlessRedis() {
  return (
    <ServerlessBox className="bg-emerald-100/5 md:col-span-3">
      <header>
        <ServerlessTitle>Serverless KV with Redis API</ServerlessTitle>
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

      <div className="mt-4 grid gap-2 md:mt-auto md:grid-cols-2 md:gap-1">
        <Button
          href="https://docs.upstash.com/redis"
          className="md:rounded-r-none"
          type="button"
        >
          Read the docs
        </Button>
        <Button
          href="https://github.com/upstash/redis-examples"
          className="md:rounded-l-none"
          type="button"
        >
          View examples
        </Button>
      </div>
    </ServerlessBox>
  );
}
