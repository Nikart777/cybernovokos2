const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const cmd = `
cd medprogramcenter.com

PHP_BIN=$(ls /opt/plesk/php/*/bin/php | tail -n 1)
if [ -z "$PHP_BIN" ]; then
  PHP_BIN=$(which php 2>/dev/null)
fi

if [ -z "$PHP_BIN" ]; then
  echo "PHP not found anywhere!"
else
  echo "Using PHP: $PHP_BIN"
  
  if [ ! -f "wp-cli.phar" ]; then
    curl -sO https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
    chmod +x wp-cli.phar
  fi
  
  echo -e "\\n=== ACTIVE PLUGINS AND MUST-USE PLUGINS ==="
  $PHP_BIN wp-cli.phar plugin list --status=active --allow-root 2>/dev/null
  
  echo -e "\\n=== INSERT HEADERS AND FOOTERS (HEADER) ==="
  $PHP_BIN wp-cli.phar option get ihaf_insert_header --allow-root 2>/dev/null || echo "No header scripts"
  
  echo -e "\\n=== INSERT HEADERS AND FOOTERS (FOOTER) ==="
  $PHP_BIN wp-cli.phar option get ihaf_insert_footer --allow-root 2>/dev/null || echo "No footer scripts"
  
  echo -e "\\n=== CUSTOM POST TYPES ==="
  $PHP_BIN wp-cli.phar post-type list --allow-root 2>/dev/null
  
  echo -e "\\n=== OTHER SNIPPETS/THEME MODS ==="
  $PHP_BIN wp-cli.phar option get theme_mods_astra --allow-root | grep "custom_css" 2>/dev/null || echo "No custom CSS in Customizer"
  
  echo -e "\\n=== RECENT POSTS/PAGES ==="
  $PHP_BIN wp-cli.phar post list --post_type=page --posts_per_page=5 --allow-root 2>/dev/null
fi
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
