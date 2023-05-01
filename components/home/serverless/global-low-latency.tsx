import { ServerlessBox, ServerlessSummary, ServerlessTitle } from "./comp";
import cx from "@/utils/cx";

export default function GlobalLowLatency() {
  return (
    <ServerlessBox className="md:col-span-3">
      <header>
        <ServerlessTitle link="https://docs.upstash.com/redis/features/globaldatabase">
          Global low latency
        </ServerlessTitle>
        <ServerlessSummary>
          The data is replicated across multiple regions, allowing you to select
          the regions that provide the best latency for your users.
        </ServerlessSummary>
      </header>

      {/* body */}
      <div className="flex justify-between gap-1">
        {[...Array(30).keys()].map((i) => (
          <div
            key={i}
            className={cx(
              "flex h-10 w-[8px] items-end rounded-full bg-black/20 md:h-16",
              i > 15 && "hidden md:flex"
            )}
          >
            <span className={cx("h-4 w-full rounded-full bg-emerald-400")} />
          </div>
        ))}
      </div>
    </ServerlessBox>
  );
}
