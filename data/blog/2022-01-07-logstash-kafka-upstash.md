---
slug: logstash-kafka-upstash
title: 'Shipping from Logstash to Kafka and analysing with Cloudflare Workers'
authors: noah
image: https://blog.upstash.com/img/blog/log-ship.jpeg
tags: [kafka, logstash, serverless]
---


Logstash is one of the most popular log shipping product that can collect logs from multiple sources and can ship to multiple targets.

In this blogpost, we will ship logs to Upstash Kafka using Logstash. Then we will make simple analysis with Cloudflare Workers.
In order to keep the post simple we will ship some sample words from a file but you can ship any logs using Logstash using its [input plugins](https://www.elastic.co/guide/en/logstash/current/input-plugins.html).

<!--truncate-->

### Creating Kafka Cluster and Topic in Upstash Console

Let's create a serverless kafka cluster in [Upstash Console](https://console.upstash.com/). You can follow our [Getting Started](https://docs.upstash.com/kafka) tutorial if needed.
In the console, there are Kafka Cluster credentials that we will use them with below code snippets.


### Configuring Logstash for Shipping

The simplest way to test logstash is using docker container. It can be downloaded and run [locally](https://www.elastic.co/guide/en/logstash/current/installing-logstash.html).

```
docker run -it docker.elastic.co/logstash/logstash:7.16.2 bash
```

Under `config` directory we will modify `logstash-sample.conf` file as following:


```text
input {
 file {
  path => "/usr/share/logstash/config/words.txt"
  start_position => "beginning"
 }
}

output {
      kafka {
        codec => json
        topic_id => "TOPIC_NAME"
        bootstrap_servers => "BOOTSTRAP_ENDPOINT:9092"
        sasl_mechanism => "SCRAM-SHA-256"
        security_protocol => "SASL_SSL"
        sasl_jaas_config => "org.apache.kafka.common.security.scram.ScramLoginModule required username='USERNAME'  password='PASSWORD'; "
        key_serializer => "org.apache.kafka.common.serialization.StringSerializer"
        value_serializer => "org.apache.kafka.common.serialization.StringSerializer"
      }
  stdout { codec => rubydebug }
}
```

Note: Please modify `TOPIC_NAME,BOOTSTRAP_ENDPOINT,USERNAME,PASSWORD` based on your kafka cluster and topic in Upstash Console.

Let's create a `words.txt` file under `config` directory and put some words.
In order to start logstash, we will use following command under `bin` directory:

```
./logstash -f ../config/logstash-sample.conf
```

Now every line in the `words.txt` is pushed to our kafka topic.

You can check Kafka Topic metrics from the Upstash Console.


### Consuming Kafka Cluster using Cloudflare Worker and Analysing Messages

Cloudflare has a great [playground tool](https://cloudflareworkers.com/) that you can directly play with your edge function.
We will use this tool without creating account.

Following code consumes messages from the kafka topic then increment its value in the map.
It basically counts every `word` in `words.txt` that shipped to Kafka.

    
```javascript
addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const { pathname } = new URL(request.url)
    USERNAME = ""
    PASSWORD = ""
    BOOTSTRAP_SERVER = ""
    const auth = btoa(`${USERNAME}:${PASSWORD}`)
    const init = {headers: {"Authorization": `Basic ${auth}`},}
    const results = new Map()

    resp = await fetch(`https://${BOOTSTRAP_SERVER}/consume/1/2/mytopic2`,init);
    js = await resp.json()
    js.forEach(
        (element) => {
            country = JSON.parse(element.value).message
            console.log(country)
            results[country] = (results[country]+1) || 1 ;      }
    );

    return new Response(JSON.stringify(results))
}
```

After executing above code you will get a json object similar to:

```text
{"Apple":2,"Orange":1,"Carrot":5}
```

### Conclusion

In this blogpost, I tried to keep the example as simple as possible to show how easy it is to create a Kafka cluster and ship Logstash logs to Kafka with a minimal config.

For more advanced scenarios, Logstash can publish logs from multiple sources to Kafka and Cloudflare workers can periodically analyse the Kafka Messages using Cloudflare Workers [Cron Triggers](https://developers.cloudflare.com/workers/platform/cron-triggers). 
After analysis, the worker code can take some actions or publish results to another platform. (like Slack or email)


In coming blogposts I am planning to analyse more complicated use cases and would like to hear your ideas/opinions in this respect.

Let us know your feedback on [Twitter](https://twitter.com/upstash) or [Discord](https://discord.com/invite/w9SenAtbme).







