import { createHmac, timingSafeEqual } from "node:crypto";
import { KB_TAG } from "@/lib/kb-api";
import { revalidateTag } from "next/cache";

// ByDefault's webhook (Publishing → API → Webhook): an article was
// published, changed or taken down, so the knowledge base reads the API
// again on its next visit. ByDefault signs the body with the API key:
// X-ByDefault-Signature: sha256=<hex HMAC>.
export async function POST(request: Request) {
  const key = process.env.BYDEFAULT_API_KEY;
  if (!key) {
    return Response.json(
      { error: "BYDEFAULT_API_KEY is not set" },
      { status: 500 },
    );
  }

  const body = await request.text();
  const expected = Buffer.from(
    `sha256=${createHmac("sha256", key).update(body).digest("hex")}`,
  );
  const signature = Buffer.from(
    request.headers.get("x-bydefault-signature") ?? "",
  );
  if (
    signature.length !== expected.length ||
    !timingSafeEqual(signature, expected)
  ) {
    return Response.json({ error: "Bad signature" }, { status: 401 });
  }

  revalidateTag(KB_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}
