const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const cmd = `
echo "=== Node.js Support ==="
node -v || echo "Node not found"
npm -v || echo "NPM not found"
nvm -v || echo "NVM not found"

echo "=== Plesk Node.js Extension ==="
plesk bin nodejs --help >/dev/null 2>&1 && echo "Plesk Node.js extension is INSTALLED" || echo "Plesk Node.js extension NOT found"

echo "=== System Info ==="
cat /etc/os-release | grep PRETTY_NAME
free -m
`;
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      conn.end();
    }).on('data', (data) => {
      process.stdout.write(data);
    }).stderr.on('data', (data) => {
      process.stderr.write(data);
    });
  });
}).on('error', (err) => {
   console.error('Connection error:', err);
}).connect({
  host: '62.113.86.44',
  port: 22,
  username: 'ftp_243260',
  password: 'Qy7-Y7k-45r-Xh3'
});
