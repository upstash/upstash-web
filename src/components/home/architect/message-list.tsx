import cx from "@/utils/cx";
import RecommendationCard from "./recommendation-card";
import type { UiMessage } from "./use-architect";

const EXAMPLE =
  "RAG chatbot, ~50k requests/day, semantic search over 2M docs, a daily cron, EU + US regions, need SOC-2.";

export default function MessageList({
  messages,
  loading,
  onExample,
}: {
  messages: UiMessage[];
  loading: boolean;
  onExample: (text: string) => void;
}) {
  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-3 px-1 text-left">
        <p className="text-sm text-text">
          Describe what you're building and I'll recommend Upstash products,
          plans, limits, and a monthly cost estimate.
        </p>
        <button
          type="button"
          onClick={() => onExample(EXAMPLE)}
          className="rounded-lg bg-white/5 p-2 text-left text-xs text-text-mute hover:bg-white/10"
        >
          Try: “{EXAMPLE}”
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((m) =>
        m.role === "user" ? (
          <div key={m.id} className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-left text-sm text-white">
              {m.text}
            </div>
          </div>
        ) : (
          <div key={m.id} className="flex justify-start">
            <div
              className={cx(
                "max-w-[92%] rounded-2xl rounded-bl-sm bg-bg-mute px-3 py-2",
                "text-left text-sm text-text",
              )}
            >
              {m.response ? (
                <RecommendationCard data={m.response} />
              ) : (
                <span>{m.text}</span>
              )}
            </div>
          </div>
        ),
      )}

      {loading && (
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-sm bg-bg-mute px-3 py-2 text-sm text-text-mute">
            <span className="inline-flex gap-1">
              <span className="size-1.5 animate-bounce rounded-full bg-text-mute [animation-delay:-0.2s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-text-mute [animation-delay:-0.1s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-text-mute" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
