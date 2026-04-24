import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const configPath = path.join(process.cwd(), 'data', 'club-configs.json');

export async function GET() {
    try {
        const fileData = await fs.readFile(configPath, 'utf-8');
        return NextResponse.json(JSON.parse(fileData));
    } catch (error) {
        console.error("Failed to read config:", error);
        return NextResponse.json({ error: "Failed to read configuration" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await fs.writeFile(configPath, JSON.stringify(data, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to save config:", error);
        return NextResponse.json({ error: "Failed to save configuration" }, { status: 500 });
    }
}
