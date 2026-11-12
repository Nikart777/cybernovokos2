import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { checkAdminPassword, passwordFromHeader, validatePricingData } from '@/lib/prices-admin';

const dataFilePath = path.join(process.cwd(), 'data', 'prices.json');

// GET stays open: the site pages read prices from here.
export async function GET() {
    try {
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading prices.json:', error);
        return NextResponse.json(
            { error: 'Failed to read price data' },
            { status: 500 }
        );
    }
}

// POST overwrites data/prices.json, so only the price admin with ADMIN_PASSWORD may call it.
export async function POST(request: Request) {
    const auth = checkAdminPassword(passwordFromHeader(request));
    if (!auth.ok) {
        return NextResponse.json({ error: auth.error }, { status: 403 });
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Тело запроса — не JSON' }, { status: 400 });
    }

    const invalid = validatePricingData(body);
    if (invalid) {
        return NextResponse.json({ error: invalid }, { status: 400 });
    }

    try {
        await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2), 'utf-8');

        // Revalidate pages to show fresh data immediately
        revalidatePath('/');
        revalidatePath('/prices');

        return NextResponse.json({ success: true, message: 'Prices updated and pages revalidated' });
    } catch (error) {
        console.error('Error writing prices.json:', error);
        return NextResponse.json(
            { error: 'Failed to update price data' },
            { status: 500 }
        );
    }
}
