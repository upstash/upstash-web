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
  Parallel = "Parallel Runs",
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
  [Language.AI]: ` const datasetUrl = await context.run("get-dataset-url", async () => {
      return await getDatasetUrl(request.datasetId)
    })

    const { body: dataset } = await context.call("download-dataset", {
      url: datasetUrl,
      method: "GET"
    })

    const response = await context.api.openai.call(
        "Call OpenAI",
        {
          token: "OPENAI_API_KEY",
          operation: "chat.completions.create",
          body: {
            model: "gpt-4o",
            messages: [
              { role: "user", content: "Analyze this data chunk: \${JSON.stringify(dataset)}" },
            ],
          },
        }
      );`,
  [Language.Event]: ` // Step 1: request order processing
  await context.run("request order processing", async () => {
    await requestProcessing(orderId)
  })

  // Step 2: Wait for the order to be processed
  const { eventData, timeout } = await context.waitForEvent(
    "wait for order processing",
    \`order-\${orderId}\`,
    {
      timeout: "10m" // 10 minutes timeout
    }
  );
  
  // Step 3: Log the processed order
  await context.run("process-order", async () => {
    console.log(\`Order \${orderId} processed:\`, processedData);
  });`,
  [Language.Parallel]: `const [coffeeBeansAvailable, cupsAvailable, milkAvailable] =
    await Promise.all([
      ctx.run("check-coffee-beans", () => checkInventory("coffee-beans")),
      ctx.run("check-cups", () => checkInventory("cups")),
      ctx.run("check-milk", () => checkInventory("milk")),
    ])

  // If all ingedients available, brew coffee
  if (coffeeBeansAvailable && cupsAvailable && milkAvailable) {
    const price = await ctx.run("brew-coffee", async () => {
      return await brewCoffee({ style: "cappuccino" })
    })

    await printReceipt(price)
  }`,
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
