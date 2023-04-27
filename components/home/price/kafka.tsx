import {
  PriceBadge,
  PriceBox,
  PriceDesc,
  PriceHr,
  PriceTitle,
  PriceValue,
} from "@/components/home/price/comp";
import Button from "@/components/button";

export default function PriceKafka() {
  return (
    <PriceBox>
      <PriceTitle>Kafka</PriceTitle>

      <div>
        <PriceBadge>Free</PriceBadge>
        <PriceValue className="mt-3">10K commands</PriceValue>
        <PriceDesc>per day</PriceDesc>
      </div>

      <PriceHr />

      <div>
        <PriceBadge type="payg">Pay as you go</PriceBadge>
        <PriceValue className="mt-3">$0.6</PriceValue>
        <PriceDesc>per 100K messages</PriceDesc>
      </div>

      <PriceHr />

      <Button
        className="opacity-40 hover:opacity-100"
        href="https://docs.upstash.com/kafka/pricing"
      >
        More information
      </Button>
    </PriceBox>
  );
}
