'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from '@/components/Login';
import { Beer, Sandwich } from 'lucide-react'; // Icons

interface Lobby {
  id: number;
  creator_nick: string;
  creator_pc: string;
  joiner_nick: string | null;
  joiner_pc: string | null;
  game: string;
  bet_amount: string | null;
  bet_item: string | null;
  status: 'waiting' | 'payment_check' | 'active' | 'finished';
  created_at: number;
}

interface Good {
  id: number;
  name: string;
  count: number;
  price: number; // Though prompt says no price, API might return it. We use name.
}

const GAMES = ['CS2', 'Dota 2', 'FIFA', 'Mortal Kombat'];

export default function ArenaPage() {
  const [user, setUser] = useState<{ nick: string; pc: string } | null>(null);
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [goods, setGoods] = useState<Good[]>([]);
  const [loadingGoods, setLoadingGoods] = useState(false);

  // Create Lobby Form State
  const [selectedGame, setSelectedGame] = useState(GAMES[0]);
  const [betType, setBetType] = useState<'money' | 'item'>('money');
  const [betAmount, setBetAmount] = useState('');
  const [selectedItem, setSelectedItem] = useState<Good | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const nick = localStorage.getItem('arena_nick');
    const pc = localStorage.getItem('arena_pc');
    if (nick && pc) {
      setUser({ nick, pc });
    }
  }, []);

  useEffect(() => {
    fetchLobbies();
    const interval = setInterval(fetchLobbies, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (betType === 'item' && goods.length === 0) {
      fetchGoods();
    }
  }, [betType]);

  const fetchLobbies = async () => {
    try {
      const res = await axios.get('/api/arena/lobbies');
      setLobbies(res.data);
    } catch (err) {
      console.error('Failed to fetch lobbies', err);
    }
  };

  const fetchGoods = async () => {
    setLoadingGoods(true);
    try {
      const res = await axios.get('/api/arena/goods');
      // Sort alphabetically
      const sortedGoods = (res.data as Good[]).sort((a, b) => a.name.localeCompare(b.name));
      setGoods(sortedGoods);
    } catch (err) {
      console.error('Failed to fetch goods', err);
    } finally {
      setLoadingGoods(false);
    }
  };

  const getIconForGood = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('cola') || lowerName.includes('pepsi') || lowerName.includes('fanta') || lowerName.includes('sprite') || lowerName.includes('water') || lowerName.includes('напиток') || lowerName.includes('энергетик')) {
      return <Beer className="w-6 h-6 text-blue-400 mb-2" />;
    }
    return <Sandwich className="w-6 h-6 text-orange-400 mb-2" />;
  };

  const handleLogin = (nick: string, pc: string) => {
    setUser({ nick, pc });
  };

  const handleCreateLobby = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsCreating(true);
    try {
      await axios.post('/api/arena/lobbies', {
        creator_nick: user.nick,
        creator_pc: user.pc,
        game: selectedGame,
        bet_amount: betType === 'money' ? betAmount : null,
        bet_item: betType === 'item' && selectedItem ? selectedItem.name : null,
      });
      fetchLobbies();
      // Reset form
      setBetAmount('');
      setSelectedItem(null);
    } catch (err) {
      alert('Failed to create lobby');
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinLobby = async (lobbyId: number) => {
    if (!user) return;
    if (!confirm('Вы уверены, что хотите принять вызов?')) return;

    try {
      await axios.put(`/api/arena/lobbies/${lobbyId}`, {
        action: 'join',
        joiner_nick: user.nick,
        joiner_pc: user.pc,
      });
      fetchLobbies();
    } catch (err) {
      alert('Не удалось присоединиться к лобби');
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-red-500">Club Arena</h1>
          <p className="text-gray-400 text-sm">Игрок: <span className="text-white">{user.nick}</span> | ПК: <span className="text-white">{user.pc}</span></p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('arena_nick');
            localStorage.removeItem('arena_pc');
            setUser(null);
          }}
          className="text-sm text-gray-500 hover:text-white"
        >
          Выйти
        </button>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Lobby Section */}
        <section className="bg-gray-800 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Создать Дуэль</h2>
          <form onSubmit={handleCreateLobby} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Игра</label>
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none"
              >
                {GAMES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ставка</label>
              <div className="flex space-x-2 mb-2">
                <button
                  type="button"
                  onClick={() => setBetType('money')}
                  className={`flex-1 py-1 rounded ${betType === 'money' ? 'bg-red-600' : 'bg-gray-700'}`}
                >
                  Деньги
                </button>
                <button
                  type="button"
                  onClick={() => setBetType('item')}
                  className={`flex-1 py-1 rounded ${betType === 'item' ? 'bg-red-600' : 'bg-gray-700'}`}
                >
                  Товар
                </button>
              </div>

              {betType === 'money' ? (
                <input
                  type="text"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="Сумма (например, 200 руб)"
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none"
                  required
                />
              ) : (
                <div className="space-y-2">
                  {loadingGoods ? (
                    <p className="text-sm text-gray-400">Загрузка товаров...</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1">
                      {goods.map(good => (
                        <div
                          key={good.id}
                          onClick={() => setSelectedItem(good)}
                          className={`flex flex-col items-center justify-center p-2 rounded cursor-pointer border text-center h-24 ${selectedItem?.id === good.id ? 'border-red-500 bg-gray-700' : 'border-gray-600 bg-gray-800 hover:bg-gray-700'}`}
                        >
                          {getIconForGood(good.name)}
                          <div className="text-xs font-bold w-full truncate px-1" title={good.name}>{good.name}</div>
                          {good.count < 5 && <div className="text-[10px] text-red-400 mt-1">Осталось: {good.count}</div>}
                        </div>
                      ))}
                    </div>
                  )}
                  {selectedItem && (
                    <div className="text-sm text-green-400">Выбрано: {selectedItem.name}</div>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isCreating || (betType === 'item' && !selectedItem)}
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded font-bold transition-colors disabled:opacity-50"
            >
              {isCreating ? 'Создание...' : 'СОЗДАТЬ ЛОББИ'}
            </button>
          </form>
        </section>

        {/* Lobbies List Section */}
        <section className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Активные Дуэли</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lobbies.length === 0 && (
              <p className="text-gray-500">Нет активных дуэлей. Создай первую!</p>
            )}
            {lobbies.map(lobby => (
              <div key={lobby.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 relative overflow-hidden">
                {lobby.status === 'payment_check' && (
                  <div className="absolute top-0 right-0 bg-yellow-600 text-xs px-2 py-1 font-bold">ПРОВЕРКА ОПЛАТЫ</div>
                )}
                {lobby.status === 'active' && (
                  <div className="absolute top-0 right-0 bg-green-600 text-xs px-2 py-1 font-bold">ИГРА ИДЕТ</div>
                )}

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-red-500">{lobby.game}</h3>
                    <p className="text-sm text-gray-400">Создал: <span className="text-white">{lobby.creator_nick}</span> (ПК {lobby.creator_pc})</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-yellow-400">
                      {lobby.bet_amount ? lobby.bet_amount : lobby.bet_item}
                    </div>
                  </div>
                </div>

                {lobby.status === 'waiting' && lobby.creator_nick !== user.nick && (
                  <button
                    onClick={() => handleJoinLobby(lobby.id)}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-bold transition-colors"
                  >
                    ПРИНЯТЬ ВЫЗОВ
                  </button>
                )}

                {lobby.status === 'waiting' && lobby.creator_nick === user.nick && (
                   <div className="text-center text-sm text-gray-500 py-2 bg-gray-900/50 rounded animate-pulse">
                     Ожидание соперника...
                   </div>
                )}

                {(lobby.status === 'payment_check' || lobby.status === 'active') && (
                  <div className="mt-2 p-2 bg-gray-900 rounded">
                    <p className="text-sm">VS: <span className="font-bold text-white">{lobby.joiner_nick}</span> (ПК {lobby.joiner_pc})</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
