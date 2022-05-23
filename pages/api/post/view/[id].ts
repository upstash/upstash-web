import redis from "lib/redis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const { id } = req.query;

  try {
    if (method === "GET") {
      const count = await redis.get(`post:view:${id}`);
      return res.status(200).json({ count: count || 1 });
    }

    if (method === "PATCH") {
      const count = await redis.incr(`post:view:${id}`);
      return res.status(200).json({ count });
    }

    return res.status(400).json({ message: "Method not allowed" });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
}
