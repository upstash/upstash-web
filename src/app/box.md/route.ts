import { productMarkdownResponse } from "@/lib/product-markdown";

export const dynamic = "force-static";

export function GET() {
  return productMarkdownResponse("box");
}
