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

      {/* body */}
      <div className="w-full overflow-y-auto overflow-x-scroll">
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
  [Language.AI]: `// Step 1: Get the dataset URL
const datasetUrl = await context.run("get-dataset-url", async () => {
  return await getDatasetUrl(request.datasetId)
});

// Step 2: Download the dataset
const { body: dataset } = await context.call("download-dataset", {
  url: datasetUrl,
  method: "GET"
});

// Step 3: Analyze the dataset with LLM
const response = await context.api.openai.call(
  "Call OpenAI",
  {
    token: "OPENAI_API_KEY",
    operation: "chat.completions.create",
    body: {
      model: "gpt-4o",
      messages: [
        { role: "user", content: \`Analyze this data chunk: \${JSON.stringify(dataset)}\` },
      ],
    },
  }
);`,
  [Language.Event]: `// Step 1: request order processing
await context.run("request order processing", async () => {
  await requestProcessing(orderId);
});

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
  console.log(\`Order \${orderId} processed:\`, eventData);
});`,
  [Language.Parallel]: `const [coffeeBeansAvailable, cupsAvailable, milkAvailable] =
  await Promise.all([
    context.run("check-coffee-beans", () => checkInventory("coffee-beans")),
    context.run("check-cups", () => checkInventory("cups")),
    context.run("check-milk", () => checkInventory("milk")),
  ]);

// If all ingedients available, brew coffee
if (coffeeBeansAvailable && cupsAvailable && milkAvailable) {
  const price = await context.run("brew-coffee", async () => {
    return await brewCoffee({ style: "cappuccino" });
  });

  await printReceipt(price);
};`,
  [Language.Customer]: `await context.run("new-signup", async () => {
  await sendEmail("Welcome to the platform", email);
});

await context.sleep("wait-for-3-days", "3d");

while (true) {
  const state = await context.run("check-user-state", async () => {
    return await getUserState();
  });

  if (state === "non-active") {
    await context.run("send-email-non-active", async () => {
      await sendEmail("Email to non-active users", email);
    });
  };

  await context.sleep("wait-for-1-month", "30d");
};`,
};
