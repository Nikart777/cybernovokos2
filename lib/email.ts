import nodemailer from 'nodemailer';

export async function sendEmail(subject: string, text: string, html: string): Promise<boolean> {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: process.env.SMTP_SECURE !== 'false', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"CyberX Admin" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL, // Email address to send the results to
            subject: subject,
            text: text,
            html: html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("❌ Failed to send email:", error);
        return false;
    }
}
