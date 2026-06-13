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

echo "=== Installing Flying Scripts ==="
$WP plugin install flying-scripts --activate

echo "=== Configuring Flying Scripts ==="
$WP option update flying_scripts_keywords "elementor\\njquery\\nswiper\\nwaypoints"
$WP option update flying_scripts_timeout "5"

echo "=== Updating Elementor Features ==="
$WP option patch insert elementor_experiments e_dom_optimization active
$WP option patch insert elementor_experiments e_font_icon_svg active
$WP option patch insert elementor_experiments e_optimized_assets_loading active

echo "=== Fixing WP Super Cache ==="
# Ensure WP_CACHE is true
sed -i "s/define( 'WP_CACHE', false )/define( 'WP_CACHE', true )/" wp-config.php
# Update wp-cache-config.php directly instead of loading WP core
sed -i "s/\\$cache_enabled = false;/\\$cache_enabled = true;/" wp-content/wp-cache-config.php
sed -i "s/\\$super_cache_enabled = false;/\\$super_cache_enabled = true;/" wp-content/wp-cache-config.php

echo "=== Clearing Cache ==="
$WP cache flush

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
