import { describe, expect, it } from "vitest";
import { priceEngine } from "./pricing";
import { WorkloadSpec } from "./schema";

/** Build a fully-defaulted spec, overriding just the fields a test cares about. */
function spec(partial: Partial<WorkloadSpec> & { products: WorkloadSpec["products"] }) {
  return WorkloadSpec.parse(partial);
}

function product(rec: ReturnType<typeof priceEngine>, name: string) {
  const p = rec.products.find((x) => x.product === name);
  if (!p) { throw new Error(`missing product ${name}`); }
  return p;
}

describe("priceEngine — RAG chatbot worked example (doc §5)", () => {
  // "RAG chatbot, ~50k queries/day, semantic search over 2M docs, a daily cron, EU + US, SOC-2."
  const rag = priceEngine(
    spec({
      products: ["search", "redis", "qstash"],
      requestsPerDay: 50_000,
      recordCount: 2_000_000,
      dataSizeGB: 0.2,
      messagesPerDay: 1,
      schedules: 1,
      regions: ["eu", "us"],
      features: ["soc2"],
    }),
  );

  it("Search → Pay-as-you-go at ~$75/mo (Free's 200K/20K caps exceeded)", () => {
    const s = product(rag, "Search");
    expect(s.chosenPlan).toBe("Pay-as-you-go");
    // 50k/day * 30 = 1.5M queries/mo * $0.05/1K = $75
    expect(s.payAsYouGo?.monthlyCost).toBeCloseTo(75, 2);
    expect(s.allPlans.find((p) => p.plan === "Free")?.fits).toBe(false);
  });

  it("QStash → Free (1 schedule ≪ 10, low volume)", () => {
    const q = product(rag, "QStash");
    expect(q.chosenPlan).toBe("Free");
  });

  it("Redis → Fixed + Prod Pack because SOC-2 is required", () => {
    const r = product(rag, "Redis");
    expect(r.chosenPlan.startsWith("Fixed")).toBe(true);
    expect(r.reason).toMatch(/SOC-2/i);
    // Fixed 250MB ($10) + 1 read region ($5) + Prod Pack ($200) = $215
    const chosen = r.allPlans.find((p) => p.plan === r.chosenPlan);
    expect(chosen?.monthlyCost).toBe(215);
    // Free & PAYG must NOT be considered fitting (no compliance there).
    expect(r.allPlans.find((p) => p.plan === "Free")?.fits).toBe(false);
    expect(r.payAsYouGo?.fits).toBe(false);
  });

  it("produces a crossover note for Redis Fixed vs PAYG", () => {
    const r = product(rag, "Redis");
    expect(r.crossoverNote).toMatch(/beats pay-as-you-go/);
  });

  it("attaches deterministic reasoning to every product", () => {
    for (const p of rag.products) {
      expect(Array.isArray(p.reasoning)).toBe(true);
      expect(p.reasoning?.length).toBeGreaterThan(0);
    }
  });

  it("echoes the parsed spec and a human-readable summary", () => {
    expect(rag.spec.products).toContain("search");
    expect(rag.understood).toMatch(/50,000 requests\/day/);
    expect(rag.understood).toMatch(/2,000,000 records/);
    expect(rag.understood).toMatch(/features: soc2/);
  });
});

describe("priceEngine — tier selection", () => {
  it("small Redis workload fits Free", () => {
    const r = product(
      priceEngine(spec({ products: ["redis"], requestsPerDay: 1_000, dataSizeGB: 0.1 })),
      "Redis",
    );
    expect(r.chosenPlan).toBe("Free");
  });

  it("Search under Free caps stays Free", () => {
    const s = product(
      priceEngine(spec({ products: ["search"], requestsPerDay: 100, recordCount: 50_000 })),
      "Search",
    );
    expect(s.chosenPlan).toBe("Free");
  });

  it("HIPAA forces Redis to Enterprise", () => {
    const r = product(
      priceEngine(spec({ products: ["redis"], features: ["hipaa"], dataSizeGB: 1 })),
      "Redis",
    );
    expect(r.chosenPlan).toBe("Enterprise");
  });

  it("HA / uptime-SLA needs a Fixed plan + Prod Pack (like SOC-2)", () => {
    const r = product(
      priceEngine(spec({ products: ["redis"], features: ["ha"], dataSizeGB: 0.1 })),
      "Redis",
    );
    expect(r.chosenPlan.startsWith("Fixed")).toBe(true);
    const chosen = r.allPlans.find((p) => p.plan === r.chosenPlan);
    expect(chosen?.monthlyCost).toBe(210); // 250MB $10 + Prod Pack $200
  });

  it("SSO forces Redis to Enterprise", () => {
    const r = product(
      priceEngine(spec({ products: ["redis"], features: ["sso"], dataSizeGB: 1 })),
      "Redis",
    );
    expect(r.chosenPlan).toBe("Enterprise");
  });

  it("large QStash volume selects a Fixed tier over PAYG when cheaper", () => {
    const q = product(
      priceEngine(spec({ products: ["qstash"], messagesPerDay: 900_000 })),
      "QStash",
    );
    // 900k/day * 30 = 27M msgs/mo * $1/100K = $270 PAYG vs $180 Fixed 1M → Fixed wins.
    expect(q.chosenPlan).toBe("Fixed 1M");
  });

  it("Vector: capacity is vectors × dimensions, not raw count", () => {
    // 2M vectors × 1536 dims = 3.07B > 2B PAYG cap → Pro.
    const big = product(
      priceEngine(spec({ products: ["vector"], vectorCount: 2_000_000, dimensions: 1536 })),
      "Vector",
    );
    expect(big.chosenPlan).toBe("Pro");

    // 100k × 1536 = 153.6M < 200M → Free.
    const small = product(
      priceEngine(spec({ products: ["vector"], vectorCount: 100_000, dimensions: 1536 })),
      "Vector",
    );
    expect(small.chosenPlan).toBe("Free");
  });

  it("Vector: falls back to recordCount when the count landed in the wrong field", () => {
    // 500k × 1536 = 768M → exceeds Free (200M), within PAYG (2B).
    const v = product(
      priceEngine(spec({ products: ["vector"], recordCount: 500_000 })),
      "Vector",
    );
    expect(v.chosenPlan).toBe("Pay-as-you-go");
  });

  it("Workflow implies a QStash cost (never $0)", () => {
    const rec = priceEngine(spec({ products: ["workflow"], requestsPerDay: 5000 }));
    const q = rec.products.find((p) => p.product === "QStash");
    expect(q).toBeTruthy(); // QStash added automatically
    expect(rec.totalMonthlyLow).toBeGreaterThan(0);
  });

  it("Workflow re-prices QStash on run volume even when qstash was listed with 0 messages", () => {
    // Runs land in requestsPerDay; qstash present but messagesPerDay=0 must not stay Free.
    const rec = priceEngine(
      spec({ products: ["workflow", "qstash"], requestsPerDay: 5000, messagesPerDay: 0 }),
    );
    const q = rec.products.find((p) => p.product === "QStash");
    expect(q?.chosenPlan).toBe("Pay-as-you-go"); // 5000/day > 1000 Free cap
    expect(rec.totalMonthlyLow).toBeGreaterThan(0);
  });

  it("flags custom pricing so Pro/Enterprise plans don't read as $0", () => {
    const rec = priceEngine(
      spec({ products: ["vector"], vectorCount: 2_000_000, dimensions: 1536 }),
    );
    expect(rec.products[0].chosenPlan).toBe("Pro");
    expect(rec.hasCustom).toBe(true);
  });

  it("totalMonthlyLow sums chosen plans", () => {
    const rec = priceEngine(
      spec({ products: ["search"], requestsPerDay: 50_000, recordCount: 2_000_000 }),
    );
    expect(rec.totalMonthlyLow).toBeCloseTo(75, 2);
  });
});

describe("WorkloadSpec — the trust boundary", () => {
  it("rejects an off-schema object (injection kill-switch)", () => {
    const parsed = WorkloadSpec.safeParse({ evil: true, cost: 0 });
    expect(parsed.success).toBe(false);
  });

  it("rejects unknown products", () => {
    const parsed = WorkloadSpec.safeParse({ products: ["mongodb"] });
    expect(parsed.success).toBe(false);
  });

  it("rejects out-of-range numbers", () => {
    const parsed = WorkloadSpec.safeParse({
      products: ["redis"],
      requestsPerDay: -5,
    });
    expect(parsed.success).toBe(false);
  });
});
