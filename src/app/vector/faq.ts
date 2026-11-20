// Questions mirror real search intent for "vector database" and "vector search".
export const VECTOR_FAQ = [
  {
    question: "What is Upstash Vector?",
    answer:
      "Upstash Vector is a serverless vector database for storing embeddings and running similarity search. You create an index in the console and upsert and query over a REST API or the TypeScript, Python, and Go SDKs. It is used for RAG, semantic search, recommendations, and memory for AI agents.",
  },
  {
    question: "What is a vector database?",
    answer:
      "A vector database stores embeddings, the numeric representations of meaning that AI models produce for text, images, and other data, and finds the vectors closest to a query. Because similar items have nearby vectors, it can search by meaning instead of exact keywords, which is the retrieval step behind RAG and semantic search.",
  },
  {
    question: "Do I need to generate my own embeddings?",
    answer:
      "No. When you create an index you can choose a built-in embedding model, then upsert and query with plain text and Upstash Vector embeds it for you. You can also bring vectors from any model, such as OpenAI or Hugging Face, and upsert them directly.",
  },
  {
    question: "Does Upstash Vector support hybrid search?",
    answer:
      "Yes. A hybrid index stores a dense vector for semantic meaning and a sparse vector for keyword relevance for each item, and combines both scores at query time. This helps when exact terms like product names, codes, or identifiers must match.",
  },
  {
    question: "Can I filter results by metadata?",
    answer:
      "Yes. Each vector can carry metadata, and queries accept a filter written in a SQL-like syntax, so you can restrict results by fields such as category, date, or user while still ranking by similarity.",
  },
  {
    question: "How do I keep data for different customers separate?",
    answer:
      "Use namespaces. A namespace is an isolated partition inside an index, and queries only see the namespace they target. This is a common way to build multi-tenant AI apps on a single index.",
  },
  {
    question: "Does it work with LangChain and LlamaIndex?",
    answer:
      "Yes. Upstash Vector has integrations for LangChain, LlamaIndex, the Vercel AI SDK, Flowise, and Langflow, so it can be dropped in as the vector store for existing RAG pipelines.",
  },
  {
    question: "How much does Upstash Vector cost?",
    answer:
      "The free plan includes up to 10,000 queries and updates a day and 1 GB of data. Pay as you go is $0.40 per 100K requests and $0.25 per GB of storage, with 200 GB of bandwidth free each month. A query or fetch counts as one request however many vectors it returns, while an upsert or delete counts one request per vector. A Fixed plan is $60 a month for up to 1M queries and updates a day, and Pro plans are available for high-volume workloads. See the pricing page for details.",
  },
  {
    question: "Which regions are available?",
    answer:
      "Indexes can be created in N. Virginia and Ireland on AWS, and in Iowa on GCP. Fixed and Pro plans are available in the AWS regions.",
  },
];
