import {
  PriceBadge,
  PriceBox,
  PriceDesc,
  PriceHr,
  PriceTitle,
  PriceValue,
} from "./comp";
import Button from "@/components/button";

export default function PriceRedis() {
  return (
    <PriceBox>
      <PriceTitle>Redis</PriceTitle>

      <PriceHr />

      <div>
        <PriceBadge>Free</PriceBadge>
        <PriceValue className="mt-3">10K commands</PriceValue>
        <PriceDesc>per day</PriceDesc>
      </div>

      <PriceHr />

      <div>
        <PriceBadge type="payg">Pay as you go</PriceBadge>
        <PriceValue className="mt-3">$0.4</PriceValue>
        <PriceDesc>per 100K commands</PriceDesc>
      </div>

      {/*<PriceHr />*/}

      {/*<Button
        className="text-sm opacity-40 hover:opacity-100"
        href="https://docs.upstash.com/redis/overall/pricing"
      >
        More information
      </Button>*/}
    </PriceBox>
  );
}
