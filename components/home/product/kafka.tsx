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

export default function ServerlessKafka() {
  return (
    <ProductBox product={Product.KAFKA} className="bg-blue-200/5 md:col-span-2">
      <header>
        <svg
          className="mb-6"
          width={60}
          viewBox="0 0 360 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="360" height="360" rx="80" fill={colors.blue["100"]} />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M114 161.489C114 157.684 116.707 154.468 120.311 153.251C141.061 146.242 156 126.615 156 103.5C156 74.5051 132.495 51 103.5 51C74.5051 51 51 74.5051 51 103.5C51 126.301 65.5353 145.707 85.8453 152.958C89.3733 154.217 92 157.4 92 161.146V198.854C92 202.6 89.3733 205.783 85.8454 207.042C65.5353 214.293 51 233.699 51 256.5C51 285.495 74.5051 309 103.5 309C126.301 309 145.707 294.465 152.958 274.155C154.217 270.627 157.4 268 161.146 268H198.854C202.6 268 205.783 270.627 207.042 274.155C214.293 294.465 233.699 309 256.5 309C285.495 309 309 285.495 309 256.5C309 227.505 285.495 204 256.5 204C233.385 204 213.758 218.939 206.749 239.689C205.532 243.293 202.316 246 198.511 246H161.489C157.684 246 154.469 243.294 153.251 239.69C152.533 237.565 151.684 235.502 150.711 233.509C149.053 230.11 149.427 225.953 152.101 223.278L223.278 152.101C225.953 149.427 230.11 149.053 233.509 150.711C240.453 154.099 248.254 156 256.5 156C285.495 156 309 132.495 309 103.5C309 74.5051 285.495 51 256.5 51C227.505 51 204 74.5051 204 103.5C204 111.666 205.864 119.397 209.191 126.29C210.829 129.683 210.447 133.82 207.783 136.484L136.484 207.783C133.82 210.447 129.683 210.829 126.29 209.191C124.36 208.259 122.363 207.442 120.31 206.749C116.706 205.531 114 202.316 114 198.511V161.489Z"
            fill={colors.blue["800"]}
          />
        </svg>

        <ProductTitle>Serverless Kafka with no barriers</ProductTitle>
      </header>

      <ProductFeature product={Product.KAFKA}>
        <ProductFeatureItem>
          Per message pricing with zero fixed cost.
        </ProductFeatureItem>
        <ProductFeatureItem>
          Managed Kafka Connectors with no cost.
        </ProductFeatureItem>
        <ProductFeatureItem>
          REST support in addition to Kafka API.
        </ProductFeatureItem>
      </ProductFeature>

      <div className="mt-auto grid gap-4">
        <Button
          href="https://github.com/upstash/kafka-examples"
          className="hover:bg-blue-100 hover:text-blue-950"
          type="button"
        >
          View examples
        </Button>
        <Button
          href="https://docs.upstash.com/kafka"
          className="bg-blue-50 text-blue-950 hover:bg-blue-100 hover:text-blue-950"
          type="button"
        >
          Read the docs
        </Button>
      </div>
    </ProductBox>
  );
}
