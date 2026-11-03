// Questions mirror real search intent for "message queue" and "serverless cron".
export const QSTASH_FAQ = [
  {
    question: "What is Upstash QStash?",
    answer:
      "Upstash QStash is a serverless message queue and task scheduler that works over HTTP. You publish a message to QStash with an HTTP request or the @upstash/qstash SDK, and QStash delivers it to your endpoint as an HTTP request, retrying until it succeeds. It also runs cron schedules, delays messages, and fans out to multiple endpoints.",
  },
  {
    question: "What is a message queue?",
    answer:
      "A message queue stores work handed off by one part of a system until another part processes it. The producer does not wait for the work to finish, and if the consumer is slow or unavailable the message waits instead of being lost. Queues are the standard way to run background jobs, smooth traffic spikes, and decouple services.",
  },
  {
    question: "Do I need to run a worker or consumer?",
    answer:
      "No. QStash pushes messages to your endpoint as HTTP requests, so any serverless function, API route, or server that can handle HTTP is a consumer. There is nothing to poll and no connection to keep open, which is why QStash works on Vercel, Cloudflare Workers, AWS Lambda, Deno Deploy, and similar platforms.",
  },
  {
    question: "How do retries work?",
    answer:
      "If your endpoint returns an error or times out, QStash retries the delivery with exponential backoff. You can set the number of retries per message. Messages that still fail after the last retry move to a dead letter queue, where you can inspect them and retry them from the console or the API.",
  },
  {
    question: "Can I run cron jobs with QStash?",
    answer:
      "Yes. Create a schedule with a CRON expression and a destination URL, and QStash calls that URL on time. This gives you reliable cron on serverless platforms, with the same retries and logs as any other message.",
  },
  {
    question: "How long can I delay a message?",
    answer:
      "Up to 7 days on the free plan and up to a year on pay as you go. Fixed plans have no maximum delay. You can set a relative delay or an exact delivery time.",
  },
  {
    question: "How do I know a request came from QStash?",
    answer:
      "Every request QStash sends is signed with your signing keys. The SDKs include a receiver that verifies the signature, so your endpoint can reject anything that did not come from QStash.",
  },
  {
    question: "How much does QStash cost?",
    answer:
      "The free plan includes 1,000 messages a day. Pay as you go is $1 per 100K messages, with 50 GB of bandwidth free each month and $0.05 per GB after that. Fixed plans start at $180 a month for 1M messages a day. Each delivery attempt counts as one message, so a retry counts as another message. See the pricing page for details.",
  },
  {
    question: "What is the difference between QStash and Upstash Workflow?",
    answer:
      "QStash delivers individual messages and runs schedules. Upstash Workflow is built on QStash and runs multi-step processes, where each step is retried on its own and its result is saved, so the workflow can sleep, wait for events, and pick up where it left off. Use QStash for single jobs and Workflow when the job has several steps.",
  },
];
