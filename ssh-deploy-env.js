const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();
conn.on('ready', () => {
  conn.sftp((err, sftp) => {
    if (err) throw err;
    const envContent = fs.readFileSync('.env.local', 'utf8');
    
    const writeStream = sftp.createWriteStream('httpdocs/.env.local');
    writeStream.on('close', () => {
      console.log('Successfully uploaded .env.local');
      conn.end();
    });
    writeStream.on('error', (err) => {
      console.error('SFTP write error:', err);
      conn.end();
    });
    writeStream.write(envContent);
    writeStream.end();
  });
}).connect({
  host: '62.113.86.44',
  port: 22,
  username: 'ftp_243260',
  password: 'Qy7-Y7k-45r-Xh3'
});
