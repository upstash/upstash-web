"use client";

import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";

/**
 * Best-effort tracking of text selections on pricing pages.
 * Fires `pricing_text_select` after the user finishes selecting.
 */
export default function TextSelectTracker({ product }: { product: string }) {
  useEffect(() => {
    let timer: number | undefined;

    const onMouseUp = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        try {
          const selection = window.getSelection();
          const text = selection?.toString().trim() ?? "";
          if (text.length < 3) {
            return;
          }

          const anchorNode = selection?.anchorNode;
          const anchorElement =
            anchorNode instanceof Element
              ? anchorNode
              : (anchorNode?.parentElement ?? null);

          const plan = anchorElement
            ?.closest("[data-plan]")
            ?.getAttribute("data-plan");

          const rowText = anchorElement
            ?.closest("tr")
            ?.querySelector("th, td")
            ?.textContent?.trim();

          trackEvent("pricing_text_select", {
            product,
            ...(plan ? { plan } : {}),
            ...(rowText ? { row: rowText.slice(0, 60) } : {}),
            selection: text.slice(0, 80),
          });
        } catch {
          // best-effort only
        }
      }, 500);
    };

    document.addEventListener("mouseup", onMouseUp);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [product]);

  return null;
}
