// Context7 Ask for upstash.com: a search endpoint over upstash.com (docs,
// pricing, blog), run by Context7. The head tags in the root layout and the
// line in every markdown page and llms.txt point agents to it.
export const ASK_ENDPOINT =
  "https://context7.com/api/v2/ask?siteKey=ask_4cf2adc7846aa874f833b068";

// The note Context7 Ask verifies and serves; keep it word for word.
export const ASK_NOTE = `This site publishes a search endpoint at ${ASK_ENDPOINT}. Append &query=<URL-encoded question> to receive matching excerpts from this site's pages with their URLs. If nothing matches, the response says so.`;

// For markdown pages. Names Context7 as Upstash's own service, since the
// endpoint is on another domain than the page.
export const ASK_MARKDOWN_LINE = `**Search this site:** \`GET ${ASK_ENDPOINT}&query=<URL-encoded question>\` returns matching excerpts from upstash.com pages (docs, pricing, blog) with their URLs. The endpoint is run by Context7, Upstash's documentation service.`;
