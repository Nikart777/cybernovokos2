const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
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

            // Cleanup logic:
            // 1. Remove waiting lobbies older than 1 hour (anti-spam)
            // 2. Clear ALL lobbies at 05:00 AM MSC (Moscow Time is UTC+3)

            const now = new Date();
            // Get Moscow time hours
            const mscHours = (now.getUTCHours() + 3) % 24;

            // If it's 05:00 AM (and we haven't cleared yet - simple check is strict time window)
            // Ideally we check if last_cleanup was today, but for simple loop:
            // We can just wipe everything if hour == 5.
            // BUT this will wipe active games at 5 AM. User said "matches are cleaned at 05:00". So yes.

            let shouldWipeAll = false;
            if (mscHours === 5 && now.getMinutes() < 5) { // 5-minute window to ensure we catch it
                 // We rely on the fact that this runs every minute.
                 // To avoid repeated wiping in that window, maybe acceptable or check status.
                 shouldWipeAll = true;
            }

            data.lobbies = data.lobbies.filter(l => {
                if (shouldWipeAll) return false;

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