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
    <div className="flex w-full min-w-0 flex-col items-start gap-8 rounded-2xl bg-pre-bg p-6 sm:col-span-3 sm:flex-row md:gap-12">
      <div className="flex flex-wrap gap-2 sm:grid">
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
                className={cx(
                  "hidden shrink-0 opacity-0 sm:inline-flex",
                  active && "opacity-50",
                )}
                size={20}
                stroke={1.5}
              />
            </CodeTabButton>
          );
        })}
      </div>

      {/* body */}
      <div className="w-full overflow-y-auto overflow-x-scroll">
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
  [Language.Caching]: `import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();

const cacheKey = \`item:\${itemId}\`;

// Check cache
const cachedItem = await redis.get(cacheKey);
if (cachedItem) {
  console.log("Cache hit");
  return JSON.parse(cachedItem);
}`,
  [Language.Session]: `import { Redis } from "@upstash/redis";
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
  [Language.Rate]: `import { Redis } from "@upstash/redis";
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
  [Language.Leaderboards]: `import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();

const LEADERBOARD_KEY = "game-leaderboard";

export const updateScore = async (playerName: string, score: number) =>
  await redis.zadd(LEADERBOARD_KEY, { score, member: playerName });

export const getTopPlayers = async (top: number) => {
  return await redis.zrange(LEADERBOARD_KEY, 0, top - 1, { rev: true, withScores: true });
};`,
  [Language.Chat]: `import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();

const getChatHistoryKey = (userId: string) => \`chat-history:\${userId}\`;

export const saveMessage = async (userId: string, message: string) => {
  await redis.lpush(getChatHistoryKey(userId), message); // Add message to history
  await redis.ltrim(getChatHistoryKey(userId), 0, 99); // Keep only the latest 100 messages
};

export const getChatHistory = async (userId: string) =>
  await redis.lrange(getChatHistoryKey(userId), 0, -1); `,
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
        "flex h-8 select-none items-center gap-8 px-3 text-left text-white/80 sm:h-10 sm:px-6",
        "cursor-pointer whitespace-nowrap rounded-lg transition",
        "bg-white bg-opacity-10",
        "hover:bg-opacity-20",
        active && "!bg-opacity-100 text-text dark:text-bg",
        className,
      )}
      {...props}
    />
  );
}
