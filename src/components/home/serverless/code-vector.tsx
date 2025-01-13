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
    <div className="col-span-3 flex w-full items-start gap-8 rounded-2xl bg-pre-bg p-6">
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
      {/*body*/}
      <div className="col-span-2">
        {Object.values(Language).map((value) => {
          return (
            <CodePre key={value} hidden={value !== lang}>
              <code className="lang-js">{CODE[value]}</code>
            </CodePre>
          );
        })}
      </div>
      ;
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
