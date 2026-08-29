import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const COUNTER_KEY = "portfolio_views:amreshdev.me";
const PREVIOUS_COUNT = 0; 

export async function GET(req: NextRequest): Promise<NextResponse> {
  const increment = req.nextUrl.searchParams.get("increment") === "1";

  try {
    let count = 0;
    
    if (increment) {
      count = await redis.incr(COUNTER_KEY);
    } else {
      const val = await redis.get<number>(COUNTER_KEY);
      count = val || 0;
    }

    return NextResponse.json({ count: count + PREVIOUS_COUNT });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ count: null }, { status: 500 });
  }
}
