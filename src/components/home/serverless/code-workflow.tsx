"use client";

import {
  CodePre,
  CodeTabButton,
} from "@/components/home/serverless/code-redis";
import Prism from "prismjs";
import { useEffect, useState } from "react";

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
    <div className="grid grid-cols-3 items-start gap-8 rounded-2xl bg-purple-950/10 p-6">
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
  [Language.AI]: `import { serve } from "@upstash/workflow/nextjs";

export const { POST } = serve<UserRequest>(
  async (context) => {
    const input = context.requestPayload;

    await context.sleep("sleep", 10);

    const p1 = context.run("retrieveEmail", async () => {
      return retrieveEmail(input.id);
    });

    const p2 = context.run("askllm", async () => {
      return fetchFromLLm(input.question);
    });

    await Promise.all([p1, p2])
  },
);`,
  [Language.Event]: `var b = 3;`,
  [Language.Auth]: `var c = 4;`,
  [Language.Customer]: `var d = 5;`,
};
