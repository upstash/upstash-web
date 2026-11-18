import { NextResponse, type NextRequest } from "next/server";
import { trackEvent } from "./analytics";

// start-redis is discontinued. Both methods answer 410 Gone with markdown,
// since the old CLI command and MCP tool print the response body as is.
const GONE_MARKDOWN = `# start-redis is discontinued

https://upstash.com/start-redis no longer creates databases. Create a free Redis database in an Upstash account instead:

- Console: sign up or sign in at https://console.upstash.com and create a Redis database.
- Upstash CLI: set \`UPSTASH_EMAIL\` and \`UPSTASH_API_KEY\` (create a key at https://console.upstash.com/account/api), then run \`npx -y upstash redis create --name my-db --region us-east-1\`.
- Upstash MCP server: lets your agent create and manage databases in your account. Setup: https://upstash.com/docs/agent-resources/overview

A database created earlier with start-redis can still be claimed until it expires, 72 hours after creation: https://upstash.com/start-redis/console/<database-id>
`;

function gone(): NextResponse {
  return new NextResponse(GONE_MARKDOWN, {
    status: 410,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export function GET(req: NextRequest) {
  trackEvent("start_redis_get", req);
  return gone();
}

export function POST(req: NextRequest) {
  trackEvent("start_redis_post", req);
  return gone();
}
