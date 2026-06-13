const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const cmd = `
cd medprogramcenter.com

# Get PHP Binary
PHP_BIN=$(ls /opt/plesk/php/*/bin/php | tail -n 1)
if [ -z "$PHP_BIN" ]; then PHP_BIN=$(which php); fi

WP="$PHP_BIN wp-cli.phar"

echo "=== Fixing DB Host Temporarily ==="
cp wp-config.php wp-config.php.bak
sed -i "s/define( 'DB_HOST', 'localhost:3306' )/define( 'DB_HOST', '127.0.0.1' )/" wp-config.php

echo "=== Installing Flying Scripts ==="
$WP plugin install flying-scripts --activate

echo "=== Configuring Flying Scripts ==="
$WP option update flying_scripts_keywords "elementor\\njquery\\nswiper\\nwaypoints"
$WP option update flying_scripts_timeout "5"

echo "=== Updating Elementor Features ==="
cat << 'PHP_EOF' > update-elementor.php
<?php
require_once('wp-load.php');
$experiments = get_option('elementor_experiments');
if (!is_array($experiments)) {
    $experiments = array();
}
$experiments['e_dom_optimization'] = 'active';
$experiments['e_font_icon_svg'] = 'active';
update_option('elementor_experiments', $experiments);
echo "Elementor settings updated.\\n";
PHP_EOF

$PHP_BIN update-elementor.php
rm update-elementor.php

echo "=== Enabling WP Super Cache ==="
$WP plugin activate wp-super-cache
cat << 'PHP_EOF' > enable-cache.php
<?php
require_once('wp-load.php');
global $wp_cache_config_file;
if (file_exists($wp_cache_config_file)) {
    $config = file_get_contents($wp_cache_config_file);
    $config = preg_replace('/\\$cache_enabled = false;/', '$cache_enabled = true;', $config);
    $config = preg_replace('/\\$super_cache_enabled = false;/', '$super_cache_enabled = true;', $config);
    file_put_contents($wp_cache_config_file, $config);
    echo "WP Super Cache config updated.\\n";
}
PHP_EOF

$PHP_BIN enable-cache.php
rm enable-cache.php

sed -i "s/define( 'WP_CACHE', false )/define( 'WP_CACHE', true )/" wp-config.php

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
