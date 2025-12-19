'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

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
  created_at: number;
}

export default function AdminPage() {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);

  useEffect(() => {
    fetchLobbies();
    const interval = setInterval(fetchLobbies, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchLobbies = async () => {
    try {
      const res = await axios.get('/api/arena/lobbies');
      setLobbies(res.data);
    } catch (err) {
      console.error('Failed to fetch lobbies', err);
    }
  };

  const handleAction = async (id: number, action: 'confirm' | 'reject' | 'finish') => {
    try {
      if (action === 'confirm') {
        await axios.put(`/api/arena/lobbies/${id}`, {
          action: 'update_status',
          status: 'active'
        });
      } else if (action === 'reject') {
        if (!confirm('Отменить матч? Это действие нельзя отменить.')) return;
        await axios.delete(`/api/arena/lobbies/${id}`);
      } else if (action === 'finish') {
          if (!confirm('Завершить матч?')) return;
          await axios.delete(`/api/arena/lobbies/${id}`); // Or set status to 'finished' if we want to keep history
          // Prompt said "Reject (deletes match)". It didn't specify finish action clearly,
          // but usually finish implies removing from active list.
          // Let's just delete it for now to keep it simple as per "Lite Version" logic.
      }
      fetchLobbies();
    } catch (err) {
      alert('Ошибка при выполнении действия');
    }
  };

  // Filter only lobbies that need attention or are active
  const activeLobbies = lobbies.filter(l => ['payment_check', 'active'].includes(l.status));

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard - Club Arena</h1>

      <div className="grid gap-6">
        {activeLobbies.length === 0 && (
           <p className="text-center text-gray-500 text-xl">Нет активных заявок</p>
        )}

        {activeLobbies.map(lobby => (
          <div key={lobby.id} className={`p-6 rounded-lg shadow-lg border-l-8 ${lobby.status === 'payment_check' ? 'bg-white border-yellow-500' : 'bg-green-50 border-green-500'}`}>
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                    {lobby.game} <span className="text-gray-500 text-lg">({lobby.status === 'payment_check' ? 'ОЖИДАЕТ ОПЛАТЫ' : 'ИДЕТ ИГРА'})</span>
                </h2>
                <div className="text-xl font-bold bg-gray-200 px-4 py-2 rounded">
                    {lobby.bet_amount ? lobby.bet_amount : lobby.bet_item}
                </div>
             </div>

             <div className="grid grid-cols-2 gap-8 mb-6">
                <div className="bg-blue-100 p-4 rounded text-center">
                    <p className="text-sm text-gray-500 uppercase">Игрок 1</p>
                    <p className="text-4xl font-bold text-blue-800">ПК {lobby.creator_pc}</p>
                    <p className="font-bold text-blue-600">{lobby.creator_nick}</p>
                </div>
                <div className="bg-red-100 p-4 rounded text-center">
                    <p className="text-sm text-gray-500 uppercase">Игрок 2</p>
                    <p className="text-4xl font-bold text-red-800">ПК {lobby.joiner_pc}</p>
                    <p className="font-bold text-red-600">{lobby.joiner_nick}</p>
                </div>
             </div>

             <div className="flex justify-end space-x-4">
                {lobby.status === 'payment_check' ? (
                    <>
                        <button
                            onClick={() => handleAction(lobby.id, 'reject')}
                            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded font-bold text-lg"
                        >
                            ОТМЕНА
                        </button>
                        <button
                             onClick={() => handleAction(lobby.id, 'confirm')}
                             className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded font-bold text-lg"
                        >
                            ОПЛАТА ПРОВЕРЕНА / СТАРТ
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => handleAction(lobby.id, 'finish')}
                        className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 rounded font-bold text-lg"
                    >
                        ЗАВЕРШИТЬ МАТЧ
                    </button>
                )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
