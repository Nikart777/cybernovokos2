'use client';

import { useState } from 'react';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyber-bg text-white p-4 font-chakra relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,#B900FF_0%,transparent_50%)]"></div>

      <div className="bg-neutral-900/80 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-2xl w-full max-w-md relative z-10">
        <h1 className="text-4xl font-tactic mb-8 text-center text-cyber-red tracking-wider drop-shadow-[0_0_10px_rgba(255,46,99,0.5)]">
          CLUB ARENA
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Игровой Никнейм</label>
            <input
              type="text"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:border-cyber-red focus:ring-1 focus:ring-cyber-red focus:outline-none transition-all placeholder-gray-700 text-lg"
              placeholder="NAGIBATOR2000"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Номер твоего ПК</label>
            <input
              type="text"
              value={pc}
              onChange={(e) => setPc(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:border-cyber-red focus:ring-1 focus:ring-cyber-red focus:outline-none transition-all placeholder-gray-700 text-lg"
              placeholder="15"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-cyber-red hover:bg-red-600 rounded-lg font-tactic text-xl tracking-widest transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,46,99,0.4)] uppercase"
          >
            Войти в Игру
          </button>
        </form>
      </div>
    </div>
  );
}
