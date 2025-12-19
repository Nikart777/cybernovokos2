'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from '@/components/Login';
import { Beer, Sandwich, Swords, Gamepad2, Coins, Box, History } from 'lucide-react'; // Icons

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
  price: number;
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
      return <Beer className="w-8 h-8 text-blue-400 mb-2 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" />;
    }
    return <Sandwich className="w-8 h-8 text-orange-400 mb-2 drop-shadow-[0_0_5px_rgba(251,146,60,0.5)]" />;
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
    <div className="min-h-screen bg-cyber-bg text-white p-4 font-chakra bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-cyber-bg to-cyber-bg">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-8 border-b border-white/10 pb-6 pt-2">
        <div className="flex items-center space-x-4">
            <Swords className="w-8 h-8 text-cyber-red" />
            <div>
                <h1 className="text-3xl font-tactic text-white tracking-wider">CLUB <span className="text-cyber-red drop-shadow-[0_0_8px_rgba(255,46,99,0.8)]">ARENA</span></h1>
                <p className="text-xs text-gray-500 font-bold tracking-[0.2em] uppercase">Локальные микро-турниры</p>
            </div>
        </div>
        <div className="flex items-center space-x-6">
            <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Игрок</p>
                <p className="text-lg font-bold text-white leading-none">{user.nick}</p>
            </div>
            <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-500 uppercase tracking-wider">ПК</p>
                <p className="text-3xl font-tactic text-cyber-purple leading-none drop-shadow-[0_0_5px_rgba(185,0,255,0.6)]">{user.pc}</p>
            </div>
            <button
            onClick={() => {
                localStorage.removeItem('arena_nick');
                localStorage.removeItem('arena_pc');
                setUser(null);
            }}
            className="text-sm text-gray-500 hover:text-white border border-gray-700 hover:border-white px-4 py-2 rounded transition-all"
            >
            Выход
            </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Lobby Section - Takes 4 columns */}
        <section className="lg:col-span-4 h-fit sticky top-4">
          <div className="bg-neutral-900/50 backdrop-blur border border-white/10 p-6 rounded-2xl shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyber-red group-hover:shadow-[0_0_15px_#FF2E63] transition-all duration-500"></div>

            <h2 className="text-2xl font-tactic mb-6 flex items-center">
                <Gamepad2 className="w-6 h-6 mr-3 text-cyber-red" />
                Создать Дуэль
            </h2>

            <form onSubmit={handleCreateLobby} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Игра</label>
                <div className="relative">
                    <select
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                    className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:border-cyber-red text-lg font-bold outline-none appearance-none cursor-pointer hover:bg-black/60 transition-colors"
                    >
                    {GAMES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Тип ставки</label>
                <div className="grid grid-cols-2 gap-2 mb-4 p-1 bg-black/40 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setBetType('money')}
                    className={`py-2 rounded-md font-bold text-sm transition-all flex items-center justify-center ${betType === 'money' ? 'bg-cyber-red text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                    <Coins className="w-4 h-4 mr-2" /> Деньги
                  </button>
                  <button
                    type="button"
                    onClick={() => setBetType('item')}
                    className={`py-2 rounded-md font-bold text-sm transition-all flex items-center justify-center ${betType === 'item' ? 'bg-cyber-purple text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                    <Box className="w-4 h-4 mr-2" /> Товар
                  </button>
                </div>

                {betType === 'money' ? (
                  <input
                    type="text"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="200"
                    className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:border-cyber-red text-2xl font-tactic outline-none text-center placeholder-gray-700"
                    required
                  />
                ) : (
                  <div className="space-y-2">
                    {loadingGoods ? (
                      <div className="text-center py-8 text-gray-500 animate-pulse">Загрузка склада...</div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                        {goods.map(good => (
                          <div
                            key={good.id}
                            onClick={() => setSelectedItem(good)}
                            className={`flex flex-col items-center justify-between p-2 rounded-xl cursor-pointer border transition-all h-28 relative overflow-hidden group/item
                                ${selectedItem?.id === good.id
                                    ? 'border-cyber-purple bg-cyber-purple/20 shadow-[0_0_10px_rgba(185,0,255,0.3)]'
                                    : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20'}`}
                          >
                            <div className="mt-1 transform group-hover/item:scale-110 transition-transform duration-300">
                                {getIconForGood(good.name)}
                            </div>
                            <div className="text-[10px] font-bold w-full text-center line-clamp-2 leading-tight px-1 h-8 flex items-center justify-center text-gray-300 group-hover/item:text-white">
                                {good.name}
                            </div>
                            {good.count < 5 && (
                                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_#ef4444]" title={`Осталось: ${good.count}`}></div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {selectedItem && (
                      <div className="text-sm font-bold text-cyber-purple text-center mt-2 animate-bounce">
                        Выбрано: {selectedItem.name}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isCreating || (betType === 'item' && !selectedItem)}
                className="w-full py-4 bg-gradient-to-r from-cyber-red to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-xl font-tactic text-xl tracking-widest text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(255,46,99,0.3)] hover:shadow-[0_6px_20px_rgba(255,46,99,0.5)] transform hover:-translate-y-1 active:translate-y-0"
              >
                {isCreating ? 'СОЗДАНИЕ...' : 'СОЗДАТЬ ЛОББИ'}
              </button>
            </form>
          </div>
        </section>

        {/* Lobbies List Section - Takes 8 columns */}
        <section className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-tactic flex items-center">
                <History className="w-6 h-6 mr-3 text-cyber-purple" />
                Арена Дуэлей
            </h2>
            <div className="flex space-x-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lobbies.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/10 rounded-2xl">
                <p className="text-gray-600 text-xl font-tactic">АРЕНА ПУСТА</p>
                <p className="text-gray-700 text-sm mt-2">Стань первым, кто бросит вызов!</p>
              </div>
            )}
            {lobbies.map(lobby => (
              <div key={lobby.id} className="group bg-neutral-900/30 backdrop-blur border border-white/10 rounded-xl p-5 relative overflow-hidden hover:border-white/20 transition-all hover:bg-neutral-900/50">
                {/* Background Decor */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none ${lobby.status === 'active' ? 'bg-green-500' : 'bg-cyber-purple'}`}></div>

                {/* Status Badges */}
                <div className="absolute top-4 right-4 z-10">
                    {lobby.status === 'payment_check' && (
                        <div className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(234,179,8,0.2)] animate-pulse">
                            Оплата...
                        </div>
                    )}
                    {lobby.status === 'active' && (
                        <div className="bg-green-500/20 text-green-500 border border-green-500/50 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                            В игре
                        </div>
                    )}
                </div>

                <div className="flex flex-col h-full justify-between relative z-0">
                  <div className="mb-4">
                    <h3 className="text-2xl font-tactic text-white mb-1 drop-shadow-lg">{lobby.game}</h3>
                    <div className="flex items-center text-sm text-gray-400 font-bold">
                        <span className="text-cyber-red mr-2">Host:</span>
                        <span className="text-white bg-white/5 px-2 py-0.5 rounded mr-2">{lobby.creator_nick}</span>
                        <span className="text-cyber-purple">PC {lobby.creator_pc}</span>
                    </div>
                  </div>

                  <div className="py-3 my-2 border-t border-b border-white/5 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase">На кону</span>
                    <div className="text-xl font-tactic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-sm">
                      {lobby.bet_amount ? `${lobby.bet_amount} RUB` : lobby.bet_item}
                    </div>
                  </div>

                  {lobby.status === 'waiting' && lobby.creator_nick !== user.nick && (
                    <button
                      onClick={() => handleJoinLobby(lobby.id)}
                      className="w-full py-3 bg-white/5 hover:bg-cyber-purple hover:text-white border border-white/10 hover:border-cyber-purple rounded-lg font-bold text-sm tracking-wider uppercase transition-all mt-2 group-hover:shadow-[0_0_15px_rgba(185,0,255,0.3)]"
                    >
                      Принять вызов
                    </button>
                  )}

                  {lobby.status === 'waiting' && lobby.creator_nick === user.nick && (
                     <div className="text-center text-xs font-bold text-gray-500 py-3 bg-black/20 rounded border border-white/5 animate-pulse mt-2">
                       Ожидание соперника...
                     </div>
                  )}

                  {(lobby.status === 'payment_check' || lobby.status === 'active') && (
                    <div className="mt-2 p-3 bg-black/40 rounded border border-white/5 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500">VS</span>
                        <div className="text-right">
                            <div className="text-sm font-bold text-white">{lobby.joiner_nick}</div>
                            <div className="text-xs text-cyber-purple">PC {lobby.joiner_pc}</div>
                        </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
