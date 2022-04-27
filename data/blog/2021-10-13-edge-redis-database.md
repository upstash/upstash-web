---
slug: edge-redis-database
date: 2021-10-13
title: 'Upstash as a Serverless Database for Edge'
sidebar_label: 'Upstash as a Serverless Database for Edge'
authors: enes
image: img/blog/cover-edge-database.jpg
tags: [serverless, aws-lambda, cloudflare-workers, edge, redis]
---



Upstash started its journey with a mission to be the best database option for your AWS Lambda functions. Meanwhile, we discovered another great option to build your serverless functions: Cloudflare Workers. It is an exciting product because it promises a better latency all over the world with a lower cost and no cold starts. But it has many limitations when [compared to AWS Lambda](https://blog.upstash.com/aws-lambda-vs-cloudflare-workers). Extra limitations makes the list of database options shorter. We saw this as an opportunity to position Upstash as a great solution for the question: `CF Workers are stateless. Where should I keep my data then?`

<!--truncate-->

## Challenges

### Accessibility

Cloudflare Workers is a more closed environment. It is not like AWS. You can not set up your own database into the same region and access it via VPC. So you need to access your database from the Workers function. Cloudflare Workers use V8 Isolates as the runtime. It does not allow TCP connections. So the database should be accessible via HTTP.


### Global Replication

Workers has the advantage of being deployed everywhere. While your function is accessible with low latency from all over the world; you should not spend hundreds of milliseconds to access your database. Your database should be close to where your function executes. This is possible by replicating your data to multiple regions and continents.


### Low Latency

Developers prefer edge computing solutions because they provide low latency everywhere. The database should not be a bottleneck. In-memory databases like Redis provides sub-millisecond latency.




## Journey of Upstash


### REST API

We launched Upstash with native Redis API support. All Redis clients are supported, this is perfect for legacy Redis applications. But soon we started to see users having [connection problems](https://blog.upstash.com/serverless-database-connections) on serverless functions. Also it was not accessible from Cloudflare Workers. So we first implemented the [GraphQL API](https://docs.upstash.com/features/graphqlapi). But we were not happy with the GraphQL API, because of a performance overhead due to the proxy layer. Also GraphQL was not the easiest way to run Redis commands. We decided to build a REST server inside the database engine to minimize the performance overhead. We think REST is a better fit for Redis. We launched [the REST API](https://docs.upstash.com/features/restapi) and see that it is quite popular among developers who want to access Redis from Cloudflare Workers and Webassembly.


### Edge Caching

Thanks to the REST API, Upstash was accessible from Workers but the latency was not ideal. Some developers tried to use Cloudflare’s own caching to cache Redis responses. But it was a complex solution. Redis should be already very fast, so it does not feel good to `cache Redis` somewhere else. That’s why we decided to build [edge caching](https://docs.upstash.com/features/edgecaching) where we cache the Redis REST response at all edge locations. We used CDN providers to cache Redis responses. This was a substantial improvement at edge latencies, up to 80% performance gain.


### Global Database

Edge caching was a great solution to the global latency problem but it has some drawbacks for some use cases. First of all, it does not support cache invalidation (purge). If the expiration time of the cache is 30 seconds; then there is a 30 seconds window where your clients may read stale data. This can be tolerated by many web use cases but not all. Secondly, edge caching is supported only for REST API. Redis clients can not benefit from edge caching. So we decided to design a new database type which replicates data to multiple regions. It was very challenging to design it to be highly available and consistent enough. Currently Upstash has a [global database offering](https://docs.upstash.com/features/globaldatabase) which replicates your data to 5 different AWS regions (East and West North America, Europe, Asia, South America). Global database is not a cache so it does not have cache-invalidation problems. The writes are replicated instantly to all replicas. For the sake of performance and availability, Global database is designed to be eventually consistent.


### Edge Caching vs Global Database (or both)

If you just need a cache for your edge solution then Edge caching can be a good solution. But if you need your writes to invalidate the caches instantly, you should prefer Global database. Besides caching, Global database can be used as a highly available global datastore. Also keep in mind that Edge caching is only available for REST calls. If you are using Redis clients, Global database is the only option with low latency at edge.

Both Edge caching and Global database are designed to minimize the read latencies. If your use case is 90% write then a single region setup will make more sense. Writes have the same latency for both multi and single region databases, but they are 5 times more expensive in Global set up.

When edge caching is enabled, Upstash fetches the first request from origin then caches it at the edge. If origin is not nearby, then latency will be high. If you want the best latency for all cases; you can use both by enabling Edge Caching on a Global Database.

See [the benchmark application](https://edge-benchmark.vercel.app/) which compares latencies of edge caching and global database.


###  What’s next?

Here a few things that we can work on to improve Upstash at Edge:

* Low latency for writes: Currently, Global database is designed to optimize the read latencies with a single leader architecture. We think this covers the majority of use cases. But depending on your feedback and new use cases we can work on an architecture which gives low latency writes as well as reads.
* Kafka support: We are planning to launch Kafka in addition to Redis in coming weeks. Kafka will enable new use cases at edge such as clickstream analysis or pushing logs to kafka from serverless/edge functions.


We continue to improve and develop Upstash guided by your feedback. Let us know your thoughts on [Twitter](https://twitter.com/upstash) or [Discord](https://discord.gg/w9SenAtbme).  
