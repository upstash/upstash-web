import {
  PriceBadge,
  PriceBox,
  PriceDesc,
  PriceHr,
  PriceTitle,
  PriceValue,
} from "@/components/home/price/comp";
import Button from "@/components/button";

export default function PriceQStash() {
  return (
    <PriceBox>
      <PriceTitle>QStash</PriceTitle>

      <PriceHr />

      <div>
        <PriceBadge>Free</PriceBadge>
        <PriceValue className="mt-3">500 messages</PriceValue>
        <PriceDesc>per day</PriceDesc>
      </div>

      <PriceHr />

      <div>
        <PriceBadge type="payg">Pay as you go</PriceBadge>
        <PriceValue className="mt-3">$1</PriceValue>
        <PriceDesc>per 100K messages</PriceDesc>
      </div>

      {/*<PriceHr />*/}

      {/*<Button
        className="text-sm opacity-40 hover:opacity-100"
        href="https://docs.upstash.com/qstash/pricing"
      >
        More information
      </Button>*/}
    </PriceBox>
  );
}
