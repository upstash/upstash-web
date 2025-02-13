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
      <header className="flex items-center gap-4">
        <IconVector width={32} />
        <ProductTitle>Vector Database</ProductTitle>
      </header>

      <ProductFeature product={Product.VECTOR}>
        <ProductFeatureItem>
          Serverless, price scales to zero
        </ProductFeatureItem>
        <ProductFeatureItem>Optimized for vector search</ProductFeatureItem>
        <ProductFeatureItem>Scales up to billion vectors</ProductFeatureItem>
      </ProductFeature>

      <div className="mt-auto flex items-center gap-2">
        <Button
          // href="/docs/vector"
          // type="button"
          className="shrink-0"
        >
          Docs
        </Button>
        <Button
          // href="https://drive.google.com/drive/u/1/folders/1_W7MgkKGJmbfVQ_QiW_6qcfq0JZYFnhw"
          // className="grow bg-orange-100 text-orange-950 hover:bg-orange-100 hover:text-orange-950"
          type="button"
        >
          Create Index
        </Button>
      </div>
    </ProductBox>
  );
}
