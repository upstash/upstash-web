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
  if (n == null) { return "Custom"; }
  if (n === 0) { return "Free"; }
  return `$${n % 1 === 0 ? n : n.toFixed(2)}`;
}

function ProductCard({ p }: { p: ProductRecommendation }) {
  const Icon = PRODUCT_ICON[p.product];
  const chosen = p.allPlans.find((pl) => pl.plan === p.chosenPlan);
  const limits = Object.entries(chosen?.limits ?? {}).slice(0, 4);
  const c = chosen?.monthlyCost ?? null;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left">
      {/* header: icon · product/plan · price */}
      <div className="flex items-center gap-2.5">
        {Icon && <Icon width={24} className="shrink-0 rounded-md" />}
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-text">
            {p.product}
            <span className="ml-1.5 font-normal text-text-mute">
              {p.chosenPlan}
            </span>
          </div>
        </div>
        <div className="shrink-0 font-display text-base font-bold text-primary-text">
          {cost(c)}
          {c ? <span className="text-[10px] text-text-mute">/mo</span> : null}
        </div>
      </div>

      {/* reason + expandable "why" */}
      <p className="mt-1.5 text-[11px] leading-snug text-text-mute">{p.reason}</p>
      {p.reasoning && p.reasoning.length > 0 && (
        <details className="mt-1 text-[11px] text-text-mute">
          <summary className="cursor-pointer select-none text-primary-text/80 hover:text-primary-text">
            Why?
          </summary>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 leading-snug">
            {p.reasoning.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </details>
      )}

      {/* limits — tight inline chips */}
      {limits.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {limits.map(([k, v]) => (
            <span
              key={k}
              className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-text-mute"
            >
              <span className="text-text">{k}</span> {v}
            </span>
          ))}
        </div>
      )}

      {/* PAYG vs Fixed — one line */}
      {(p.payAsYouGo || p.cheapestFixed) && (
        <div className="mt-2 flex items-center gap-3 border-t border-white/5 pt-2 text-[11px] text-text-mute">
          <span>
            PAYG{" "}
            <span className="font-medium text-text">
              {p.payAsYouGo ? `${cost(p.payAsYouGo.monthlyCost)}/mo` : "—"}
            </span>
          </span>
          <span>
            Fixed{" "}
            <span className="font-medium text-text">
              {p.cheapestFixed ? `${cost(p.cheapestFixed.monthlyCost)}/mo` : "—"}
            </span>
          </span>
        </div>
      )}

      {p.crossoverNote && (
        <p className="mt-1 text-[10px] leading-snug text-text-mute/80">
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
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-2">
        <h3 className="text-sm font-semibold text-text">
          Your Upstash blueprint
          <span className="ml-1.5 font-normal text-text-mute">
            {rec.products.length} product{rec.products.length > 1 ? "s" : ""}
          </span>
        </h3>
        <div className="text-xs text-text-mute">
          {!rec.hasCustom && rec.totalMonthlyLow > 0 && "from "}
          <span className="font-display text-sm font-bold text-primary-text">
            {rec.hasCustom
              ? rec.totalMonthlyLow === 0
                ? "Custom"
                : `$${rec.totalMonthlyLow}/mo + custom`
              : rec.totalMonthlyLow === 0
                ? "Free"
                : `$${rec.totalMonthlyLow}/mo`}
          </span>
        </div>
      </div>

      {/* what we understood from the description */}
      {rec.understood && (
        <p className="mb-3 rounded-lg bg-white/[0.03] px-3 py-2 text-[11px] text-text-mute">
          <span className="text-text">Understood:</span> {rec.understood}
        </p>
      )}

      {/* one product per row */}
      <div className="flex flex-col gap-2">
        {rec.products.map((p) => (
          <ProductCard key={p.product} p={p} />
        ))}
      </div>

      {/* footer */}
      {(citations.length > 0 || rec.assumptions.length > 0) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {citations.map((cit) => (
            <a
              key={cit.url}
              href={cit.url}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-primary-text underline-offset-2 hover:underline"
            >
              {cit.title} ↗
            </a>
          ))}
          {rec.assumptions.length > 0 && (
            <details className="ml-auto text-[10px] text-text-mute">
              <summary className="cursor-pointer select-none hover:text-text">
                Assumptions
              </summary>
              <ul className="mt-1 list-disc pl-4">
                {rec.assumptions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
