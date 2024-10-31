"use client";

import IconRedis from "@/components/icon-redis";
import { useSegment } from "@/hooks/use-segment";
import React from "react";
import {
  PriceBadge,
  PriceBox,
  PriceButton,
  PriceDesc,
  PriceHr,
  PriceTitle,
  PriceValue,
} from "./comp";

export default function PriceRedis() {
  const segment = useSegment();

  return (
    <PriceBox>
      <header>
        <IconRedis className="mb-4 inline-flex" />
        <PriceTitle>Redis</PriceTitle>
      </header>

      <PriceHr />

      <div>
        <PriceBadge>Free</PriceBadge>
        <PriceValue className="mt-3">10K Commands</PriceValue>
        <PriceDesc>per day</PriceDesc>
      </div>

      <PriceHr />

      <div>
        <PriceBadge type="payg">Pay as you go</PriceBadge>
        <PriceValue className="mt-3">$0.2</PriceValue>
        <PriceDesc>per 100K commands</PriceDesc>
      </div>

      <PriceHr />

      <div>
        <PriceBadge type="pro">Pro</PriceBadge>
        <PriceDesc className="mt-3">Starts from</PriceDesc>
        <PriceValue>$280</PriceValue>
        <PriceDesc>Unlimited</PriceDesc>
      </div>

      <PriceHr />

      <PriceButton
        href="/pricing"
        onClick={() => segment.track("button.pricing.redis")}
      >
        More information
      </PriceButton>
    </PriceBox>
  );
}
