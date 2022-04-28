---
slug: best-database-for-nextjs
title: 'Best Databases for Next.js'
image: https://blog.upstash.com/img/blog/nextjsdbs/cover.jpg
authors: enes
tags: [redis, database, serverless, aws, mongodb, planetscale, supabase, faunadb, upstash, DynamoDB]
---


Next.js enables developers to build full stack applications with the Server Side Rendering capability. Vercel and Netlify help them to write the backend API with serverless functions. So the next question is what is the ideal database for Next.js apps. In this post, I will review the databases which are popular among the Next.js community. I will comment on how they fit the serverless model. Two things to check:



* Serverless pricing: Is the price pay-per-use? When the database is not in use, do you still have to pay?
* Serverless connections: Is there support for HTTP based connections? So there should not be any connection problems which are common with serverless functions.
       
<!--truncate-->

## TLDR

I have reviewed PlanetScale, Supabase, Upstash, Fauna, DynamoDB and MongoDB Atlas. Check the table below to compare the feature set of each product.

| Feature | PlanetScale | Supabase | Upstash | Fauna | DynamoDB | MongoDB Atlas |
| --- | ----------- |----------- |----------- |----------- |----------- |----------- |
| API | MySQL | PostgreSQL | Redis | Fauna | DynamoDB  | MongoDB |
| Type | Relational | Relational | KV Store | Document | Document  | Document |
| Free Tier | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 
| Serverless Pricing | 🟡 (min $29) | 🟡 (min $25) | 🟢 | 🟡 (min $22.5) | 🟢  | 🟢 |
| REST API | 🔴 | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 | 
| GraphQL API | 🔴 | 🔴 | 🔴 | 🟢 | 🔴 | 🔴  |
| Global replication | 🔴 | 🔴 | 🟢 | 🟢 | 🟢 | 🟡  (only for Dedicated)|
| Database Branching | 🟢 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 |
| Realtime Updates | 🔴 | 🟢 | 🔴 | 🔴 | 🟢 | 🟡 (via Realm) |
| Price Reads | $1.5 / 10m | $0.09 / GB | $0.2 / 100K | $0.45 / 1m (4KB) |  $0.25 / 1m (2KB) | $0.3 / 1m (4KB) |
| Price Writes | $1.5 / 1m | $0.09 / GB | $0.2 / 100K | $2.25 / 1m (1KB) |  $1.25 / 1m (1KB) | $1.25 / 1m (1KB) |
| Price Storage | $1.25 / GB | $0.125 / GB | $0.25 / GB | $0.23 / GB | $0.25 / GB | $0.25 / GB |

     
## PlanetScale



* [PlanetScale](https://planetscale.com/) is a MySQL compatible database as a service.
* It is uses [Vitess](https://vitess.io/) at the background. This is great as Vitess is being actively used by giants like Youtube.
* PlanetScale introduced the [database branching](https://docs.planetscale.com/concepts/branching) concept. You can create branches and merge schema changes to your production database just like git. Afaik, this feature is unique for PlanetScale.
* It has a free tier with 100m reads per month.
* Paid plans start from $29. The main price components for the paid plan are:
  * Storage/month: $1.25/GB after first 25GB
  * Reads/month: $1.50 per 10m, after first 500m
  * Writes/month: $1.50 per 1m, after first 50m
* PlanetScale does not have an HTTP/REST based API.

![db](/blog/nextjsdbs/n1.png)


#### My Comments:



* In the home page, it is said that: Trusted By Github, Square, Slack etc. Do these companies use PlanetScale or Vitess? If these companies use PlanetScale then it is great. Otherwise, I do not feel good about this type of marketing. `Trusting Vitess` and `Trusting PlanetScale` are different things
* PlanetScale requires you to use TCP based connections (MySQL connections). This might be a problem for serverless functions as they are stateless. They say the number of connections is not a problem for Vitess but still there is a max connection limit for the plans.
* Lack of the HTTP/REST API makes it impossible to use PlanetScale from Cloudflare Workers and Vercel Edge platforms because they do not allow TCP connections.
* Planetscale paid plans start from $29, so the price does not scale to zero. Even if you are not using a DB, you have to use $29 per db at least. I think this is a conflict with the definition of `serverless`.

#### Useful Links:



* [Detailed pricing](https://docs.planetscale.com/concepts/billing#planetscale-plans)
* [Tutorial using Planetscale with Next.js and Prisma](https://planetscale.com/blog/how-to-setup-next-js-with-prisma-and-planetscale)
* [Video tutorial which uses Planetscale and Next.js, then deploy to Vercel](https://www.youtube.com/watch?v=YqBG5rFP4Ic)
* [Hackernews comments on PlaneScale launch](https://news.ycombinator.com/item?id=27197873)
  

## Supabase



* Supabase is a collection of developer tools including database, authentication service, storage. They call themselves as `Open Source Firebase Alternative`
* Supabase provides a PostgreSQL database.
* Just like Firebase, Supabase enables developers to listen to the changes on the database in real time.
* Supabase provides a RESTful API using PostgREST. This is useful especially if you plan to use Supabase in serverless functions.
* Supabase can be used in Cloudflare Workers thanks to its REST API. Check [this.](https://github.com/supabase/supabase/tree/master/examples/with-cloudflare-workers)
* Supabase free tier is limited to 500MB storage and 2GB data transfer monthly.
* Similar to PlanetScale, Supabase has a minimum cost for paid databases which is $25/month. Summary of payg pricing:
  * Storage: $0.125 per GB-month
  * Data transfer: $0.09 per GB



![db](/blog/nextjsdbs/n2.jpeg)


#### My Comments:



* Supabase provides database, authentication service, object storage and also `serverless functions` are coming. I am worried that it may be hard for a startup to provide many services with high quality and compete with Firebase backed by Google. I hope they will be successful.
* Just like PlanetScale, I think their pricing is not true serverless. Their paid plans require a fixed monthly cost so it never scales to zero.

#### Useful Links:



* [Detailed pricing](https://supabase.com/pricing)
* [Get started with Next.js](https://supabase.com/docs/guides/with-nextjs)
* [Video: Supabase Crash Course](https://www.youtube.com/watch?v=7uKQBl9uZ00)
* [Video tutorial: Supabase with Next.js](https://www.youtube.com/watch?v=p561ogKZ63o)


## Upstash Redis
* Upstash provides Redis as a service with per request pricing.
* It provides both Redis and REST API. So you can use it with both serverless and edge (Cloudflare Workers) functions.
* Upstash has regional and global options. Global database replicates data to multiple regions.
* It has a free tier with max 10.000 commands per day. Its pay-as-you-pricing is as follows:
  * Commands: $0.2 per 100K commands
  * Storage: $0.25 per GB

![db](/blog/nextjsdbs/n3.png)


#### My Comments:



* Both we (Upstash) and [RedisLabs](https://redis.com/) think that Redis is powerful enough for many use cases in addition to classic Redis use cases (caching, kv-store). But still I see many developers prefer SQL databases as the primary data store. If you need complex query capabilities, Redis may not be your first choice.

#### Useful Links:



* [Detailed pricing](https://docs.upstash.com/redis/overall/pricing)
* [Get started with Next.js and Redis](https://docs.upstash.com/redis/tutorials/nextjs_with_redis)
* [Getting started with Next.js Edge Functions](https://blog.upstash.com/getstarted-nextjs-edge-with-redis)
* [Video: Using Serverless Redis with Next.js](https://www.youtube.com/watch?v=FytxaSVQROc)


## Fauna



* Fauna provides a Globally Replicated Strongly Consistent database as a cloud service.
* It provides GraphQL API in addition to Fauna API.
* Its connections are HTTP based so you can use Fauna in serverless functions without any connection related problems.
* Its most basic plan (Individual) starts from $22.5/month.
* Fauna pricing:
  * Reads: $0.45/Million units (4KB)
  * Writes: $2.25/Million units (1KB)
  * Storage: $0.23/GB

![db](/blog/nextjsdbs/n4.png)

#### My Comments:



* Global strong consistency comes with extra performance costs. Writes have higher latencies than other alternative databases.
* If you will use GraphQL then it’s great but otherwise FQL was hard for me to learn and use.
* Fauna pricing has its own units (TRO, TWO, TCO) and many dimensions. You need to read articles to understand the pricing.

#### Useful Links:



* [Pricing Page](https://fauna.com/pricing)
* [Using Next.js with Fauna](https://fauna.com/blog/using-next-js-with-fauna-and-graphql)
* [Video: Using Next.js with Fauna](https://www.youtube.com/watch?v=cCD62m6yIXk)


## MongoDB Atlas



* Atlas is a MongoDB as a managed service which has serverless, shared and dedicated plans..
* Data (REST) API has been recently [announced](https://docs.atlas.mongodb.com/api/data-api/). This allows you to access your database using HTTP.
* MongoDB Atlas has a Serverless plan with [some limitations.](https://docs.atlas.mongodb.com/reference/serverless-instance-limitations/) The pricing of this plan is per operations so it scales to zero as expected from a serverless product.
* Multi region replication is only available with Dedicated plan.
* Serverless Pricing:
  * Reads: $0.30 per million unit (4KB)
  * Writes: $1.25 per million unit (1KB)
  * Storage: $0.25/GB-month

![db](/blog/nextjsdbs/n5.png)


#### My Comments:



* Serverless Plan and Data API tells us that MongoDB Atlas does not ignore the Serverless space. But both solutions are in the preview phase and needs some improvements to be a data solution ideal for serverless applications.

#### Useful Links:



* [Pricing Page](https://www.mongodb.com/pricing)
* [How to Integrate MongoDB into Next.js App](https://www.mongodb.com/developer/how-to/nextjs-with-mongodb/)
* [Video: Integrating MongoDB Into Your NextJS App](https://www.youtube.com/watch?v=aAupumVpqcE)


## DynamoDB



* Fully managed NoSQL database with key-value and document data model.
* The connections are HTTP based so it fits to serverless applications.
* Pricing is per operation in addition to data transfer cost. So it scales to zero.
* By default, the reads are eventually consistent. You can also request strongly consistent reads but it has some [limitations](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html).
* You can enable multi region replication with extra cost.
* The pricing:
  * Reads: $0.25 per million read request units (2KB)
  * Writes: $1.25 per million read request units (1KB)
  * Data transfer (out): $0.09 per GB
  * Storage: $0.25 per GB-month


![db](/blog/nextjsdbs/n6.png)


#### My Comments:



* For me, DynamoDB API is not as intuitive as Redis or MongoDB.
* There is a vendor lock-in problem. DynamoDB is only at AWS and you can not move your application to another provider without changing the code.

#### Useful Links:
* [Pricing Page](https://aws.amazon.com/dynamodb/pricing/on-demand/)
* [Example App: Next.js with DynamoDB ](https://github.com/leerob/nextjs-aws-dynamodb)
* [Video Course: Next.js with DynamoDB](https://egghead.io/courses/using-dynamodb-with-next-js-b40c)


## Conclusion
So what is the best database for Next.js? As expected, there is no single answer. But let's give some conditional answers:

- If you need a relational DB 👉🏻 Supabase or PlanetScale
- If you need database branching 👉🏻 PlanetScale
- If you need real time updates 👉🏻 Supabase or MongoDB Atlas
- If you need global low latency 👉🏻 Upstash or DynamoDB
- If you need global strong consistency 👉🏻 Fauna
- If you need low latency key value store 👉🏻 Upstash 
- If you love PostgreSQL 👉🏻 Supabase
- If you love MySQL 👉🏻 PlanetScale
- If you love Redis 👉🏻 Upstash
- If you love Mongo 👉🏻 MongoDB Atlas
- If you need GraphQL 👉🏻 Fauna
                                  
I tried to be fair and correct. If you think there is something I need to fix, please drop your comments to my [twitter](https://twitter.com/enesakar)
