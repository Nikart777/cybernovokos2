'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert, CheckCircle2, XCircle, Trash2, Monitor, Calendar } from 'lucide-react';

interface Lobby {
  id: number;
  creator_nick: string;
  creator_pc: string;
  joiner_nick: string;
  joiner_pc: string;
  game: string;
  bet_amount: string | null;
  bet_item: string | null;
  status: 'waiting' | 'payment_check' | 'active' | 'finished';
  team_size: number;
  created_at: number;
}

export default function AdminPage() {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [confirmationLobbyId, setConfirmationLobbyId] = useState<number | null>(null);

  // Confirmation Form State
  const [hostPhone, setHostPhone] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [isManagerInformed, setIsManagerInformed] = useState(false);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check session
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
        setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchLobbies();
    const interval = setInterval(fetchLobbies, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (password === 'ADMINCYB') {
          setIsAuthenticated(true);
          sessionStorage.setItem('admin_auth', 'true');
      } else {
          alert('Неверный пароль');
      }
  };

  const fetchLobbies = async () => {
    try {
      const res = await axios.get('/api/arena/lobbies');
      setLobbies(res.data);
    } catch (err) {
      console.error('Failed to fetch lobbies', err);
    }
  };

  const openConfirmation = (id: number) => {
      setConfirmationLobbyId(id);
      setHostPhone('');
      setGuestPhone('');
      setIsManagerInformed(false);
  };

  const submitConfirmation = async () => {
      if (!confirmationLobbyId) return;

      try {
        await axios.post(`/api/arena/lobbies/${confirmationLobbyId}`, {
          action: 'update_status',
          status: 'active',
          host_phone: hostPhone,
          guest_phone: guestPhone
        });
        setConfirmationLobbyId(null);
        fetchLobbies();
      } catch (err) {
        alert('Ошибка при подтверждении');
      }
  };

  const handleAction = async (id: number, action: 'reject' | 'finish') => {
    try {
      if (action === 'reject') {
        if (!confirm('Отменить матч? Это действие нельзя отменить.')) return;
        await axios.post(`/api/arena/lobbies/${id}`, { action: 'delete' });
      } else if (action === 'finish') {
          if (!confirm('Завершить матч?')) return;
          await axios.post(`/api/arena/lobbies/${id}`, { action: 'delete' });
      }
      fetchLobbies();
    } catch (err) {
      alert('Ошибка при выполнении действия');
    }
  };

  const formatDate = (timestamp: number) => {
      return new Date(timestamp).toLocaleString('ru-RU', {
          day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
      });
  };

  const activeLobbies = lobbies.filter(l => ['payment_check', 'active'].includes(l.status));

  if (!isAuthenticated) {
      return (
          <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
              <form onSubmit={handleLogin} className="bg-neutral-800 p-8 rounded-2xl border border-white/10 shadow-2xl w-full max-w-sm">
                  <h2 className="text-2xl font-tactic text-white mb-6 text-center">ADMIN ACCESS</h2>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white text-center text-xl tracking-widest focus:border-cyber-red outline-none mb-4"
                    placeholder="PASSWORD"
                  />
                  <button
                    type="submit"
                    className="w-full py-4 bg-cyber-red hover:bg-red-600 rounded-xl font-bold uppercase tracking-widest text-white transition-all"
                  >
                      Войти
                  </button>
              </form>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8 font-chakra">
      <header className="mb-10 text-center">
         <h1 className="text-4xl font-tactic text-cyber-red tracking-widest uppercase mb-2">Admin Dashboard</h1>
         <p className="text-gray-500 font-bold">Мониторинг и Управление Дуэлями</p>
      </header>

      <div className="max-w-5xl mx-auto grid gap-6">
        {activeLobbies.length === 0 && (
           <div className="text-center py-20 bg-neutral-800/50 rounded-2xl border border-white/5">
                <ShieldAlert className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 text-xl font-bold">Нет активных заявок</p>
           </div>
        )}

        {activeLobbies.map(lobby => (
          <div key={lobby.id} className={`p-1 rounded-2xl relative overflow-hidden transition-all ${lobby.status === 'payment_check' ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.3)]' : 'bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]'}`}>

             <div className="bg-neutral-900 rounded-xl p-6 h-full relative z-10">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-tactic text-white">{lobby.game}</h2>
                        <div className={`inline-flex items-center px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mt-2 ${lobby.status === 'payment_check' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' : 'bg-green-500/20 text-green-500 border border-green-500/50'}`}>
                            {lobby.status === 'payment_check' ? 'ОЖИДАЕТ ОПЛАТЫ' : 'ИГРА ИДЕТ'}
                        </div>
                    </div>
                    <div className="text-right">
                         <div className="text-xs text-gray-500 uppercase font-bold mb-1">Ставка</div>
                        <div className="text-2xl font-tactic text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            {lobby.bet_amount ? `${lobby.bet_amount} RUB` : lobby.bet_item}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-xs text-blue-400 uppercase font-bold mb-2">Игрок 1 (Host)</p>
                            <p className="text-xl font-bold text-white mb-1">{lobby.creator_nick}</p>
                        </div>
                        <div className="text-right">
                             <Monitor className="w-6 h-6 text-blue-500 ml-auto mb-1" />
                            <p className="text-4xl font-tactic text-blue-500">#{lobby.creator_pc}</p>
                        </div>
                    </div>
                    <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-xs text-red-400 uppercase font-bold mb-2">Игрок 2</p>
                            <p className="text-xl font-bold text-white mb-1">{lobby.joiner_nick}</p>
                        </div>
                        <div className="text-right">
                            <Monitor className="w-6 h-6 text-red-500 ml-auto mb-1" />
                            <p className="text-4xl font-tactic text-red-500">#{lobby.joiner_pc}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 border-t border-white/10 pt-6">
                    {lobby.status === 'payment_check' ? (
                        <>
                            <button
                                onClick={() => handleAction(lobby.id, 'reject')}
                                className="flex items-center px-6 py-3 bg-neutral-800 hover:bg-red-900/50 text-red-500 border border-neutral-700 hover:border-red-500 rounded-lg font-bold transition-all uppercase tracking-wider"
                            >
                                <XCircle className="w-5 h-5 mr-2" />
                                Отмена
                            </button>
                            <button
                                    onClick={() => openConfirmation(lobby.id)}
                                    className="flex items-center px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-tactic text-lg rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all uppercase tracking-wider transform hover:-translate-y-1"
                            >
                                <CheckCircle2 className="w-6 h-6 mr-2" />
                                ПЕРЕЙТИ К ПОДТВЕРЖДЕНИЮ
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => handleAction(lobby.id, 'finish')}
                            className="flex items-center px-8 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-bold rounded-lg transition-all uppercase tracking-wider"
                        >
                            <Trash2 className="w-5 h-5 mr-2" />
                            Завершить Матч
                        </button>
                    )}
                </div>

                {/* Timestamp */}
                <div className="absolute bottom-6 left-6 text-gray-500 font-bold text-xs flex items-center bg-black/50 px-2 py-1 rounded">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(lobby.created_at)}
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {confirmationLobbyId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
              <div className="bg-neutral-900 border border-green-500/50 rounded-2xl w-full max-w-lg p-8 relative shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                  <h2 className="text-2xl font-tactic text-white mb-6 uppercase">Проверка перед стартом</h2>

                  <div className="space-y-4 mb-8">
                      <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Последние 4 цифры (Host)</label>
                          <input
                            type="text"
                            maxLength={4}
                            value={hostPhone}
                            onChange={e => setHostPhone(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-green-500 outline-none"
                            placeholder="Например: 1234"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Последние 4 цифры (Guest)</label>
                          <input
                            type="text"
                            maxLength={4}
                            value={guestPhone}
                            onChange={e => setGuestPhone(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-green-500 outline-none"
                            placeholder="Например: 5678"
                          />
                      </div>

                      <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                          <ul className="text-sm text-yellow-500 list-disc list-inside font-bold space-y-1">
                              <li>Проверь баланс: Ставка + 300р на сессию</li>
                              <li>Сообщи управляющему о списании/удержании</li>
                          </ul>
                      </div>

                      <label className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-white/5">
                          <input
                            type="checkbox"
                            checked={isManagerInformed}
                            onChange={e => setIsManagerInformed(e.target.checked)}
                            className="w-5 h-5 accent-green-500"
                          />
                          <span className="text-sm font-bold text-white">Я сообщил управляющему, сумма удержана.</span>
                      </label>
                  </div>

                  <div className="flex space-x-4">
                      <button
                        onClick={() => setConfirmationLobbyId(null)}
                        className="flex-1 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl font-bold uppercase tracking-wider text-gray-400"
                      >
                          Отмена
                      </button>
                      <button
                        onClick={submitConfirmation}
                        disabled={!hostPhone || !guestPhone || !isManagerInformed}
                        className="flex-1 py-4 bg-green-600 hover:bg-green-500 disabled:bg-gray-800 disabled:text-gray-600 rounded-xl font-tactic uppercase tracking-wider text-black transition-all"
                      >
                          ПОДТВЕРДИТЬ
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
