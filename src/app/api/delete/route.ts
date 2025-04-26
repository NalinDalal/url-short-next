import { NextRequest, NextResponse } from "next/server";
import { getRedisClient } from "@/models/redis";

export const DELETE = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  // Extract shortId from the pathname manually
  const parts = pathname.split("/");
  const shortId = parts[parts.length - 1];

  const redisClient = getRedisClient(shortId);
  const url = await redisClient.get(shortId);

  if (!url) {
    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  }

  await redisClient.del(shortId);
  return NextResponse.json({ message: "URL removed" });
};
