"use client";

import cx from "@/utils/cx";
import { IconArrowUp, IconSparkles, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import MessageList from "./message-list";
import { useArchitect } from "./use-architect";

export default function ArchitectChatbox() {
  const { open, setOpen, messages, loading, send, reset } = useArchitect();
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Avoid hydration mismatch from the persisted store.
  useEffect(() => setMounted(true), []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to bottom on new content
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, open]);

  if (!mounted) { return null; }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input;
    setInput("");
    void send(text);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 text-left sm:bottom-6 sm:right-6">
      {open && (
        <div
          className={cx(
            "mb-3 flex h-[32rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden",
            "rounded-3xl border border-white/10 bg-bg shadow-2xl",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <IconSparkles size={18} className="text-primary-text" />
              <div>
                <div className="text-sm font-semibold text-text">
                  Upstash Architect
                </div>
                <div className="text-[11px] text-text-mute">
                  Products, plans & cost from a description
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-lg px-2 py-1 text-[11px] text-text-mute hover:bg-white/5"
                >
                  New
                </button>
              )}
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-text-mute hover:bg-white/5"
              >
                <IconX size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3">
            <MessageList
              messages={messages}
              loading={loading}
              onExample={(t) => void send(t)}
            />
          </div>

          {/* Input */}
          <form
            onSubmit={submit}
            className="flex items-end gap-2 border-t border-white/10 p-3"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { submit(e); }
              }}
              rows={1}
              placeholder="Describe your project…"
              className={cx(
                "max-h-28 flex-1 resize-none rounded-xl bg-white/5 px-3 py-2 text-sm",
                "text-text placeholder:text-text-mute focus:outline-none",
              )}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className={cx(
                "grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-white transition",
                "hover:bg-primary-text disabled:opacity-40",
              )}
            >
              <IconArrowUp size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cx(
          "flex items-center gap-2 rounded-full bg-primary px-4 py-3 font-medium text-white shadow-lg",
          "transition hover:bg-primary-text",
        )}
      >
        {open ? <IconX size={20} /> : <IconSparkles size={20} />}
        {!open && <span className="text-sm">Ask Architect</span>}
      </button>
    </div>
  );
}
