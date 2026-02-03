const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./cyberx-server/social-hub.db');

db.all("SELECT * FROM messages ORDER BY timestamp DESC LIMIT 50", (err, rows) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(JSON.stringify(rows, null, 2));
    db.close();
});
