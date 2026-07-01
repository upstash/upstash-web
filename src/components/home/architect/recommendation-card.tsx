import IconQStash from "@/components/icon-qstash";
import IconRedis from "@/components/icon-redis";
import IconSearch from "@/components/icon-search";
import IconVector from "@/components/icon-vector";
import IconWorkflow from "@/components/icon-workflow";
import type {
  ChatResponse,
  ProductRecommendation,
} from "@/lib/architect/types";
import cx from "@/utils/cx";
import type { SVGProps } from "react";

const PRODUCT_ICON: Record<
  string,
  (props: SVGProps<SVGSVGElement>) => JSX.Element
> = {
  Redis: IconRedis,
  Vector: IconVector,
  QStash: IconQStash,
  Search: IconSearch,
  Workflow: IconWorkflow,
};

function cost(n: number | null): string {
  if (n == null) return "Custom";
  if (n === 0) return "Free";
  return `$${n % 1 === 0 ? n : n.toFixed(2)}`;
}

function ProductCard({ p }: { p: ProductRecommendation }) {
  const Icon = PRODUCT_ICON[p.product];
  const chosen = p.allPlans.find((pl) => pl.plan === p.chosenPlan);
  const limits = Object.entries(chosen?.limits ?? {}).slice(0, 4);

  return (
    <div
      className={cx(
        "group relative flex flex-col rounded-2xl p-5 text-left",
        "border border-white/10 bg-white/[0.02]",
        "transition hover:border-white/20 hover:bg-white/[0.04]",
      )}
    >
      {/* header */}
      <div className="flex items-center gap-3">
        {Icon && <Icon width={32} className="shrink-0 rounded-lg" />}
        <div className="min-w-0">
          <div className="font-semibold text-text">{p.product}</div>
          <div className="text-xs text-text-mute">{p.chosenPlan}</div>
        </div>
        <div className="ml-auto text-right">
          <div className="font-display text-2xl font-bold leading-none text-primary-text">
            {cost(chosen?.monthlyCost ?? null)}
          </div>
          {chosen?.monthlyCost ? (
            <div className="text-[10px] uppercase tracking-wide text-text-mute">
              /mo
            </div>
          ) : null}
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-text-mute">{p.reason}</p>

      {/* limits */}
      {limits.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {limits.map(([k, v]) => (
            <li
              key={k}
              className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-text-mute"
            >
              <span className="text-text">{k}</span> {v}
            </li>
          ))}
        </ul>
      )}

      {/* PAYG vs Fixed */}
      {(p.payAsYouGo || p.cheapestFixed) && (
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-text-mute">
              Pay-as-you-go
            </div>
            <div className="text-sm font-medium text-text">
              {p.payAsYouGo ? `${cost(p.payAsYouGo.monthlyCost)}/mo` : "—"}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wide text-text-mute">
              Cheapest Fixed
            </div>
            <div className="text-sm font-medium text-text">
              {p.cheapestFixed ? `${cost(p.cheapestFixed.monthlyCost)}/mo` : "—"}
            </div>
          </div>
        </div>
      )}

      {p.crossoverNote && (
        <p className="mt-2 text-[11px] leading-snug text-text-mute/80">
          {p.crossoverNote}
        </p>
      )}
    </div>
  );
}

export default function Blueprint({ data }: { data: ChatResponse }) {
  const { recommendation: rec, citations } = data;

  return (
    <div className="text-left">
      {/* total banner */}
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-lg font-semibold text-text">
          Your Upstash blueprint
          <span className="ml-2 text-sm font-normal text-text-mute">
            {rec.products.length} product{rec.products.length > 1 ? "s" : ""}
          </span>
        </h3>
        <div className="text-right">
          <span className="text-xs text-text-mute">Estimated from </span>
          <span className="font-display text-xl font-bold text-primary-text">
            {rec.totalMonthlyLow === 0
              ? "Free"
              : `$${rec.totalMonthlyLow}/mo`}
          </span>
        </div>
      </div>

      {/* product grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {rec.products.map((p) => (
          <ProductCard key={p.product} p={p} />
        ))}
      </div>

      {/* footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {citations.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {citations.map((c) => (
              <a
                key={c.url}
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className={cx(
                  "rounded-full border border-white/10 px-3 py-1 text-xs",
                  "text-primary-text transition hover:border-white/25 hover:bg-white/5",
                )}
              >
                {c.title} ↗
              </a>
            ))}
          </div>
        )}

        {rec.assumptions.length > 0 && (
          <details className="ml-auto text-[11px] text-text-mute">
            <summary className="cursor-pointer select-none hover:text-text">
              Assumptions
            </summary>
            <ul className="mt-1 list-disc pl-4 text-left">
              {rec.assumptions.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </div>
  );
}
