import { CodeSnippets, CodeSnippetsData } from "./code-snippets";

export const CodeSnippetsSearch = () => {
  return <CodeSnippets data={data} />;
};

const data: CodeSnippetsData = [
  {
    title: "Search with reranking",
    snippets: [
      {
        language: "js",
        code: `
// AI-powered semantic search with reranking
const results = await client.index("movies").search({
  query: "space opera with jedi",
  limit: 5,
  reranking: true
});
`,
      },
      {
        language: "py",
        code: `
# AI-powered semantic search with reranking
results = client.index("movies").search(
  query="space opera with jedi",
  limit=5,
  reranking=true
)
`,
      },
    ],
  },
  {
    title: "Fetching and Pagination",
    snippets: [
      {
        language: "js",
        code: `
// Fetch documents by IDs
const documents = await index.fetch({
  ids: ["star-wars", "inception"],
});

// Pagination with id prefix
const { nextCursor, documents: rangeDocuments } = await index.range({
  cursor: "0",
  limit: 5,
  prefix: "in"
});

// Delete documents
await index.delete({
  ids: ["star-wars"],
});

// Reset index
await index.reset();
        `,
      },
      {
        language: "py",
        code: `
# Fetch documents by IDs
documents = index.fetch(
  ids=["star-wars", "inception"]
)

# Pagination with id prefix
rangeResults = index.range(
  cursor="0",
  limit=5,
  prefix="in"
)

# Delete documents
index.delete(
  ids=["star-wars"]
)

# Reset index
index.reset()
        `,
      },
    ],
  },
  {
    title: "Search with filters",
    snippets: [
      {
        language: "js",
        code: `
await client.index("products").upsert([
  {
    content: { description: "Noise cancelling wireless headphones" },
    metadata: { inStock: true, price: 299 },
  },
]);

const results = await client.index("products").search({
  query: "wireless headphones",
});
        `,
      },
      {
        language: "py",
        code: `
index.upsert(
  documents=[{
    id: "headphones-0",
    content: { description: "Noise cancelling wireless headphones" },
    metadata: { inStock: true, price: 299 },
  }]
)

results = index.search(
  query="wireless headphones"
)
        `,
      },
    ],
  },
];
