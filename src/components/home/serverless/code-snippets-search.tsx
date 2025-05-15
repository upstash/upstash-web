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
    ],
  },
  {
    title: "Fetching and Pagination",
    snippets: [
      {
        language: "js",
        code: `
// Fetch documents by IDs
const documents = await client.index("movies").fetch({
  ids: ["star-wars", "inception"],
});

// Pagination with id prefix
const { nextCursor, documents: rangeDocuments } = await index.range({
  cursor: 0,
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
    data: "Noise cancelling wireless headphones",
    fields: { inStock: true, price: 299 },
  },
]);

const results = await client.index("products").search({
  query: "wireless headphones",
  filter: {
    inStock: true,
    price: { $lt: 350 }
  },
});
        `,
      },
    ],
  },
];
