import {
  PriceBadge,
  PriceBox,
  PriceDesc,
  PriceHr,
  PriceTitle,
  PriceValue,
  PriceButton,
} from "@/components/home/price/comp";

export default function PriceKafka() {
  return (
    <PriceBox>
      <PriceTitle>Kafka</PriceTitle>

      <PriceHr />

      <div>
        <PriceBadge>Free</PriceBadge>
        <PriceValue className="mt-3">10K messages</PriceValue>
        <PriceDesc>per day</PriceDesc>
      </div>

      <PriceHr />

      <div>
        <PriceBadge type="payg">Pay as you go</PriceBadge>
        <PriceValue className="mt-3">$0.6</PriceValue>
        <PriceDesc>per 100K messages</PriceDesc>
      </div>

      <PriceHr />

      <PriceButton href="https://docs.upstash.com/kafka/pricing">
        More information
      </PriceButton>
    </PriceBox>
  );
}
