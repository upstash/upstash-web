import { ImageResponse } from "@vercel/og";
import { allPosts } from "contentlayer/generated";
import { authors } from "@/utils/authors";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function TwImage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const DataInterRegular = await fetch(
      new URL("../../../public/fonts/Inter-Bold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());
    const slug = params.slug;

    const post = allPosts.find((p) => p.slug === slug);

    if (!post) {
      throw new Error("Post not found");
    }

    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
    const authorImage = new URL(
      `/authors/${authors[post.authors[0]].image}`,
      baseUrl
    ).toString();
    return new ImageResponse(
      (
        <div tw="flex flex-col items-stretch p-[70px] pb-[140px] h-full w-full bg-[#161616] text-white">
          <header tw="flex">
            <h1 tw="m-0 leading-[1.16] text-7xl">{post?.title}</h1>
          </header>

          <div tw="mt-auto flex items-end">
            <div tw="grow flex flex-col">
              <h4 tw="m-0 text-4xl text-[#00e9a3] ">
                {post.authorsData[0].name}
              </h4>
              <p tw="m-0 mt-3 text-2xl ">{post.authorsData.at(0)?.title}</p>
            </div>

            <div tw="flex items-center border-4 border-[#00e9a3] rounded-full">
              <img
                tw="w-36 h-36 rounded-full border-[6px] border-black"
                alt={post.authorsData[0].name}
                src={authorImage}
              />
            </div>
          </div>

          <footer tw="absolute bottom-0 left-[70px] right-[70px] flex items-center justify-center bg-white text-gray-600 rounded-t-[30px]">
            <p tw="text-3xl my-4 leading-[1] ">blog.upstash.com</p>
          </footer>
        </div>
      ),
      {
        fonts: [
          {
            name: "Inter",
            data: DataInterRegular,
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      `Failed to generate the image: ${(e as Error).message}`,
      {
        status: 500,
      }
    );
  }
}
