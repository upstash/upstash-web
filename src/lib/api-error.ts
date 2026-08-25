import { SITE_URL } from "@/utils/const";
import { NextResponse } from "next/server";

/**
 * JSON error response: a stable machine-readable `code`, a human-readable
 * `error`, and a `resolution` telling the caller what to do about it.
 */
export function apiError(
  status: number,
  code: string,
  error: string,
  resolution: string,
): NextResponse {
  return NextResponse.json({ error, code, resolution }, { status });
}

export function notFoundJson(path: string): NextResponse {
  return apiError(
    404,
    "not_found",
    `No resource exists at ${path}.`,
    `See ${SITE_URL}/openapi.json for available endpoints, or search the site with ${SITE_URL}/ask?q=your+question.`,
  );
}
