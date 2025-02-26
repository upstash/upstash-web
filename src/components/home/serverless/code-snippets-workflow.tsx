import { CodeSnippets, CodeSnippetsData } from "./code-snippets";

export const CodeSnippetsWorkflow = () => {
  return <CodeSnippets data={data} />;
};

const data: CodeSnippetsData = [
  {
    title: "AI Data Processing",
    snippets: [
      {
        language: "js",
        code: `
// Step 1: Get the dataset URL
const datasetUrl = await context.run("get-dataset-url", async () => {
  return await getDatasetUrl(datasetId)
});

// Step 2: Download the dataset
const { body: dataset } = await context.call("download-dataset", {
  url: datasetUrl,
  method: "GET"
});

// Step 3: Analyze the dataset with LLM
const response = await context.api.openai.call(
  "call-openai",
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
);
        `,
      },
      {
        language: "py",
        code: `
# Step 1: Get the dataset URL
async def _get_url():
    return await get_dataset_url(dataset_id)

dataset_url = await context.run("get-dataset-url", _get_url)

# Step 2: Download the dataset
response = await context.call("download-dataset", url=dataset_url, method="GET")
dataset = response.body

# Step 3: Analyze the dataset with LLM
response = await context.api.openai.call(
    "call-openai",
    token="OPENAI_API_KEY",
    operation="chat.completions.create",
    body={
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "user",
                "content": f"Analyze this data chunk: {json.dumps(dataset)}",
            }
        ],
    },
)
        `,
      },
    ],
  },
  {
    title: "Event Based Workflows",
    snippets: [
      {
        language: "js",
        code: `
// Step 1: Request order processing
await context.run("request-order-processing", async () => {
  await requestProcessing(orderId);
});

// Step 2: Wait for the order to be processed
const { eventData, timeout } = await context.waitForEvent(
  "wait-for-order-processing",
  \`order-\${orderId}\`,
  {
    timeout: "10m" // 10 minutes timeout
  }
);

// Step 3: Log the processed order
await context.run("process-order", async () => {
  console.log(\`Order \${orderId} processed:\`, eventData);
});
        `,
      },
    ],
  },
  {
    title: "Parallel Runs",
    snippets: [
      {
        language: "js",
        code: `
const [coffeeBeansAvailable, cupsAvailable, milkAvailable] =
  await Promise.all([
    context.run("check-coffee-beans", () => checkInventory("coffee-beans")),
    context.run("check-cups", () => checkInventory("cups")),
    context.run("check-milk", () => checkInventory("milk")),
  ]);

// If all ingredients available, brew coffee
if (coffeeBeansAvailable && cupsAvailable && milkAvailable) {
  const price = await context.run("brew-coffee", async () => {
    return await brewCoffee({ style: "cappuccino" });
  });

  await printReceipt(price);
};
        `,
      },
    ],
  },
  {
    title: "Customer Onboarding",
    snippets: [
      {
        language: "js",
        code: `
await context.run("new-signup", async () => {
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
};
        `,
      },
      {
        language: "py",
        code: `
async def _send_welcome():
    await send_email("Welcome to the platform", email)

await context.run("new-signup", _send_welcome)

await context.sleep("wait-for-3-days", "3d")

while True:
    async def _check_state():
        return await get_user_state()
    
    state = await context.run("check-user-state", _check_state)

    if state == "non-active":
        async def _send_reminder():
            await send_email("Email to non-active users", email)
        
        await context.run("send-email-non-active", _send_reminder)

    await context.sleep("wait-for-1-month", "30d")
        `,
      },
    ],
  },
];
