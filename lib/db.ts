import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'club_arena.json');

export interface Lobby {
  id: number;
  creator_nick: string;
  creator_pc: string;
  joiner_nick: string | null;
  joiner_pc: string | null;
  game: string;
  bet_amount: string | null;
  bet_item: string | null;
  status: 'waiting' | 'payment_check' | 'active' | 'finished';
  rules: string | null;
  created_at: number;
}

interface DatabaseSchema {
  lobbies: Lobby[];
  lastId: number;
}

const defaultData: DatabaseSchema = {
  lobbies: [],
  lastId: 0,
};

// Initialize DB
const initDB = () => {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
  }
};

// Ensure DB exists on load
initDB();

// Helper to read DB
const readDB = (): DatabaseSchema => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return defaultData;
  }
};

// Helper to write DB
const writeDB = (data: DatabaseSchema) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

const db = {
  getAll: (): Lobby[] => {
    const data = readDB();
    return data.lobbies;
  },

  getById: (id: number): Lobby | undefined => {
    const data = readDB();
    return data.lobbies.find(l => l.id === id);
  },

  create: (lobby: Omit<Lobby, 'id' | 'status' | 'created_at' | 'joiner_nick' | 'joiner_pc'>): Lobby => {
    const data = readDB();
    const newId = data.lastId + 1;
    const newLobby: Lobby = {
      ...lobby,
      id: newId,
      joiner_nick: null,
      joiner_pc: null,
      status: 'waiting',
      rules: (lobby as any).rules || null,
      created_at: Date.now(),
    };

    data.lobbies.push(newLobby);
    data.lastId = newId;
    writeDB(data);
    return newLobby;
  },

  update: (id: number, updates: Partial<Lobby>) => {
    const data = readDB();
    const index = data.lobbies.findIndex(l => l.id === id);
    if (index !== -1) {
      data.lobbies[index] = { ...data.lobbies[index], ...updates };
      writeDB(data);
      return data.lobbies[index];
    }
    return null;
  },

  delete: (id: number) => {
    const data = readDB();
    const initialLength = data.lobbies.length;
    data.lobbies = data.lobbies.filter(l => l.id !== id);
    if (data.lobbies.length !== initialLength) {
      writeDB(data);
      return true;
    }
    return false;
  },

  // Specific query for active/waiting/payment_check
  getActiveLobbies: (): Lobby[] => {
      const data = readDB();
      return data.lobbies
        .filter(l => ['waiting', 'payment_check', 'active'].includes(l.status))
        .sort((a, b) => b.created_at - a.created_at);
  },

  cleanupOldLobbies: () => {
      const data = readDB();
      const oneHourAgo = Date.now() - 3600000;
      const initialLength = data.lobbies.length;

      data.lobbies = data.lobbies.filter(l => {
          if (l.status === 'waiting' && l.created_at < oneHourAgo) {
              return false; // Remove
          }
          return true;
      });

      if (data.lobbies.length !== initialLength) {
          writeDB(data);
          return initialLength - data.lobbies.length;
      }
      return 0;
  }
};

export default db;
