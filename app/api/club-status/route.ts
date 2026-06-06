import { NextResponse } from 'next/server';
import { getClubStatus } from '@/app/lib/langame';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getClubStatus();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch club status' }, { status: 500 });
  }
}
