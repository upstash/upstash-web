"use client";

import Button from "@/components/button";
import IconRedis from "@/components/icon-redis";
import { Product } from "@/utils/type";
import React from "react";
import {
  ProductBox,
  ProductFeature,
  ProductFeatureItem,
  ProductTitle,
} from "./comp";

export default function ServerlessRedis() {
  return (
    <ProductBox product={Product.REDIS} className="mdd:col-span-2 bg-red-200/5">
      <header className="flex items-center gap-4">
        <IconRedis width={32} />
        <ProductTitle>
          Redis <span className="text-[.9em] opacity-20">®*</span>
        </ProductTitle>
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

      <div className="mt-auto flex items-center gap-2">
        <Button
          // type="button"
          // href="https://console.upstash.com"
          className="grow bg-red-100 text-red-950 hover:bg-red-100 hover:text-red-950"
        >
          Create Database
        </Button>
      </div>
    </ProductBox>
  );
}
