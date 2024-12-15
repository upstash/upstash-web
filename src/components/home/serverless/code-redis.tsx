"use client";

import cx from "@/utils/cx";
import Prism from "prismjs";
import { HTMLProps, ReactNode, useEffect, useState } from "react";

enum Language {
  Caching = "Caching",
  Session = "Session Store",
  Rate = "Rate Limiting",
  Leaderboards = "Leaderboards",
  Chat = "AI Chat History",
}

export default function CodeRedis() {
  const [lang, setLang] = useState<Language>(Language.Caching);

  useEffect(() => {
    console.log(lang);
    Prism.highlightAll();
  }, [lang]);

  return (
    <div className="grid grid-cols-3 items-start gap-8 rounded-2xl bg-red-950/30 p-6">
      <div className="grid gap-2">
        {Object.values(Language).map((value) => {
          return (
            <button
              key={value}
              className={cx(
                "h-10 cursor-pointer select-none px-6 text-left text-white",
                "rounded-lg transition hover:bg-opacity-20",
                "border border-transparent bg-white bg-opacity-10",
                value === lang && "border-white font-medium",
              )}
              onClick={() => setLang(value)}
            >
              {value}
            </button>
          );
        })}
      </div>

      {/* body */}
      <div className="col-span-2">
        {Object.values(Language).map((value) => {
          return (
            <Pre key={value} hidden={value !== lang}>
              <code className="lang-js">{CODE[value]}</code>
            </Pre>
          );
        })}
      </div>
    </div>
  );
}

function Pre({
  children,
  ...props
}: HTMLProps<HTMLPreElement> & {
  children: ReactNode;
}) {
  return (
    <pre
      className="no-scrollbar !m-0 !bg-transparent !p-0 !font-[inherit] !text-[.9em]"
      {...props}
    >
      {children}
    </pre>
  );
}

const CODE = {
  [Language.Caching]: `import { Redis } from '@upstash/redis';

const redis = new Redis({ 
  url: 'UPSTASH_REDIS_REST_URL', 
  token: 'UPSTASH_REDIS_REST_TOKEN'
});

const data = await redis.get('key');`,
  [Language.Session]: `var b = 3;`,
  [Language.Rate]: `var c = 4;`,
  [Language.Leaderboards]: `var d = 5;`,
  [Language.Chat]: `var e = 6;`,
};
