"use client"
import {
  PriceBadge,
  PriceBox,
  PriceButton,
  PriceDesc,
  PriceHr,
  PriceTitle,
  PriceValue,
} from "@/components/home/price/comp";
import IconKafka from "@/components/icon-kafka";
import { useSegment } from "@/hooks/use-segment";

export default function PriceKafka() {
  const {track} = useSegment()

  return (
    <PriceBox>
      <header>
        <IconKafka className="inline-flex mb-4" />
        <PriceTitle>Kafka</PriceTitle>
      </header>

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

      <div>
        <PriceBadge type="pro">Pro</PriceBadge>
        <PriceDesc className="mt-3">Starts from</PriceDesc>
        <PriceValue>$320</PriceValue>
        <PriceDesc>Unlimited</PriceDesc>
      </div>

      <PriceHr />

      <PriceButton href="https://docs.upstash.com/kafka/pricing" onClick={()=>track("button.pricing.kafka")}>
        More information
      </PriceButton>
    </PriceBox>
  );
}
