"use client";

import Container from "@/components/container";
import cx from "@/utils/cx";
import {
  IconArrowUp,
  IconChevronDown,
  IconPlus,
  IconSparkles,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Blueprint from "./recommendation-card";
import { type UiResult, useArchitect } from "./use-architect";

// Real use cases drawn from the Upstash blog — each is a concrete, priceable workload.
const EXAMPLES = [
  "AI chatbot for a Next.js app, ~30k messages/day, chat history stored in Redis.",
  "RAG assistant over 100k support docs with semantic search and a daily re-index cron.",
  "Agent memory store in Redis for a coding agent, ~200k reads/day, low latency.",
  "Edge rate limiting for a public API on Cloudflare Workers, 2M requests/day, sliding window.",
  "Semantic cache for LLM responses to cut costs, ~100k queries/day.",
  "Cache Prisma query results in Redis for a SaaS app, ~1M requests/day.",
  "Session store for Auth.js in a Next.js app, 200k sessions, EU + US regions.",
  "Virtual waiting room for a ticket drop, spikes to 100k concurrent users.",
  "Realtime game leaderboard in Redis, ~20k score updates per minute.",
  "Blog with page-view counters and comments in Redis, ~1M views/month.",
  "Vector search over 2M image embeddings at 1536 dims for similarity search.",
  "Schedule and deliver reminder emails with QStash, ~10k messages/day.",
  "Background job to summarize new articles via QStash, ~2k jobs/day.",
  "Rate limit outbound emails per user, ~500k messages/month.",
  "Article recommendation engine using vector similarity over 500k articles.",
  "Feature flags served from Redis at the edge, ~5M reads/day.",
  "Distributed lock for a serverless job runner, ~50k lock ops/day.",
  "Index and vector-search 6M Wikipedia articles with unlimited queries.",
  "Full-text + semantic product search over 1M docs, ~40k queries/day.",
  "Durable incident-response workflow with retries, ~5k runs/day.",
  "Trending Hacker News search over 1M posts, refreshed by an hourly cron.",
  "AI companion app storing conversation memory for 50k daily active users.",
  "API key storage and authentication for a public API, ~300k requests/day.",
  "Run AI data-analysis tasks in isolated sandboxes, ~1k jobs/day.",
];

const strip = (s?: string) => (s ? s.replace(/\s+/g, " ").trim() : "");

export default function ArchitectSection() {
  const { current, loading, send, reset } = useArchitect();
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const hasResult = mounted && current !== null;

  const submit = () => {
    const text = strip(input);
    if (!text) { return; }
    setInput("");
    setOpen(true);
    void send(text);
  };

  const runExample = (ex: string) => {
    setOpen(true);
    void send(ex);
  };

  const newRequest = () => {
    reset();
    setInput("");
  };

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

        {/* The input always keeps the same look, so closing the result returns here. */}
        <div className="mx-auto mt-8 max-w-3xl">
          <PromptInput
            value={input}
            onChange={setInput}
            onSubmit={submit}
            loading={loading}
            placeholder="e.g. RAG chatbot, 50k requests/day, semantic search over 2M docs, EU + US, SOC-2…"
          />

          {hasResult ? (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className={cx(
                  "inline-flex min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-text-mute",
                  "transition hover:border-white/25 hover:bg-white/5 hover:text-text",
                )}
                title={strip(current?.query)}
              >
                <IconSparkles size={14} className="shrink-0 text-primary-text" />
                <span className="max-w-[52vw] truncate sm:max-w-xs">
                  {loading
                    ? "Designing your blueprint…"
                    : `View result: ${strip(current?.query)}`}
                </span>
              </button>
              <button
                type="button"
                onClick={newRequest}
                className={cx(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/40 px-3 py-1.5 text-xs font-medium text-primary-text",
                  "transition hover:bg-primary/10",
                )}
              >
                <IconPlus size={14} /> New request
              </button>
            </div>
          ) : (
            <ExampleCloud loading={loading} onPick={runExample} />
          )}
        </div>
      </Container>

      {mounted &&
        open &&
        createPortal(
          <ArchitectModal
            current={current}
            loading={loading}
            input={input}
            setInput={setInput}
            onSubmit={submit}
            onClose={() => setOpen(false)}
            onNew={newRequest}
          />,
          document.body,
        )}
    </section>
  );
}

/* ─────────────────────────────── modal ─────────────────────────────── */

function ArchitectModal({
  current,
  loading,
  input,
  setInput,
  onSubmit,
  onClose,
  onNew,
}: {
  current: UiResult | null;
  loading: boolean;
  input: string;
  setInput: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  onNew: () => void;
}) {
  // Lock page scroll + close on Escape while the modal is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-6"
      // biome-ignore lint/a11y/useSemanticElements: custom full-screen overlay; native <dialog> not suitable
      role="dialog"
      aria-modal="true"
      aria-label="Upstash Architect"
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* panel */}
      <div
        className={cx(
          "relative flex h-full w-full flex-col overflow-hidden bg-bg text-left",
          "sm:h-[90vh] sm:max-w-4xl sm:rounded-3xl sm:border sm:border-white/10 sm:shadow-2xl",
        )}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <IconSparkles size={20} className="text-primary-text" />
            <div>
              <div className="font-display font-semibold text-text">
                Upstash Architect
              </div>
              <div className="text-xs text-text-mute">
                Products, plans & cost from a description
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onNew}
              className={cx(
                "inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-3 py-1.5 text-xs font-medium text-primary-text",
                "transition hover:bg-primary/10",
              )}
            >
              <IconPlus size={14} /> New request
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="rounded-lg p-2 text-text-mute transition hover:bg-white/5 hover:text-text"
            >
              <IconX size={20} />
            </button>
          </div>
        </div>

        {/* result */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <div className="mx-auto max-w-3xl space-y-4">
            {current?.query && (
              <div className="flex justify-center">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm text-text-mute">
                  <IconSparkles size={14} className="shrink-0 text-primary-text" />
                  <span className="truncate">{current.query}</span>
                </div>
              </div>
            )}

            {loading ? (
              <LoadingBlueprint />
            ) : current?.response ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <Blueprint data={current.response} />
              </div>
            ) : current?.error ? (
              <p className="text-center text-sm text-text-mute">
                {current.error}
              </p>
            ) : (
              <p className="text-center text-sm text-text-mute">
                Describe what you're building to get a blueprint.
              </p>
            )}
          </div>
        </div>

        {/* input — runs a fresh one-shot request */}
        <div className="border-t border-white/10 px-4 py-4 md:px-8">
          <div className="mx-auto max-w-3xl">
            <PromptInput
              value={input}
              onChange={setInput}
              onSubmit={onSubmit}
              loading={loading}
              autoFocus
              placeholder="Describe another project…"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── examples ─────────────────────────────── */

function ExampleCloud({
  loading,
  onPick,
}: {
  loading: boolean;
  onPick: (ex: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(false);

  const onScroll = () => {
    const el = ref.current;
    if (!el) { return; }
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 8);
  };

  return (
    <div className="mt-5">
      <p className="mb-2 text-xs text-text-mute">
        Or start from a real use case —{" "}
        <span className="text-text">{EXAMPLES.length} examples</span> from our
        blog
      </p>

      <div className="relative">
        <div
          ref={ref}
          onScroll={onScroll}
          className="max-h-36 overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.02] p-3"
        >
          <div className="flex flex-wrap justify-center gap-2 pb-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => onPick(ex)}
                disabled={loading}
                title={ex}
                className={cx(
                  "max-w-xs truncate rounded-full border border-white/10 px-3 py-1.5 text-xs text-text-mute",
                  "transition hover:border-white/25 hover:bg-white/5 hover:text-text disabled:opacity-40",
                )}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Fade + hint make it obvious there's more to scroll; hidden at the bottom. */}
        {!atBottom && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 rounded-b-2xl bg-gradient-to-t from-bg to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-1.5 flex items-center justify-center gap-1 text-[10px] text-text-mute">
              <IconChevronDown size={12} className="animate-bounce" /> scroll for
              more
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────── shared bits ─────────────────────────────── */

function PromptInput({
  value,
  onChange,
  onSubmit,
  loading,
  placeholder,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
  placeholder: string;
  autoFocus?: boolean;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
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
            // biome-ignore lint/a11y/noAutofocus: intentional focus when the modal opens
            autoFocus={autoFocus}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
            rows={2}
            placeholder={placeholder}
            className={cx(
              "flex-1 resize-none bg-transparent px-3 py-2 text-left text-sm text-text md:text-base",
              "placeholder:text-text-mute focus:outline-none",
            )}
          />
          <button
            type="submit"
            disabled={loading || !value.trim()}
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
    </form>
  );
}

function LoadingBlueprint() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
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
