import { NextResponse } from 'next/server';
import { checkAdminPassword, passwordFromHeader } from '@/lib/prices-admin';

// Lets the price admin check the password at login, before any edits. Writes nothing.
export async function POST(request: Request) {
    const auth = checkAdminPassword(passwordFromHeader(request));
    if (!auth.ok) {
        return NextResponse.json({ error: auth.error }, { status: 403 });
    }
    return NextResponse.json({ ok: true });
}
