import { NextResponse } from "next/server";
import { getRedisClient } from "@/app/models/redis";
import { initializeApp } from "@/lib/init";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  await initializeApp(); // <- ensure redis connected first

  const { url, ttl } = await req.json();
  const shortUrl = nanoid(6);

  const redisClient = getRedisClient(shortUrl);

  await redisClient.set(shortUrl, url, { EX: ttl || 3600 });

  return NextResponse.json({ shortUrl: `http://localhost:3000/${shortUrl}` });
}
