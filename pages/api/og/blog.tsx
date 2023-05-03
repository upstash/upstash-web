import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";
import { allPosts } from "contentlayer/generated";
import * as process from "process";

export const config = {
  runtime: "edge",
};

const FontInterRegular = fetch(
  new URL("../../../public/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const FontInterBold = fetch(
  new URL("../../../public/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const DataInterRegular = await FontInterRegular;
    const DataInterBold = await FontInterBold;

    const { searchParams } = req.nextUrl;
    const slug = searchParams.get("slug");

    const post = allPosts.find((p) => p.slug === slug);

    if (!post) {
      throw new Error("Post not found");
    }

    return new ImageResponse(
      (
        <div tw="flex flex-col items-stretch p-[70px] pb-[140px] h-full w-full bg-[#161616] text-white">
          <header tw="flex">
            <h1 tw="m-0 leading-[1.16] text-7xl font-bold">{post.title}</h1>
          </header>

          <div tw="mt-auto flex items-end">
            <div tw="grow flex flex-col">
              <h4 tw="m-0 text-4xl font-bold text-[#00e9a3]">
                {post.authorObj.name}
              </h4>
              <p tw="m-0 mt-3 text-4xl">{post.authorObj.title}</p>
            </div>

            <div tw="flex items-center border-4 border-[#00e9a3] rounded-full">
              <img
                tw="w-36 h-36 rounded-full border-[6px] border-black"
                alt={post.authorObj.name}
                src={`${process.env.NEXT_PUBLIC_SITE_URL}${post.authorObj.photo}`}
              />
            </div>
          </div>

          <footer tw="absolute bottom-0 left-[70px] right-[70px] flex items-center justify-center bg-white text-gray-600 rounded-t-[30px]">
            <p tw="text-3xl my-4 leading-[1]">blog.upstash.com</p>
          </footer>
        </div>
      ),
      {
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
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
