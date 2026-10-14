"use client";

import { trackEvent } from "@/lib/analytics";
import cx from "@/utils/cx";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const MCP_URL = "https://mcp.upstash.com/mcp";

const CLIENTS = [
  {
    name: "Claude Code",
    hint: "Run in your terminal, then type /mcp and choose Authenticate",
    code: `claude mcp add --scope user --transport http upstash ${MCP_URL}`,
  },
  {
    name: "Codex",
    hint: "Add to ~/.codex/config.toml",
    code: `[mcp_servers.upstash]
url = "${MCP_URL}"`,
  },
  {
    name: "Cursor",
    hint: "Add to ~/.cursor/mcp.json",
    code: `{
  "mcpServers": {
    "upstash": { "url": "${MCP_URL}" }
  }
}`,
  },
  {
    name: "OpenCode",
    hint: "Add to ~/.config/opencode/opencode.json",
    code: `{
  "mcp": {
    "upstash": { "type": "remote", "url": "${MCP_URL}" }
  }
}`,
  },
];

export default function McpSetupTabs() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const client = CLIENTS[active];

  useEffect(() => {
    if (!copied) {
      return;
    }
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    await navigator.clipboard.writeText(client.code);
    setCopied(true);
    trackEvent("copy_code", {
      slug: `box-mcp-${client.name.toLowerCase().replace(" ", "-")}`,
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-black text-left">
      <div
        role="tablist"
        aria-label="MCP client"
        className="no-scrollbar flex h-10 overflow-x-auto bg-zinc-800 px-1 pt-2"
      >
        {CLIENTS.map(({ name }, idx) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={active === idx}
            onClick={() => {
              setActive(idx);
              setCopied(false);
            }}
            className={cx(
              "flex h-full shrink-0 items-center whitespace-nowrap px-3 text-[13px] sm:px-5",
              active === idx
                ? "border-t-2 border-emerald-500 bg-black text-white"
                : "border-t-2 border-transparent text-white/60 hover:text-white",
            )}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 px-6 pt-5">
        <p className="text-[13px] text-white/50">{client.hint}</p>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy to clipboard"
          className={cx(
            "flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] transition",
            "bg-white/[0.08] hover:bg-white/[0.16]",
            copied ? "text-emerald-400" : "text-white/70",
          )}
        >
          {copied ? (
            <IconCheck size={14} stroke={2} />
          ) : (
            <IconCopy size={14} stroke={2} />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="no-scrollbar overflow-x-auto px-6 pb-6 pt-4 font-mono text-[.86em] leading-relaxed text-white">
        <code>{client.code}</code>
      </pre>
    </div>
  );
}
