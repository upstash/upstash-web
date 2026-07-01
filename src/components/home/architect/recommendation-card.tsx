import type {
  ChatResponse,
  ProductRecommendation,
} from "@/lib/architect/types";
import cx from "@/utils/cx";

function cost(n: number | null): string {
  if (n == null) { return "Custom"; }
  if (n === 0) { return "Free"; }
  return `$${n % 1 === 0 ? n : n.toFixed(2)}/mo`;
}

function ProductRow({ p }: { p: ProductRecommendation }) {
  const chosen = p.allPlans.find((pl) => pl.plan === p.chosenPlan);
  const driverLimits = chosen?.limits ?? {};

  return (
    <div className="rounded-xl bg-white/5 p-3 text-left">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-semibold text-primary-text">{p.product}</span>
        <span className="text-sm font-medium text-text">
          {p.chosenPlan}
          {chosen ? ` · ${cost(chosen.monthlyCost)}` : ""}
        </span>
      </div>

      <p className="mt-1 text-xs text-text-mute">{p.reason}</p>

      {Object.keys(driverLimits).length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1">
          {Object.entries(driverLimits).map(([k, v]) => (
            <li
              key={k}
              className="rounded bg-white/5 px-1.5 py-0.5 text-[11px] text-text-mute"
            >
              {k}: {v}
            </li>
          ))}
        </ul>
      )}

      {(p.payAsYouGo || p.cheapestFixed) && (
        <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded bg-white/5 px-2 py-1">
            <div className="text-text-mute">Pay-as-you-go</div>
            <div className="font-medium text-text">
              {p.payAsYouGo ? cost(p.payAsYouGo.monthlyCost) : "—"}
            </div>
          </div>
          <div className="rounded bg-white/5 px-2 py-1">
            <div className="text-text-mute">Cheapest Fixed</div>
            <div className="font-medium text-text">
              {p.cheapestFixed ? cost(p.cheapestFixed.monthlyCost) : "—"}
            </div>
          </div>
        </div>
      )}

      {p.crossoverNote && (
        <p className="mt-1.5 text-[11px] text-text-mute">{p.crossoverNote}</p>
      )}
    </div>
  );
}

export default function RecommendationCard({ data }: { data: ChatResponse }) {
  const { recommendation: rec, citations } = data;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-text-mute">
        <span>Recommended stack</span>
        <span className="font-medium text-primary-text">
          from {cost(rec.totalMonthlyLow)}
        </span>
      </div>

      {rec.products.map((p) => (
        <ProductRow key={p.product} p={p} />
      ))}

      {rec.assumptions.length > 0 && (
        <details className="text-[11px] text-text-mute">
          <summary className="cursor-pointer">Assumptions</summary>
          <ul className="mt-1 list-disc pl-4">
            {rec.assumptions.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </details>
      )}

      {citations.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {citations.map((c) => (
            <a
              key={c.url}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className={cx(
                "rounded-full bg-emerald-800/20 px-2 py-0.5 text-[11px]",
                "text-primary-text hover:bg-emerald-700/30",
              )}
            >
              {c.title} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
