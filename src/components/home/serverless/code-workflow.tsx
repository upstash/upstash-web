"use client";

import cx from "@/utils/cx";
import Prism from "prismjs";
import { HTMLProps, ReactNode, useEffect, useState } from "react";

enum Language {
  AI = "AI Data Processing",
  Event = "Event Based Workflows",
  Auth = "Auth Lifecycle",
  Customer = "Customer Onboarding",
}

export default function CodeWorkflow() {
  const [lang, setLang] = useState<Language>(Language.AI);

  useEffect(() => {
    console.log(lang);
    Prism.highlightAll();
  }, [lang]);

  return (
    <div className="grid grid-cols-3 items-start gap-8 rounded-2xl bg-purple-950/30 p-6">
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
  [Language.AI]: `import { Redis } from '@upstash/redis';

const redis = new Redis({ 
  url: 'UPSTASH_REDIS_REST_URL', 
  token: 'UPSTASH_REDIS_REST_TOKEN'
});

const data = await redis.get('key');`,
  [Language.Event]: `var b = 3;`,
  [Language.Auth]: `var c = 4;`,
  [Language.Customer]: `var d = 5;`,
};
