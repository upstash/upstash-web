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
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title");
    const product = searchParams.get("product");

    if (!title || !product) {
      throw new Error("Missing required query parameters");
    }

    const productName = product.toLocaleLowerCase();

    const hasProduct = ["redis", "kafka", "qstash"].includes(
      product.toLocaleLowerCase()
    );

    if (!hasProduct) {
      throw new Error("Invalid product name");
    }

    const products = {
      redis: "Redis",
      kafka: "Kafka",
      qstash: "QStash",
    };

    if (!title || !hasProduct) {
      throw new Error("Missing required query parameters");
    }

    return new ImageResponse(
      <OGDoc title={title} product={products[productName]} />,
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
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
