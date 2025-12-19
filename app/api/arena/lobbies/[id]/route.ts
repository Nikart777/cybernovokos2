import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();
    const { action, joiner_nick, joiner_pc, status } = body;

    // Handle Delete Action via POST
    if (action === 'delete') {
         const success = db.delete(id);
         if (success) {
             return NextResponse.json({ success: true });
         } else {
             return NextResponse.json({ error: 'Lobby not found or failed to delete' }, { status: 404 });
         }
    }

    const lobby = db.getById(id);

    if (!lobby) {
      return NextResponse.json({ error: 'Lobby not found' }, { status: 404 });
    }

    // Handle Join (Player Action)
    if (action === 'join') {
      if (!joiner_nick || !joiner_pc) {
        return NextResponse.json({ error: 'Missing joiner info' }, { status: 400 });
      }
      if (lobby.status !== 'waiting') {
        return NextResponse.json({ error: 'Lobby is not waiting' }, { status: 400 });
      }

      db.update(id, { joiner_nick, joiner_pc, status: 'payment_check' });

      return NextResponse.json({ success: true, status: 'payment_check' });
    }

    // Handle Status Update (Admin Action)
    if (action === 'update_status') {
        if (!status) {
          return NextResponse.json({ error: 'Missing status' }, { status: 400 });
        }

        db.update(id, { status });
        return NextResponse.json({ success: true, status });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Error updating lobby (POST):', error);
    return NextResponse.json({ error: 'Failed to update lobby' }, { status: 500 });
  }
}

// Keeping fallback methods but logic is moved to POST for compatibility
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    return POST(req, { params });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const success = db.delete(id);
         if (success) {
             return NextResponse.json({ success: true });
         } else {
             return NextResponse.json({ error: 'Lobby not found or failed to delete' }, { status: 404 });
         }
    } catch (error: any) {
        console.error('Error deleting lobby:', error);
        return NextResponse.json({ error: 'Failed to delete lobby' }, { status: 500 });
    }
}
