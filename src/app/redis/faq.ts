// Questions mirror real search intent for "redis database".
export const REDIS_FAQ = [
  {
    question: "Is Redis a database?",
    answer:
      "Yes. Redis is an in-memory, key-value database. It keeps data in memory for sub-millisecond reads and writes and supports data structures such as strings, hashes, lists, sets, sorted sets, streams, and JSON.",
  },
  {
    question: "Is Redis a SQL or NoSQL database?",
    answer:
      "Redis is a NoSQL database. Instead of tables and SQL queries, it stores data as keys mapped to values and data structures, which makes it fast and flexible for caching, queues, sessions, and real-time workloads.",
  },
  {
    question: "What is a serverless Redis database?",
    answer:
      "A serverless Redis database removes server and cluster management. With Upstash you create a database in seconds, connect over HTTP or the Redis protocol, and pay per request instead of paying for always-on instances. It scales automatically with your traffic.",
  },
  {
    question: "What can I use a Redis database for?",
    answer:
      "Almost anything that needs fast reads and writes. Caching, session storage, rate limiting, job queues, streams, leaderboards, pub/sub messaging, real-time analytics, feature flags, and memory for AI agents are just the start. Because Redis ships with so many data structures, teams keep finding new uses for it, and a single database can power several of these at once.",
  },
  {
    question: "Is Upstash Redis good for agentic coding?",
    answer:
      "Yes. Upstash Redis is a strong fit for AI agents and agentic development. The HTTP REST API works from any runtime without connection pools, the SDKs are small and easy to call, and you can create a database in seconds and pay only per request. Agents can store short-term and long-term memory, cache results, and coordinate work without any infrastructure setup. You can also add the Upstash skill to your coding agent so it knows how to use Redis correctly.",
  },
  {
    question: "Is Upstash Redis fully managed?",
    answer:
      "Yes. Upstash handles provisioning, replication, durability, backups, and scaling. You get a global, highly available Redis database without operating any servers.",
  },
  {
    question: "How much does an Upstash Redis database cost?",
    answer:
      "Upstash Redis has a free tier for prototypes, pay-as-you-go pricing from $0.20 per 100K commands, and fixed monthly plans. You only pay for what you use. See the pricing page for current plans.",
  },
];
