const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
// const Database = require('better-sqlite3'); // Removed
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Создаем инстанс Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Парсим URL
      const parsedUrl = parse(req.url, true);
      
      // Передаем обработку запроса в Next.js
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);

      // Cleanup task
      const dbPath = path.join(process.cwd(), 'club_arena.json');

      setInterval(() => {
        try {
            if (!fs.existsSync(dbPath)) return;

            const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            const oneHourAgo = Date.now() - 3600000;
            const initialLength = data.lobbies.length;

            data.lobbies = data.lobbies.filter(l => {
                if (l.status === 'waiting' && l.created_at < oneHourAgo) {
                    return false;
                }
                return true;
            });

            if (data.lobbies.length !== initialLength) {
                fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
                console.log(`Cleaned up ${initialLength - data.lobbies.length} old lobbies`);
            }
        } catch (e) {
            console.error('Error in cleanup task:', e);
        }
      }, 60000); // Run every minute
    });
});