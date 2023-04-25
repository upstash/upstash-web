import {
  BorderBox,
  BorderBoxBody,
  BorderBoxBodySummary,
  BorderBoxBodyTitle,
} from "@/components/border-box";

export default function PriceScaleToZero() {
  return (
    <BorderBox className="col-span-3">
      <BorderBoxBody>
        <header>
          <BorderBoxBodyTitle className="">
            Price scale to zero
          </BorderBoxBodyTitle>
          <BorderBoxBodySummary>
            Start free, then pay only for what you use with per-request pricing.
            You'll never pay more than the cap price, guaranteed.
          </BorderBoxBodySummary>
        </header>

        {/* body */}
        <div>deneme</div>
      </BorderBoxBody>
    </BorderBox>
  );
}
