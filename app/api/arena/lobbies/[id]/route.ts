import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();
    const { action, joiner_nick, joiner_pc, status } = body;

    const lobby = db.prepare('SELECT * FROM lobbies WHERE id = ?').get(id) as any;

    if (!lobby) {
      return NextResponse.json({ error: 'Lobby not found' }, { status: 404 });
    }

    if (action === 'join') {
      if (!joiner_nick || !joiner_pc) {
        return NextResponse.json({ error: 'Missing joiner info' }, { status: 400 });
      }
      if (lobby.status !== 'waiting') {
        return NextResponse.json({ error: 'Lobby is not waiting' }, { status: 400 });
      }

      db.prepare(`
        UPDATE lobbies
        SET joiner_nick = ?, joiner_pc = ?, status = 'payment_check'
        WHERE id = ?
      `).run(joiner_nick, joiner_pc, id);

      return NextResponse.json({ success: true, status: 'payment_check' });
    }

    if (action === 'update_status') {
      if (!status) {
        return NextResponse.json({ error: 'Missing status' }, { status: 400 });
      }

      db.prepare('UPDATE lobbies SET status = ? WHERE id = ?').run(status, id);
      return NextResponse.json({ success: true, status });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error: any) {
    console.error('Error updating lobby:', error);
    return NextResponse.json({ error: 'Failed to update lobby' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        db.prepare('DELETE FROM lobbies WHERE id = ?').run(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting lobby:', error);
        return NextResponse.json({ error: 'Failed to delete lobby' }, { status: 500 });
    }
}
