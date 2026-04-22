#!/usr/bin/env node
/**
 * One-off script: consolidate and normalize tags across every post in
 * `data/blog/*.mdx`.
 *
 * Rules applied:
 *   1. Lowercase + trim + collapse whitespace/underscores to hyphens.
 *   2. Rename tags per SINGLE_MERGES (1:1 renames / typo fixes).
 *   3. Collapse over-split tags per MULTI_MERGES (e.g. `rate` + `limit`
 *      written as two separate tags become `ratelimit`).
 *   4. Ensure every post tagged `semantic-search` also carries `search`.
 *   5. Deduplicate, preserving order.
 *
 * The script only rewrites the `tags: [...]` block in the YAML front matter;
 * everything else is left alone. Runs in-place on the repository checkout.
 */

import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = path.resolve(process.argv[2] ?? "data/blog");

const normalize = (tag) =>
  tag
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-");

// Single-tag renames: every key on the left becomes the value on the right.
const SINGLE_MERGES = {
  // Rate limiting family
  "rate-limiting": "ratelimit",
  ratelimiting: "ratelimit",
  "rate-limit": "ratelimit",
  ratelimiter: "ratelimit",

  // Next.js
  "next.js": "nextjs",

  // AWS Lambda
  awslambda: "aws-lambda",
  lambda: "aws-lambda",

  // SvelteKit
  "svelte-kit": "sveltekit",

  // Nuxt
  nuxtjs: "nuxt",

  // Announcement
  announce: "announcement",

  // Typos
  authenticatio: "authentication",

  // Webhooks
  webhooks: "webhook",

  // Scheduler
  schedule: "scheduler",
  scheduling: "scheduler",

  // Connectors
  connector: "connectors",

  // Caching
  caching: "cache",
};

// Over-split phrases. If every tag in `from` is present, remove them all and
// add `to`. Order matters: longest/most specific first.
const MULTI_MERGES = [
  { from: ["rate", "limit"], to: "ratelimit" },
  { from: ["environment", "variable", "env"], to: "environment-variables" },
  { from: ["environment", "variable"], to: "environment-variables" },
  { from: ["feature", "flag"], to: "feature-flags" },
  { from: ["data", "driven"], to: "data-driven" },
];

/**
 * Matches `tags: [ ... ]` in the YAML front matter, including multi-line
 * inline arrays. We deliberately do NOT attempt to match block-sequence
 * form (`tags:\n  - foo`) because no posts in this repo use it today.
 */
const TAGS_RE = /^tags:\s*\[([\s\S]*?)\]\s*$/m;

function rewriteTags(tags) {
  // 1. Normalize casing / spacing.
  let out = tags.map(normalize).filter(Boolean);

  // 2. Apply multi-tag merges.
  for (const { from, to } of MULTI_MERGES) {
    const have = from.every((t) => out.includes(t));
    if (!have) {
      continue;
    }
    out = out.filter((t) => !from.includes(t));
    out.push(to);
  }

  // 3. Apply single renames.
  out = out.map((t) => SINGLE_MERGES[t] ?? t);

  // 4. semantic-search ⇒ also search.
  if (out.includes("semantic-search") && !out.includes("search")) {
    out.unshift("search");
  }

  // 5. Dedupe, preserve order.
  return Array.from(new Set(out));
}

function processFile(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  const fmEnd = src.indexOf("\n---", 4);
  if (!src.startsWith("---\n") || fmEnd === -1) {
    return null;
  }

  const fm = src.slice(0, fmEnd);
  const rest = src.slice(fmEnd);

  const match = fm.match(TAGS_RE);
  if (!match) {
    return null;
  }

  const rawTags = match[1]
    .split(",")
    .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean);
  const newTags = rewriteTags(rawTags);

  const newLine = `tags: [${newTags.join(", ")}]`;
  const newFm = fm.replace(TAGS_RE, newLine);
  if (newFm === fm) {
    return null;
  }

  fs.writeFileSync(filePath, newFm + rest);
  return { file: path.basename(filePath), before: rawTags, after: newTags };
}

function main() {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => path.join(BLOG_DIR, f));

  const changes = [];
  for (const f of files) {
    const change = processFile(f);
    if (change) {
      changes.push(change);
    }
  }

  console.log(`Updated ${changes.length} file(s) in ${BLOG_DIR}`);
  for (const c of changes) {
    console.log(`\n  ${c.file}`);
    console.log(`    before: [${c.before.join(", ")}]`);
    console.log(`    after:  [${c.after.join(", ")}]`);
  }
}

main();
