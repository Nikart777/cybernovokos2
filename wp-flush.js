const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const cmd = `
cd medprogramcenter.com
PHP_BIN=$(ls /opt/plesk/php/*/bin/php | tail -n 1)
if [ -z "$PHP_BIN" ]; then PHP_BIN=$(which php); fi
WP="$PHP_BIN -d memory_limit=512M wp-cli.phar"

echo "=== Flushing Cache ==="
$WP cache flush
$WP super-cache flush
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
