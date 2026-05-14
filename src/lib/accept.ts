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

function qFor(entries: AcceptEntry[], ...types: string[]): number {
  for (const { type, q } of entries) {
    if (types.includes(type)) return q;
  }
  const textWildcard = entries.find((e) => e.type === "text/*");
  if (textWildcard && types.every((t) => t.startsWith("text/"))) {
    return textWildcard.q;
  }
  const wildcard = entries.find((e) => e.type === "*/*");
  if (wildcard) return wildcard.q;
  return 0;
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

  const markdownQ = qFor(entries, "text/markdown");
  if (markdownQ === 0) return "html";

  const htmlQ = qFor(entries, "text/html");
  return markdownQ > htmlQ ? "markdown" : "html";
}
