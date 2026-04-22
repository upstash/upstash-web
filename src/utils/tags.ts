/**
 * Normalize a blog tag for use in URLs and case-insensitive comparisons.
 *
 * - Lowercases the tag
 * - Trims whitespace
 * - Replaces runs of whitespace/underscores with a single hyphen
 *
 * Examples:
 *   "Vector"               -> "vector"
 *   "semantic search"      -> "semantic-search"
 *   "AWS Lambda"           -> "aws-lambda"
 *   "Cloudflare Workers"   -> "cloudflare-workers"
 */
export function normalizeTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-");
}

/**
 * Decode a tag coming from a URL param (may be percent-encoded) and normalize it.
 */
export function normalizeTagParam(tag: string): string {
  try {
    return normalizeTag(decodeURIComponent(tag));
  } catch {
    return normalizeTag(tag);
  }
}
