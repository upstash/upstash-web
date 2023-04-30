import {
  ProductFeature,
  ProductFeatureItem,
  ServerlessBox,
  ServerlessTitle,
} from "./comp";
import Button from "@/components/button";
import React from "react";
import { Product } from "@/utils/type";

export default function ServerlessQStash() {
  return (
    <ServerlessBox className="col-span-2 bg-purple-300/5">
      <header>
        <ServerlessTitle>QStash</ServerlessTitle>
      </header>

      <ProductFeature product={Product.QSTASH}>
        <ProductFeatureItem>
          Serverless, HTTP based messaging
        </ProductFeatureItem>
        <ProductFeatureItem>Scheduling via CRON</ProductFeatureItem>
        <ProductFeatureItem>
          At-least-once delivery with auto retries
        </ProductFeatureItem>
      </ProductFeature>

      <div className="mt-auto grid w-fit grid-cols-2 gap-1">
        <Button
          href={"/docs/qstash"}
          className="rounded-r-none
          bg-purple-300/10 hover:bg-purple-300 hover:text-purple-950"
          type="button"
        >
          Read the docs
        </Button>
        <Button
          href="https://github.com/upstash/qstash-examples"
          className="rounded-l-none
          bg-purple-300/10 hover:bg-purple-300 hover:text-purple-950"
          type="button"
        >
          View examples
        </Button>
      </div>
    </ServerlessBox>
  );
}
