require('@next/env').loadEnvConfig(process.cwd());

async function run() {
    const payload = {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE !== 'false',
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        to: process.env.ADMIN_EMAIL,
        subject: "Direct Proxy Test",
        text: "Test body",
        html: "<b>Test body</b>"
    };

    console.log("Sending payload:", JSON.stringify(payload));

    const response = await fetch('http://82.97.253.207:12556/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const text = await response.text();
    console.log("Proxy response:", response.status, text);
}
run();
