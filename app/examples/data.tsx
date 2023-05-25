import { Stack, Products, UseCases } from "./filter";

export default [
  {
    title: "Serverless API with AWS CDK and AWS Lambda",
    description:
      "Serverless API using AWS Lambda and we will deploy it using AWS CDK.",
    products: [Products.kafka, Products.qstash],
    stack: [Stack.nextjs],
    use_cases: [UseCases.ai_ml],
    github_url: "dasd",
  },
  {
    title: "Autocomplete API with Serverless Redis",
    description:
      "This example implements an autocomplete API powered by serverless Redis.",
    products: [Products.redis],
    stack: [Stack.nextjs],
    use_cases: [UseCases.ai_ml],
    blog_url: "dasd",
  },
  {
    title: "Benchmark Your Serverless Database with Thundra",
    description:
      "We benchmarked two AWS Lambda functions which fetch records from two different Serverless databases",
    products: [Products.redis],
    stack: [Stack.nextjs],
    use_cases: [UseCases.ai_ml],
    github_url: "dasd",
    blog_url: "dasd",
  },
  {
    title: "Serverless Histogram API with Redis",
    description:
      "This example implements a Serverless Histogram API powered by serverless Upstash Redis",
    products: [Products.kafka],
    stack: [Stack.nextjs],
    use_cases: [UseCases.ai_ml],
    blog_url: "dasd",
  },
  {
    title: "Next.js with Redis",
    description:
      "A sample web application which uses Redis as state store in Next.js application.",
    products: [Products.qstash],
    stack: [Stack.nextjs],
    use_cases: [UseCases.ai_ml],
    github_url: "dasd",
    blog_url: "dasd",
  },
  {
    title: "Benchmark Your Serverless Database with Thundra",
    description:
      "We benchmarked two AWS Lambda functions which fetch records from two different Serverless databases",
    products: [Products.redis, Products.qstash],
    stack: [Stack.nextjs],
    use_cases: [UseCases.ai_ml],
    github_url: "dasd",
    blog_url: "dasd",
  },
  {
    title: "Serverless Histogram API with Redis",
    description:
      "This example implements a Serverless Histogram API powered by serverless Upstash Redis",
    products: [Products.redis, Products.kafka],
    stack: [Stack.nextjs],
    use_cases: [UseCases.ai_ml],
    blog_url: "dasd",
  },
  {
    title: "Next.js with Redis",
    description:
      "A sample web application which uses Redis as state store in Next.js application.",
    products: [Products.kafka],
    stack: [Stack.nextjs],
    use_cases: [UseCases.ai_ml],
    github_url: "dasd",
    blog_url: "dasd",
  },
];
