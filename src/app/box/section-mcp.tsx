import McpSetupTabs from "@/app/box/mcp-setup-tabs";
import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
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
          Connect Claude Code, Codex, Cursor or OpenCode to the Upstash MCP
          server and your agent can create boxes, run commands, open pull
          requests, publish preview URLs and drive a browser, all on a remote
          machine instead of your laptop.
        </PageHeaderDesc>

        <div className="mx-auto mt-12 max-w-screen-md md:mt-16">
          <McpSetupTabs />
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
