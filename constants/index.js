export const LINKS = {
  docs: 'https://docs.upstash.com/',
  console: 'https://console.upstash.com',
  support: 'https://docs.upstash.com/docs/help/support',
  privacy: 'https://upstash.com/terms/privacy.html',
  terms: 'https://upstash.com/terms/terms.html',
  subcontractors: 'https://upstash.com/terms/subcontractors.html',
  serverless:
    'https://docs.upstash.com/docs/overall/compare/#what-makes-lambda-store-different',
  compare: 'https://docs.upstash.com/docs/overall/compare/',
  pricing: 'https://docs.upstash.com/docs/account/pricing/',
  redisCompatibility:
    'https://docs.upstash.com/docs/overall/rediscompatibility/',
  reservedPricing:
    'https://docs.upstash.com/docs/account/pricing#reserved-pricing',
  databaseTypes: 'https://docs.upstash.com/docs/overall/databasetypes',
  faq: 'https://docs.upstash.com/docs/help/faq'
}

export const SOCIAL_LINKS = {
  medium: 'https://medium.com/upstash',
  twitter: 'https://twitter.com/Lambda__Store',
  devto: 'https://dev.to/lambdastore',
  gitter: 'https://gitter.im/LambdaStore/community'
}

export const PRICES = {
  commandsLimit: {
    title: 'Commands Limit',
    description: 'asd',
    free: 'Max 10.000 Commands Daily',
    standard: 'Unlimited',
    premium: 'Unlimited'
  },
  maxDataSizePerDB: {
    title: 'Max Data Size Per DB',
    description: 'asd',
    free: '256 MB',
    standard: '10 GB',
    premium: '500 GB'
  },
  maxConcurrentConnections: {
    title: 'Max Concurrent Connections',
    description: 'asd',
    free: '20',
    standard: '1000',
    premium: '10.000'
  },
  persistence: {
    title: 'Persistence',
    description: 'asd',
    free: true,
    standard: true,
    premium: true
  },
  encryption: {
    title: 'Encryption (TLS)',
    description: 'asd',
    free: true,
    standard: true,
    premium: true
  },
  multiZoneReplication: {
    title: 'Multi Zone Replication',
    description: 'asd',
    free: false,
    standard: false,
    premium: true
  },
  price: {
    title: 'Price',
    description: 'asd',
    free: 'Free',
    standard: '$0.2 per 100K commands plus disk storage cost',
    premium: '$0.4 per 100K commands plus disk storage cost'
  }
}

export const HIGHLIGHT_THEME = {
  hljs: {
    textAlign: 'left',
    display: 'block',
    overflowX: 'auto'
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
    color: '#D1ADFF'
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
  IO_REDIS: {
    name: 'io-redis',
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
  REDIGO: {
    name: 'redigo',
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

    case SUPPORT_LANG.IO_REDIS.name:
      return `const Redis = require("ioredis");
let client = new Redis("redis://:${password}@${endpoint}:${port}");
client.set('foo', 'bar');`

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

    case SUPPORT_LANG.REDIGO.name:
      return `func main() {
  c, err := redis.Dial("tcp", "${password}:${port}")
  if err != nil {
      panic(err)
  }
  _, err = c.Do("AUTH", "${password}")
  if err != nil {
      panic(err)
  }
  _, err = c.Do("SET", "foo", "bar")
  if err != nil {
      panic(err)
  }
}`

    default:
      return ''
  }
}
