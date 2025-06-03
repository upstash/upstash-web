"use client";

import cx from "@/utils/cx";
import { Product } from "@/utils/type";
import Prism from "prismjs";
import React, { useEffect, useState } from "react";
import { ServerlessBox, ServerlessSummary, ServerlessTitle } from "./comp";
import "prismjs/components/prism-python";

export default function HttpRestApi() {
  const [product, setProduct] = useState<Product>(Product.VECTOR);

  useEffect(() => {
    Prism.highlightAll();
  }, [product]);

  return (
    <ServerlessBox className="md:col-span-4">
      <header>
        <ServerlessTitle link="/docs/redis/features/restapi" title="Rest API">
          HTTP/REST API
        </ServerlessTitle>
        <ServerlessSummary>
          HTTP-based APIs enable access from serverless and edge functions in
          addition to supporting standard clients via the Redis protocol.
        </ServerlessSummary>
      </header>

      <div>
        {/* tab */}
        <div className="flex items-center gap-px">
          {[Product.REDIS, Product.VECTOR, Product.QSTASH, Product.SEARCH].map(
            (p) => {
              return (
                <label
                  key={p}
                  className={cx(
                    "cursor-pointer select-none bg-bg-mute px-4 py-1 text-sm first:rounded-l-full last:rounded-r-full",
                    p === product && "bg-primary text-white",
                  )}
                >
                  <input
                    className="pointer-events-none absolute opacity-0"
                    type="radio"
                    value={p}
                    name="product"
                    onChange={(e) => {
                      setProduct(e.target.value as Product);
                    }}
                  />
                  <span>{p}</span>
                </label>
              );
            },
          )}
        </div>

        {/* body */}
        <div className="mt-4 grid rounded-xl md:h-[276px]">
          <div className="no-scrollbar overflow-y-scroll rounded-2xl bg-pre-bg p-4 md:px-6">
            <Pre hidden={product !== Product.REDIS}>
              <code className="lang-js">{CODE[Product.REDIS]}</code>
            </Pre>
            <Pre hidden={product !== Product.QSTASH}>
              <code className="lang-js">{CODE[Product.QSTASH]}</code>
            </Pre>{" "}
            <Pre hidden={product !== Product.VECTOR}>
              <code className="lang-js">{CODE[Product.VECTOR]}</code>
            </Pre>
            <Pre hidden={product !== Product.SEARCH}>
              <code className="lang-js">{CODE[Product.SEARCH]}</code>
            </Pre>
          </div>
        </div>
      </div>
    </ServerlessBox>
  );
}

export function Pre({ className, ...props }: React.ComponentProps<"pre">) {
  return (
    <pre className={cx("no-scrollbar !text-[.86em]", className)} {...props} />
  );
}

const CODE = {
  [Product.REDIS]: `import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: "<UPSTASH_REDIS_REST_URL>",
  token: "<UPSTASH_REDIS_REST_TOKEN>",
})
   
const data = await redis.set("foo', "bar");`,
  [Product.QSTASH]: `import { Client } from "@upstash/qstash";

const client = new Client({
  token: "<QSTASH_TOKEN>",
});

const res = await client.publishJSON({
  url: "https://my-api...",
  body: {
    hello: "world",
  },
});`,
  [Product.VECTOR]: `import { Index } from "@upstash/vector";

const index = new Index<Metadata>({
  url: "<UPSTASH_VECTOR_REST_URL>",
  token: "<UPSTASH_VECTOR_REST_TOKEN>",
});

await index.upsert([{
  id: 'tokyo',
  data: "Tokyo is the capital of Japan.",
}])`,
  [Product.SEARCH]: `import { Search } from "@upstash/search";

const client = new Search({
  url: "<UPSTASH_SEARCH_REST_URL>",
  token: "<UPSTASH_SEARCH_REST_TOKEN>",
});

await client.index("movies").upsert([{
    id: "star-wars",
    content: { title: "Star Wars is a sci-fi space opera." },
    metadata: { genre: "sci-fi", category: "classic" }
}]);`,
};
