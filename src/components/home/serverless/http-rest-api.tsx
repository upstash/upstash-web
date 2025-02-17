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
          {[Product.REDIS, Product.VECTOR, Product.QSTASH].map((p) => {
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
          })}
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
              <code className="lang-py">{CODE[Product.VECTOR]}</code>
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
  url: 'https://obi-wan-kenobi-31346.upstash.io',
  token: 'TOKEN',
})
   
const data = await redis.set('foo', 'bar');`,
  [Product.QSTASH]: `fetch("https://qstash.upstash.io/v2/publish/https://example.com", {
  body: "{ 'hello': 'world' }",
  headers: {
    Authorization: "Bearer XXX",
    "Content-Type": "application/json",
    "Upstash-Forward-My-Header": "my-value"
  },
  method: "POST"
})`,
  [Product.VECTOR]: `from upstash_vector import Index

index = Index(url="https://master-yoda-eu1-vector.upstash.io/query", token="XXX")

index.upsert(
  vectors=[("id-1", [0.72, 0.7], {"meta_key": "meta_value"})]
)

index.query(
  vector=[0.72, 0.7], top_k=1, include_vectors=True, include_metadata=True
)`,
};
