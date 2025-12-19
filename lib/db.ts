import Database from 'better-sqlite3';
import path from 'path';

// Singleton pattern to prevent multiple connections in dev mode
let db: Database.Database;

if (process.env.NODE_ENV === 'production') {
  db = new Database(path.join(process.cwd(), 'club_arena.db'));
} else {
  if (!(global as any).db) {
    (global as any).db = new Database(path.join(process.cwd(), 'club_arena.db'));
  }
  db = (global as any).db;
}

// Initialize the database schema
const initDB = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS lobbies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      creator_nick TEXT NOT NULL,
      creator_pc TEXT NOT NULL,
      joiner_nick TEXT,
      joiner_pc TEXT,
      game TEXT NOT NULL,
      bet_amount TEXT,
      bet_item TEXT,
      status TEXT NOT NULL DEFAULT 'waiting', -- waiting, payment_check, active, finished
      created_at INTEGER NOT NULL
    )
  `);
};

// Ensure DB is initialized
initDB();

export { initDB };
export default db;
