import { CodeSnippets, CodeSnippetsData } from "./code-snippets";

export const CodeSnippetsVector = () => {
  return <CodeSnippets data={data} />;
};

const data: CodeSnippetsData = [
  {
    title: "RAG",
    snippets: [
      {
        language: "js",
        code: `
import { Index } from "@upstash/vector";
const index = new Index.from_env()

const question = "What is Quantum Mechanics?"

// Find related documents
const context = await index.query({
  data: question,
  topK: 5,
  includeMetadata: true,
});

const prompt = \`Question: \${question} - Context: \${JSON.stringify(context)}\`;

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { 
      role: "system", 
      content: "You are a helpful assistant, answer the question using the context." 
    },
    { 
      role: "user", 
      content: prompt 
    },
  ],
});
        `,
      },
      {
        language: "py",
        code: `
from upstash_vector import Index
index = Index.from_env()

question = "What is Quantum Mechanics?" 

# Find related documents
context = index.query(
    data=question,
    top_k=5,
    include_metadata=True
)

prompt = f"Question: {question} - Context: {str(context)}"

response = openai.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {
            "role": "system",
            "content": "You are a helpful assistant, answer the question using the context."
        },
        {
            "role": "user", 
            "content": prompt
        }
    ]
)
        `,
      },
    ],
  },
  {
    title: "Semantic Caching",
    snippets: [
      {
        language: "js",
        code: `
import { Index } from "@upstash/vector";
import { SemanticCache } from "@upstash/semantic-cache";

const index = new Index();
const semanticCache = new SemanticCache({ index, minProximity: 0.95 });

await semanticCache.set("Capital of Turkey", "Ankara");
await semanticCache.set("year in which the Berlin wall fell", "1989");

// Outputs: "Ankara"
const result1 = await semanticCache.get("What is Turkey's capital?");

// Outputs: "1989"
const result2 = await semanticCache.get("what's the year the Berlin wall destroyed?");
        `,
      },
      {
        language: "py",
        code: `
from upstash_vector import SemanticCache

cache = SemanticCache(
    url="<UPSTASH_VECTOR_REST_URL>",
    token="<UPSTASH_VECTOR_REST_TOKEN>",
    min_proximity=0.9,
)

cache.set("Capital of Turkey", "Ankara")
cache.set("year in which the Berlin wall fell", "1989")

# Outputs: "Ankara"
result1 = cache.get("What is Turkey's capital?")

# Outputs: "1989"
result2 = cache.get("what's the year the Berlin wall destroyed?")
        `,
      },
    ],
  },
  {
    title: "Search",
    snippets: [
      {
        language: "js",
        code: `
import { Index } from "@upstash/vector";
const index = new Index.from_env()

const documents = [
  { id: "doc1", data: "Upstash Vector is a scalable vector database." },
  { id: "doc2", data: "LangChain is a framework for building intelligent apps." },
];

await index.upsert(documents);

// Perform a similarity search
const query = "What is LangChain?";
const results = await index.query({ data: query, topK: 3 });
        `,
      },
      {
        language: "py",
        code: `
from upstash_vector import Index
index = Index.from_env()

documents = [
    {"id": "doc1", "data": "Upstash Vector is a scalable vector database."},
    {"id": "doc2", "data": "LangChain is a framework for building intelligent apps."}
]

index.upsert(documents)

# Perform a similarity search
query = "What is LangChain?"
results = index.query(data=query, top_k=3)
        `,
      },
    ],
  },
];
