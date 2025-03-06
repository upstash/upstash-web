import { CodeSnippets, CodeSnippetsData } from "./code-snippets";

export const CodeSnippetsQStash = () => {
  return <CodeSnippets data={data} />;
};

const data: CodeSnippetsData = [
  {
    title: "Scheduling",
    snippets: [
      {
        language: "js",
        code: `
import { Client } from "@upstash/qstash";
const client = new Client({ token: "<QSTASH_TOKEN>" });

await client.schedules.create({
  destination: "https://example.com",
  cron: "* * * * *",
});
        `,
      },
      {
        language: "py",
        code: `
from qstash import QStash
client = QStash("<QSTASH_TOKEN>")

client.schedule.create(
    destination="https://example.com",
    cron="* * * * *",
)
        `,
      },
    ],
  },
  {
    title: "Auto retries",
    snippets: [
      {
        language: "js",
        code: `
import { Client } from "@upstash/qstash";
const client = new Client({ token: "<QSTASH_TOKEN>" });

const res = await client.publishJSON({
  url: "https://my-api...",
  body: { hello: "world" },
  retries: 2,
});
        `,
      },
      {
        language: "py",
        code: `
from qstash import QStash
client = QStash("<QSTASH_TOKEN>")

client.message.publish_json(
    url="https://my-api...",
    body={"hello": "world"},
    retries=2,
)
        `,
      },
    ],
  },
  {
    title: "Queues",
    snippets: [
      {
        language: "js",
        code: `
import { Client } from "@upstash/qstash";
const client = new Client({ token: "<QSTASH_TOKEN>" });

const queue = client.queue({
  queueName: "my-queue"
})

await queue.enqueueJSON({
  url: "https://example.com",
  body: {
    "Hello": "World"
  }
})
        `,
      },
      {
        language: "py",
        code: `
from qstash import QStash
client = QStash("<QSTASH_TOKEN>")

queue_name = "my-queue"
client.queue.upsert(queue_name)

client.message.enqueue_json(
    queue=queue_name,
    url="https://example.com",
    body={"Hello": "World"}
)
        `,
      },
    ],
  },
  {
    title: "Callbacks",
    snippets: [
      {
        language: "js",
        code: `
import { Client } from "@upstash/qstash";
const client = new Client({ token: "<QSTASH_TOKEN>" });

const res = await client.publishJSON({
  url: "https://my-api...",
  body: { hello: "world" },
  callback: "https://my-callback...",
});
        `,
      },
      {
        language: "py",
        code: `
from qstash import QStash
client = QStash("<QSTASH_TOKEN>")

client.message.publish_json(
    url="https://my-api...",
    body={"hello": "world"},
    callback="https://my-callback...",
)
        `,
      },
    ],
  },
];
