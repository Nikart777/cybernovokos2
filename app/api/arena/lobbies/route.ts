import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const lobbies = db.prepare(`
      SELECT * FROM lobbies
      WHERE status IN ('waiting', 'payment_check', 'active')
      ORDER BY created_at DESC
    `).all();
    return NextResponse.json(lobbies);
  } catch (error: any) {
    console.error('Error fetching lobbies:', error);
    return NextResponse.json({ error: 'Failed to fetch lobbies' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { creator_nick, creator_pc, game, bet_amount, bet_item } = body;

    if (!creator_nick || !creator_pc || !game) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!bet_amount && !bet_item) {
        return NextResponse.json({ error: 'Bet is required' }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO lobbies (creator_nick, creator_pc, game, bet_amount, bet_item, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(creator_nick, creator_pc, game, bet_amount, bet_item, Date.now());

    return NextResponse.json({ id: info.lastInsertRowid, status: 'waiting' }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating lobby:', error);
    return NextResponse.json({ error: 'Failed to create lobby' }, { status: 500 });
  }
}
