const fs = require('fs');
const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  conn.exec('cd httpdocs && node -e "require(\'@next/env\').loadEnvConfig(process.cwd()); console.log(process.env.SMTP_HOST ? \'ENV_OK\' : \'ENV_MISSING\', process.env.SMTP_USER, process.env.SMTP_PORT);"', (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      conn.end();
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      console.error('STDERR: ' + data);
    });
  });
}).connect({
  host: '62.113.86.44',
  port: 22,
  username: 'ftp_243260',
  password: 'Qy7-Y7k-45r-Xh3'
});
