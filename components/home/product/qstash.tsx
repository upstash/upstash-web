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
import IconQStash from "@/components/icon-qstash";
import { segment } from "@/lib/segment/segment";

export default function ServerlessQStash() {
  return (
    <ProductBox
      product={Product.QSTASH}
      className="mdd:col-span-2 bg-purple-200/5"
    >
      <header>
        <IconQStash className="mb-6" width={54} />
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

      <div className="grid gap-4 mt-auto">
        <Button
          href="https://github.com/upstash/qstash-examples"
          className="hover:bg-purple-100 hover:text-purple-950"
          type="button"
          onClick={()=>{
            segment.track("button.examples.qstash")
          }}
        >
          View examples
        </Button>
        <Button
          href="/docs/qstash"
          className="bg-purple-100 text-purple-950 hover:bg-purple-100 hover:text-purple-950"
          type="button"
          onClick={()=>{
            segment.track("button.docs.qstash")
          }}
        >
          Read the docs
        </Button>
      </div>
    </ProductBox>
  );
}
