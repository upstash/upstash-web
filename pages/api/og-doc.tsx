import { ImageResponse } from "@vercel/og";
import OGDoc from "components/og-doc";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const FontInterRegular = fetch(
  new URL("../../public/static/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const FontInterBold = fetch(
  new URL("../../public/static/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const DataInterRegular = await FontInterRegular;
  const DataInterBold = await FontInterBold;

  try {
    const docsUrl = new URL(req.url).searchParams.get("url");

    if (!docsUrl) {
      throw new Error("url parameter must be set");
    }

    const title = await getPageTitle(docsUrl);

    return new ImageResponse(
      (
        <OGDoc
          title={title}
          product={new URL(docsUrl).pathname.replace(/^\//, "")}
        />
      ),
      {
        // debug: true,
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: DataInterRegular,
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: DataInterBold,
            style: "normal",
            weight: 800,
          },
        ],
        headers: {
          "Cache-Control": "s-maxage=3600",
        },
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

/**
 * Fetch the docs page and parse its content to get the page title
 *
 */
async function getPageTitle(url: string): Promise<string> {
  const fallbackTitle = "Upstash Documentation";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    const body = await res.text();

    const titleMatch = body.match(/<title.*>([^<]*)<\/title>/);
    if (!titleMatch || typeof titleMatch[1] !== "string") {
      console.error("No valid title found", url);
      return fallbackTitle;
    }

    return titleMatch[1].replace(" | Upstash: Documentation", "");
  } catch (err) {
    console.log(err);
    return fallbackTitle;
  }
}
