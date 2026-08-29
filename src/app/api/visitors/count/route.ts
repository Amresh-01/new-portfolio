import { NextRequest, NextResponse } from "next/server";

const COUNTER_BASE = "https://api.counterapi.dev/v1/Amresh-01/portfolio";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const increment = req.nextUrl.searchParams.get("increment") === "1";
  const url = increment ? `${COUNTER_BASE}/up` : COUNTER_BASE;

  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) {
    return NextResponse.json({ count: null }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json({ count: typeof data.count === "number" ? data.count : null });
}
