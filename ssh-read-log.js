const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();
conn.on('ready', () => {
  conn.sftp((err, sftp) => {
    if (err) throw err;
    
    // Read error_log
    const stream = sftp.createReadStream('logs/error_log');
    let data = '';
    stream.on('data', (chunk) => {
      data += chunk;
      // Keep only last 5000 chars to avoid memory issues
      if (data.length > 5000) data = data.slice(-5000);
    });
    
    stream.on('end', () => {
      console.log('--- ERROR LOG ---');
      console.log(data);
      conn.end();
    });
    
    stream.on('error', (err) => {
      console.error('SFTP read error:', err);
      conn.end();
    });
  });
}).connect({
  host: '62.113.86.44',
  port: 22,
  username: 'ftp_243260',
  password: 'Qy7-Y7k-45r-Xh3'
});
