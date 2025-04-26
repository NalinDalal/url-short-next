import { NextRequest, NextResponse } from "next/server";
import { getRedisClient } from "@/models/redis";

export const GET = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const parts = pathname.split("/");
  const shortId = parts[parts.length - 1]; // Last part of path

  const redisClient = getRedisClient(shortId);
  const url = await redisClient.get(shortId);

  if (!url) {
    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  }

  return NextResponse.redirect(url, { status: 302 });
};
