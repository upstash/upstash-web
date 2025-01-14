"use client";

import cx from "@/utils/cx";
import { IconChevronRight } from "@tabler/icons-react";
import Prism from "prismjs";
import React, { useEffect, useState } from "react";

enum Language {
  Caching = "Caching",
  Session = "Session Store",
  Rate = "Rate Limiting",
  Leaderboards = "Leaderboards",
  Chat = "AI Chat History",
}

export default function CodeRedis() {
  const [lang, setLang] = useState<Language>(Language.Caching);

  useEffect(() => {
    console.log(lang);
    Prism.highlightAll();
  }, [lang]);

  return (
    <div className="col-span-3 flex w-full items-start gap-8 rounded-2xl bg-pre-bg p-6">
      <div className="grid gap-2">
        {Object.values(Language).map((value) => {
          const active = value === lang;
          return (
            <CodeTabButton
              key={value}
              active={active}
              onClick={() => setLang(value)}
            >
              <span className="grow">{value}</span>
              <IconChevronRight
                className={cx("shrink-0 opacity-0", active && "opacity-50")}
                size={20}
                stroke={1.5}
              />
            </CodeTabButton>
          );
        })}
      </div>

      {/* body */}
      <div className="col-span-2">
        {Object.values(Language).map((value) => {
          return (
            <CodePre key={value} hidden={value !== lang}>
              <code className="lang-js">{CODE[value]}</code>
            </CodePre>
          );
        })}
      </div>
    </div>
  );
}

const CODE = {
  [Language.Caching]: `const redis = new Redis.fromEnv();
const cacheKey = \`item:\${itemId}\`;

// Check cache
const cachedItem = await redis.get(cacheKey);
if (cachedItem) {
  console.log("Cache hit");
  return JSON.parse(cachedItem);
}`,
[Language.Session]: `const getSession = async (key: Key) => {
  const sessionId = await getSessionId();
  return redis.hget(\`s:\${sessionId}\`, key);
};

const setSession = async (key: Key, value: string) => {
  const sessionId = await getSessionIdAndCreateIfMissing();
  const sessionKey = \`s:\${sessionId}\`;
  await redis.hset(sessionKey, { [key]: value });
  return redis.expire(sessionKey, 900);
};
`,
[Language.Rate]: `const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

const identifier = getIpAddress();
const { success } = await ratelimit.limit(identifier);

if (!success) {
  return res.status(429).send("Too many requests");
}
`,
[Language.Leaderboards]: `const redis = Redis.fromEnv();

const LEADERBOARD_KEY = "game-leaderboard";

export const updateScore = async (playerName: string, score: number) =>
  await redis.zadd(LEADERBOARD_KEY, { score, member: playerName });

export const getTopPlayers = async (top: number) =>
  (await redis.zrevrange(LEADERBOARD_KEY, 0, top - 1)).map(
    (entry) => ({ player: entry.member, score: entry.score })
  );`,
[Language.Chat]: `const redis = Redis.fromEnv();

const CHAT_HISTORY_KEY = (userId: string) => \`chat-history:\${userId}\`;

export const saveMessage = async (userId: string, message: string) => {
  await redis.lpush(CHAT_HISTORY_KEY(userId), message); // Add message to history
  await redis.ltrim(CHAT_HISTORY_KEY(userId), 0, 99); // Keep only the latest 100 messages
};

export const getChatHistory = async (userId: string) =>
  await redis.lrange(CHAT_HISTORY_KEY(userId), 0, -1); `,
};

export function CodePre({ className, ...props }: React.ComponentProps<"pre">) {
  return (
    <pre className={cx("no-scrollbar !text-[.86em]", className)} {...props} />
  );
}

export function CodeTabButton({
  active,
  className,
  ...props
}: React.ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button
      className={cx(
        "flex h-10 select-none items-center gap-4 px-6 text-left text-white/80",
        "cursor-pointer rounded-lg transition",
        "bg-white bg-opacity-10",
        "hover:bg-opacity-20",
        active && "bg-opacity-100 !text-text hover:bg-opacity-100",
        className,
      )}
      {...props}
    />
  );
}
