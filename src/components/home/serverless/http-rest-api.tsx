"use client";

import { HTMLProps, ReactNode, useEffect, useState } from "react";

import cx from "@/utils/cx";
import { Product } from "@/utils/type";
import Prism from "prismjs";

import { ServerlessBox, ServerlessSummary, ServerlessTitle } from "./comp";

import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css";

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
          addition to supporting standard clients via the Redis/Kafka protocol.
        </ServerlessSummary>
      </header>

      <div>
        {/* tab */}
        <div className="flex items-center gap-px">
          {Object.keys(Product).map((key) => {
            const value = Product[key as keyof typeof Product];
            return (
              <label
                key={key}
                className={cx(
                  "cursor-pointer select-none bg-white bg-opacity-3 px-4 py-1 text-sm first:rounded-l-full last:rounded-r-full",
                  value === product && "bg-opacity-10",
                )}
              >
                <input
                  className="pointer-events-none absolute opacity-0"
                  type="radio"
                  value={value}
                  name="product"
                  onChange={(e) => {
                    setProduct(e.target.value as Product);
                  }}
                />
                <span>{value}</span>
              </label>
            );
          })}
        </div>

        {/* body */}
        <div className="mt-4 grid rounded-xl bg-black/20 md:h-[276px]">
          <div className="no-scrollbar overflow-y-scroll p-4 md:px-6">
            <Pre hidden={product !== Product.REDIS}>
              <code className="lang-js">{CODE[Product.REDIS]}</code>
            </Pre>
            <Pre hidden={product !== Product.KAFKA}>
              <code className="lang-js">{CODE[Product.KAFKA]}</code>
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

function Pre({
  children,
  ...props
}: HTMLProps<HTMLPreElement> & {
  children: ReactNode;
}) {
  return (
    <pre
      className="no-scrollbar !m-0 !bg-transparent !p-0 !font-[inherit] !text-sm"
      {...props}
    >
      {children}
    </pre>
  );
}

const CODE = {
  [Product.REDIS]: `import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://obi-wan-kenobi-31346.upstash.io',
  token: 'TOKEN',
})
   
const data = await redis.set('foo', 'bar');`,
  [Product.KAFKA]: `// Producer
import { Kafka } from "@upstash/kafka"

const kafka = new Kafka({
  url: "https://dart-vader-9500-eu1-rest-kafka.upstash.io",
  username: "USERNAME",
  password: "PASSWORD",
})

const p = kafka.producer()
const res = await p.produce("<my.topic>", { hello: "world" } )

// Consumer
import { Kafka } from "@upstash/kafka"

const kafka = new Kafka({
  url: "https://dart-vader-9500-eu1-rest-kafka.upstash.io",
  username: "USERNAME",
  password: "PASSWORD",
})

const c = kafka.consumer()

const messages = await c.consume({
  consumerGroupId: "group_1",
  instanceId: "instance_1",
  topics: ["test.topic"],
  autoOffsetReset: "earliest",
})`,
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
