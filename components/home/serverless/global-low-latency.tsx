import {
  BorderBox,
  BorderBoxBody,
  BorderBoxBodySummary,
  BorderBoxBodyTitle,
} from "@/components/border-box";
import cx from "@/utils/cx";

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
        <div className="mt-8 flex justify-between gap-1">
          {[...Array(24).keys()].map((i) => (
            <div
              key={i}
              className="flex h-16 w-[10px] items-end rounded-full bg-zinc-950"
            >
              <span className={cx("h-4 w-full rounded-full bg-emerald-500")} />
            </div>
          ))}
        </div>
      </BorderBoxBody>
    </BorderBox>
  );
}
