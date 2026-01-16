import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { password, data } = body;

        // Проверка пароля из переменной окружения
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword || password !== adminPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        if (!data) {
            return NextResponse.json({ error: "No data provided" }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), "data", "prices.json");

        // Записываем JSON обратно в файл
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Admin API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const filePath = path.join(process.cwd(), "data", "prices.json");
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }
        const jsonData = fs.readFileSync(filePath, "utf8");
        return NextResponse.json(JSON.parse(jsonData));
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
