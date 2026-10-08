// Context7 Ask for upstash.com: a search endpoint over upstash.com (docs,
// pricing, blog).
const ASK_ENDPOINT =
  "https://context7.com/api/v2/ask?siteKey=ask_4cf2adc7846aa874f833b068";

// The note Context7 Ask verifies and serves; keep it word for word. The hidden
// note in the root layout's body carries it, and every markdown page and
// llms.txt repeats it.
export const ASK_NOTE = `This site has a search endpoint: ${ASK_ENDPOINT}&query=<URL-encoded question>. It returns documentation that answers the question, with a source link for each part. No API key is needed. If nothing matches, it says so.`;
