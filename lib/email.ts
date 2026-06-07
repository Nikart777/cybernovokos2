export async function sendEmail(subject: string, text: string, html: string): Promise<boolean> {
    try {
        const payload = {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: process.env.SMTP_SECURE !== 'false',
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
            to: process.env.ADMIN_EMAIL,
            subject: subject,
            text: text,
            html: html
        };

        const response = await fetch('http://82.97.253.207:12556/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error("❌ Proxy failed to send email:", await response.text());
            return false;
        }

        const data = await response.json();
        console.log("✅ Email sent via proxy: %s", data.messageId);
        return true;
    } catch (error) {
        console.error("❌ Failed to send email via proxy:", error);
        return false;
    }
}
