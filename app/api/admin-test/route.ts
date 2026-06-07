import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        console.log("📝 Received technical test results");
        const body = await req.json();
        const { fullName, club, score, totalQuestions, mistakes } = body;

        if (!fullName) {
            return NextResponse.json({ error: "Full name is required" }, { status: 400 });
        }

        const clubName = club === 'altufevo' ? 'Алтуфьево 🔹' : club === 'novokosino' ? 'Новокосино 🔺' : 'Неизвестно';
        const passTarget = totalQuestions - 4;
        const passed = score >= passTarget;
        const percentage = Math.round((score / totalQuestions) * 100);
        
        // Format current timestamp (Moscow time)
        const dateString = new Date().toLocaleString("ru-RU", { 
            timeZone: "Europe/Moscow",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

        // Construct formatting for mistakes
        let mistakesText = "";
        if (mistakes && mistakes.length > 0) {
            mistakesText = `\n\n❌ <b>Разбор ошибок (${mistakes.length}):</b>\n` + mistakes.map((m: any, idx: number) => {
                return `<b>${idx + 1}. [${m.section}] ${m.question}</b>\n• Выбранный ответ: <i>${m.selectedAnswer}</i>\n• Правильный ответ: <i>${m.correctAnswer}</i>`;
            }).join("\n\n");
        } else {
            mistakesText = "\n\n⭐️ <b>Идеальный результат! Тест пройден без ошибок!</b>";
        }

        const message = [
            `📋 <b>РЕЗУЛЬТАТЫ ТЕСТА АДМИНИСТРАТОРА</b>`,
            `👤 <b>ФИО:</b> ${fullName}`,
            `🏢 <b>Клуб:</b> ${clubName}`,
            `📊 <b>Очки:</b> ${score} / ${totalQuestions} (${percentage}%)`,
            `🚦 <b>Статус:</b> ${passed ? "✅ <b>ПРОЙДЕН (Допущен к работе)</b>" : "❌ <b>ЗАВАЛЕН (Требуется пересдача)</b>"}`,
            `📅 <b>Дата сдачи (МСК):</b> ${dateString}`,
            mistakesText
        ].join("\n");

        const subject = `Результаты теста администратора: ${fullName}`;
        const htmlMessage = message.replace(/\n/g, '<br/>');

        const success = await sendEmail(subject, message, htmlMessage);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "Failed to send Email" }, { status: 500 });
        }
    } catch (error) {
        console.error("❌ Technical Test API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
