'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { socketClient } from '@/lib/socket-client';
import { ShieldAlert, Key, MapPin, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [selectedClub, setSelectedClub] = useState<'altufievo' | 'vlasino'>('altufievo');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        socketClient.connect(() => {
            socketClient.authenticateAdmin(password, selectedClub, (authenticated) => {
                setLoading(false);
                if (authenticated) {
                    // Redirect to social hub
                    router.push('/social-hub');
                } else {
                    setError('Неверный пароль администратора');
                }
            });
        });
    };

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-neutral-900/80 backdrop-blur-xl border border-yellow-500/20 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl"
            >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-500/50" />

                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 text-yellow-500 mb-4">
                        <ShieldAlert size={40} />
                    </div>
                    <h1 className="text-3xl font-tactic text-white tracking-tighter uppercase text-center">Admin Access</h1>
                    <p className="text-gray-500 text-xs font-black uppercase tracking-widest mt-2">Официальный вход в CYBERX_CONNECT</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-2">Выберите клуб</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setSelectedClub('altufievo')}
                                className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all font-bold uppercase text-xs ${selectedClub === 'altufievo' ? 'border-yellow-500 bg-yellow-500/10 text-white' : 'border-white/5 bg-white/5 text-gray-600'}`}
                            >
                                <MapPin size={14} />
                                Алтуфьево
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedClub('vlasino')}
                                className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all font-bold uppercase text-xs ${selectedClub === 'vlasino' ? 'border-yellow-500 bg-yellow-500/10 text-white' : 'border-white/5 bg-white/5 text-gray-600'}`}
                            >
                                <MapPin size={14} />
                                Новокосино
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-2">Пароль управления</label>
                        <div className="relative group">
                            <Key className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-yellow-500 transition-colors" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-black/60 border-2 border-white/5 focus:border-yellow-500/50 outline-none text-xl font-bold text-white transition-all text-center tracking-[0.3em]"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-[10px] font-black uppercase text-center tracking-widest bg-red-500/10 p-3 rounded-xl border border-red-500/20"
                        >
                            {error}
                        </motion.p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !password}
                        className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 disabled:bg-neutral-800 disabled:text-gray-600 rounded-2xl text-black font-tactic text-xl tracking-[0.2em] transition-all flex items-center justify-center gap-3 uppercase shadow-lg shadow-yellow-500/20"
                    >
                        {loading ? 'ПРОВЕРКА...' : 'АВТОРИЗОВАТЬСЯ'}
                        <ArrowRight size={24} />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em] leading-relaxed">
                        Access is monitored. Unauthorized attempts are logged and reported.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
