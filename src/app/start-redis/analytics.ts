import { GA_MEASUREMENT_ID } from "@/utils/const";
import { ipAddress, waitUntil } from "@vercel/functions";
import type { NextRequest } from "next/server";

const GA_API_SECRET = process.env.GA_API_SECRET;

// GA4 truncates event parameter values beyond 100 chars
const GA_PARAM_VALUE_LIMIT = 100;

// GA4 silently drops events whose name is not 1-40 chars of
// letters/digits/underscores starting with a letter
const GA_EVENT_NAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/;

/**
 * Sends an event to GA4 via the Measurement Protocol, fire-and-forget.
 */
export function trackEvent(eventName: string, req: NextRequest) {
  if (!GA_API_SECRET) return;

  if (!GA_EVENT_NAME_PATTERN.test(eventName)) {
    console.error(`Invalid GA event name, not sending: ${eventName}`);
    return;
  }

  const userAgent = req.headers.get("user-agent") ?? "unknown";

  waitUntil(
    fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: crypto.randomUUID(),
          events: [
            {
              name: eventName,
              params: {
                user_agent: userAgent.slice(0, GA_PARAM_VALUE_LIMIT),
              },
            },
          ],
        }),
      },
    ).catch((error) => {
      console.error(`Failed to send GA event ${eventName}:`, error);
    }),
  );
}

/**
 * Headers identifying the original client, to be forwarded to the backend.
 */
export function clientHeaders(req: NextRequest): Record<string, string> {
  const headers: Record<string, string> = {};

  const ip = ipAddress(req);
  if (ip) headers["X-Client-IP"] = ip;

  const userAgent = req.headers.get("user-agent");
  if (userAgent) headers["X-Client-User-Agent"] = userAgent;

  return headers;
}
