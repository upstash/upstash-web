import type { ChatResponse } from "@/lib/architect/types";
import { create } from "zustand";

/** A single one-shot request: the query plus its result (or error). No conversation. */
export interface UiResult {
  query: string;
  response?: ChatResponse; // present on success
  error?: string; // present on failure
}

interface ArchitectStore {
  current: UiResult | null;
  loading: boolean;
  send: (message: string) => Promise<void>;
  reset: () => void;
}

const ERROR_TEXT: Record<string, string> = {
  rate_limited: "You're going a bit fast — please wait a minute and try again.",
  unclear_request:
    "I couldn't turn that into a workload spec. Try describing traffic, data size, regions, and any compliance needs.",
  llm_unavailable:
    "The advisor isn't available right now. Please try again later.",
  bad_request: "Please enter a short description of what you're building.",
  generation_failed:
    "The advisor couldn't finish that one. Please try rephrasing or send it again.",
  internal_error: "Something went wrong. Please try again.",
};

export const useArchitect = create<ArchitectStore>((set, get) => ({
  current: null,
  loading: false,

  reset: () => set({ current: null }),

  send: async (message) => {
    const trimmed = message.trim();
    if (!trimmed || get().loading) {
      return;
    }

    // Each request stands alone — replace whatever was there before.
    set({ current: { query: trimmed }, loading: true });

    try {
      const res = await fetch("/api/architect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        // Prefer the server's authoritative message (e.g. the shared input gate).
        const text =
          (typeof body?.message === "string" && body.message) ||
          ERROR_TEXT[body?.error as string] ||
          ERROR_TEXT.internal_error;
        set({ current: { query: trimmed, error: text }, loading: false });
        return;
      }

      const response = (await res.json()) as ChatResponse;
      set({ current: { query: trimmed, response }, loading: false });
    } catch {
      set({
        current: { query: trimmed, error: ERROR_TEXT.internal_error },
        loading: false,
      });
    }
  },
}));
