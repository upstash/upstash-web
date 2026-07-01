import type { ChatResponse } from "@/lib/architect/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UiMessage {
  id: string;
  role: "user" | "assistant";
  text?: string; // assistant status/error text or user message
  response?: ChatResponse; // present on a successful recommendation
}

interface ArchitectStore {
  sessionId: string;
  messages: UiMessage[];
  loading: boolean;
  send: (message: string) => Promise<void>;
  reset: () => void;
}

function newSessionId(): string {
  // Not security-sensitive; only used to bucket a conversation server-side.
  return (
    `s-${Math.abs(
      Array.from(`${Date.now()}-${performance.now()}`).reduce(
        (h, c) => (h * 31 + c.charCodeAt(0)) | 0,
        7,
      ),
    ).toString(36)}${Math.floor(performance.now()).toString(36)}`
  );
}

const uid = () => Math.random().toString(36).slice(2, 10);

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

export const useArchitect = create<ArchitectStore>()(
  persist(
    (set, get) => ({
      sessionId: newSessionId(),
      messages: [],
      loading: false,

      reset: () => set({ messages: [], sessionId: newSessionId() }),

      send: async (message) => {
        const trimmed = message.trim();
        if (!trimmed || get().loading) { return; }

        const userMsg: UiMessage = {
          id: uid(),
          role: "user",
          text: trimmed,
        };
        set((s) => ({ messages: [...s.messages, userMsg], loading: true }));

        try {
          const res = await fetch("/api/architect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: trimmed,
              sessionId: get().sessionId,
            }),
          });

          if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            // Prefer the server's authoritative message (e.g. the shared input gate),
            // falling back to a generic per-code message.
            const text =
              (typeof body?.message === "string" && body.message) ||
              ERROR_TEXT[body?.error as string] ||
              ERROR_TEXT.internal_error;
            set((s) => ({
              messages: [
                ...s.messages,
                { id: uid(), role: "assistant", text },
              ],
              loading: false,
            }));
            return;
          }

          const response = (await res.json()) as ChatResponse;
          set((s) => ({
            messages: [
              ...s.messages,
              { id: uid(), role: "assistant", response },
            ],
            loading: false,
          }));
        } catch {
          set((s) => ({
            messages: [
              ...s.messages,
              {
                id: uid(),
                role: "assistant",
                text: ERROR_TEXT.internal_error,
              },
            ],
            loading: false,
          }));
        }
      },
    }),
    {
      name: "upstash-architect",
      // Persist only the session id + history, not transient UI state.
      partialize: (s) =>
        ({ sessionId: s.sessionId, messages: s.messages }) as ArchitectStore,
    },
  ),
);
