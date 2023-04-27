import { BorderBox, BorderBoxBody } from "@/components/home/border-box";
import {
  PriceBadge,
  PriceDesc,
  PriceHr,
  PriceTitle,
} from "@/components/home/price/comp";

export default function PriceKafka() {
  return (
    <BorderBox>
      <BorderBoxBody className="items-center">
        <PriceTitle>Kafka</PriceTitle>

        <div>
          <PriceBadge>Pay as you go</PriceBadge>
          <PriceTitle className="mt-3">$0.6</PriceTitle>
          <PriceDesc>per 100K messages</PriceDesc>
        </div>

        <PriceHr />

        <div>
          <PriceBadge>Free</PriceBadge>
          <PriceTitle className="mt-3">10K commands</PriceTitle>
          <PriceDesc>per day</PriceDesc>
        </div>
      </BorderBoxBody>
    </BorderBox>
  );
}
