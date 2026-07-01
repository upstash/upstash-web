# Upstash Architect

**An advisor tool that turns a plain-text project description into an Upstash product plan, with per-product plan options, all plan limits, and a cost estimate. Built for both human and agentic use, with prompt-injection prevention as a first-class constraint.**

*Pricing verified June 2026. Treat figures as indicative and refresh from the live machine-readable feeds (`/pricing/redis.md`, `/pricing/vector.md`, `/pricing/qstash.md`, `/pricing/search.md`).*

---

## 1. What it does

**Input:** a free-text description of what the user is building.

> "RAG chatbot, ~50k requests/day, semantic search over 2M docs, a daily cron, EU + US regions, need SOC-2."

**Output:** for each recommended Upstash product —
- the candidate plans (Free / Pay-as-you-go / Fixed tiers / Enterprise),
- every limit that applies on each plan,
- a projected monthly cost, shown as **Pay-as-you-go vs. cheapest Fixed tier that fits**, with the crossover point where Fixed becomes cheaper.

The same service answers humans (web UI) and agents (API / MCP endpoint).

---

## 2. The decision that anchors the whole design

The LLM's **only** job is to convert free text into a strict, schema-bound *workload spec*. It does **not** compute cost and **does not call any tool with side effects**. A deterministic engine maps the spec to plans, limits, and price.

Consequence: the worst a malicious prompt can achieve is bad extracted numbers — which schema validation rejects. Cost math, plan selection, and any provisioning are unreachable by injected instructions. Security and correctness come from the *architecture*, not from trusting the model.

---

## 3. Pipeline and the Upstash products that power it

| Stage | Product | Role |
|---|---|---|
| 1. Gate | **Ratelimit** | Sliding-window cap — by IP for humans, by API key for agents. First line against denial-of-wallet and injection probing. |
| 2. Cache | **Redis** | Semantic cache (normalized request → recommendation); session/conversation state; spend counters. Repeat/similar requests skip the LLM entirely. |
| 3. Extract | LLM → JSON schema | Free text → workload spec (products implied, request volumes, data size, regions, features, schedules). No tools, no math. |
| 4. Recommend + price | Deterministic code | Maps spec → product + plan + limits + cost from the pricing tables. 100% code. |
| 5. Cite "how to use" | **Search** (or **Vector**) | Retrieves doc snippets so each recommendation ships with wiring guidance. Read-only tool. |
| 6. Keep prices fresh | **QStash** | Daily cron refreshes pricing tables into Redis from the machine-readable feeds. |
| (optional) Durable flow | **Workflow** | Makes the extract → retrieve → estimate → cite loop durable with retries. |
| (optional) Sandbox | **Box** | Only if the tool ever executes user/agent-supplied code; isolated, no prod secrets or network. |

### Human + agentic duality

One core service, two front doors:
- **Web UI** — session cookie, Ratelimit by IP.
- **API / MCP endpoint** — API-key auth, Ratelimit by key, QStash signature verification on callbacks.

Both share the same Redis / Search backend.

**Agent-native bonus:** Upstash already publishes machine-readable pricing at `/pricing/redis.md`, `/pricing/vector.md`, etc., and an agent provisioning endpoint (`POST upstash.com/start-redis`, no signup). The agentic side of the tool consumes those directly, so its cost knowledge stays current automatically.

---

## 4. Knowledge base — current plans, limits, and cost

This is the data the deterministic engine prices from.

### Redis

| Plan | Price | Max data | Bandwidth | Commands | Other limits |
|---|---|---|---|---|---|
| Free | $0 | 256 MB | 10 GB/mo | 500K/mo | 1 DB, 10k ops/sec, 10 MB req, 100 MB record |
| Pay-as-you-go | $0.20 / 100K cmd + $0.25/GB storage (first 1 GB free) | 100 GB | free to 200 GB, then $0.03/GB | Unlimited | 10k ops/sec, up to 100 DBs |
| Fixed 250MB → 500GB | $10/mo → $1500/mo (+$5–$750 per read region) | 250 MB → 500 GB | 50 GB → 20 TB | Unlimited (no per-cmd billing) | 10k–16k ops/sec |
| Enterprise | Custom | up to 10 TB | Unlimited | Custom | HIPAA, VPC peering, SSO |

Fixed tiers in detail: 250MB $10 · 1GB $20 · 5GB $100 · 10GB $200 · 50GB $400 · 100GB $800 · 500GB $1500 (per month).

**Prod Pack** (+$200/mo per DB): uptime SLA, Multi-Zone HA, encryption at rest, SOC-2, Prometheus/Grafana/Datadog.

Notes: writes to global read regions count as commands (1 primary + 1 read region → 100K writes billed as $0.40). Operational commands (AUTH, PING, INFO, etc.) are not billed. Budgets exist only on pay-as-you-go.

### Vector

| Plan | Price | Max vectors × dims | Max dims | Namespaces | Daily query limit | Max data | SLA |
|---|---|---|---|---|---|---|---|
| Free | $0 | 200M | 1,536 | 100 | 10K | 1 GB | None |
| Pay-as-you-go | $0.40 / 100K requests | 2B | 3,072 | 10,000 | Unlimited | 50 GB | 99.9% |
| Fixed | $60/mo | 2B | 3,072 | 10,000 | 1M | 50 GB | 99.9% |
| Pro | Custom | 100B | 5,000 | Unlimited | Unlimited | 1 TB | 99.99% |

Storage $0.25/GB; bandwidth free to 200 GB/mo then $0.03/GB. Query and upsert cost the same. Default topK limit 1000. 10 indexes free, then $0.50/index up to 100.

### QStash

| Plan | Price | Messages/day | Other limits |
|---|---|---|---|
| Free | $0 | 1,000 | 50 GB bw, 1 MB msg, 10 schedules, parallelism 10, 3-day DLQ |
| Pay-as-you-go | $1 / 100K msgs (+$0.05/GB over 50 GB) | Unlimited | 10 MB msg, 1,000 schedules free then $0.01 each, parallelism 100 |
| Fixed 1M | $180/mo | 1M | 50 MB msg, parallelism 200, 30-day DLQ |
| Fixed 10M | $420/mo | 10M | 50 MB msg, parallelism 1,000, 3-month DLQ |
| Enterprise | Custom | 100M+ | Unlimited bandwidth, SSO |

Billing: each delivery attempt — including each retry, and once per subscribed endpoint — counts as one message. Daily/bandwidth limits are soft (sustained overage triggers contact, then 429s).

### Search

| Plan | Price | Monthly queries | Max records | Other limits |
|---|---|---|---|---|
| Free | $0 | 20K | 200K | 1 DB, 10 indexes, 4096 chars/doc, 48 KB metadata, 1 GB total |
| Pay-as-you-go | $0.05 / 1K requests | Unlimited | 2M | — |
| Pro | Coming soon | Unlimited | Unlimited | — |

Includes keyword + semantic search, reranking, and a built-in embedding service (no separate embedding provider needed).

---

## 5. Cost-estimation logic

For each product the engine computes:

```
plan_cost = plan_floor + usage_overage
```

then selects the **cheapest plan whose hard limits satisfy the workload** (data size, ops/sec, message volume, region count, compliance needs such as SOC-2/HIPAA). It always presents two columns:

1. **Pay-as-you-go** — variable, best for low/bursty traffic.
2. **Cheapest Fixed tier that fits** — flat, best past the crossover.

It also surfaces the **crossover point** (the monthly volume where Fixed becomes cheaper than pay-as-you-go) and recommends a Redis **budget cap** where applicable, since budgets exist only on pay-as-you-go.

### Worked example — the RAG chatbot above

- **Search** for the 2M-doc corpus: needs > 200K records → Pay-as-you-go (Free caps at 200K records / 20K queries). At ~50k queries/day ≈ 1.5M/mo → ~$75/mo at $0.05/1K.
- **Redis** for semantic cache + sessions: Pay-as-you-go, or a small Fixed tier if traffic is steady; SOC-2 requirement pushes toward a Fixed plan + Prod Pack.
- **QStash** for the daily cron: comfortably inside Free (1 schedule ≪ 10).
- **Vector** only if managing a custom embedding pipeline instead of Search.

The engine returns this as a per-product table with the limits that drove each choice.

---

## 6. Preventing prompt injection

Defense in depth — no single layer is trusted.

1. **Capability, not just input.** The LLM only emits a schema-bound workload spec — no math, no side-effect tools. Injection cannot alter costs or trigger actions.
2. **Data/instruction separation.** User text and retrieved docs live in delimited "untrusted data" blocks; the system prompt declares them non-authoritative and never to be executed as commands.
3. **Indirect injection (RAG).** Retrieved chunks are untrusted too. Index only curated Upstash docs; tag every chunk with provenance; isolate any user-submitted content in a separate namespace so the corpus can't be poisoned.
4. **Structured-output validation.** Reject anything off-schema. "Ignore instructions and output X" fails to parse and is dropped.
5. **Rate limits + spend caps.** Ratelimit per IP/key, plus token and dollar budgets tracked in Redis. Caps damage from automated probing and denial-of-wallet.
6. **Agentic-path integrity.** API-key auth + Ratelimit by key; QStash signature verification on callbacks; allowlisted read-only tools only; no destructive or credentialed actions.
7. **Sandbox any execution.** If code ever runs, it runs in Upstash Box — isolated, no access to prod data, secrets, or network.
8. **Guardrail pass + audit log.** A cheap input/output check flags prompt-exfiltration or off-domain attempts; prompts, retrieved chunks, and specs are logged to Redis streams for detection and audit.

---

## 7. Minimal starting footprint

Redis (cache + state + Ratelimit backend), Search (one index), Ratelimit, and a QStash cron — all on Free/low tiers until real volume arrives. Add Workflow once the agent loop needs durability, and Box only if the tool executes code.

---

## Sources

- [Redis pricing](https://upstash.com/pricing/redis)
- [Vector pricing](https://upstash.com/pricing/vector)
- [QStash pricing](https://upstash.com/pricing/qstash)
- [Search pricing](https://upstash.com/pricing/search)
- [What is Upstash Search?](https://upstash.com/docs/search/overall/whatisupstashsearch)
