export const LINKS = {
  docs: 'https://docs.upstash.com/',
  console: 'https://console.upstash.com',
  support: 'https://docs.upstash.com/docs/help/support',
  privacy: 'static/legal/privacy.html',
  terms: 'static/legal/terms.html',
  subcontractors: 'static/legal/subcontractors.html',
  serverless: 'https://docs.upstash.com/docs/overall/compare/',
  compare: 'https://docs.upstash.com/docs/overall/compare/',
  pricing: 'https://docs.upstash.com/docs/account/pricing/',
  aws: 'https://docs.upstash.com/docs/howto/connectfromawslambda',
  nextjs: '#',
  redisCompatibility:
    'https://docs.upstash.com/docs/overall/rediscompatibility/',
  reservedPricing:
    'https://docs.upstash.com/docs/account/pricing#reserved-pricing',
  databaseTypes: 'https://docs.upstash.com/docs/overall/databasetypes',
  faq: 'https://docs.upstash.com/docs/help/faq'
}

export const SOCIAL_LINKS = {
  medium: 'https://medium.com/upstash',
  twitter: 'https://twitter.com/upstash',
  discord: 'https://dev.to/upstash'
}

export const PRICES = {
  commandsLimit: {
    title: 'Commands Limit',
    description:
      'This is the maximum number of requests/commands that your database can receive and process per day.',
    free: 'Max 10.000 Commands Daily',
    standard: 'Unlimited',
    premium: 'Unlimited'
  },
  maxDataSizePerDB: {
    title: 'Max Data Size Per DB',
    description:
      'This is the total data size that you can store in your database.',
    free: '256 MB',
    standard: '10 GB',
    premium: '500 GB'
  },
  maxConcurrentConnections: {
    title: 'Max Concurrent Connections',
    description:
      'This is the maximum allowed number of concurrent connections (clients) at a moment. This cap does not essentially limit the number of requests that can be submitted per second, but defines the maximum number of open TCP connections to the database.',
    free: '20',
    standard: '1000',
    premium: '10.000'
  },
  persistence: {
    title: 'Persistence',
    description:
      'Upstash has its own persistence layer that integrates with block storage services of cloud providers. This provides fault tolerance to all database types including the free.',
    free: true,
    standard: true,
    premium: true
  },
  encryption: {
    title: 'Encryption (TLS)',
    description:
      'Encryption the data transfer between server and client. Recommended for production usage.',
    free: true,
    standard: true,
    premium: true
  },
  multiZoneReplication: {
    title: 'Multi Zone Replication',
    description:
      'Upstash replicates data to multiple zones for Premium type of databases. This provides high availability and minumum failover time.',
    free: false,
    standard: false,
    premium: true
  },
  price: {
    title: 'Price',
    description:
      'Pricing is based on per request/command. Operational commands like AUTH, INFO, PING, QUIT, COMMAND are not billed.',
    free: 'Free',
    standard: '$0.2 per 100K commands, up to $120 monthly max.',
    premium: '$0.4 per 100K commands, up to $240 monthly max.'
  }
}

export const HIGHLIGHT_THEME = {
  hljs: {
    textAlign: 'left',
    display: 'block',
    overflowX: 'auto',
    fontSize: '0.92rem'
  },
  'hljs-subst': {
    color: '#444'
  },
  'hljs-comment': {
    color: '#888'
  },
  'hljs-keyword': {
    color: '#FFEFBD'
  },
  'hljs-attribute': {},
  'hljs-selector-tag': {},
  'hljs-meta-keyword': {},
  'hljs-doctag': {},
  'hljs-name': {},
  'hljs-type': {},
  'hljs-string': {
    color: '#00E9A3'
  },
  'hljs-number': {},
  'hljs-selector-id': {},
  'hljs-selector-class': {},
  'hljs-quote': {},
  'hljs-template-tag': {},
  'hljs-deletion': {},
  'hljs-title': {},
  'hljs-section': {},
  'hljs-regexp': {},
  'hljs-symbol': {},
  'hljs-variable': {},
  'hljs-template-variable': {},
  'hljs-link': {},
  'hljs-selector-attr': {},
  'hljs-selector-pseudo': {},
  'hljs-literal': {},
  'hljs-built_in': {},
  'hljs-bullet': {},
  'hljs-code': {},
  'hljs-addition': {},
  'hljs-meta': {},
  'hljs-meta-string': {},
  'hljs-emphasis': {},
  'hljs-strong': {}
}

export const SUPPORT_LANG = {
  NODE_REDIS: {
    name: 'node-redis',
    language: 'javascript'
  },
  REDIS_PY: {
    name: 'redis-py',
    language: 'python'
  },
  JEDIS: {
    name: 'jedis',
    language: 'java'
  },
  GO_REDIS: {
    name: 'go-redis',
    language: 'go'
  },
  REDIS_CLI: {
    name: 'redis-cli',
    language: 'bash'
  }
}

export function codeGernerator(
  name,
  db = {
    endpoint: 'DATABASE-ENDPOINT',
    port: 'DATABASE-PORT',
    password: 'DATABASE-PASSWORD'
  }
) {
  const { endpoint, port, password } = db

  switch (name) {
    case SUPPORT_LANG.REDIS_CLI.name:
      return `redis-cli -u redis://${password}@${endpoint}:${port}`

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

client.set('foo','bar');`

    case SUPPORT_LANG.REDIS_PY.name:
      return `import redis
r = redis.Redis(
  host= '${endpoint}',
  port= '${port}',
  password= '${password}')
r.set('foo','bar')
print(r.get('foo'))`

    case SUPPORT_LANG.JEDIS.name:
      return `public static void main(String[] args) {
  Jedis jedis = new Jedis("${endpoint}", ${port});
  jedis.auth("${password}");
  jedis.set("foo", "bar");
  String value = jedis.get("foo");
}`

    case SUPPORT_LANG.GO_REDIS.name:
      return `var ctx = context.Background()

func main() {
  opt, _ := redis.ParseURL("redis://:${password}@${endpoint}:${port}")
  client := redis.NewClient(opt)
  client.Set(ctx, "foo", "bar", 0)
  val := client.Get(ctx, "foo").Val()
  print(val)
}`

    default:
      return ''
  }
}
