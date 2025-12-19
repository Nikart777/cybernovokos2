'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Beer, Sandwich, Swords, Gamepad2, Coins, Box, History, X, User, Monitor, Users, Trophy, Target } from 'lucide-react';

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
  rules: string | null;
  team_size: number;
  created_at: number;
}

interface Good {
  id: number;
  name: string;
  count: number;
  price: number;
}

const GAMES = ['CS2', 'Dota 2', 'Valorant', 'Apex Legends', 'World of Tanks', 'PUBG', 'Fortnite', 'Другая игра'];

export default function ArenaPage() {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [goods, setGoods] = useState<Good[]>([]);
  const [loadingGoods, setLoadingGoods] = useState(false);

  // Create Lobby Form State
  const [creatorNick, setCreatorNick] = useState('');
  const [creatorPC, setCreatorPC] = useState('');
  const [selectedGame, setSelectedGame] = useState(GAMES[0]);
  const [customGame, setCustomGame] = useState('');
  const [rules, setRules] = useState('');
  const [teamSize, setTeamSize] = useState(1);
  const [betType, setBetType] = useState<'money' | 'item'>('money');
  const [betAmount, setBetAmount] = useState('');
  const [selectedItem, setSelectedItem] = useState<Good | null>(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [isCreating, setIsCreating] = useState(false);

  // Join Modal State
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joiningLobbyId, setJoiningLobbyId] = useState<number | null>(null);
  const [joinerNick, setJoinerNick] = useState('');
  const [joinerPC, setJoinerPC] = useState('');

  useEffect(() => {
    // Restore User Info if available
    const savedNick = localStorage.getItem('arena_nick');
    const savedPC = localStorage.getItem('arena_pc');
    if (savedNick) {
        setCreatorNick(savedNick);
        setJoinerNick(savedNick);
    }
    if (savedPC) {
        setCreatorPC(savedPC);
        setJoinerPC(savedPC);
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

  const handleCreateLobby = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorNick || !creatorPC) {
        alert('Введите ваш Ник и номер ПК');
        return;
    }

    setIsCreating(true);
    try {
      // Save info
      localStorage.setItem('arena_nick', creatorNick);
      localStorage.setItem('arena_pc', creatorPC);

      const gameName = selectedGame === 'Другая игра' ? customGame : selectedGame;
      const betItemString = selectedItem ? `${selectedItem.name} (x${itemQuantity})` : null;

      // Show confirmation alert (simple implementation of "Disclaimer")
      if (!confirm('ВАЖНО:\n1. Подойдите к сопернику и обсудите условия игры.\n2. Убедитесь, что у обоих есть средства на балансе.\n3. Только честная игра (Fair Play).\n\nСоздать дуэль?')) {
          setIsCreating(false);
          return;
      }

      await axios.post('/api/arena/lobbies', {
        creator_nick: creatorNick,
        creator_pc: creatorPC,
        game: gameName,
        bet_amount: betType === 'money' ? betAmount : null,
        bet_item: betItemString,
        rules: rules,
        team_size: teamSize
      });

      fetchLobbies();
      // Reset sensitive fields only
      setBetAmount('');
      setSelectedItem(null);
      setItemQuantity(1);
      setRules('');
      setTeamSize(1);
    } catch (err) {
      alert('Ошибка при создании лобби');
    } finally {
      setIsCreating(false);
    }
  };

  const openJoinModal = (lobbyId: number) => {
      setJoiningLobbyId(lobbyId);
      setShowJoinModal(true);
  };

  const handleJoinLobby = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joiningLobbyId) return;
    if (!joinerNick || !joinerPC) {
        alert('Введите ваш Ник и номер ПК');
        return;
    }

    // Prevent self-join
    const lobby = lobbies.find(l => l.id === joiningLobbyId);
    if (lobby && (lobby.creator_nick === joinerNick || lobby.creator_pc === joinerPC)) {
        alert('Вы не можете играть сами с собой!');
        return;
    }

    // Show confirmation alert (simple implementation of "Disclaimer")
    if (!confirm('ВАЖНО:\n1. Подойдите к сопернику и обсудите условия.\n2. Убедитесь, что у вас есть средства.\n3. Подойдите к АДМИНУ для подтверждения старта.\n\nПринять вызов?')) {
        return;
    }

    try {
       // Save info
      localStorage.setItem('arena_nick', joinerNick);
      localStorage.setItem('arena_pc', joinerPC);

      // Changed from PUT to POST to avoid 403 Forbidden on some hosts
      await axios.post(`/api/arena/lobbies/${joiningLobbyId}`, {
        action: 'join',
        joiner_nick: joinerNick,
        joiner_pc: joinerPC,
      });
      fetchLobbies();
      setShowJoinModal(false);
      setJoiningLobbyId(null);
    } catch (err) {
      console.error(err);
      alert('Не удалось присоединиться к лобби');
    }
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-white p-4 font-chakra bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-cyber-bg to-cyber-bg">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-8 border-b border-white/10 pb-6 pt-2">
        <div className="flex items-center space-x-4">
            <Swords className="w-8 h-8 text-cyber-red" />
            <div>
                <div className="flex items-center gap-1">
                  <span className="font-tactic font-black text-2xl tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">CYBER</span>
                  <span className="font-tactic font-black text-3xl text-[#FF2E63] transform -skew-x-12 drop-shadow-[0_0_15px_#FF2E63]">X</span>
                  <span className="font-tactic font-bold text-xl text-white ml-2 tracking-widest">НОВОКОСИНО</span>
                </div>
                <p className="text-xs text-gray-500 font-bold tracking-[0.2em] uppercase mt-1">Локальные микро-турниры</p>
            </div>
        </div>
      </header>

      {/* NEW SPLIT PROMO BLOCKS */}
      <div className="max-w-7xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* LEFT BLOCK (Aggressive) - 7 cols */}
        <div className="md:col-span-7 relative overflow-hidden rounded-3xl border border-cyber-red/30 bg-[#0a0a0a] group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyber-red/10 via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-red to-transparent opacity-50"></div>
            
            <div className="relative z-10 p-8 md:p-10 flex flex-col justify-center h-full">
                <div className="flex items-center gap-2 mb-6">
                    <span className="px-2 py-1 rounded bg-cyber-red/10 border border-cyber-red/20 text-[10px] font-bold text-cyber-red uppercase tracking-widest flex items-center gap-2">
                        <Target size={12} />
                        Брось вызов
                    </span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-tactic text-white uppercase leading-[0.9] drop-shadow-lg">
                    СЫГРАЙ НА <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-red to-orange-500 drop-shadow-[0_0_25px_rgba(255,46,99,0.4)]">
                        MONSTER ENERGY
                    </span> <br/>
                    ИЛИ ОБНУЛИ БАЛАНС СОСЕДА!
                </h2>
                
                {/* Decorative elements */}
                <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                     <Swords size={180} className="text-cyber-red -rotate-12" />
                </div>
            </div>
        </div>

        {/* RIGHT BLOCK (Info/Call) - 5 cols */}
        <div className="md:col-span-5 relative overflow-hidden rounded-3xl border border-cyber-purple/30 bg-[#0a0a0a] flex flex-col justify-between group transition-colors hover:border-cyber-purple/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-cyber-purple/10 via-transparent to-transparent opacity-60"></div>
            
            <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between">
                 <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live PvP System</span>
                 </div>
                 
                 <p className="text-lg text-gray-300 font-bold leading-snug mb-8 relative">
                    Хватит катать в одиночку. Собери стак или найди соперника в зале. Забейся 1x1 или 5x5 на интерес и покажи, <span className="text-white bg-cyber-purple/20 px-2 py-0.5 rounded border border-cyber-purple/30 whitespace-nowrap inline-block mt-1 md:mt-0 shadow-[0_0_10px_rgba(185,0,255,0.2)]">КТО ТУТ БАТЯ</span>.
                 </p>
                 
                 <div className="flex items-center gap-4 mt-auto p-4 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
                    <div className="p-2.5 rounded-lg bg-cyber-purple/20 text-cyber-purple shadow-[0_0_15px_rgba(185,0,255,0.3)]">
                        <Trophy size={24} />
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Твоя цель</div>
                        <span className="font-tactic text-xl text-white uppercase tracking-widest leading-none">
                            Забрать Всё
                        </span>
                    </div>
                 </div>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[size:20px_20px] pointer-events-none"></div>
        </div>

      </div>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Lobby Section - Takes 4 columns */}
        <section className="lg:col-span-4 h-fit sticky top-4">
          <div className="bg-neutral-900/50 backdrop-blur border border-white/10 p-6 rounded-2xl shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyber-red group-hover:shadow-[0_0_15px_#FF2E63] transition-all duration-500"></div>

            <h2 className="text-2xl font-tactic mb-6 flex items-center">
                <Gamepad2 className="w-6 h-6 mr-3 text-cyber-red" />
                Создать Дуэль
            </h2>

            <form onSubmit={handleCreateLobby} className="space-y-4">
               {/* User Info Fields */}
               <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Твой Ник</label>
                        <input
                            type="text"
                            value={creatorNick}
                            onChange={(e) => setCreatorNick(e.target.value)}
                            className="w-full p-2 rounded-lg bg-black/40 border border-white/10 focus:border-cyber-red outline-none text-sm font-bold"
                            placeholder="Killer"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Твой ПК</label>
                        <input
                            type="text"
                            value={creatorPC}
                            onChange={(e) => setCreatorPC(e.target.value)}
                            className="w-full p-2 rounded-lg bg-black/40 border border-white/10 focus:border-cyber-red outline-none text-sm font-bold"
                            placeholder="15"
                            required
                        />
                    </div>
               </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Игра</label>
                <div className="relative">
                    <select
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyber-red text-base font-bold outline-none appearance-none cursor-pointer hover:bg-black/60 transition-colors"
                    >
                    {GAMES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                </div>
                {selectedGame === 'Другая игра' && (
                    <input
                        type="text"
                        value={customGame}
                        onChange={(e) => setCustomGame(e.target.value)}
                        className="w-full mt-2 p-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyber-red text-sm font-bold outline-none"
                        placeholder="Название игры"
                        required
                    />
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Доп. условия / Формат</label>
                <input
                    type="text"
                    value={rules}
                    onChange={(e) => setRules(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyber-red text-sm font-bold outline-none placeholder-gray-600"
                    placeholder="Например: aim_map, до 10 побед, только дигл"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Команда</label>
                <div className="flex gap-2 bg-black/40 p-1 rounded-lg">
                    {[1, 2, 3, 4, 5].map(size => (
                        <button
                            key={size}
                            type="button"
                            onClick={() => setTeamSize(size)}
                            className={`flex-1 py-2 rounded font-bold text-sm transition-all ${teamSize === size ? 'bg-cyber-red text-white' : 'text-gray-500 hover:text-white'}`}
                        >
                            {size}x{size}
                        </button>
                    ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Тип ставки</label>
                <div className="grid grid-cols-2 gap-2 mb-2 p-1 bg-black/40 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setBetType('money')}
                    className={`py-2 rounded-md font-bold text-xs transition-all flex items-center justify-center ${betType === 'money' ? 'bg-cyber-red text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                    <Coins className="w-3 h-3 mr-2" /> Деньги
                  </button>
                  <button
                    type="button"
                    onClick={() => setBetType('item')}
                    className={`py-2 rounded-md font-bold text-xs transition-all flex items-center justify-center ${betType === 'item' ? 'bg-cyber-purple text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                    <Box className="w-3 h-3 mr-2" /> Товар
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
                            onClick={() => { setSelectedItem(good); setItemQuantity(1); }}
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
                      <div className="bg-black/40 p-3 rounded-lg border border-cyber-purple/30">
                          <div className="text-sm font-bold text-cyber-purple text-center mb-2">
                            {selectedItem.name}
                          </div>
                          <div className="flex items-center justify-center space-x-3">
                              <button
                                type="button"
                                onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                                className="w-8 h-8 rounded bg-gray-800 hover:bg-gray-700 text-white font-bold"
                              >-</button>
                              <span className="font-tactic text-xl w-8 text-center">{itemQuantity}</span>
                              <button
                                type="button"
                                onClick={() => setItemQuantity(Math.min(selectedItem.count, itemQuantity + 1))}
                                className="w-8 h-8 rounded bg-gray-800 hover:bg-gray-700 text-white font-bold"
                              >+</button>
                          </div>
                          <div className="text-center text-[10px] text-gray-500 mt-1">
                              Максимум: {selectedItem.count}
                          </div>
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
                    <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-tactic text-white mb-1 drop-shadow-lg">{lobby.game}</h3>
                        {lobby.team_size > 1 && (
                            <div className="flex items-center bg-cyber-purple/20 px-2 py-1 rounded border border-cyber-purple/50">
                                <Users className="w-3 h-3 text-cyber-purple mr-1" />
                                <span className="text-xs font-bold text-cyber-purple">{lobby.team_size}x{lobby.team_size}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center text-sm text-gray-400 font-bold mt-1">
                        <span className="text-cyber-red mr-2">Host:</span>
                        <span className="text-white bg-white/5 px-2 py-0.5 rounded mr-2">{lobby.creator_nick}</span>
                        <span className="text-cyber-purple">PC {lobby.creator_pc}</span>
                    </div>
                  </div>

                  <div className="py-3 my-2 border-t border-b border-white/5">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-gray-500 uppercase">На кону</span>
                        <div className="text-xl font-tactic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-sm">
                        {lobby.bet_amount ? `${lobby.bet_amount} RUB` : lobby.bet_item}
                        </div>
                    </div>
                    {lobby.rules && (
                        <div className="text-xs text-gray-400 italic border-l-2 border-cyber-purple pl-2 mt-2">
                            "{lobby.rules}"
                        </div>
                    )}
                  </div>

                  {lobby.status === 'waiting' && (
                    <button
                      onClick={() => openJoinModal(lobby.id)}
                      className="w-full py-3 bg-white/5 hover:bg-cyber-purple hover:text-white border border-white/10 hover:border-cyber-purple rounded-lg font-bold text-sm tracking-wider uppercase transition-all mt-2 group-hover:shadow-[0_0_15px_rgba(185,0,255,0.3)]"
                    >
                      Принять вызов
                    </button>
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

      {/* JOIN MODAL */}
      {showJoinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <div className="bg-neutral-900 border border-cyber-purple/50 rounded-2xl w-full max-w-md p-6 relative shadow-[0_0_30px_rgba(185,0,255,0.2)]">
                  <button
                    onClick={() => setShowJoinModal(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white"
                  >
                      <X className="w-6 h-6" />
                  </button>

                  <h3 className="text-2xl font-tactic text-white mb-6 text-center">Принять вызов</h3>

                  <form onSubmit={handleJoinLobby} className="space-y-4">
                       <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                <User className="w-4 h-4" /> Твой Никнейм
                            </label>
                            <input
                                type="text"
                                value={joinerNick}
                                onChange={(e) => setJoinerNick(e.target.value)}
                                className="w-full p-3 rounded-xl bg-black/50 border border-white/10 focus:border-cyber-purple outline-none"
                                placeholder="Nagibator"
                                required
                            />
                       </div>
                       <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                <Monitor className="w-4 h-4" /> Твой ПК
                            </label>
                            <input
                                type="text"
                                value={joinerPC}
                                onChange={(e) => setJoinerPC(e.target.value)}
                                className="w-full p-3 rounded-xl bg-black/50 border border-white/10 focus:border-cyber-purple outline-none"
                                placeholder="20"
                                required
                            />
                       </div>

                       <div className="pt-4">
                           <button
                                type="submit"
                                className="w-full py-4 bg-cyber-purple hover:bg-purple-600 rounded-xl font-tactic text-xl uppercase tracking-widest transition-all shadow-lg"
                           >
                               В Бой!
                           </button>
                       </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
}