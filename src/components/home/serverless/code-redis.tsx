"use client";

import cx from "@/utils/cx";
import Prism from "prismjs";
import React, { useEffect, useState } from "react";

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

export function CodePre({ className, ...props }: React.ComponentProps<"pre">) {
  return (
    <pre
      className={cx(
        "no-scrollbar !m-0 !bg-transparent !p-0 !font-[inherit] !text-[.9em]",
        className,
      )}
      {...props}
    />
  );
}

export function CodeTabButton({
  active,
  className,
  ...props
}: React.ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button
      className={cx(
        "h-10 cursor-pointer select-none px-6 text-left text-white/80",
        "rounded-lg transition hover:bg-opacity-20",
        "border border-transparent bg-white bg-opacity-10",
        active && "border-white/50 font-medium text-white",
        className,
      )}
      {...props}
    />
  );
}
