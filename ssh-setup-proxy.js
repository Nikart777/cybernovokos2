const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();
conn.on('ready', () => {
  const commands = `
cd /opt/tg-proxy
npm install nodemailer
cat << 'EOF' > proxy.js
const http = require('http');
const https = require('https');
const { HttpsProxyAgent } = require('https-proxy-agent');
const nodemailer = require('nodemailer');

const proxyAgent = new HttpsProxyAgent('http://127.0.0.1:8118');

http.createServer((req, res) => {
    // Enable CORS for API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        return res.end();
    }

    if (req.method === 'POST' && req.url === '/api/send-email') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
            try {
                const { host, port, secure, user, pass, to, subject, text, html } = JSON.parse(body);
                
                const transporter = nodemailer.createTransport({
                    host, port, secure,
                    auth: { user, pass }
                });

                const mailOptions = {
                    from: '"CyberX Admin" <' + user + '>',
                    to, subject, text, html
                };

                const info = await transporter.sendMail(mailOptions);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, messageId: info.messageId }));
            } catch (err) {
                console.error('Email error:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // Existing Telegram Proxy logic
    req.headers.host = 'api.telegram.org';
    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: req.url,
        method: req.method,
        headers: req.headers,
        agent: proxyAgent
    };
    
    const proxyReq = https.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
    });
    
    proxyReq.on('error', (err) => {
        res.statusCode = 500;
        res.end(err.message);
    });
    
    req.pipe(proxyReq, { end: true });
}).listen(12556, '0.0.0.0', () => {
    console.log('Proxy listening on 12556');
});
EOF
pm2 restart tg-proxy
`;
  conn.exec(commands, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      conn.end();
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
  host: '82.97.253.207',
  port: 22,
  username: 'root',
  privateKey: fs.readFileSync('C:/Users/user/.ssh/id_ed25519')
});
