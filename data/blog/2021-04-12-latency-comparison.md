---
slug: latency-comparison
title: 'Latency Comparison Among Serverless Databases: DynamoDB vs FaunaDB vs Upstash'
sidebar_label: Latency Comparison Among Serverless Databases
authors: noah
image: img/blog/serverless-databases.jpeg
tags: [redis, database, serverless, faunadb, dynamodb, awslambda]
---

In this article, I will compare the latencies of three serverless databases DynamoDB, FaunaDB, Upstash (Redis) for a common web use case.

I created a sample news website and I am recording database related latency with each request to the website. Check [the website](https://news-app-two-omega.vercel.app/) and [the source code](https://github.com/upstash/latency-comparison).

I have inserted 7001 NY Times articles into each database. The articles are collected from New York Times Archive API(all articles of January 2021). I randomly scored each article. At each page request, I query top 10 articles under the `World` section from each database.

<!--truncate-->

I use serverless functions (AWS Lambda) to load the articles from each database. Response time of fetching 10 articles is being recorded as latency inside the lambda function. Note that the recorded latency is only between the lambda function and the database. It is not the latency between your browser and the server.

After each read request, I update the scores randomly to simulate dynamic data. But I exclude this part from the latency calculation.

First we will examine the application, then we will look at the results:


### AWS Lambda Setup

Region: US-West-1

Memory: 1024Mb

Runtime: nodejs14.x


### DynamoDB Setup

I created a DynamoDB table in US-West-1 with the read and write capacity 50 (the default value was 5).

My index is GSI with partition key `section (String)` and sort key `view_count (Number)`.




![alt_text](/img/blog/dynamodb.png "image_tooltip")



### FaunaDB Setup

FaunaDB is a globally replicated database, afaik there is no way to select a region. I used FQL, assuming GraphQL API may have some overhead.

I created an index with terms {`section`} and values {`view_count`, `ref`} as below. I made it non-serialized hoping to improve the performance.
      
```json
CreateIndex({

name: "section_by_view_count",

unique: false,

serialized: false,

source: Collection("news"),

terms: [

{ field: ["data", "section"] }

],

values: [

{ field: ["data", "view_count"], reverse: true },

{ field: ["ref"] }

]

})
```


### Redis Setup

I created a Standard type database in the US-West-1 region in Upstash. I used a Sorted Set per each news category. So all `World` news articles will be in the Sorted Set with key `World`.


### Initialize Databases

I downloaded the 7001 news articles as a JSON file from NYTimes API site, then created a NodeJS script per each database which reads the JSON and inserts the news record to the database. See the files: [initDynamo.js](https://github.com/upstash/latency-comparison/blob/master/initnewsdb/initDynamo.js), [initFauna.js](https://github.com/upstash/latency-comparison/blob/master/initnewsdb/initFauna.js), [initRedis.js](https://github.com/upstash/latency-comparison/blob/master/initnewsdb/initRedis.js)


### Query DynamoDB

I used AWS SDK to connect to DynamoDB. To minimize the latency, I am keeping the DynamoDB connection alive. I have used the ``perf_hooks`` library to measure the response time. I record the current time just before querying the DynamoDB for the top 10 articles. I calculated the latency as soon as I got the response from DynamoDB. Then I randomly score the articles and insert the latency number to a Redis sorted set but these parts are outside the latency calculation part. See the code below:


```javascript
var AWS = require("aws-sdk");
AWS.config.update({
   region: "us-west-1"
});
const https = require('https');
const agent = new https.Agent({
   keepAlive: true,
   maxSockets: Infinity
});

AWS.config.update({
   httpOptions: {
       agent
   }
});

const Redis = require("ioredis");
const { performance } = require("perf_hooks");
const tableName = "news";
var params = {
   TableName: tableName,
   IndexName: "section-view_count-index",
   KeyConditionExpression: "#sect = :section",
   ExpressionAttributeNames: {
       "#sect": "section"
   },
   ExpressionAttributeValues: {
       ":section": process.env.SECTION
   },
   Limit: 10,
   ScanIndexForward: false,
};
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.load =  (event, context, callback) => {
   let start = performance.now();
   docClient.query(params, (err, result) => {
       if (err) {
           console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
       } else {
           // response is ready so we can set the latency
           let latency = performance.now() - start;
           let response = {
               statusCode: 200,
               headers: {
                   'Access-Control-Allow-Origin': '*',
                   'Access-Control-Allow-Credentials': true,
               },
               body: JSON.stringify(
                   {
                       latency: latency,
                       data: result,
                   }
               )
           };
           // we are setting random score to top-10 items to simulate real time dynamic data
           result.Items.forEach(item =>{
               let view_count = Math.floor(Math.random() * 1000);
               var params2 = {
                   TableName:tableName,
                   Key:{
                       "id": item.id,
                   },
                   UpdateExpression: "set view_count = :r",
                   ExpressionAttributeValues:{
                       ":r":view_count
                   },
               };
               docClient.update(params2, function(err, data) {
                   if (err) {
                       console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                   }
               });
           } );
           // pushing the latency to the histogram
           const client = new Redis(process.env.LATENCY_REDIS_URL);
           client.lpush("histogram-dynamo", latency, (resp) => {
               client.quit();
               callback(null, response)
           })
       }
   });
};
```



### Query FaunaDB

I used the `faunadb` library to connect and query FaunaDB. The remaining part is very similar to DynamoDB code. To minimize the latency, I am keeping the connection alive. I have used the ``perf_hooks`` library to measure the response time. I record the current time just before querying the FaunaDB for the top 10 articles. I calculated the latency as soon as I got the response from FaunaDB. Then I randomly score the articles and send the latency number to a Redis sorted set but these parts are outside the latency calculation part. See the code below:


```javascript
const faunadb = require("faunadb");
const Redis = require("ioredis");
const { performance } = require("perf_hooks");
const q = faunadb.query
const client = new faunadb.Client({
   secret: process.env.FAUNA_SECRET,
   keepAlive: true
})
const section = process.env.SECTION;

module.exports.load = async (event) => {
   let start = performance.now();
   let ret = await client.query(
       // the below is Fauna API for "select from news where section = 'world' order by view_count limit 10"
       q.Map(q.Paginate(q.Match(q.Index('section_by_view_count'), section), {size: 10}), q.Lambda(["view_count", "X"], q.Get(q.Var("X"))))
   ).catch((err) => console.error('Error: %s', err))
   console.log(ret)
   // response is ready so we can set the latency
   let latency = performance.now() - start;
   const rclient = new Redis(process.env.LATENCY_REDIS_URL);
   await rclient.lpush("histogram-fauna", latency)
   await rclient.quit();

   let result = [];
   for (let i = 0; i < ret.data.length; i++) {
       result.push(ret.data[i].data)
   }

   // we are setting random scores to top-10 items asynchronously to simulate real time dynamic data
   ret.data.forEach((item) => {
       let view_count = Math.floor(Math.random() * 1000);
       client.query(
           q.Update(
               q.Ref(q.Collection('news'), item["ref"].id),
               {data: {view_count}},
           )
       ).catch((err) => console.error('Error: %s', err))
   })

   return {
       statusCode: 200,
       headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Credentials': true,
       },
       body: JSON.stringify({
           latency: latency,
           data: {
               Items: result
           },
       })
   };
};
```



### Query Redis

I used the `ioredis` library to connect and read from Redis in Upstash. I used the [ZREVRANGE](https://redis.io/commands/zrevrange) command to load data from Sorted Set. To minimize the latency, I reused the connection creating the Redis client outside the function. Similar to DynamoDB and FaunaDB, I am updating the scores and sending the latency number to another Redis DB for histogram calculation. See the code:


```javascript
const Redis = require("ioredis");
const { performance } = require("perf_hooks");
const client = new Redis(process.env.REDIS_URL);
module.exports.load = async (event) => {
   let section = process.env.SECTION;
   let start = performance.now();
   let data = await client.zrevrange(section, 0, 9)
   let items = []
   for(let i = 0; i < data.length; i++) {
       items.push(JSON.parse(data[i]));
   }
   // response is ready so we can set the latency
   let latency = performance.now() - start;
   // we are setting random scores to top-10 items to simulate real time dynamic data
   for(let i = 0; i < data.length; i++) {
       let view_count = Math.floor(Math.random() * 1000);
       await client.zadd(section, view_count, data[i]);
   }
   // await client.quit();
   // pushing the latency to the histogram
   const client2 = new Redis(process.env.LATENCY_REDIS_URL);
   await client2.lpush("histogram-redis", latency)
   await client2.quit();
   return {
       statusCode: 200,
       headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Credentials': true,
       },
       body: JSON.stringify( {
           latency: latency,
           data: {
               Items: items
           },
       })
   };
};
```



### Histogram Calculation

I used ``hdr-histogram-js`` library to calculate the histogram. This is a js implementation of Gil Tene’s [hdr-histogram](http://hdrhistogram.github.io/) library. See the code of the lambda function which receives the latency numbers and calculates the histogram.


```javascript
const Redis = require("ioredis");
const hdr = require("hdr-histogram-js");

module.exports.load = async (event) => {
   const client = new Redis(process.env.LATENCY_REDIS_URL);
   let dataRedis = await client.lrange("histogram-redis", 0, 10000)
   let dataDynamo = await client.lrange("histogram-dynamo", 0, 10000)
   let dataFauna = await client.lrange("histogram-fauna", 0, 10000)
   const hredis = hdr.build();
   const hdynamo = hdr.build();
   const hfauna = hdr.build();
   dataRedis.forEach(item => {
       hredis.recordValue(item);
   })
   dataDynamo.forEach(item => {
       hdynamo.recordValue(item);
   })
   dataFauna.forEach(item => {
       hfauna.recordValue(item);
   })
   await client.quit();
   return {
       statusCode: 200,
       headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Credentials': true,
       },
       body: JSON.stringify(
           {
               redis_min: hredis.minNonZeroValue,
               dynamo_min: hdynamo.minNonZeroValue,
               fauna_min: hfauna.minNonZeroValue,
               redis_mean: hredis.mean,
               dynamo_mean: hdynamo.mean,
               fauna_mean: hfauna.mean,
               redis_histogram: hredis,
               dynamo_histogram: hdynamo,
               fauna_histogram: hfauna,
           },
           null,
           2
       )
   };
};
```





## The Results

Check [the website](https://news-app-two-omega.vercel.app/) for the latest results. You can also reach the latest [histogram data](https://71q1jyiise.execute-api.us-west-1.amazonaws.com/dev/histogram). As long as the website is up and running, we will continue to collect the data and update the histogram. Results as of today (Apr, 12, 2021) shows that Upstash has the lowest latency (~50ms at 99th percentile) where FaunaDB has the highest latency (~900ms at 99th percentile). DynamoDB has (~200ms at 99th percentile)

![alt_text](/img/blog/results.png "image_tooltip")

### Cold Start Effect

Although we measure the latency only for the query part, the cold start still has an effect. We optimize our code by reusing the client connections. We benefit from this as long as the Lambda container is hot and running. When AWS kills the container (cold start), the code re-creates the client, this is an overhead. In the [application website](https://news-app-two-omega.vercel.app/), if you refresh the page; you will see the latency numbers decrease down to ~1ms for Upstash ; and ~7ms for DynamoDB.


### Why is FaunaDB slow (in this benchmark)?

In [FaunaDB’s status page](https://status.fauna.com/), you will see latency numbers in hundreds. So I assume my configuration does not have big flaws. There can be two reasons behind this latency difference:

**Strong consistency:** By default, both [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html) and [Upstash](https://docs.upstash.com/overall/consistency) provide eventual consistency for reads. [FaunaDB](https://docs.fauna.com/fauna/current/comparisons/compare-faunadb-vs-dynamodb#consistency-models) provides [Calvin](https://dl.acm.org/doi/10.1145/2213836.2213838) based strong consistency and [isolation](https://docs.fauna.com/fauna/current/concepts/isolation_levels). Strong consistency comes with performance overhead.

**Global replication:** For both Upstash and DynamoDB, we are able to configure the database and the lambda function to be in the same AWS region. In FaunaDB, your data is replicated all around the world; so you do not have an option to pick your region. If your database clients are located around the world then this can be an advantage. But if you deploy your backend to a specific region, then this causes extra latency.


### Redis gives sub millisecond latency. Why is it not the case here?

Creating a new Redis connection in the AWS Lambda function causes [a notable overhead](https://blog.upstash.com/serverless-database-connections#are-redis-connections-really-lightweight). As the application does not get a stable traffic, AWS Lambda re-creates the connection (cold start) most of the time. So the majority of the latency numbers in the histogram includes connection creation time. We run a job which fetches the website every 15 seconds; we saw that latency for Upstash has decreased to ~1ms. If you refresh the page, you will see a similar effect.  See [our blog post](https://blog.upstash.com/serverless-database-connections) for how to optimize your serverless applications for low latency.


## Coming Soon

Upstash will soon release the Premium product where the data is replicated to multiple availability zones. I will add it to see the effect of zone replication.

Let us know your feedback on [Twitter](https://twitter.com/upstash) or [Discord](https://discord.com/invite/w9SenAtbme).

## Update
There was an active discussion on [HackerNews](https://news.ycombinator.com/item?id=26799074) about the my banchmark and performance of the Fauna. I applied the suggestions and restarted FaunaDB application. That’s why, the number of FaunaDB records in the histogram is less than others.