"use client";

import {
  CodePre,
  CodeTabButton,
} from "@/components/home/serverless/code-redis";
import Prism from "prismjs";
import { useEffect, useState } from "react";

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
    <div className="grid grid-cols-3 items-start gap-8 rounded-2xl bg-blue-950/30 p-6">
      <div className="grid gap-2">
        {Object.values(Language).map((value) => {
          return (
            <CodeTabButton
              key={value}
              active={value === lang}
              onClick={() => setLang(value)}
            >
              {value}
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
  [Language.Scheduling]: `import { Redis } from '@upstash/redis';

const redis = new Redis({ 
  url: 'UPSTASH_REDIS_REST_URL', 
  token: 'UPSTASH_REDIS_REST_TOKEN'
});

const data = await redis.get('key');`,
  [Language.Auto]: `var b = 3;`,
  [Language.Queues]: `var c = 4;`,
  [Language.Callbacks]: `var c = 4;`,
};
