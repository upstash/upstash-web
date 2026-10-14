// Questions mirror real search intent for "ai agent sandbox", "cloud computer for ai agents"
// and "run claude code in the cloud". Pricing answers must match public/faq/box.json.
export const BOX_FAQ = [
  {
    question: "What is Upstash Box?",
    answer:
      "Upstash Box is a persistent cloud computer for AI agents, with coding agents built in. Each box is an isolated Linux container with a shell, a filesystem that persists, git, and a headless browser. You create one with the TypeScript or Python SDK, give the agent inside a task, and get the result back through an API.",
  },
  {
    question: "What is an AI agent sandbox?",
    answer:
      "An AI agent sandbox is an isolated environment where an agent runs the code it writes. It has its own filesystem, processes and network, so a wrong command or a malicious package cannot reach your machine, your data or other users. Some sandboxes only run code you send them; Upstash Box also runs the agent itself inside the sandbox.",
  },
  {
    question: "Which coding agents can run in a box?",
    answer:
      "Claude Code, Codex, OpenCode and Cursor are built in. You choose the agent and the model when you create a box and run it with box.agent.run(). You can also bring your own harness, or skip the built-in agent and drive the box's shell, file and git APIs from your own agent loop.",
  },
  {
    question: "Can I run Claude Code in the cloud with Upstash Box?",
    answer:
      "Yes. Create a box with Claude Code as its agent and send it a prompt. It works in the box's own workspace, can clone your repository, run tests and open a pull request, and every run reports what it cost. It keeps working after you close your laptop.",
  },
  {
    question: "Do boxes keep their files between sessions?",
    answer:
      "Yes. A standard box pauses automatically when it is idle. Its storage is preserved, including the cloned repository, installed dependencies and files, but running processes stop until the next request wakes the box. Snapshots save a box's disk so new boxes can start from it.",
  },
  {
    question: "Can a box stay on all the time?",
    answer:
      "Yes. A keep-alive box never pauses, so a personal agent, a bot or a server always has a warm machine. Keep-alive boxes have a fixed monthly price by size: $8 for Small, $16 for Medium and $32 for Large. An init command can start your process every time the box boots.",
  },
  {
    question: "How much does Upstash Box cost?",
    answer:
      "The free plan includes up to 10 concurrent boxes, 5 CPU hours per month and $1 of LLM usage per month. Pay as you go bills active CPU only: $0.10, $0.20 or $0.40 per active CPU hour for Small, Medium and Large boxes. Memory is not billed, and an idle box costs nothing for CPU. Storage is $0.10 per GB per month, including snapshots. Keep-alive boxes are $8 to $32 per month with no usage charges. See the pricing page for details.",
  },
  {
    question: "How are boxes isolated?",
    answer:
      "Every box runs in its own container with a dedicated filesystem, process tree and network stack. Boxes cannot reach or observe each other, and they cannot reach private networks or cloud metadata services. A network policy can limit outbound traffic to an allowlist, and Attach Headers inject secret HTTP headers on the host so API keys never enter the box.",
  },
  {
    question: "Can I use my own model API key?",
    answer:
      "Yes. Bring your own key for any LLM provider on every plan. Without one, boxes use Upstash-provided model usage, capped at $1 per month on the free plan and $100 per month on pay as you go.",
  },
  {
    question: "Where do boxes run?",
    answer:
      "Boxes currently run on AWS us-east-1, with more regions planned. Boxes come in three sizes, from 2 vCPU and 4 GB of memory up to 8 vCPU and 16 GB, with Node.js, Python, Go, Ruby and Rust runtimes. Custom Docker images are planned.",
  },
  {
    question:
      "How does Upstash Box compare to E2B, Daytona and Vercel Sandbox?",
    answer:
      "Those give you an isolated machine and leave the agent loop to you. Box runs the coding agent inside the sandbox, with git-to-pull-request, a browser and schedules built in, and bills active CPU with memory free. E2B and Vercel Sandbox use microVMs with their own kernel, a stronger boundary than Box's container. Daytona offers GPUs, and both E2B and Daytona offer EU regions. Our comparison of 15 sandbox providers covers the details.",
  },
];
