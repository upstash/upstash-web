import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
import { IconArrowUpRight } from "@tabler/icons-react";

export default function SectionMcp() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-lg">
        <PageHeaderTitle as="h2">
          Use Box from your coding agent
        </PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Connect Claude Code, Cursor, Codex or OpenCode to the Upstash MCP
          server and your agent can create boxes, run commands, open pull
          requests, publish preview URLs and drive a browser, all on a remote
          machine instead of your laptop.
        </PageHeaderDesc>

        <div className="mt-12 grid gap-3 text-left md:mt-16 md:grid-cols-3 md:gap-4">
          {CLIENTS.map(({ name, file, code }) => (
            <div
              key={name}
              className={cx(
                "flex min-w-0 flex-col gap-3 p-5 md:p-6",
                "rounded-3xl border-2 border-bg-mute bg-bg-mute",
              )}
            >
              <h3 className="font-display text-lg font-semibold">{name}</h3>
              <p className="text-sm text-text-mute">{file}</p>
              <pre className="overflow-x-auto rounded-xl bg-bg p-4 font-mono text-sm">
                <code>{code}</code>
              </pre>
            </div>
          ))}
        </div>

        <p className="mt-8 text-text-mute">
          Server URL:{" "}
          <code className="font-mono text-text">
            https://mcp.upstash.com/mcp
          </code>
          . Sign in with OAuth on the first tool call, or pass an API key for
          CI.{" "}
          <a
            href="https://upstash.com/docs/agent-resources/mcp"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-0.5 text-primary hover:underline"
          >
            MCP setup guide
            <IconArrowUpRight size={16} />
          </a>
        </p>
      </Container>
    </section>
  );
}

const CLIENTS = [
  {
    name: "Claude Code",
    file: "Run in your terminal, then /mcp → Authenticate",
    code: "claude mcp add --scope user --transport http upstash https://mcp.upstash.com/mcp",
  },
  {
    name: "Cursor",
    file: "~/.cursor/mcp.json",
    code: `{
  "mcpServers": {
    "upstash": { "url": "https://mcp.upstash.com/mcp" }
  }
}`,
  },
  {
    name: "Codex",
    file: "~/.codex/config.toml",
    code: `[mcp_servers.upstash]
url = "https://mcp.upstash.com/mcp"`,
  },
];
