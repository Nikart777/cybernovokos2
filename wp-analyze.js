const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const cmd = `
cd medprogramcenter.com
echo "=== PLUGINS ==="
ls -1 wp-content/plugins

echo "\n=== CACHE / MU-PLUGINS ==="
ls -la wp-content/mu-plugins 2>/dev/null || echo "No mu-plugins"
ls -la wp-content/cache 2>/dev/null || echo "No cache dir"

echo "\n=== ACTIVE THEME ==="
wp theme list --status=active --allow-root 2>/dev/null || echo "wp-cli not found or error"

echo "\n=== WP-CONFIG (DEBUG STATUS) ==="
grep -i "WP_DEBUG" wp-config.php

echo "\n=== RECENT ERRORS ==="
tail -n 20 error_log 2>/dev/null || echo "No error_log"

echo "\n=== DB SIZE ==="
du -sh ../mysql 2>/dev/null || echo "Cannot check DB directly"

echo "\n=== CHECKING FOR MALWARE SIGNS ==="
find . -name "*.php" -type f -exec grep -Hl "base64_decode(" {} \\; | head -n 10
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
