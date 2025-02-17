"use client";

import Button from "@/components/button";
import IconQStash from "@/components/icon-qstash";
import { Product } from "@/utils/type";
import React from "react";
import {
  ProductBox,
  ProductFeature,
  ProductFeatureItem,
  ProductTitle,
} from "./comp";

export default function ServerlessQStash() {
  return (
    <ProductBox
      product={Product.QSTASH}
      className="mdd:col-span-2 bg-purple-200/5"
    >
      <header className="flex items-center gap-4">
        <IconQStash width={32} />
        <ProductTitle>QStash</ProductTitle>
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

      <div className="mt-auto grid gap-4 sm:grid-cols-2">
        <Button
          // href="/docs/qstash"
          type="button"
        >
          Docs
        </Button>
        <Button
          // href="https://github.com/upstash/examples/tree/main/examples"
          className="bg-purple-100 text-purple-950 hover:bg-purple-100 hover:text-purple-950"
          type="button"
        >
          Publish Messages
        </Button>
      </div>
    </ProductBox>
  );
}
