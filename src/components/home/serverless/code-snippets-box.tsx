import { CodeSnippets, CodeSnippetsData } from "./code-snippets";

export const CodeSnippetsBox = () => {
  return <CodeSnippets data={data} />;
};

const data: CodeSnippetsData = [
  {
    title: "Create a Box and run an agent",
    snippets: [
      {
        language: "js",
        code: `
import { Box, ClaudeCode } from "@upstash/box"

const box = await Box.create({
  runtime: "node",
  agent: {
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
    title: "Git workflows with AI agents",
    snippets: [
      {
        language: "js",
        code: `
import { Box, ClaudeCode } from "@upstash/box"

const box = await Box.create({
  runtime: "node",
  agent: {
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
    title: "File management",
    snippets: [
      {
        language: "js",
        code: `
import { Box, ClaudeCode } from "@upstash/box"
import { z } from "zod"

const box = await Box.create({
  runtime: "node",
  agent: {
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
];
