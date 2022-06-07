import redis from "lib/redis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const { id } = req.query;

  // const agent = new https.Agent({ keepAlive: true });
  //
  // const client = new Redis(process.env.LATENCY_REDIS_URL);

  try {
    if (method !== "GET") {
      res.status(405).json({ error: "Method not allowed" });
    }

    const count = await redis.get(`post:${id}`);
    return res.status(200).json({ count: count || 0 });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
}
