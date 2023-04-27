import { BorderBox, BorderBoxBody } from "@/components/home/border-box";
import {
  PriceBadge,
  PriceDesc,
  PriceHr,
  PriceTitle,
} from "@/components/home/price/comp";

export default function PriceQStash() {
  return (
    <BorderBox>
      <BorderBoxBody className="items-center">
        <PriceTitle>QStash</PriceTitle>

        <div>
          <PriceBadge>Pay as you go</PriceBadge>
          <PriceTitle className="mt-3">$1</PriceTitle>
          <PriceDesc>per 100K messages</PriceDesc>
        </div>

        <PriceHr />

        <div>
          <PriceBadge>Free</PriceBadge>
          <PriceTitle className="mt-3">500 messages</PriceTitle>
          <PriceDesc>per day</PriceDesc>
        </div>
      </BorderBoxBody>
    </BorderBox>
  );
}
