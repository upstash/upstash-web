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
  [Language.RAG]: `context = index.query(vector=question_embedding, top_k=5, include_metadata=True)
prompt = f"Question:{question}\\n\\nContext: {context}"

response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", 
            "content": 'You are a helpful assistant, answer the question using the context.'},
                      {"role": "user", "content": prompt}
            ])`,
  [Language.Cache]: `const semanticCache = new SemanticCache({ index, minProximity: 0.95 });

await semanticCache.set("Capital of Turkey", "Ankara");
// 👇 outputs: "Ankara"
const result = await semanticCache.get("What is Turkey's capital?");

await semanticCache.set("year in which the Berlin wall fell", "1989");
// 👇 outputs "1989"
const result = await semanticCache.get("what's the year the Berlin wall destroyed?");
}
`,
  [Language.Search]: `store = UpstashVectorStore(
    embedding=True,  # Embedding option enabled
)

documents = [
    Document(page_content="Upstash Vector is a scalable vector database."),
    Document(page_content="LangChain is a framework for building intelligent apps."),
]

store.add_documents(documents)

# Perform a similarity search
query = "What is LangChain?"
results = store.similarity_search(query, k=3)`,
};
