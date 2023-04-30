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
    <ServerlessBox className="col-span-3 border border-red-300/5 bg-red-300/5">
      <header>
        <ServerlessTitle>Redis</ServerlessTitle>
      </header>

      <ProductFeature product={Product.REDIS}>
        <ProductFeatureItem>
          Durable and fast with multi tier storage
        </ProductFeatureItem>
        <ProductFeatureItem>
          Fast anywhere with global replication
        </ProductFeatureItem>
        <ProductFeatureItem>
          Designed for Edge/Serverless with REST API
        </ProductFeatureItem>
      </ProductFeature>

      <div className="mt-auto grid w-fit grid-cols-2 gap-1">
        <Button
          href={"/docs/redis"}
          className="rounded-r-none
          bg-red-300/10 hover:bg-red-300 hover:text-red-950"
          type="button"
        >
          Read the docs
        </Button>
        <Button
          href="https://github.com/upstash/redis-examples"
          className="rounded-l-none
          bg-red-300/10 hover:bg-red-300 hover:text-red-950"
          type="button"
        >
          View examples
        </Button>
      </div>
    </ServerlessBox>
  );
}
