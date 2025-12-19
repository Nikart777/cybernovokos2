'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login({ onLogin }: { onLogin: (nick: string, pc: string) => void }) {
  const [nick, setNick] = useState('');
  const [pc, setPc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nick && pc) {
      localStorage.setItem('arena_nick', nick);
      localStorage.setItem('arena_pc', pc);
      onLogin(nick, pc);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-500">Club Arena</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Игровой Никнейм</label>
            <input
              type="text"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-red-500 focus:outline-none"
              placeholder="Nagibator2000"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Номер твоего ПК</label>
            <input
              type="text"
              value={pc}
              onChange={(e) => setPc(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-red-500 focus:outline-none"
              placeholder="15 или VIP 2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded font-bold transition-colors"
          >
            ВОЙТИ
          </button>
        </form>
      </div>
    </div>
  );
}
