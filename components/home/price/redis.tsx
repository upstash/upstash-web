import { BorderBox, BorderBoxBody } from "@/components/home/border-box";
import { PriceBadge, PriceDesc, PriceHr, PriceTitle } from "./comp";

export default function PriceRedis() {
  return (
    <BorderBox>
      <BorderBoxBody className="items-center">
        <PriceTitle>Redis</PriceTitle>

        <div>
          <PriceBadge>Pay as you go</PriceBadge>
          <PriceTitle className="mt-3">$0.4</PriceTitle>
          <PriceDesc>per 100K commands</PriceDesc>
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
