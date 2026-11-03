// Questions mirror real search intent for "durable execution" and "serverless workflows".
export const WORKFLOW_FAQ = [
  {
    question: "What is Upstash Workflow?",
    answer:
      "Upstash Workflow is a durable execution platform for serverless apps. You write a workflow as an endpoint in your own app with the @upstash/workflow SDK, split into steps. Workflow runs each step, saves its result, and retries it on failure, so long and multi-step processes complete reliably on platforms with short function timeouts.",
  },
  {
    question: "What is durable execution?",
    answer:
      "Durable execution records a function's progress step by step. If the process crashes, times out, or is redeployed, it resumes from the last completed step instead of starting over. It replaces the hand-built queues, state tables, and retry logic that multi-step background jobs usually need.",
  },
  {
    question: "How does Workflow avoid serverless function timeouts?",
    answer:
      "Each step runs in its own invocation of your endpoint, so no single invocation has to run for the whole workflow. Waits like context.sleep and context.waitForEvent do not keep anything running. Long HTTP calls made with context.call are performed by Upstash, so your function does not wait for the response.",
  },
  {
    question: "Which frameworks and languages are supported?",
    answer:
      "Workflow has TypeScript and Python SDKs. There are quickstarts for Next.js, Cloudflare Workers, Nuxt, SvelteKit, SolidJS, Hono, Express, Astro, TanStack Start, FastAPI, and Flask, and any platform that can serve an HTTP endpoint works.",
  },
  {
    question: "How long can a workflow sleep or run?",
    answer:
      "A single sleep can last up to 7 days on the free plan and up to a year on pay as you go. Fixed plans have no maximum. Because a workflow is made of separate steps, the run as a whole is not bound by your platform's function timeout.",
  },
  {
    question: "What happens when a step fails?",
    answer:
      "The step is retried automatically. Earlier steps are not run again, because their results are already saved. If the step still fails after its retries, the run moves to the dead letter queue, where you can restart it from the beginning or resume it from the failed step. You can also run a failure function to clean up or alert.",
  },
  {
    question: "What is a step, and how are steps billed?",
    answer:
      "A step is one unit of work in your workflow, such as context.run, context.sleep, or context.waitForEvent. Each executed step is one billed step, and a retry is another step. context.call and context.invoke count as two steps, and each step that runs in parallel adds one extra step. See the pricing page FAQ for the full rules.",
  },
  {
    question: "How much does Upstash Workflow cost?",
    answer:
      "The free plan includes 1,000 steps a day. Pay as you go is $1 per 100K steps, with 50 GB of bandwidth free each month and $0.05 per GB after that. Fixed plans start at $180 a month for 1M steps a day. See the pricing page for details.",
  },
  {
    question: "What is the difference between Workflow and QStash?",
    answer:
      "QStash is the message queue underneath Workflow. It delivers individual messages and runs schedules. Workflow adds steps, saved state, sleeps, and event waits on top, so a job with several dependent parts can be written as one function. Use QStash for single background jobs and Workflow for multi-step processes.",
  },
];
