export const LINKS = {
  docs: "https://docs.upstash.com",
  console: "https://console.upstash.com",
  consoleNextjs: "https://console.upstash.com?utm_source=nextjs",
  consoleKafka: "https://console.upstash.com?utm_source=kafka",
  support: "https://docs.upstash.com/docs/help/support",
  privacy: "/static/trust/privacy.pdf",
  terms: "/static/trust/terms.pdf",
  consistency: "https://docs.upstash.com/overall/consistency",
  durability: "https://docs.upstash.com/overall/durability",
  globalDatabase: "https://docs.upstash.com/redis/features/globaldatabase",
  compare: "https://docs.upstash.com/overall/compare",
  pricing: "https://docs.upstash.com/redis/overall/pricing",
  pricingKafka: "https://docs.upstash.com/kafka/pricing",
  aws: "https://docs.upstash.com/howto/connectfromawslambda",
  nextjs: "https://docs.upstash.com/tutorials/nextjs_with_redis",
  restApi: "https://docs.upstash.com/features/restapi",
  kafkaDocs: "https://docs.upstash.com/kafka/",
  redisCompatibility: "https://docs.upstash.com/overall/rediscompatibility",
  graphqlCompatibility: "https://docs.upstash.com/graphql/aboutgraphqlapi",
  enterprisePricing: "https://docs.upstash.com/overall/enterprise",
  databaseTypes: "https://docs.upstash.com/overall/databasetypes",
  faq: "https://docs.upstash.com/help/faq",
};

export const SOCIAL_LINKS = {
  blog: "https://blog.upstash.com",
  medium: "https://medium.com/upstash",
  twitter: "https://twitter.com/upstash",
  discord: "https://discord.gg/w9SenAtbme",
};

export const BANNED_TAGS = [
  "undefined",
  "upstash",
  "aws",
  "database",
  "faunadb",
  "dynamodb",
];

export const META = {
  title: "Upstash: Serverless Data for Redis® and Kafka®",
  description:
    "Designed for the serverless with per-request pricing and Redis®/Kafka® API.",
  url: "https://upstash.com",
  twitterAccount: "@upstash",
  imagePath: "https://upstash.com/static/logo/square-dark.png",
  coverImagePath: "https://upstash.com/static/logo/og-homepage.jpg",
  imageSize: 1024,
  googleAnalytic: "G-QW5KRSTDM0",
};

export const TAG_NAMES = {
  aws: "AWS",
  "aws-lambda": "AWS Lambda",
};

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
    title: "Multi Zone Replication",
    description:
      "Upstash replicates data to multiple zones for Premium type of databases. This provides high availability and minimum fail over time. Enabling multi zone replication doubles the price.",
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
    enterprise: "Included",
  },
  price: {
    title: "Price",
    description:
      "Pricing is based on per request/command. Operational commands like AUTH, INFO, PING, QUIT, COMMAND are not billed.",
    free: "Free (No credit card required)",
    payg: "$0.2 per 100K commands, up to $120 monthly max.",
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
    title: "Multi Zone Replication",
    description:
      "Upstash replicates your data to different availability zones. This provides high availability and minimum fail over time. ",
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
    enterprise: "Included",
  },
  priceSingleZone: {
    title: "Price - Single Zone",
    description:
      "Single zone cluster is recommended only for testing and development purposes.",
    free: "Free (No credit card required)",
    payg: "$0.2 per 100K commands, up to $120 monthly max.",
    enterprise: "Custom",
  },
  priceMultiZone: {
    title: "Price - Multi Zone",
    description: "Multi zone cluster is recommended for production use cases.",
    free: "Free (No credit card required)",
    payg: "$0.6 per 100K commands, up to $360 monthly max. ",
    enterprise: "Custom",
  },
};

export const QSTASH_PRICES = {
  maxRequestPerDay: {
    title: "Max Requests per day",
    description: "",
    free: "50",
    payg: "50,000",
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
  maxNumberOfSchedules: {
    title: "Max Number of Schedules",
    description: "",
    free: "1",
    payg: "10",
    enterprise: "Unlimited",
  },
  price: {
    title: "Price",
    description: "",
    free: "Free (No credit card required)",
    payg: "$1 per 100K requests, up to $200 monthly max.",
    enterprise: "Custom",
  },
};

export const HIGHLIGHT_THEME = {
  hljs: {
    textAlign: "left",
    display: "block",
    overflowX: "auto",
    fontSize: "0.84rem",
  },
  "hljs-subst": {
    color: "#444",
  },
  "hljs-comment": {
    color: "#888",
  },
  "hljs-keyword": {
    color: "#FFEFBD",
  },
  "hljs-attribute": {},
  "hljs-selector-tag": {},
  "hljs-meta-keyword": {},
  "hljs-doctag": {},
  "hljs-name": {},
  "hljs-type": {},
  "hljs-string": {
    color: "#00E9A3",
  },
  "hljs-number": {},
  "hljs-selector-id": {},
  "hljs-selector-class": {},
  "hljs-quote": {},
  "hljs-template-tag": {},
  "hljs-deletion": {},
  "hljs-title": {},
  "hljs-section": {},
  "hljs-regexp": {},
  "hljs-symbol": {},
  "hljs-variable": {},
  "hljs-template-variable": {},
  "hljs-link": {},
  "hljs-selector-attr": {},
  "hljs-selector-pseudo": {},
  "hljs-literal": {},
  "hljs-built_in": {},
  "hljs-bullet": {},
  "hljs-code": {},
  "hljs-addition": {},
  "hljs-meta": {},
  "hljs-meta-string": {},
  "hljs-emphasis": {},
  "hljs-strong": {},
};

export const SUPPORT_LANG = {
  NODE_REDIS: {
    name: "Node.js",
    language: "javascript",
  },
  REDIS_PY: {
    name: "Python",
    language: "python",
  },
  JEDIS: {
    name: "Java",
    language: "java",
  },
  GO_REDIS: {
    name: "Go",
    language: "go",
  },
  REDIS_CLI: {
    name: "CLI",
    language: "bash",
  },
};

export function codeGernerator(name) {
  const endpoint = "my-serverless-db.upstash.io";
  const port = "30652";
  const password = "1234567890";

  switch (name) {
    case SUPPORT_LANG.REDIS_CLI.name:
      return `redis-cli -u redis://${password}@${endpoint}:${port}`;

    case SUPPORT_LANG.NODE_REDIS.name:
      return `const redis = require("redis");

var client = redis.createClient ({
  host : '${endpoint}',
  port : '${port}',
  password: '${password}'
});

client.on("error", function(err) {
  throw err;
});

client.set('foo','bar');
client.quit();`;

    case SUPPORT_LANG.REDIS_PY.name:
      return `import redis
r = redis.Redis(
  host= '${endpoint}',
  port= '${port}',
  password= '${password}')
r.set('foo','bar')
print(r.get('foo'))`;

    case SUPPORT_LANG.JEDIS.name:
      return `public static void main(String[] args) {
  Jedis jedis = new Jedis("${endpoint}", ${port});
  jedis.auth("${password}");
  jedis.set("foo", "bar");
  String value = jedis.get("foo");
}`;

    case SUPPORT_LANG.GO_REDIS.name:
      return `var ctx = context.Background()

func main() {
  opt, _ := redis.ParseURL("redis://:${password}@${endpoint}:${port}")
  client := redis.NewClient(opt)
  client.Set(ctx, "foo", "bar", 0)
  val := client.Get(ctx, "foo").Val()
  print(val)
}`;

    default:
      return "";
  }
}

export const INVESTORS = [
  {
    name: "Robin Vasan",
    title: "Founder, Mango Capital",
    src: "/investors/robin.jpeg",
    url: "https://www.linkedin.com/in/robinvasan/",
  },
  {
    name: "Naval Ravikant",
    title: "Founder, AngelList",
    src: "/investors/naval.png",
    url: "https://twitter.com/naval",
  },
  {
    name: "Guillermo Rauch",
    title: "CEO, Vercel",
    src: "/investors/rauchg.jpeg",
    url: "https://twitter.com/rauchg",
  },
  {
    name: "Cem Sertoglu",
    title: "Partner, Earlybird",
    src: "/investors/cem-sertoglu.jpg",
    url: "https://www.linkedin.com/in/csertoglu",
  },
  {
    name: "Matias Woloski",
    title: "Founder, Auth0",
    src: "/investors/matias.png",
    url: "https://twitter.com/woloski",
  },
  {
    name: "Max Stoiber",
    title: "Creator of styled-components",
    src: "/investors/mxstbr.jpeg",
    url: "https://twitter.com/mxstbr",
  },
  {
    name: "Nuno Job",
    title: "Ground Control Ventures",
    src: "/investors/dscape.jpeg",
    url: "https://twitter.com/dscape",
  },
  {
    name: "Andreas Klinger",
    title: "Remote First Capital",
    src: "/investors/andreas-klinger.jpeg",
    url: "https://twitter.com/andreasklinger",
  },
  {
    name: "Joseph Abebe",
    title: "Investor/Advisor (ex-Slack)",
    src: "/investors/joseph-abebe.jpeg",
    url: "https://twitter.com/josephaabebe",
  },
  {
    name: "Martin Gontovnikas ",
    title: "Co-Founder, HyperGrowth Partners",
    src: "/investors/mgonto.jpeg",
    url: "https://twitter.com/mgonto",
  },
  {
    name: "Jeff Fagnan",
    title: "Founder, Accomplice",
    src: "/investors/jfagnan.webp",
    url: "https://angel.co/p/jfagnan",
  },
  {
    name: "Jake Zeller",
    title: "Partner, AngelList",
    src: "/investors/jake-zeller.jpeg",
    url: "https://twitter.com/jake_zeller",
  },
  {
    name: "Dilek Dayinlarli",
    title: "Partner, ScaleX Ventures",
    src: "/investors/dilekdayinlarli.jpeg",
    url: "https://twitter.com/dilekdayinlarli",
  },
  {
    name: "Morgan Dioli",
    title: "Partner, Ravix Group",
    src: "/investors/morgan-dioli.jpeg",
    url: "https://www.linkedin.com/in/morgan-dioli-author-cfo",
  },
];

export const MAX_CLAP = 10;
