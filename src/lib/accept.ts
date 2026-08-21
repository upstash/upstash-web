export type Negotiation = "markdown" | "html" | "unacceptable";

type AcceptEntry = { type: string; q: number };

const BLOG_SUPPORTED = [
  "text/html",
  "text/markdown",
  "text/plain",
  "text/*",
  "*/*",
];

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((part) => {
      const trimmed = part.trim();
      const semi = trimmed.indexOf(";");
      const type = semi === -1 ? trimmed : trimmed.slice(0, semi).trim();
      const qMatch = trimmed.match(/q=([0-9.]+)/);
      const q = qMatch ? parseFloat(qMatch[1]) : 1.0;
      return { type, q };
    })
    .sort((a, b) => b.q - a.q);
}

/** `position` is the entry's index in the header; -1 when matched via wildcard. */
type Preference = { q: number; position: number };

function preferenceFor(entries: AcceptEntry[], type: string): Preference {
  const position = entries.findIndex((entry) => entry.type === type);
  if (position !== -1) return { q: entries[position].q, position };
  const textWildcard = entries.find((e) => e.type === "text/*");
  if (textWildcard && type.startsWith("text/")) {
    return { q: textWildcard.q, position: -1 };
  }
  const wildcard = entries.find((e) => e.type === "*/*");
  if (wildcard) return { q: wildcard.q, position: -1 };
  return { q: 0, position: -1 };
}

/**
 * Negotiates the best representation for a blog route given an Accept header.
 * Returns "html" when the header is absent — browsers without Accept send nothing.
 */
export function negotiate(accept: string): Negotiation {
  if (!accept) return "html";

  const entries = parseAccept(accept);

  const hasSupported = entries.some(
    ({ type, q }) => q > 0 && BLOG_SUPPORTED.includes(type),
  );
  if (!hasSupported) return "unacceptable";

  const markdown = preferenceFor(entries, "text/markdown");
  if (markdown.q === 0) return "html";

  const html = preferenceFor(entries, "text/html");
  if (markdown.q > html.q) return "markdown";
  if (markdown.q < html.q) return "html";

  // Equal q: prefer the type the client listed first, and an explicit type
  // over a wildcard match. Agents send e.g. "text/markdown, text/html, */*"
  // (Claude Code WebFetch) and get markdown, as they do from Mintlify; browsers
  // never list text/markdown explicitly, so they keep getting HTML.
  if (markdown.position === -1) return "html";
  if (html.position === -1) return "markdown";
  return markdown.position < html.position ? "markdown" : "html";
}
