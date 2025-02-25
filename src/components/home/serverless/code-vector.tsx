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
    <div className="flex w-full min-w-0 flex-col items-start gap-8 rounded-2xl bg-pre-bg p-6 sm:col-span-3 sm:flex-row md:gap-12">
      <div className="flex flex-wrap gap-2 sm:grid">
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
      <div className="w-full overflow-y-auto overflow-x-scroll">
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
  [Language.RAG]: `import { Index } from "@upstash/vector";
const index = new Index();

const context = await index.query({
  data: "What is Quantum Mechanics?",
  topK: 5,
  includeMetadata: true,
});

const prompt = \`Question: \${question} - Context: \${JSON.stringify(context)}\`;

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "You are a helpful assistant, answer the question using the context." },
    { role: "user", content: prompt },
  ],
});`,

  [Language.Cache]: `import { Index } from "@upstash/vector";
import { SemanticCache } from "@upstash/semantic-cache";

const index = new Index();
const semanticCache = new SemanticCache({ index, minProximity: 0.95 });

await semanticCache.set("Capital of Turkey", "Ankara");
// 👇 outputs: "Ankara"
const result1 = await semanticCache.get("What is Turkey's capital?");

await semanticCache.set("year in which the Berlin wall fell", "1989");
// 👇 outputs "1989"
const result2 = await semanticCache.get("what's the year the Berlin wall destroyed?");`,

  [Language.Search]: `import { Index } from "@upstash/vector";
const index = new Index();

const documents = [
  { id: "doc1", data: "Upstash Vector is a scalable vector database." },
  { id: "doc2", data: "LangChain is a framework for building intelligent apps." },
];

await index.upsert(documents);

// Perform a similarity search
const query = "What is LangChain?";
const results = await store.query({ data: query, topK: 3 });`,
};
