import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(): Promise<NextResponse> {
  const res = await fetch("https://api.github.com/users/Amresh-01", {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    return NextResponse.json({ followers: null }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json({ followers: typeof data.followers === "number" ? data.followers : null });
}
