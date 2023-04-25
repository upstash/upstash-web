"use client";

import {
  BorderBox,
  BorderBoxBody,
  BorderBoxBodySummary,
  BorderBoxBodyTitle,
} from "@/components/home/border-box";
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import { theme } from "tailwindcss/defaultConfig";
import colors from "tailwindcss/colors";
import { borderRadius, fontSize } from "tailwindcss/defaultTheme";
import { CodeExample, Product } from "@/utils/type";

export default function HttpRestApi() {
  // const [product, setProduct] = useState<Product>(Product.REDIS);
  // const [example, setExample] = useState<CodeExample>(CodeExample.lib);

  const code = {
    [Product.REDIS]: {
      [CodeExample.lib]: `import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://eu1-fun-dodo-31346.upstash.io',
  token: 'AXpyASQgZjQ4NDYmEzMzA0ZTA5ZWFmZTE1ZWI=',
})
   
const data = await redis.set('foo', 'bar');`,
      [CodeExample.fetch]: `fetch("https://eu1-fun-dodo-31346.upstash.io/set/foo/bar", {
  headers: {
    Authorization: "Bearer AXpyASQgZjVjOTFkMT0ZTA5ZWFmZTE1ZWI="
  }
}).then(response => response.json())
  .then(data => console.log(data));`,
    },
    [Product.KAFKA]: {
      [CodeExample.lib]: `// Producer
import { Kafka } from "@upstash/kafka"

const kafka = new Kafka({
  url: "https://fleet-opossum-9500-eu1-rest-kafka.upstash.io",
  username: "ZmxlZXQtb3Bvc3N1bS05Nxz1xjM",
  password: "wBk1Ky7EfjzseLYDIPP5tWuAAG9w==",
})

const p = kafka.producer()
const res = await p.produce("<my.topic>", { hello: "world" } )

// Consumer
import { Kafka } from "@upstash/kafka"

const kafka = new Kafka({
  url: "https://fleet-opossum-9500-eu1-rest-kafka.upstash.io",
  username: "ZmxlZXQtb3Bvc3N1bS07EFO9BTpN1xjM",
  password: "wBk1Ky7EfjzseLYDIWipWZ5iAWuAAG9w==",
})

const c = kafka.consumer()

const messages = await c.consume({
  consumerGroupId: "group_1",
  instanceId: "instance_1",
  topics: ["test.topic"],
  autoOffsetReset: "earliest",
})`,
      [CodeExample.fetch]: `// Producer
fetch("https://fleet-opossum-9500-eu1-rest-kafka.upstash.io/produce/a/MESSAGE", {
  headers: {
    Authorization: "Basic Wm14bFpY0R4ejE3RUZFM5bkVFd1QUFHOXc9PQ=="
  }
}).then(response => response.json())
  .then(data => {
    console.log(data)
  });
  
// Consumer
fetch("https://fleet-opossum-9500-eu1-rest-kafka.upstash.io/consume/GROUP_NAME/GROUP_INSTANCE_NAME/a", {
  headers: {
    Authorization: "Basic Wm14bFpYUXRiM0J2YzNOMWRaNFQUFHOXc9PQ=="
  }
}).then(response => response.json())
  .then(data => {
    console.log(data)
  });`,
    },
    [Product.QSTASH]: {
      [CodeExample.lib]: `curl -XPOST \\
\t"https://qstash.upstash.io/v1/publish/" \\
\t-H "Authorization: Bearer eyJVc2VyZDUyNDIzMDEiLwYmI5Zm2MDg3NGU4In0="`,
      [CodeExample.fetch]: `curl -XPOST \\
\t"https://qstash.upstash.io/v1/publish/" \\
\t-H "Authorization: Bearer eyJVc2VySUQiOiJjNjg2OVhZmUwYmI5ZMzQ2MDg3NGU4In0="`,
    },
  };

  return (
    <BorderBox className="col-span-4">
      <BorderBoxBody>
        <header>
          <BorderBoxBodyTitle link="https://docs.upstash.com/redis/features/restapi">
            HTTP/REST API
          </BorderBoxBodyTitle>
          <BorderBoxBodySummary>
            HTTP-based APIs enable access from both serverless and edge
            functions, while also supporting the use of standard clients via the
            Redis/Kafka protocol.
          </BorderBoxBodySummary>
        </header>

        {/* body */}
        <div className="mt-8">
          {/* buttons */}
          {/*<div className="flex items-center gap-px">
            {Object.keys(Product).map((key) => {
              const value = Product[key as keyof typeof Product];
              return (
                <label
                  key={key}
                  className={cx(
                    "bg-white/10 px-3 py-1 first:rounded-l-full last:rounded-r-full",
                    product === value && "bg-opacity-20"
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
          </div>*/}

          {/* editor */}
          <div className="mt-4 h-[288px] overflow-y-auto rounded-xl bg-black/20">
            <SandpackProvider
              theme={sandpackDark}
              files={{
                Redis: {
                  active: true,
                  code: code[Product.REDIS][CodeExample.lib],
                },
                Kafka: {
                  active: true,
                  code: code[Product.KAFKA][CodeExample.lib],
                },
                QStash: {
                  active: true,
                  code: code[Product.QSTASH][CodeExample.lib],
                },
              }}
            >
              <SandpackLayout
                style={{
                  // @ts-ignore
                  "--sp-layout-height": 100,
                  "--sp-colors-surface1": "rgb(0 0 0 / 0%)",
                  "--sp-colors-surface2": "rgb(0 0 0 / 0%)",
                  border: 0,
                  "--sp-border-radius": borderRadius["2xl"],
                }}
              >
                <SandpackCodeEditor readOnly showReadOnly={false} />
              </SandpackLayout>
            </SandpackProvider>
          </div>
        </div>
      </BorderBoxBody>
    </BorderBox>
  );
}
