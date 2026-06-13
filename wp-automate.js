const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const cmd = `
cd medprogramcenter.com

# Get PHP Binary
PHP_BIN=$(ls /opt/plesk/php/*/bin/php | tail -n 1)
if [ -z "$PHP_BIN" ]; then PHP_BIN=$(which php); fi

# Download WP-CLI if not exists
if [ ! -f "wp-cli.phar" ]; then
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
    chmod +x wp-cli.phar
fi

# Define WP alias
WP="$PHP_BIN wp-cli.phar"

echo "=== Installing Flying Scripts ==="
$WP plugin install flying-scripts --activate

echo "=== Configuring Flying Scripts ==="
$WP option update flying_scripts_keywords "elementor\\njquery\\nswiper\\nwaypoints"
$WP option update flying_scripts_timeout "5"

echo "=== Updating Elementor Features ==="
# Elementor stores its feature flags in the 'elementor_experiments' option
# We can use WP-CLI to update the specific flags for DOM optimization and Inline Font Icons.
# Or we can just run a quick PHP script using WP core functions.
cat << 'PHP_EOF' > update-elementor.php
<?php
require_once('wp-load.php');
$experiments = get_option('elementor_experiments');
if (!is_array($experiments)) {
    $experiments = array();
}
// Enable Optimized DOM Output and Inline Font Icons
$experiments['e_dom_optimization'] = 'active';
$experiments['e_font_icon_svg'] = 'active';
update_option('elementor_experiments', $experiments);
echo "Elementor settings updated.\\n";
PHP_EOF

$PHP_BIN update-elementor.php
rm update-elementor.php

echo "=== Enabling WP Super Cache ==="
# To enable it, we need to set WP_CACHE to true in wp-config.php
# and toggle the cache plugin settings.
$WP plugin activate wp-super-cache
# Let's write a small PHP script to update the super cache config safely
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

# Update wp-config.php if WP_CACHE is false
sed -i "s/define( 'WP_CACHE', false )/define( 'WP_CACHE', true )/" wp-config.php

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
