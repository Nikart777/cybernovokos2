const { execSync } = require('child_process');

try {
  console.log('=== TTFB and Headers ===');
  const headers = execSync('curl -s -D - -o NUL "https://medprogramcenter.com" -H "Cache-Control: no-cache"', { encoding: 'utf8' });
  console.log(headers);

  console.log('=== Performance Metrics ===');
  const curlFormat = '%{time_namelookup} %{time_connect} %{time_appconnect} %{time_pretransfer} %{time_starttransfer} %{time_total}\\n';
  const times = execSync(`curl -s -o NUL -w "${curlFormat}" "https://medprogramcenter.com"`, { encoding: 'utf8' });
  
  const [dns, tcp, tls, pre, start, total] = times.trim().split(' ');
  console.log(`DNS Lookup: ${dns}s`);
  console.log(`TCP Connection: ${tcp}s`);
  console.log(`TLS Handshake: ${tls}s`);
  console.log(`TTFB (Time to First Byte): ${start}s`);
  console.log(`Total Download Time: ${total}s`);

  console.log('\\n=== Checking HTML for WP Super Cache ===');
  const htmlEnd = execSync('curl -s "https://medprogramcenter.com" | powershell -Command "$input | Select-Object -Last 20"', { encoding: 'utf8' });
  if (htmlEnd.includes('WP-Super-Cache')) {
      console.log('WP Super Cache signature found!');
  } else {
      console.log('WP Super Cache signature NOT found in HTML.');
      console.log(htmlEnd);
  }

} catch (e) {
  console.error('Error running check:', e.message);
}
