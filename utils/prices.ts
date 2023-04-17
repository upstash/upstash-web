export const REDIS_PRICES = {
  commandsLimit: {
    title: "Commands Limit",
    description:
      "This is the maximum number of requests/commands that your database can receive and process per day.",
    free: "Max 10,000 Commands Daily",
    payg: "Unlimited",
    enterprise: "Unlimited",
  },
  persistence: {
    title: "Persistence",
    description:
      "Upstash has its own persistence layer that integrates with block storage services of cloud providers. This provides fault tolerance to all database types including the free.",
    free: true,
    payg: true,
    enterprise: true,
  },
  encryption: {
    title: "Encryption (TLS)",
    description:
      "Encrypts the data between server and client. Recommended for production.",
    free: true,
    payg: true,
    enterprise: true,
  },

  maxRetentionSizeLimit: {
    title: "Max Retention Size",
    description:
      "This is the maximum size of a log data for a topic partition.",
    free: "256 MB",
    payg: "1 TB",
    enterprise: "Unlimited",
  },
  maxRetentionTimeLimit: {
    title: "Max Retention Time",
    description:
      "This is the maximum time the logs will be retained before they will be discarded to free up space.",
    free: "1 week",
    payg: "30 days",
    enterprise: "Unlimited",
  },
  maxNumberOfPartitionsLimit: {
    title: "Max Partitions",
    description:
      "This is the max total number of partitions you can create in the plan.",
    free: "10",
    payg: "100",
    enterprise: "10000",
  },
  messagesLimit: {
    title: "Messages Limit",
    description:
      "This is the maximum number of messages that your cluster can produce and consume per day.",
    free: "Max 10,000 Messages Daily",
    payg: "Unlimited",
    enterprise: "Unlimited",
  },
  maxDataSizePerDB: {
    title: "Max Data Size Per DB",
    description:
      "This is the total data size that you can store in your database.",
    free: "256 MB",
    payg: "10 GB",
    enterprise: "500 GB",
  },
  maxConcurrentConnections: {
    title: "Max Concurrent Connections",
    description:
      "This is the maximum allowed number of concurrent connections (clients) at a moment. This cap does not essentially limit the number of requests that can be submitted per second, but defines the maximum number of open TCP connections to the database.",
    free: "1000",
    payg: "1000",
    enterprise: "10,000",
  },
  restApi: {
    title: "REST API",
    description:
      "REST API provides HTTP based, connectionless access to the Upstash databases.",
    free: true,
    payg: true,
    enterprise: true,
  },
  multiZoneReplication: {
    title: "Replication",
    description:
      "Upstash replicates your data to multiple instances. This provides high availability and minimum fail over time.",
    free: false,
    payg: true,
    enterprise: true,
  },
  vpcPeering: {
    title: "VPC Peering",
    description:
      "VPC Peering enables you to connect to Upstash from your own VPC using private IP. Database and your application can run in the same subnet which also cancels out data transfer costs.",
    free: false,
    payg: false,
    enterprise: true,
  },
  support: {
    title: "Professional Support",
    description:
      "Professional Support includes dedicated service desk and Slack channel with response time SLAs.",
    free: false,
    payg: "Optional",
    enterprise: "Optional",
  },
  price: {
    title: "Price",
    description:
      "Pricing is based on per request/command. Operational commands like AUTH, INFO, PING, QUIT, COMMAND are not billed.",
    free: "Free (No credit card required)",
    payg: "$0.2 per 100K commands, up to $160 monthly max.",
    enterprise: "Custom",
  },
};

export const KAFKA_PRICES = {
  messagesLimit: {
    title: "Messages Limit",
    description:
      "This is the maximum number of messages that your cluster can produce and consume per day.",
    free: "Max 10,000 Messages Daily",
    payg: "Unlimited",
    enterprise: "Unlimited",
  },
  maxRetentionSizeLimit: {
    title: "Max Retention Size",
    description:
      "This is the maximum size of a log data for a topic partition.",
    free: "256 MB",
    payg: "1 TB",
    enterprise: "Unlimited",
  },
  maxRetentionTimeLimit: {
    title: "Max Retention Time",
    description:
      "This is the maximum time the logs will be retained before they will be discarded to free up space.",
    free: "1 week",
    payg: "30 days",
    enterprise: "Unlimited",
  },
  maxNumberOfPartitionsLimit: {
    title: "Max Partitions",
    description:
      "This is the max total number of partitions you can create in the plan.",
    free: "10",
    payg: "100",
    enterprise: "10000",
  },
  restApi: {
    title: "REST API",
    description:
      "REST API provides HTTP based, connectionless access to the Upstash databases.",
    free: true,
    payg: true,
    enterprise: true,
  },
  multiZoneReplication: {
    title: "Replication",
    description:
      "Upstash replicates your data to multiple instances. This provides high availability and minimum fail over time. ",
    free: true,
    payg: true,
    enterprise: true,
  },
  vpcPeering: {
    title: "VPC Peering",
    description:
      "VPC Peering enables you to connect to Upstash from your own VPC using private IP. Database and your application can run in the same subnet which also cancels out data transfer costs.",
    free: false,
    payg: false,
    enterprise: true,
  },
  support: {
    title: "Professional Support",
    description:
      "Professional Support includes dedicated service desk and Slack channel with response time SLAs.",
    free: false,
    payg: "Optional",
    enterprise: "Optional",
  },
  priceSingleZone: {
    title: "Price - Single Replica",
    description:
      "Single replica cluster is recommended only for testing and development purposes.",
    free: "Free (No credit card required)",
    payg: "$0.2 per 100K commands, up to $120 monthly max.",
    enterprise: "Custom",
  },
  priceMultiZone: {
    title: "Price - Multi Replica",
    description:
      "Multi replica cluster is recommended for production use cases.",
    free: "Free (No credit card required)",
    payg: "$0.6 per 100K commands, up to $360 monthly max. ",
    enterprise: "Custom",
  },
};

export const QSTASH_PRICES = {
  maxRequestPerDay: {
    title: "Max Messages per day",
    description: "",
    free: "500",
    payg: "500,000",
    enterprise: "Unlimited",
  },
  maxMessageSize: {
    title: "Max Message Size",
    description: "",
    free: "1 MB",
    payg: "1 MB",
    enterprise: "10 MB",
  },
  maxRetryCount: {
    title: "Max Retry Count",
    description: "",
    free: "3",
    payg: "5",
    enterprise: "20",
  },
  maxTimeout: {
    title: "Max HTTP Timeout",
    description: "How long we wait for a response from the target API",
    free: "2 min",
    payg: "5 min",
    enterprise: "Custom",
  },
  price: {
    title: "Price",
    description: "",
    free: "Free (No credit card required)",
    payg: "$1 per 100K messages",
    enterprise: "Custom",
  },
};
