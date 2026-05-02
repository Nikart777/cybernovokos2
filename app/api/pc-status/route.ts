import { NextResponse } from 'next/server';

const MONITOR_API = 'http://82.97.253.207:4200/api/games/status';

export async function GET() {
  try {
    const res = await fetch(MONITOR_API, {
      next: { revalidate: 30 }, // Cache for 30 seconds
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Monitor API unavailable' },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to reach monitor server' },
      { status: 502 }
    );
  }
}
