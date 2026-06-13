const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const cmd = `
cd medprogramcenter.com

PHP_BIN=$(ls /opt/plesk/php/*/bin/php | tail -n 1)
if [ -z "$PHP_BIN" ]; then PHP_BIN=$(which php); fi

WP="$PHP_BIN -d memory_limit=512M wp-cli.phar"

echo "=== Fixing DB Host Temporarily ==="
cp wp-config.php wp-config.php.bak
sed -i "s/define( 'DB_HOST', 'localhost:3306' )/define( 'DB_HOST', '127.0.0.1' )/" wp-config.php

echo "=== Cleaning Up Broken WP Super Cache ==="
rm -f wp-content/advanced-cache.php
rm -f wp-content/wp-cache-config.php
rm -f wp-content/wp-cache-config-sample.php

$WP plugin deactivate wp-super-cache
$WP plugin delete wp-super-cache

echo "=== Reinstalling WP Super Cache ==="
$WP plugin install wp-super-cache --activate
$WP option update wpsupercache_start "1"

# Enable WP_CACHE in wp-config.php safely
sed -i "s/define( 'WP_CACHE', false )/define( 'WP_CACHE', true )/" wp-config.php
if ! grep -q "WP_CACHE" wp-config.php; then
    sed -i "/define( 'WP_DEBUG'/a define( 'WP_CACHE', true );" wp-config.php
fi

echo "=== Restoring DB Host ==="
sed -i "s/define( 'DB_HOST', '127.0.0.1' )/define( 'DB_HOST', 'localhost:3306' )/" wp-config.php
rm wp-config.php.bak

echo "=== Done! ==="
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
