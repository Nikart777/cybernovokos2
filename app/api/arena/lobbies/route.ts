import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const lobbies = db.getActiveLobbies();
    return NextResponse.json(lobbies);
  } catch (error: any) {
    console.error('Error fetching lobbies:', error);
    return NextResponse.json({ error: 'Failed to fetch lobbies' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { creator_nick, creator_pc, game, bet_amount, bet_item, rules, team_size } = body;

    if (!creator_nick || !creator_pc || !game) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!bet_amount && !bet_item) {
        return NextResponse.json({ error: 'Bet is required' }, { status: 400 });
    }

    const newLobby = db.create({
        creator_nick,
        creator_pc,
        game,
        bet_amount,
        bet_item,
        rules: rules || null,
        team_size: team_size || 1
    } as any);

    return NextResponse.json({ id: newLobby.id, status: 'waiting' }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating lobby:', error);
    return NextResponse.json({ error: 'Failed to create lobby' }, { status: 500 });
  }
}
