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
  [Language.Customer]: `await context.run("new-signup", async () => {
  await sendEmail("Welcome to the platform", email)
})

await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)

while (true) {
  const state = await context.run("check-user-state", async () => {
    return await getUserState()
  })

  if (state === "non-active") {
    await context.run("send-email-non-active", async () => {
      await sendEmail("Email to non-active users", email)
    })
  } 
  await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
}`,
};
