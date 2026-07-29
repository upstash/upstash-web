import { oncePerPageview, trackEvent } from "@/lib/analytics";
import { useRef } from "react";

const MIN_DWELL_MS = 1000;

/**
 * Fires `pricing_plan_hover` when the pointer dwells on a plan card for at
 * least one second, at most once per plan per pageview.
 */
export function useTrackHover({
  product,
  plan,
}: {
  product: string;
  plan: string;
}) {
  const enteredAtRef = useRef<number | null>(null);

  return {
    onPointerEnter: () => {
      enteredAtRef.current = Date.now();
    },
    onPointerLeave: () => {
      if (enteredAtRef.current === null) {
        return;
      }
      const ms = Date.now() - enteredAtRef.current;
      enteredAtRef.current = null;
      if (ms < MIN_DWELL_MS) {
        return;
      }
      if (!oncePerPageview(`pricing_plan_hover:${product}:${plan}`)) {
        return;
      }
      trackEvent("pricing_plan_hover", { product, plan, ms: Math.round(ms) });
    },
  };
}
