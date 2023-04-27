import {
  BorderBox,
  BorderBoxSummary,
  BorderBoxTitle,
} from "@/components/home/border-box";
import cx from "@/utils/cx";

export default function GlobalLowLatency() {
  return (
    <BorderBox className="col-span-3">
      <header>
        <BorderBoxTitle link="https://docs.upstash.com/redis/features/globaldatabase">
          Global low latency
        </BorderBoxTitle>
        <BorderBoxSummary>
          The data is replicated across multiple regions, allowing you to select
          the regions that provide the best latency for your users.
        </BorderBoxSummary>
      </header>

      {/* body */}
      <div className="flex justify-between gap-1">
        {[...Array(30).keys()].map((i) => (
          <div
            key={i}
            className="flex h-16 w-[8px] items-end rounded-full bg-black/20"
          >
            <span className={cx("h-4 w-full rounded-full bg-emerald-400")} />
          </div>
        ))}
      </div>
    </BorderBox>
  );
}
