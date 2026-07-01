"use client";

import Container from "@/components/container";
import cx from "@/utils/cx";
import { IconArrowUp, IconSparkles } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import Blueprint from "./recommendation-card";
import { useArchitect } from "./use-architect";

const EXAMPLES = [
  "RAG chatbot, ~50k requests/day, semantic search over 2M docs, a daily cron, EU + US regions, need SOC-2.",
  "Rate limiter and cache for a Next.js app, ~1M requests/day, single region.",
  "Vector search over 10M embeddings with unlimited queries and 99.9% SLA.",
];

export default function ArchitectSection() {
  const { messages, loading, send, reset } = useArchitect();
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Avoid hydration mismatch from the persisted store.
  useEffect(() => setMounted(true), []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to newest result
  useEffect(() => {
    if (messages.length > 0)
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, loading]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input;
    setInput("");
    void send(text);
  };

  const hasConversation = mounted && messages.length > 0;

  return (
    <section className="relative z-0 py-10 md:py-16">
      <Container>
        {/* eyebrow */}
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-mute">
          <IconSparkles size={14} className="text-primary-text" />
          Upstash Architect
          <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-medium text-primary-text">
            AI
          </span>
        </div>

        <h2 className="font-display text-2xl font-bold text-text md:text-4xl">
          Describe your project. Get an Upstash blueprint.
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-text-mute md:text-lg">
          Products, plans, every limit, and a monthly cost estimate — generated
          from a plain-text description.
        </p>

        {/* input card with gradient glow */}
        <form
          onSubmit={submit}
          className="mx-auto mt-8 max-w-3xl"
          aria-label="Describe your project"
        >
          <div
            className={cx(
              "relative rounded-3xl p-[1.5px] transition",
              "bg-gradient-to-r from-primary-text/60 via-primary/60 to-amber-500/60",
              "focus-within:from-primary-text focus-within:via-primary focus-within:to-amber-500",
              "shadow-[0_8px_40px_-12px] shadow-primary/30",
            )}
          >
            <div className="flex items-end gap-2 rounded-[calc(1.5rem-1.5px)] bg-bg p-2.5">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) submit();
                }}
                rows={2}
                placeholder="e.g. RAG chatbot, 50k requests/day, semantic search over 2M docs, EU + US, SOC-2…"
                className={cx(
                  "flex-1 resize-none bg-transparent px-3 py-2 text-left text-sm text-text md:text-base",
                  "placeholder:text-text-mute focus:outline-none",
                )}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Generate blueprint"
                className={cx(
                  "grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-white transition",
                  "hover:bg-primary-text disabled:opacity-40",
                )}
              >
                <IconArrowUp size={20} />
              </button>
            </div>
          </div>

          {/* example chips */}
          {!hasConversation && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => void send(ex)}
                  disabled={loading}
                  className={cx(
                    "max-w-full truncate rounded-full border border-white/10 px-3 py-1.5 text-xs text-text-mute",
                    "transition hover:border-white/25 hover:bg-white/5 hover:text-text disabled:opacity-40",
                  )}
                  title={ex}
                >
                  {ex}
                </button>
              ))}
            </div>
          )}
        </form>

        {/* results */}
        {hasConversation && (
          <div
            ref={resultsRef}
            className="mx-auto mt-8 max-w-3xl space-y-6 scroll-mt-24"
          >
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm text-text-mute">
                    <IconSparkles size={14} className="text-primary-text" />
                    <span className="line-clamp-1 text-left">{m.text}</span>
                  </div>
                </div>
              ) : (
                <div
                  key={m.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 md:p-6"
                >
                  {m.response ? (
                    <Blueprint data={m.response} />
                  ) : (
                    <p className="text-left text-sm text-text-mute">{m.text}</p>
                  )}
                </div>
              ),
            )}

            {loading && <LoadingBlueprint />}

            {!loading && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full px-4 py-1.5 text-xs text-text-mute transition hover:bg-white/5 hover:text-text"
                >
                  Start over
                </button>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

function LoadingBlueprint() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
      <div className="mb-4 flex items-center gap-2 text-sm text-text-mute">
        <span className="inline-flex gap-1">
          <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" />
          <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]" />
          <span className="size-2 animate-bounce rounded-full bg-primary" />
        </span>
        Designing your blueprint…
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="h-36 animate-pulse rounded-2xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    </div>
  );
}
