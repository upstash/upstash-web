"use client";

import { Product } from "@/utils/type";
import Prism from "prismjs";

import { ServerlessBox, ServerlessSummary, ServerlessTitle } from "./comp";

import "prismjs/themes/prism-tomorrow.css";

import { HTMLProps, ReactNode, useEffect, useState } from "react";

import cx from "@/utils/cx";

export default function HttpRestApi() {
  const [product, setProduct] = useState<Product>(Product.REDIS);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <ServerlessBox className="md:col-span-4">
      <header>
        <ServerlessTitle link="/docs/redis/features/restapi" title="Rest API">
          HTTP/REST API
        </ServerlessTitle>
        <ServerlessSummary>
          HTTP-based APIs enable access from serverless and edge functions,
          while the use of standard clients via the Redis/Kafka protocol is
          still supported.
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
                  "select-none bg-white bg-opacity-3 px-4 py-1 text-sm first:rounded-l-full last:rounded-r-full",
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
          <div className="overflow-y-scroll p-4 md:px-6">
            <Pre hidden={product !== Product.REDIS}>{CODE[Product.REDIS]}</Pre>
            <Pre hidden={product !== Product.KAFKA}>{CODE[Product.KAFKA]}</Pre>
            <Pre hidden={product !== Product.QSTASH}>
              {CODE[Product.QSTASH]}
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
      className="!m-0 !bg-transparent !p-0 !font-[inherit] !text-sm"
      {...props}
    >
      <code className="language-js">{children}</code>
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
};
