"use client";

import Button from "@/components/button";
import IconVector from "@/components/icon-vector";
import { Product } from "@/utils/type";
import React from "react";
import {
  ProductBox,
  ProductFeature,
  ProductFeatureItem,
  ProductTitle,
} from "./comp";

export default function ServerlessVector() {
  return (
    <ProductBox
      product={Product.VECTOR}
      className="mdd:col-span-2 bg-orange-200/5"
    >
      <header>
        <IconVector className="mb-4" width={40} />
        <ProductTitle>Vector Database</ProductTitle>
      </header>

      <ProductFeature product={Product.VECTOR}>
        <ProductFeatureItem>
          Serverless, price scales to zero
        </ProductFeatureItem>
        <ProductFeatureItem>Optimized for vector search</ProductFeatureItem>
        <ProductFeatureItem>Scales up to billion vectors</ProductFeatureItem>
      </ProductFeature>

      <div className="mt-auto grid gap-4 sm:grid-cols-2">
        <Button
          href="/docs/vector"
          className="bg-orange-100 text-orange-950 hover:bg-orange-100 hover:text-orange-950"
          type="button"
        >
          Docs
        </Button>
        <Button
          href="https://drive.google.com/drive/u/1/folders/1_W7MgkKGJmbfVQ_QiW_6qcfq0JZYFnhw"
          className="hover:bg-orange-100 hover:text-orange-950"
          type="button"
        >
          Examples
        </Button>
      </div>
    </ProductBox>
  );
}
