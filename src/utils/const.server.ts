import "server-only";

export const UPSTASH_BACKEND_URL =
  process.env.UPSTASH_BACKEND_URL ?? "https://api.upstash.com";

export const UPSTASH_CONSOLE_URL =
  process.env.UPSTASH_CONSOLE_URL ?? "https://console.upstash.com";
