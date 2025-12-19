const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const Database = require('better-sqlite3');
const path = require('path');

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
      const dbPath = path.join(process.cwd(), 'club_arena.db');

      setInterval(() => {
        try {
            const db = new Database(dbPath);
            const oneHourAgo = Date.now() - 3600000;
            const info = db.prepare("DELETE FROM lobbies WHERE status = 'waiting' AND created_at < ?").run(oneHourAgo);
            if (info.changes > 0) {
                console.log(`Cleaned up ${info.changes} old lobbies`);
            }
            db.close();
        } catch (e) {
            console.error('Error in cleanup task:', e);
        }
      }, 60000); // Run every minute
    });
});