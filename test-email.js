require('@next/env').loadEnvConfig(process.cwd());
const { sendEmail } = require('./lib/email.ts'); // Wait, require won't work on TS easily.

// Let's just use fetch to localhost if we had it running, or we can just run the test API directly.
// Actually, let's just make a plain js file to test nodemailer:
const nodemailer = require('nodemailer');

async function test() {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE !== 'false',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: '"CyberX Admin" <' + process.env.SMTP_USER + '>',
        to: process.env.ADMIN_EMAIL,
        subject: 'пройден тест CYBERX',
        text: 'This is a test message from the new CyberX email system.',
        html: '<b>This is a test message</b> from the new CyberX email system.',
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent: %s", info.messageId);
    } catch (e) {
        console.error(e);
    }
}
test();
