import { apiError } from "@/lib/api-error";
import { Search } from "@upstash/search";
import { NextResponse, type NextRequest } from "next/server";
import { logQuestion } from "./log";

const INDEX_NAME = "upstash-site";
const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 20;

type Content = {
  title: string;
  section: string;
  text: string;
  kind: string;
};

type Metadata = {
  url: string;
  path: string;
  kind: string;
  title: string;
  description: string;
  publishedAt: string | null;
  chunk: number;
  chunks: number;
};

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q) {
    return apiError(
      400,
      "missing_query",
      "The `q` query parameter is required.",
      "Call /ask?q=<your question>, for example /ask?q=how+is+qstash+priced.",
    );
  }

  const rawLimit = req.nextUrl.searchParams.get("limit");
  const parsedLimit = rawLimit === null ? NaN : Number(rawLimit);
  const limit = Number.isInteger(parsedLimit)
    ? Math.min(Math.max(parsedLimit, 1), MAX_LIMIT)
    : DEFAULT_LIMIT;

  const url = process.env.UPSTASH_SEARCH_REST_URL;
  const token = process.env.UPSTASH_SEARCH_REST_TOKEN;
  if (!url || !token) {
    return apiError(
      503,
      "search_unavailable",
      "The answer index is not available right now.",
      "Retry later, or browse https://upstash.com/llms.txt and https://upstash.com/docs directly.",
    );
  }

  try {
    const index = new Search({ url, token }).index<Content, Metadata>(
      INDEX_NAME,
    );
    const hits = await index.search({
      query: q,
      limit,
      reranking: true,
      inputEnrichment: false,
    });

    logQuestion(q);

    return NextResponse.json({
      question: q,
      results: hits.map((hit) => ({
        title: hit.content.title,
        section: hit.content.section || null,
        text: hit.content.text,
        kind: hit.content.kind,
        url: hit.metadata?.url ?? null,
        publishedAt: hit.metadata?.publishedAt ?? null,
        score: hit.score,
      })),
    });
  } catch (error) {
    console.error("/ask search failed:", error);
    return apiError(
      502,
      "search_failed",
      "The search backend returned an error for this question.",
      "Retry after a short delay, or rephrase the question.",
    );
  }
}
