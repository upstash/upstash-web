"use client";

import {
  CodePre,
  CodeTabButton,
} from "@/components/home/serverless/code-redis";
import cx from "@/utils/cx";
import { IconChevronRight } from "@tabler/icons-react";
import Prism from "prismjs";
import React, { useEffect, useState } from "react";

enum Language {
  Scheduling = "Scheduling",
  Auto = "Auto retries",
  Queues = "Queues",
  Callbacks = "Callbacks",
}

export default function CodeRedis() {
  const [lang, setLang] = useState<Language>(Language.Scheduling);

  useEffect(() => {
    console.log(lang);
    Prism.highlightAll();
  }, [lang]);

  return (
    <div className="flex w-full items-start gap-8 rounded-2xl bg-pre-bg p-6 sm:col-span-3">
      <div className="grid gap-2">
        {Object.values(Language).map((value) => {
          const active = value === lang;
          return (
            <CodeTabButton
              key={value}
              active={active}
              onClick={() => setLang(value)}
            >
              <span className="grow">{value}</span>
              <IconChevronRight
                className={cx("shrink-0 opacity-0", active && "opacity-50")}
                size={20}
                stroke={1.5}
              />
            </CodeTabButton>
          );
        })}
      </div>

      {/* body */}
      <div className="col-span-2">
        {Object.values(Language).map((value) => {
          return (
            <CodePre key={value} hidden={value !== lang}>
              <code className="lang-js">{CODE[value]}</code>
            </CodePre>
          );
        })}
      </div>
    </div>
  );
}

const CODE = {
  [Language.Scheduling]: `import { Client } from "@upstash/qstash";

const client = new Client({ token: "QSTASH_TOKEN" });
await client.schedules.create({
  destination: "https://example.com",
  cron: "* * * * *",
});
`,
  [Language.Auto]: `const client = new Client({ token: "QSTASH_TOKEN" });
const res = await client.publishJSON({
  url: "https://my-api...",
  body: { hello: "world" },
  retries: 2,
});`,
  [Language.Queues]: `const client = new Client({ token: "QSTASH_TOKEN" });

const queue = client.queue({
  queueName: "my-queue"
})

await queue.enqueueJSON({
  url: "https://example.com",
  body: {
    "Hello": "World"
  }
})`,
  [Language.Callbacks]: `import { Client } from "@upstash/qstash";

const client = new Client({ token: "QSTASH_TOKEN" });
const res = await client.publishJSON({
  url: "https://my-api...",
  body: { hello: "world" },
  callback: "https://my-callback...",
});`,
};
