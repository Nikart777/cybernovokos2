import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const dataFilePath = path.join(process.cwd(), 'data', 'prices.json');

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

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate that we strictly received an object (basic validation)
        if (!body || typeof body !== 'object') {
            return NextResponse.json(
                { error: 'Invalid data format' },
                { status: 400 }
            );
        }

        // Write to file
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
