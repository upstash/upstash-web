import { CodeSnippets, CodeSnippetsData } from "./code-snippets";

export const CodeSnippetsBox = () => {
  return <CodeSnippets data={data} codeBodyClassName="h-[420px]" />;
};

const data: CodeSnippetsData = [
  {
    title: "Run an agent",
    snippets: [
      {
        language: "js",
        code: `
import { Box, Agent, ClaudeCode } from "@upstash/box"

const box = await Box.create({
  runtime: "node",
  agent: {
    provider: Agent.ClaudeCode,
    model: ClaudeCode.Opus_4_6,
    apiKey: process.env.ANTHROPIC_API_KEY,
  },
})

const run = await box.agent.run({
  prompt: "Set up a Next.js project with Tailwind",
})

console.log(run.result)
`,
      },
    ],
  },
  {
    title: "Open a PR",
    snippets: [
      {
        language: "js",
        code: `
import { Box, Agent, ClaudeCode } from "@upstash/box"

const box = await Box.create({
  runtime: "node",
  agent: {
    provider: Agent.ClaudeCode,
    model: ClaudeCode.Opus_4_6,
    apiKey: process.env.ANTHROPIC_API_KEY,
  },
  git: { token: process.env.GITHUB_TOKEN },
})

await box.git.clone({
  repo: "https://github.com/acme/web-app",
  branch: "main",
})

await box.agent.run({
  prompt: "Fix the broken tests, commit and open a PR.",
})
`,
      },
    ],
  },
  {
    title: "Upload & analyze a PDF",
    snippets: [
      {
        language: "js",
        code: `
import { Box, Agent, ClaudeCode } from "@upstash/box"
import { z } from "zod"

const box = await Box.create({
  runtime: "node",
  agent: {
    provider: Agent.ClaudeCode,
    model: ClaudeCode.Opus_4_6,
    apiKey: process.env.ANTHROPIC_API_KEY,
  },
})

await box.files.upload([
  { path: "./data/report.pdf", destination: "/work/report.pdf" },
])

const run = await box.agent.run({
  prompt: "Read /work/report.pdf and extract key metrics.",
  responseSchema: z.object({
    revenue: z.number(),
    growth: z.number(),
  }),
})

console.log(run.result)
`,
      },
    ],
  },
  {
    title: "Expose a port",
    snippets: [
      {
        language: "js",
        code: `
import { Box } from "@upstash/box"

const box = await Box.create({ runtime: "node" })

// Start a web server on port 3000
await box.exec.command("cd /work && npm install express")
await box.files.write({
  path: "/work/server.js",
  content: \`
    const express = require('express')
    const app = express()
    app.get('/', (req, res) => res.send('Hello from Box!'))
    app.listen(3000)
  \`,
})
await box.exec.command("node /work/server.js &")

// Create a preview URL
const preview = await box.getPreviewUrl(3000)
`,
      },
    ],
  },
];
