"use client";

import Container from "@/components/container";
import IconQStash from "@/components/icon-qstash";
import IconRedis from "@/components/icon-redis";
import IconSearch from "@/components/icon-search";
import IconVector from "@/components/icon-vector";
import IconWorkflow from "@/components/icon-workflow";
import cx from "@/utils/cx";
import {
  IconArrowUp,
  IconArrowUpRight,
  IconChevronDown,
  IconPlus,
  IconSparkles,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import type { SVGProps } from "react";
import { createPortal } from "react-dom";
import Blueprint from "./recommendation-card";
import { type UiResult, useArchitect } from "./use-architect";

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

const BLOG = "https://upstash.com/blog/";

interface Example {
  text: string;
  product: keyof typeof PRODUCT_ICON;
  blog: string;
}

// Real use cases drawn from the Upstash blog — each links back to its post.
const EXAMPLES: Example[] = [
  { text: "AI chatbot for a Next.js app, ~30k messages/day, chat history stored in Redis.", product: "Redis", blog: "ai-chatbot-nextjs" },
  { text: "RAG assistant over 100k support docs with semantic search and a daily re-index cron.", product: "Search", blog: "add-ai-assistant-to-docs" },
  { text: "Agent memory store in Redis for a coding agent, ~200k reads/day, low latency.", product: "Redis", blog: "agent-memory-with-redis" },
  { text: "Edge rate limiting for a public API on Cloudflare Workers, 2M requests/day, sliding window.", product: "Redis", blog: "cloudflare-workers-rate-limiting" },
  { text: "Semantic cache for LLM responses to cut costs, ~100k queries/day.", product: "Vector", blog: "caching-ai-sdk-v6-tool-results-with-redis" },
  { text: "Cache Prisma query results in Redis for a SaaS app, ~1M requests/day.", product: "Redis", blog: "caching-prisma-redis" },
  { text: "Session store for Auth.js in a Next.js app, 200k sessions, EU + US regions.", product: "Redis", blog: "better-auth-with-redis" },
  { text: "Virtual waiting room for a ticket drop, spikes to 100k concurrent users.", product: "Redis", blog: "cloudflare-workers-waiting-room" },
  { text: "Realtime game leaderboard in Redis, ~20k score updates per minute.", product: "Redis", blog: "building-analytics-with-redis" },
  { text: "Blog with page-view counters and comments in Redis, ~1M views/month.", product: "Redis", blog: "blog-comments-nextjs13" },
  { text: "Vector search over 2M image embeddings at 1536 dims for similarity search.", product: "Vector", blog: "image-similarity-search" },
  { text: "Schedule and deliver reminder emails with QStash, ~10k messages/day.", product: "QStash", blog: "email-scheduler-qstash" },
  { text: "Background job to summarize new articles via QStash, ~2k jobs/day.", product: "QStash", blog: "article-summarizer-qstash-python" },
  { text: "Rate limit outbound emails per user, ~500k messages/month.", product: "Redis", blog: "email-ratelimiting" },
  { text: "Article recommendation engine using vector similarity over 500k articles.", product: "Vector", blog: "article-recommendation-system" },
  { text: "Feature flags served from Redis at the edge, ~5M reads/day.", product: "Redis", blog: "feature-flags-with-vercel-and-upstash" },
  { text: "Distributed lock for a serverless job runner, ~50k lock ops/day.", product: "Redis", blog: "distributed-lock" },
  { text: "Index and vector-search 6M Wikipedia articles with unlimited queries.", product: "Vector", blog: "indexing-wikipedia" },
  { text: "Full-text + semantic product search over 1M docs, ~40k queries/day.", product: "Search", blog: "first-look-at-upstash-redis-search" },
  { text: "Durable incident-response workflow with retries, ~5k runs/day.", product: "Workflow", blog: "how-does-workflow-orchestration-work" },
  { text: "Trending Hacker News search over 1M posts, refreshed by an hourly cron.", product: "Search", blog: "hacker-news-trends-redis-search" },
  { text: "AI companion app storing conversation memory for 50k daily active users.", product: "Redis", blog: "ai-companion-app" },
  { text: "API key storage and authentication for a public API, ~300k requests/day.", product: "Redis", blog: "api-key-generator-upstash-redis" },
  { text: "Run AI data-analysis tasks in isolated sandboxes, ~1k jobs/day.", product: "QStash", blog: "box-ai-data-analyst" },
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
        {/* One unified card so everything reads as a single tool. */}
        <div
          className={cx(
            "mx-auto max-w-3xl rounded-[2rem] border border-white/10 p-6 text-center md:p-10",
            "bg-gradient-to-b from-white/[0.04] to-white/[0.01] shadow-2xl shadow-black/20",
          )}
        >
          {/* prominent header */}
          <div className="flex items-center justify-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary/15">
              <IconSparkles size={22} className="text-primary-text" />
            </span>
            <span className="font-display text-2xl font-bold text-text md:text-3xl">
              Upstash Architect
            </span>
            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary-text">
              AI
            </span>
          </div>

          <h2 className="mt-5 font-display text-lg font-semibold text-text md:text-xl">
            Describe your project. Get an Upstash blueprint.
          </h2>
          <p className="mx-auto mt-1.5 max-w-xl text-sm text-text-mute md:text-base">
            Products, plans, every limit, and a monthly cost estimate — generated
            from a plain-text description.
          </p>

          <div className="mt-6 text-left">
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
            onPickExample={runExample}
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
  onPickExample,
}: {
  current: UiResult | null;
  loading: boolean;
  input: string;
  setInput: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  onNew: () => void;
  onPickExample: (ex: string) => void;
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
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-xl bg-primary/15">
              <IconSparkles size={18} className="text-primary-text" />
            </span>
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
              <ExampleCloud loading={loading} onPick={onPickExample} />
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
          className="max-h-60 overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.02] p-1.5"
        >
          <div className="flex flex-col pb-6">
            {EXAMPLES.map((ex) => {
              const Icon = PRODUCT_ICON[ex.product];
              return (
                <div
                  key={ex.blog}
                  className="group flex items-center gap-3 rounded-xl px-2.5 py-2 transition hover:bg-white/5"
                >
                  {Icon && <Icon width={22} className="shrink-0 rounded-md" />}
                  <button
                    type="button"
                    onClick={() => onPick(ex.text)}
                    disabled={loading}
                    className="min-w-0 flex-1 text-left text-sm text-text-mute transition group-hover:text-text disabled:opacity-40"
                  >
                    {ex.text}
                  </button>
                  <a
                    href={`${BLOG}${ex.blog}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Read the blog post"
                    className="inline-flex shrink-0 items-center gap-0.5 rounded-full px-2 py-1 text-[11px] text-text-mute opacity-0 transition hover:bg-white/10 hover:text-primary-text focus:opacity-100 group-hover:opacity-100"
                  >
                    Blog <IconArrowUpRight size={13} />
                  </a>
                </div>
              );
            })}
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
