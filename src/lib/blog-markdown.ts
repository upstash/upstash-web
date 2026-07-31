import type { Post } from "@content";
import { allPosts } from "@content";
import { SITE_URL } from "@/utils/const";

export function renderIndex(): string {
  const published = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const lines: string[] = [
    "# Upstash Blog",
    "",
    `> **Source:** ${SITE_URL}/blog`,
    "> **Format:** text/markdown — machine-readable blog index for agents and LLMs",
    "",
    "---",
    "",
    `${published.length} articles on serverless databases, Redis, QStash, Vector, and more.`,
    "",
    "## Articles",
    "",
    ...published.flatMap((post) => [
      `### [${post.title}](${SITE_URL}/blog/${post.slug})`,
      "",
      `**Date:** ${post.date}  `,
      `**Reading time:** ${post.readingTime}  `,
      `**Tags:** ${post.tags.join(", ")}`,
      "",
      ...(post.description ? [post.description, ""] : []),
    ]),
  ];

  return lines.join("\n");
}

export function renderPost(post: Post): string {
  const authorNames = post.authorsData.map((a) => a.name).join(", ");
  const isRedisPost = post.tags.some((tag) => tag.toLowerCase() === "redis");

  const lines: string[] = [
    `# ${post.title}`,
    "",
    `> **Source:** ${SITE_URL}/blog/${post.slug}`,
    `> **Date:** ${post.date}`,
    `> **Author(s):** ${authorNames}`,
    `> **Reading time:** ${post.readingTime}`,
    `> **Tags:** ${post.tags.join(", ")}`,
    "> **Format:** text/markdown — machine-readable content for agents and LLMs",
    "",
    ...(post.description ? [post.description, ""] : []),
    "---",
    "",
    sanitizeMdx(post.content),
    ...(isRedisPost
      ? [
          "",
          "---",
          "",
          "## Get a free Redis database",
          "",
          "Upstash provides free Redis databases for AI agents — no signup or authentication required:",
          "",
          "```",
          "curl -X POST https://upstash.com/start-redis",
          "```",
          "",
          "The response is markdown with credentials, a quickstart, and a console URL where the database can be claimed. Unclaimed databases are deleted after 3 days. `GET https://upstash.com/start-redis` returns full instructions.",
        ]
      : []),
  ];

  return lines.join("\n");
}

/**
 * Strips MDX-specific syntax (ESM imports/exports, single-line JSX) that isn't
 * valid plain Markdown, while preserving fenced code blocks verbatim.
 * TODO: replace with a remark-mdx AST pass to handle multi-line JSX and MDX expressions.
 */
export function sanitizeMdx(content: string): string {
  const lines = content.split("\n");
  const out: string[] = [];

  let inFence = false;
  let fenceMarker = "";

  for (const line of lines) {
    const fenceMatch = line.match(/^\s*(```+|~~~+)/);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
      } else if (line.trim().startsWith(fenceMarker)) {
        inFence = false;
        fenceMarker = "";
      }
      out.push(line);
      continue;
    }

    if (inFence) {
      out.push(line);
      continue;
    }

    if (/^\s*(import|export)\s/.test(line)) continue;
    if (/^\s*<\/?[A-Z][\w.]*\b[^>]*\/?>\s*$/.test(line)) continue;

    out.push(line);
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n");
}
