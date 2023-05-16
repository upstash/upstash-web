import {
  PriceBadge,
  PriceBox,
  PriceDesc,
  PriceHr,
  PriceTitle,
  PriceValue,
  PriceButton,
} from "@/components/home/price/comp";

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

      <PriceHr />

      <div>
        <PriceBadge type="pro">Pro</PriceBadge>
        <PriceDesc className="mt-3">Max Messages per Day</PriceDesc>
        <PriceValue>$180</PriceValue>
        <PriceDesc>Up to 100M</PriceDesc>
      </div>

      <PriceHr />

      <PriceButton href="https://docs.upstash.com/qstash/pricing">
        More information
      </PriceButton>
    </PriceBox>
  );
}
