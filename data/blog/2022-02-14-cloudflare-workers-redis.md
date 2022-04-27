---
slug: cloudflare-workers-redis
title: 'Cloudflare Workers KV vs Upstash Redis'
sidebar_label: 'Cloudflare Workers KV vs Upstash Redis'
authors: enes
tags: [redis, database, serverless, cloudflare workers]
---

If you are using Cloudflare Workers, [Upstash Global Redis](https://docs.upstash.com/redis/features/globaldatabase) and [Workers KV](https://www.cloudflare.com/products/workers-kv/) are probably your best options to keep your data. In this post, I will briefly compare them as a data store for your Cloudflare Workers functions.

<!--truncate-->

### Feature Set
Workers KV has  a key value store API with expiration:
```shell
put(key, value, {expiration: secondsSinceEpoch})
get(key)
delete(key)
list({prefix?: string, limit?: number, cursor?: string})
```

Upstash Redis has much larger API, including Strings, Sets, Lists, Hashes, SortedSets. Check [the Upstash API](https://docs.upstash.com/redis/overall/rediscompatibility).

### Price
Upstash Global Redis:
- $0.4 per 100K reads
- $2 per 100K writes
- Storage: $0.25/ GB-month

Cloudflare Workers KV:
- $0.5 per million reads
- $5 per million writes
- Storage: $0.50/ GB-month

### Portability
Upstash is compatible with Redis. So you can easily move your data to anywhere where you can run Redis including your own laptop.

Workers KV is only supported in Cloudflare Workers.

### Read Latency
Upstash Global distributes the data to 5 regions (North Virginia, Oregon, Frankfurt, Singapore, São Paulo). Depending on the location of the client, the read latency ranges from 10 to 80 milliseconds. 
Client locations and read latency:
- US: 10-20 msec
- Germany: 10-20 msec
- Brazil: 10-20 msec
- UK: 20-30 msec
- Spain: 30-40 msec
- India: 50-60 msec
- South Africa: 100-200 msec


Workers KV stores infrequently read values centrally, popular values are stored in all Cloudflare data centers. The first read has a high latency (200+ milliseconds). The next reads have a latency ranges from 10 to 30 milliseconds. Thanks to high number of PoP (Point of Presence) Workers KV has a similar read latency all over the world.
                                                                                                      
When the client is at a location near to Upstash's 5 regions (North Virginia, Oregon, Frankfurt, Singapore, São Paulo), Upstash has a similar read latency with Workers KV. *This is a surprising result for me. I was expecting CF Workers KV would have much better latency assuming Cloudflare runs Workers and KV at the same data centers. I am planning to do a more extensive benchmark and publish as another blog post.*

Cloudflare Workers has a better read latency than Upstash Redis when the clients are located further away Upstash regions such as South Africa.  

### Consistency
Both Workers KV and Upstash Global Redis are eventually consistent. This means the clients will eventually read the latest values. But it is not guaranteed that all clients will read the same or latest value at a specific time.

If you are looking for a globally distributed consistent database, check Google Cloud Spanner, CockroachDB or Fauna.


### Write Latency
Upstash instantly replicate updates to global regions. It takes 300-500 milliseconds for an update to be replicated to all regions. For Cloudflare, it may take up to 60 seconds for updates to be propagated to all other data centers.       

### Write Throughput
Cloudflare Workers KV has a hard limit that you can send 1 write operation to the same key per second. Upstash Redis does not have such a limit. You can execute thousands of write commands per second depending on your plan's capacity (Pay-as-you-go, Enterprise etc)

1 write/sec limit restricts Workers KV to read only or read heavy use cases.

### Links
[How Workers KV Works](https://developers.cloudflare.com/workers/learning/how-kv-works)

[Workers KV Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/kv)

[Upstash Global Database](https://docs.upstash.com/redis/features/globaldatabase)


