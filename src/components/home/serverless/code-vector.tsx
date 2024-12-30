"use client";

import {
  CodePre,
  CodeTabButton,
} from "@/components/home/serverless/code-redis";
import Prism from "prismjs";
import { useEffect, useState } from "react";

enum Language {
  RAG = "RAG",
  Cache = "Semantic cache",
  Search = "Semantic search",
}

export default function CodeRedis() {
  const [lang, setLang] = useState<Language>(Language.RAG);

  useEffect(() => {
    console.log(lang);
    Prism.highlightAll();
  }, [lang]);

  return (
    <div className="code-vector bg-pre-bg grid grid-cols-3 items-start gap-8">
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
  [Language.RAG]: `import { Redis } from '@upstash/redis';

const redis = new Redis({ 
  url: 'UPSTASH_REDIS_REST_URL', 
  token: 'UPSTASH_REDIS_REST_TOKEN'
});

const data = await redis.get('key');`,
  [Language.Cache]: `var b = 3;`,
  [Language.Search]: `var c = 4;`,
};
