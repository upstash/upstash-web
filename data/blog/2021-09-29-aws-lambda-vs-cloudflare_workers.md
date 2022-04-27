---
slug: aws-lambda-vs-cloudflare-workers
date: 2021-09-29
title: 'AWS Lambda vs Cloudflare Workers'
sidebar_label: 'AWS Lambda vs Cloudflare Workers'
authors: enes
image: img/blog/cloudflare_workers_vs_awslambda.jpg
tags: [serverless, aws-lambda, cloudflare-workers]
---




In this article, I will compare AWS Lambda and Cloudflare Workers based on my experiences and observations during developing applications to showcase [Upstash](https://upstash.com) use cases. 

Both are similar in that they provide a serverless runtime for developers to run their functions. But there are many differences between them and I will list them in the following categories: Performance, Pricing, Runtime and Language Support, Tools and Resources, Ecosystem and Integrations, Configurability and Limitations.  I will declare a winner for each category from my point of view.

<!--truncate-->


### Performance

AWS Lambda runs in containers and at the selected runtime (e.g. Node). Cloudflare Workers run your code in V8 Isolates. Cloudflare Workers has minimal latency in runtime startups. This eliminates the famous cold start problem.

In addition, because Cloudflare Workers is distributed globally on the Cloudflare network; you will experience lower latency all over the world. To minimize latency in AWS Lambda, your function and client must reside in the same region.

According to [this benchmark](https://news.ycombinator.com/item?id=17445134); Cloudflare Workers looks to perform better. Note that the comparison was made by Cloudflare.

In this category, Cloudflare Workers wins.


### Runtime & Language Support

AWS Lambda natively supports Java, Go, PowerShell, Node.js, C#, Python, and Ruby. Cloudflare Workers supports Javascript and TypeScript. Cloudflare Workers also supports WASM Compiled languages, but using them doesn't [seem very easy](https://developers.cloudflare.com/workers/tutorials/workers-kv-from-rust).

This category is a clear win for AWS Lambda.


### Configurability and Limitations

With AWS Lambda, you can choose a custom runtime (Layers) and memory size from 128MB to 10GB. Cloudflare Workers memory is fixed at 128MB. AWS Lambda function can run up to 900 seconds (max timeout). This is 30 seconds for Cloudflare Workers.

Cloudflare Workers are not Node-based, so packages that require Node dependencies are not supported in Cloudflare Workers. AWS Lambda has no such issue.

AWS Lambda wins in this category.


### Pricing

AWS request pricing:  $0.2 per 1M requests

Cloudflare Workers request pricing: $0.15 per 1M requests

AWS duration pricing: $16.67 per million GB/s

Cloudflare Workers duration pricing: $12.50 per million GB/s

In this category, Cloudflare Workers wins.


### Tools and Resources

AWS Lambda was introduced in 2014. Cloudflare Workers was released in 2018. AWS Lambda is considered the pioneer of the serverless space. There are numerous third-party management and deployment tools for AWS Lambda. You'll find more tools and technical resources on AWS Lambda than Cloudflare Workers.

AWS Lambda wins in this category.


### Ecosystem and Integrations

You can use most AWS services with AWS Lambda. You can access AWS databases and use AWS services to trigger your function. AWS Lambda can be part of many different use cases with different components. It can be part of an API for the web service as well as a stream processing engine. Cloudflare Workers has far fewer options. Use cases are mostly limited to web applications and edge computing. You can use Cloudflare Workers with Worker KV and Durable Objects, but they provide much more limited use cases than all AWS services.

AWS Lambda obviously wins this category.


<table>
  <tr>
   <td><strong>Category</strong>
   </td>
   <td><strong>Winner</strong>
   </td>
  </tr>
  <tr>
   <td>Performance
   </td>
   <td>Cloudflare Workers
   </td>
  </tr>
  <tr>
   <td>Runtime & Language Support
   </td>
   <td>AWS Lambda
   </td>
  </tr>
  <tr>
   <td>Tools and Resources
   </td>
   <td>AWS Lambda
   </td>
  </tr>
  <tr>
   <td>Pricing
   </td>
   <td>Cloudflare Workers
   </td>
  </tr>
  <tr>
   <td>Ecosystem and Integrations
   </td>
   <td>AWS Lambda
   </td>
  </tr>
  <tr>
   <td> Configurability and Limitations
   </td>
   <td>AWS Lambda
   </td>
  </tr>
</table>



### What about Lambda@Edge?

It might make sense to compare Cloudflare Workers with Lambda@Edge rather than Lambda. But it seems to me that Lambda@Edge is more of a feature of Cloudfront than a standalone product. Other than a few blog posts and announcements, I couldn't find many resources. Maybe AWS isn't investing much in this anymore.


### Conclusion

In this post, I tried to compare two popular serverless products based on my experiences and observations. So if you think differently, please leave a comment here or on my [twitter](https://twitter.com/enesakar).

There is no clear answer to the question of which product is better. It depends on the use case and your personal preferences. While AWS Lambda seems like the safer choice for many use cases; Cloudflare Workers is an excellent choice for use cases where you need low latency globally.
