import redis from "lib/redis";
import type { NextApiRequest, NextApiResponse } from "next";
import { MAX_CLAP } from "constants/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const { id } = req.query;

  try {
    if (method === "GET") {
      const count = await redis.get(`post:${id}`);
      return res.status(200).json({ count: count || 0 });
    }

    if (method === "PATCH") {
      const initialCount = Number(req.body.count) || 0;

      const count = await redis.incrby(
        `post:${id}`,
        initialCount > MAX_CLAP ? MAX_CLAP : initialCount
      );
      return res.status(200).json({ count });
    }

    return res.status(400).json({ message: "Method not allowed" });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
}
