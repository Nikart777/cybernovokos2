const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const cmd = `
cd medprogramcenter.com

echo "=== ASTRA FUNCTIONS.PHP ==="
cat wp-content/themes/astra/functions.php | grep -v "^/" | grep -v "^\\*" | grep -v "^$"

echo "\\n=== SEARCHING FOR CUSTOM PHP FILES ==="
find wp-content/plugins -name "*.php" | grep "custom"

echo "\\n=== CHECKING DB FOR SNIPPETS ==="
DB_NAME=$(cat wp-config.php | grep DB_NAME | cut -d "'" -f 4)
DB_USER=$(cat wp-config.php | grep DB_USER | cut -d "'" -f 4)
DB_PASSWORD=$(cat wp-config.php | grep DB_PASSWORD | cut -d "'" -f 4)
mysql -u$DB_USER -p$DB_PASSWORD $DB_NAME -e "SELECT option_name, option_value FROM wp_options WHERE option_name LIKE '%ihaf%';" 2>/dev/null || echo "Cannot run mysql"
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
