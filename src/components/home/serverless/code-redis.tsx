"use client";

import cx from "@/utils/cx";
import { IconChevronRight } from "@tabler/icons-react";
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
    <pre className={cx("no-scrollbar !text-[.86em]", className)} {...props} />
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
        "flex h-10 select-none items-center gap-4 px-6 text-left text-white/80",
        "cursor-pointer rounded-lg transition",
        "bg-white bg-opacity-10",
        "hover:bg-opacity-20",
        active && "bg-opacity-100 !text-text hover:bg-opacity-100",
        className,
      )}
      {...props}
    />
  );
}
