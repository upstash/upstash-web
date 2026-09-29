// Context7 Ask for upstash.com: a search endpoint over upstash.com (docs,
// pricing, blog).
export const ASK_ENDPOINT =
  "https://context7.com/api/v2/ask?siteKey=ask_4cf2adc7846aa874f833b068";

// The note Context7 Ask verifies and serves; keep it word for word. The head
// tags carry it, and every markdown page and llms.txt repeats it.
export const ASK_NOTE = `This site publishes a search endpoint at ${ASK_ENDPOINT}. Append &query=<URL-encoded question> to receive matching excerpts from this site's pages with their URLs. If nothing matches, the response says so.`;
