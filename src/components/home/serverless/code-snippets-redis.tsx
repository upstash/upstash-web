import { CodeSnippets, CodeSnippetsData } from "./code-snippets";

export const CodeSnippetsRedis = () => {
  return <CodeSnippets data={data} />;
};

const data: CodeSnippetsData = [
  {
    title: "Caching",
    snippets: [
      {
        language: "js",
        code: `
import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();

const cacheKey = \`item:\${itemId}\`;

// Check cache
const cachedItem = await redis.get(cacheKey);
if (cachedItem) {
  console.log("Cache hit");
  return JSON.parse(cachedItem);
}
`,
      },
      {
        language: "py",
        code: `
from upstash_redis import Redis

redis = Redis.from_env()

cache_key = f"item:{item_id}"

# Check cache
cached_item = redis.get(cache_key)
if cached_item:
    print("Cache hit")
    return json.loads(cached_item)
`,
      },
    ],
  },
  {
    title: "Session Management",
    snippets: [
      {
        language: "js",
        code: `
import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();

const getSession = async (key: string) => {
  const sessionId = await getSessionId();
  return redis.hget(\`s:\${sessionId}\`, key);
};

const setSession = async (key: string, value: string) => {
  const sessionId = await getSessionIdAndCreateIfMissing();
  const sessionKey = \`s:\${sessionId}\`;
  await redis.hset(sessionKey, { [key]: value });
  await redis.expire(sessionKey, 900);
  return sessionId;
};
`,
      },
      {
        language: "py",
        code: `
from upstash_redis import Redis

redis = Redis.from_env()

def get_session(key: str) -> str:
    session_id = get_session_id()
    return redis.hget(f"s:{session_id}", key)

def set_session(key: str, value: str) -> str:
    session_id = get_session_id_and_create_if_missing()
    redis.hset(f"s:{session_id}", key, value)
    return session_id
`,
      },
    ],
  },
  {
    title: "Rate Limiting",
    snippets: [
      {
        language: "js",
        code: `
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

const identifier = getIpAddress();
const { success } = await ratelimit.limit(identifier);

if (!success) {
  return res.status(429).json({ "error": "Too many requests" });
}
`,
      },
      {
        language: "py",
        code: `
from upstash_redis import Redis
from upstash_ratelimit import Ratelimit, SlidingWindow

redis = Redis.from_env()

ratelimit = Ratelimit(
    redis=redis,
    limiter=SlidingWindow(max_requests=10, window=10, unit="s")
)

identifier = get_ip_address()
result = ratelimit.limit(identifier)

if not result.allowed:
    return Response(status_code=429)
`,
      },
    ],
  },
  {
    title: "Leaderboards",
    snippets: [
      {
        language: "js",
        code: `
import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();

const LEADERBOARD_KEY = "game-leaderboard";

export const updateScore = async (playerName: string, score: number) =>
  await redis.zadd(LEADERBOARD_KEY, { score, member: playerName });

export const getTopPlayers = async (top: number) => {
  return await redis.zrange(LEADERBOARD_KEY, 0, top - 1, { rev: true, withScores: true });
};
`,
      },
      {
        language: "py",
        code: `
from upstash_redis import Redis

redis = Redis.from_env()

leaderboard_key = "game-leaderboard"

def update_score(player_name: str, score: int) -> None:
    redis.zadd(leaderboard_key, {player_name: score})

def get_top_players(top: int):
    return redis.zrange(leaderboard_key, 0, top - 1, withscores=True)
`,
      },
    ],
  },
  {
    title: "Chat",
    snippets: [
      {
        language: "js",
        code: `
import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();

const getChatHistoryKey = (userId: string) => \`chat-history:\${userId}\`;

export const saveMessage = async (userId: string, message: string) => {
  await redis.lpush(getChatHistoryKey(userId), message); // Add message to history
  await redis.ltrim(getChatHistoryKey(userId), 0, 99); // Keep only the latest 100 messages
};

export const getChatHistory = async (userId: string) =>
  await redis.lrange(getChatHistoryKey(userId), 0, -1);
`,
      },
      {
        language: "py",
        code: `
from upstash_redis import Redis

redis = Redis.from_env()
def save_message(user_id: str, message: str) -> None:
    key = f"chat:{user_id}"
    redis.lpush(key, message)
    redis.ltrim(key, 0, 99)

def get_chat_history(user_id: str) -> list[str]:
    return redis.lrange(f"chat:{user_id}", 0, -1)
`,
      },
    ],
  },
];
