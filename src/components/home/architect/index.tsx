"use client";

import Container from "@/components/container";
import cx from "@/utils/cx";
import { IconArrowUp, IconSparkles, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Blueprint from "./recommendation-card";
import { type UiMessage, useArchitect } from "./use-architect";

const EXAMPLES = [
  "RAG chatbot, ~50k requests/day, semantic search over 2M docs, a daily cron, EU + US regions, need SOC-2.",
  "Rate limiter and cache for a Next.js app, ~1M requests/day, single region.",
  "Vector search over 10M embeddings with unlimited queries and 99.9% SLA.",
];

const strip = (s?: string) => (s ? s.replace(/\s+/g, " ").trim() : "");

export default function ArchitectSection() {
  const { messages, loading, send, reset } = useArchitect();
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch from the persisted store.
  useEffect(() => setMounted(true), []);

  const hasMessages = mounted && messages.length > 0;
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.text;

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

        <div className="mx-auto mt-8 max-w-3xl">
          {hasMessages ? (
            // Collapsed one-liner: shows the last customer message, reopens the modal.
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cx(
                "group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-left",
                "transition hover:border-white/25 hover:bg-white/5",
              )}
            >
              <IconSparkles
                size={18}
                className="shrink-0 text-primary-text"
              />
              <span className="min-w-0 flex-1 truncate text-sm text-text-mute">
                {loading ? "Designing your blueprint…" : strip(lastUser)}
              </span>
              <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-text-mute group-hover:text-text">
                Continue
              </span>
            </button>
          ) : (
            <>
              <PromptInput
                value={input}
                onChange={setInput}
                onSubmit={submit}
                loading={loading}
                placeholder="e.g. RAG chatbot, 50k requests/day, semantic search over 2M docs, EU + US, SOC-2…"
              />
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => runExample(ex)}
                    disabled={loading}
                    title={ex}
                    className={cx(
                      "max-w-full truncate rounded-full border border-white/10 px-3 py-1.5 text-xs text-text-mute",
                      "transition hover:border-white/25 hover:bg-white/5 hover:text-text disabled:opacity-40",
                    )}
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>

      {mounted &&
        open &&
        createPortal(
          <ArchitectModal
            messages={messages}
            loading={loading}
            input={input}
            setInput={setInput}
            onSubmit={submit}
            onClose={() => setOpen(false)}
            onReset={() => {
              reset();
              setOpen(false);
            }}
          />,
          document.body,
        )}
    </section>
  );
}

/* ─────────────────────────────── modal ─────────────────────────────── */

function ArchitectModal({
  messages,
  loading,
  input,
  setInput,
  onSubmit,
  onClose,
  onReset,
}: {
  messages: UiMessage[];
  loading: boolean;
  input: string;
  setInput: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  onReset: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  // Lock page scroll + close on Escape while the modal is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to newest on change
  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, loading]);

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
            {messages.length > 0 && (
              <button
                type="button"
                onClick={onReset}
                className="rounded-lg px-3 py-1.5 text-xs text-text-mute transition hover:bg-white/5 hover:text-text"
              >
                New
              </button>
            )}
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

        {/* messages */}
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto px-4 py-6 md:px-8"
        >
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.length === 0 && (
              <p className="text-center text-sm text-text-mute">
                Describe what you're building to get started.
              </p>
            )}

            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-center">
                  <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm text-text-mute">
                    <IconSparkles
                      size={14}
                      className="shrink-0 text-primary-text"
                    />
                    <span className="truncate">{m.text}</span>
                  </div>
                </div>
              ) : (
                <div
                  key={m.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                >
                  {m.response ? (
                    <Blueprint data={m.response} />
                  ) : (
                    <p className="text-sm text-text-mute">{m.text}</p>
                  )}
                </div>
              ),
            )}

            {loading && <LoadingBlueprint />}
          </div>
        </div>

        {/* input */}
        <div className="border-t border-white/10 px-4 py-4 md:px-8">
          <div className="mx-auto max-w-3xl">
            <PromptInput
              value={input}
              onChange={setInput}
              onSubmit={onSubmit}
              loading={loading}
              autoFocus
              placeholder="Refine or ask a follow-up…"
            />
          </div>
        </div>
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
