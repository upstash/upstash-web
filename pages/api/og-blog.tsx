import { ImageResponse } from "@vercel/og";
import OGBlog from "components/og-blog";
import authors from "../../authors";
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
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title");
    const authorName = searchParams.get("author");

    const author = authors[authorName];

    if (!title || !author) {
      throw new Error("Missing required query parameters");
    }

    return new ImageResponse(<OGBlog title={title} author={author} />, {
      // debug: true,
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Typewriter",
          data: DataInterRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Typewriter",
          data: DataInterBold,
          style: "normal",
          weight: 800,
        },
      ],
    });
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
