import { IconArrowRight } from "@tabler/icons-react";

/**
 * The single announcement strip above the header. One item at a time — it is
 * the first thing on the page, so a second one would cost more attention than
 * either is worth.
 *
 * "Remote" rather than "hosted": it is the term the MCP ecosystem settled on
 * for a server you connect to over HTTP instead of running yourself, and the
 * announcement post and docs use it throughout.
 */
export const AnnouncementBanner = () => {
  return (
    <a
      href="/blog/upstash-remote-mcp-server"
      className="group flex h-9 w-full items-center justify-center gap-1.5 border-b border-emerald-500/20 bg-emerald-50 px-4 text-[13px] leading-none text-emerald-950 transition-colors hover:bg-emerald-100 md:text-sm dark:bg-[#01110d] dark:text-emerald-100 dark:hover:bg-emerald-950"
    >
      <span className="shrink-0 font-medium">New:</span>
      <span className="truncate underline decoration-emerald-600/40 underline-offset-4 transition-colors group-hover:decoration-emerald-600 dark:decoration-emerald-400/40 dark:group-hover:decoration-emerald-400">
        Upstash has a remote MCP server
        <span className="hidden sm:inline">
          {" "}
          — connect your coding agent to your account
        </span>
      </span>
      <IconArrowRight
        size={16}
        strokeWidth={1.8}
        className="shrink-0 transition-transform group-hover:translate-x-0.5"
      />
    </a>
  );
};
