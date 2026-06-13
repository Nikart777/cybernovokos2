const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const commands = `
cd httpdocs
export PATH=/opt/plesk/node/22/bin:$PATH
npm run build
touch tmp/restart.txt
echo "Build finished and restarted."
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
  host: '62.113.86.44',
  port: 22,
  username: 'ftp_243260',
  password: 'Qy7-Y7k-45r-Xh3'
});
