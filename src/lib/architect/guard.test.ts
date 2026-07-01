import { describe, expect, it } from "vitest";
import { screenInput } from "./guard";

const code = (s: string) => {
  const r = screenInput(s);
  return r.ok ? "ok" : r.code;
};

describe("screenInput — shared input gate (humans + agents)", () => {
  it("passes realistic workload descriptions", () => {
    expect(
      code(
        "RAG chatbot, ~50k requests/day, semantic search over 2M docs, a daily cron",
      ),
    ).toBe("ok");
    expect(code("Rate limiter and cache for a Next.js app, ~1M requests/day")).toBe(
      "ok",
    );
    expect(code("I need a redis cache for sessions")).toBe("ok"); // strong keyword, no number
    expect(code("something with 5 million users")).toBe("ok"); // number → specific enough
  });

  it("rejects too-short input", () => {
    expect(code("hi")).toBe("too_short");
    expect(code("help me")).toBe("too_short");
  });

  it("rejects vague 'build an app' with no concrete signal", () => {
    expect(code("I want to build an app")).toBe("too_vague");
  });

  it("rejects clearly off-topic input", () => {
    expect(code("write me a poem about the sea")).toBe("off_topic");
    expect(code("what is the weather today")).toBe("off_topic");
  });

  it("rejects over-long input", () => {
    expect(code("cache ".repeat(500))).toBe("too_long");
  });

  it("does not false-positive substrings (e.g. 'average' contains 'rag')", () => {
    // 'average' must NOT count as the 'rag' keyword; no other signal here → off_topic.
    expect(code("the average color of the sky")).toBe("off_topic");
  });
});
