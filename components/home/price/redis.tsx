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
  return (
    <PriceBox>
      <PriceTitle>Redis</PriceTitle>

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

      <PriceButton href="https://docs.upstash.com/redis/overall/pricing">
        More information
      </PriceButton>
    </PriceBox>
  );
}
