import {
  BorderBox,
  BorderBoxBody,
  BorderBoxBodySummary,
  BorderBoxBodyTitle,
} from "@/components/border-box";

export default function GlobalLowLatency() {
  return (
    <BorderBox className="col-span-3">
      <BorderBoxBody>
        <header>
          <BorderBoxBodyTitle className="">
            Global low latency
          </BorderBoxBodyTitle>
          <BorderBoxBodySummary>
            The data is replicated across multiple regions, allowing you to
            select the regions that provide the best latency for your users.
          </BorderBoxBodySummary>
        </header>

        {/* body */}
        <div>deneme</div>
      </BorderBoxBody>
    </BorderBox>
  );
}
