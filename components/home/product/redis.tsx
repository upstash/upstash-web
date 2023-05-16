import {
  ProductBox,
  ProductFeature,
  ProductFeatureItem,
  ProductTitle,
} from "./comp";
import Button from "@/components/button";
import React from "react";
import { Product } from "@/utils/type";
import colors from "tailwindcss/colors";

export default function ServerlessRedis() {
  return (
    <ProductBox product={Product.REDIS} className="bg-red-200/5 md:col-span-2">
      <header>
        <svg
          className="mb-6"
          width={60}
          viewBox="0 0 360 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="360" height="360" rx="80" fill={colors.red["50"]} />
          <path
            d="M248.101 54.3602C251.818 47.1091 262.182 47.1091 265.899 54.3603L310.536 141.438C313.947 148.093 309.114 156 301.637 156H212.363C204.886 156 200.053 148.093 203.464 141.438L248.101 54.3602Z"
            fill={colors.red["800"]}
          />
          <circle cx="103.5" cy="103.5" r="54.5" fill={colors.red["800"]} />
          <rect
            x="53"
            y="206"
            width="100"
            height="101"
            rx="16"
            fill={colors.red["800"]}
          />
          <path
            d="M248.501 204.493C253.519 200.659 260.481 200.659 265.499 204.493L305.24 234.852C309.902 238.414 311.849 244.505 310.117 250.11L294.659 300.133C292.846 306 287.423 310 281.283 310H232.717C226.577 310 221.154 306 219.341 300.133L203.883 250.11C202.151 244.505 204.098 238.414 208.76 234.852L248.501 204.493Z"
            fill={colors.red["800"]}
          />
        </svg>

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

      <div className="mt-auto grid gap-4">
        <Button
          href="https://github.com/upstash/redis-examples"
          className="hover:bg-red-100 hover:text-red-950"
          type="button"
        >
          View examples
        </Button>
        <Button
          href="https://docs.upstash.com/redis"
          className="bg-red-50 text-red-950 hover:bg-red-100 hover:text-red-950"
          type="button"
        >
          Read the docs
        </Button>
      </div>
    </ProductBox>
  );
}
