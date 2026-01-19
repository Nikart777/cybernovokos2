"use client";

import { useState, useEffect } from "react";
import { PricingData, ZoneData, Abonnement, PricingCategory, PriceItem } from "@/app/lib/types";
import { Save, Plus, Trash2, Shield, Loader2, LogOut, ChevronDown, ChevronUp } from "lucide-react";

export default function AdminPricesPage() {
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [data, setData] = useState<PricingData | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    // Enable auth if session persists
    useEffect(() => {
        const auth = sessionStorage.getItem('admin_auth');
        if (auth === 'true') {
            setIsAuthorized(true);
        }
    }, []);

    // Load data when authorized
    useEffect(() => {
        if (isAuthorized) {
            fetchData();
        }
    }, [isAuthorized]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/prices");
            if (!res.ok) throw new Error('Failed to fetch');
            const json = await res.json();
            setData(json);
        } catch (e: any) {
            setMessage({ text: "Ошибка загрузки: " + e.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'cyberx2024') {
            setIsAuthorized(true);
            sessionStorage.setItem('admin_auth', 'true');
        } else {
            alert("Неверный пароль");
        }
    };

    const handleSave = async () => {
        if (!data) return;
        setSaving(true);
        setMessage({ text: "", type: "" });
        try {
            // Send ONLY the data object expected by /api/prices
            const res = await fetch("/api/prices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to save');

            setMessage({ text: "Цены успешно сохранены!", type: "success" });

            // Auto-hide message
            setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        } catch (e: any) {
            setMessage({ text: "Ошибка сохранения: " + e.message, type: "error" });
        } finally {
            setSaving(false);
        }
    };

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-[#111] p-8 rounded-3xl border border-white/10 w-full max-w-md">
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#FF2E63]/10 p-4 rounded-full text-[#FF2E63]">
                            <Shield size={40} />
                        </div>
                    </div>
                    <h1 className="text-center font-tactic font-black text-2xl text-white uppercase mb-8">Admin Access</h1>
                    <input
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white mb-6 focus:border-[#FF2E63] outline-none"
                        required
                    />
                    <button className="w-full bg-[#FF2E63] hover:bg-[#FF2E63]/80 py-4 rounded-xl font-chakra font-black text-white uppercase tracking-wider transition-all">
                        Войти
                    </button>
                </form>
            </div>
        );
    }

    if (loading || !data) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="animate-spin text-[#FF2E63]" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 font-inter">
            <div className="max-w-[1200px] mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4 bg-[#111] p-6 rounded-2xl border border-white/10 sticky top-4 z-40 backdrop-blur-xl shadow-2xl">
                    <div>
                        <h1 className="font-tactic font-black text-3xl uppercase text-white">Управление ценами</h1>
                        <p className="text-gray-500 text-xs uppercase tracking-widest font-chakra mt-1">CyberX Novokosino CMS</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {message.text && (
                            <div className={`px-4 py-2 rounded-lg text-sm font-bold animate-fade-in ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {message.text}
                            </div>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 bg-[#FF2E63] hover:bg-[#FF2E63]/80 disabled:opacity-50 px-6 py-3 rounded-xl font-chakra font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,46,99,0.3)] hover:shadow-[0_0_30px_rgba(255,46,99,0.5)]"
                        >
                            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            Сохранить
                        </button>
                        <button
                            onClick={() => {
                                setIsAuthorized(false);
                                sessionStorage.removeItem('admin_auth');
                            }}
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all border border-white/5"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                {/* Zones */}
                <div className="space-y-12 pb-20">
                    <SectionTitle title="Игровые зоны" />
                    {data.zones.map((zone, zIdx) => (
                        <ZoneEditor
                            key={zone.id || zIdx}
                            zone={zone}
                            onChange={(newZone) => {
                                const newZones = [...data.zones];
                                newZones[zIdx] = newZone;
                                setData({ ...data, zones: newZones });
                            }}
                            onDelete={() => {
                                if (confirm('Удалить эту зону?')) {
                                    setData({ ...data, zones: data.zones.filter((_, i) => i !== zIdx) });
                                }
                            }}
                        />
                    ))}
                    <button
                        onClick={() => {
                            const newZone: ZoneData = {
                                id: `new-zone-${Date.now()}`,
                                name: "НОВАЯ ЗОНА",
                                desc: "Описание оборудования",
                                categories: [
                                    { title: "Утро", color: "#FF2E63", items: [] }
                                ]
                            };
                            setData({ ...data, zones: [...data.zones, newZone] });
                        }}
                        className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl hover:border-[#FF2E63]/40 text-gray-500 hover:text-[#FF2E63] transition-all flex items-center justify-center gap-2 font-chakra font-bold"
                    >
                        <Plus size={20} /> ДОБАВИТЬ ЗОНУ
                    </button>

                    {/* Abonnements */}
                    <SectionTitle title="Абонементы" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {data.abonnements?.map((abon, aIdx) => (
                            <AbonnementEditor
                                key={aIdx}
                                abon={abon}
                                onChange={(newAbon) => {
                                    const newAbons = [...(data.abonnements || [])];
                                    newAbons[aIdx] = newAbon;
                                    setData({ ...data, abonnements: newAbons });
                                }}
                                onDelete={() => {
                                    setData({ ...data, abonnements: data.abonnements.filter((_, i) => i !== aIdx) });
                                }}
                            />
                        ))}
                        <button
                            onClick={() => {
                                const newAbon: Abonnement = { name: "НОВЫЙ", validity: "45 дней", prices: [{ zone: "ОБЩИЙ ЗАЛ", value: 0 }] };
                                setData({ ...data, abonnements: [...(data.abonnements || []), newAbon] });
                            }}
                            className="h-full min-h-[200px] border-2 border-dashed border-white/10 rounded-2xl hover:border-[#FF2E63]/40 text-gray-500 hover:text-[#FF2E63] transition-all flex items-center justify-center gap-2 font-chakra font-bold"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>

                <div className="mt-20 text-center text-gray-600 text-xs font-mono border-t border-white/5 pt-8">
                    &copy; 2026 CYBERX NOVOKOSINO // NO DB CMS v1.0
                </div>
            </div>
        </div>
    );
}

// --- SUB COMPONENTS ---

function SectionTitle({ title }: { title: string }) {
    return (
        <div className="flex items-center gap-4 mb-6">
            <h2 className="font-tactic font-bold text-2xl text-[#FF2E63] uppercase tracking-wider">{title}</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
        </div>
    );
}

function ZoneEditor({ zone, onChange, onDelete }: { zone: ZoneData, onChange: (z: ZoneData) => void, onDelete: () => void }) {
    const isSubZoned = !!zone.subZones;

    return (
        <div className="bg-[#111] rounded-3xl border border-white/10 overflow-hidden mb-8 shadow-lg">
            <div className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 mr-4 items-center">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase text-gray-500 font-bold">Название зоны</label>
                        <input
                            value={zone.name}
                            onChange={e => onChange({ ...zone, name: e.target.value })}
                            className="bg-black border border-white/10 rounded-lg px-3 py-2 text-white font-tactic font-bold uppercase text-lg focus:border-[#FF2E63] outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="text-[10px] uppercase text-gray-500 font-bold">Описание железа</label>
                        <input
                            value={zone.desc}
                            onChange={e => onChange({ ...zone, desc: e.target.value })}
                            placeholder="Описание железа"
                            className="bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#FF2E63] outline-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => onChange({ ...zone, subZones: isSubZoned ? undefined : [] })} className="text-xs bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors">
                        {isSubZoned ? 'Без подзон' : 'С подзонами'}
                    </button>
                    <button onClick={onDelete} className="text-gray-500 hover:text-red-500 transition-colors p-2 bg-red-500/10 rounded-lg"><Trash2 size={20} /></button>
                </div>
            </div>

            <div className="p-6">
                {isSubZoned ? (
                    <div className="space-y-8 pl-4 border-l-2 border-white/5">
                        {zone.subZones?.map((sub, sIdx) => (
                            <div key={sIdx} className="border border-white/5 rounded-2xl p-4 bg-black/20">
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                                    <div className="w-1/3">
                                        <label className="text-[10px] uppercase text-gray-500 font-bold block mb-1">Название Подзоны</label>
                                        <input
                                            value={sub.name}
                                            onChange={e => {
                                                const newSubs = [...zone.subZones!];
                                                newSubs[sIdx].name = e.target.value;
                                                onChange({ ...zone, subZones: newSubs });
                                            }}
                                            className="bg-black border border-white/10 rounded-lg px-3 py-2 text-white font-tactic font-bold w-full uppercase"
                                        />
                                    </div>
                                    <button onClick={() => {
                                        const newSubs = zone.subZones!.filter((_, i) => i !== sIdx);
                                        onChange({ ...zone, subZones: newSubs });
                                    }} className="text-gray-700 hover:text-red-500 p-2"><Trash2 size={16} /></button>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    {sub.categories.map((cat, cIdx) => (
                                        <CategoryEditor
                                            key={cIdx}
                                            cat={cat}
                                            onChange={(newCat) => {
                                                const newSubs = [...zone.subZones!];
                                                newSubs[sIdx].categories[cIdx] = newCat;
                                                onChange({ ...zone, subZones: newSubs });
                                            }}
                                            onDelete={() => {
                                                const newSubs = [...zone.subZones!];
                                                newSubs[sIdx].categories = sub.categories.filter((_, i) => i !== cIdx);
                                                onChange({ ...zone, subZones: newSubs });
                                            }}
                                        />
                                    ))}
                                    <button onClick={() => {
                                        const newSubs = [...zone.subZones!];
                                        newSubs[sIdx].categories.push({ title: "Новая Категория", color: "#FF2E63", items: [] });
                                        onChange({ ...zone, subZones: newSubs });
                                    }} className="text-xs text-center border border-dashed border-white/10 py-2 rounded text-gray-500 hover:text-white hover:border-[#FF2E63]">+ Категория</button>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => {
                            const newSub = { name: "Подзона", categories: [{ title: "Тариф", color: "#B900FF", items: [] }] };
                            onChange({ ...zone, subZones: [...(zone.subZones || []), newSub] });
                        }} className="text-xs text-gray-500 hover:text-white uppercase font-bold py-2 bg-white/5 rounded text-center w-full hover:bg-white/10">+ Добавить подзону</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {zone.categories?.map((cat, cIdx) => (
                            <CategoryEditor
                                key={cIdx}
                                cat={cat}
                                onChange={(newCat) => {
                                    const newCats = [...zone.categories!];
                                    newCats[cIdx] = newCat;
                                    onChange({ ...zone, categories: newCats });
                                }}
                                onDelete={() => {
                                    onChange({ ...zone, categories: zone.categories!.filter((_, i) => i !== cIdx) })
                                }}
                            />
                        ))}
                        <button onClick={() => {
                            onChange({ ...zone, categories: [...(zone.categories || []), { title: "Новая Категория", color: "#FF2E63", items: [] }] });
                        }} className="border-2 border-dashed border-white/5 rounded-2xl min-h-[200px] flex items-center justify-center text-gray-600 hover:text-white transition-colors capitalize hover:border-white/20 font-bold">+ Добавить категорию</button>
                    </div>
                )}
            </div>
        </div>
    );
}

function CategoryEditor({ cat, onChange, onDelete }: { cat: PricingCategory, onChange: (c: PricingCategory) => void, onDelete: () => void }) {
    return (
        <div className="bg-[#181818] rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            type="color"
                            value={cat.color}
                            onChange={e => onChange({ ...cat, color: e.target.value })}
                            className="w-6 h-6 rounded overflow-hidden cursor-pointer border-none p-0 opacity-0 absolute inset-0"
                        />
                        <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: cat.color }} />
                    </div>
                    <input
                        value={cat.title}
                        onChange={e => onChange({ ...cat, title: e.target.value })}
                        className="bg-transparent text-sm font-bold text-white uppercase outline-none placeholder-white/20"
                        placeholder="Название категории"
                    />
                </div>
                <button onClick={onDelete} className="text-gray-600 hover:text-white"><Trash2 size={14} /></button>
            </div>

            <div className="space-y-2">
                {cat.items.map((item, iIdx) => (
                    <div key={iIdx} className="bg-black/40 p-2 rounded-lg flex items-center gap-2 group border border-transparent hover:border-white/10 transition-colors">

                        <div className="flex flex-col gap-0.5 flex-1 max-w-[80px]">
                            <label className="text-[8px] text-gray-600 uppercase font-mono">Название</label>
                            <input value={item.time} onChange={e => {
                                const newItems = [...cat.items];
                                newItems[iIdx].time = e.target.value;
                                onChange({ ...cat, items: newItems });
                            }} placeholder="1 ЧАС" className="bg-white/5 rounded px-2 py-1 text-xs w-full focus:bg-white/10 outline-none" />
                        </div>

                        <div className="flex flex-col gap-0.5 flex-[2]">
                            <label className="text-[8px] text-gray-600 uppercase font-mono">Часы</label>
                            <input value={item.hours} onChange={e => {
                                const newItems = [...cat.items];
                                newItems[iIdx].hours = e.target.value;
                                onChange({ ...cat, items: newItems });
                            }} placeholder="Часы" className="bg-white/5 rounded px-2 py-1 text-[10px] w-full focus:bg-white/10 outline-none font-mono" />
                        </div>

                        <div className="flex flex-col gap-0.5 w-[60px]">
                            <label className="text-[8px] text-gray-600 uppercase font-mono text-center">Будни</label>
                            <input type="number" value={item.week} onChange={e => {
                                const newItems = [...cat.items];
                                newItems[iIdx].week = parseInt(e.target.value);
                                onChange({ ...cat, items: newItems });
                            }} className="bg-white/5 rounded px-1 py-1 text-xs text-center focus:bg-white/10 outline-none" />
                        </div>

                        <div className="flex flex-col gap-0.5 w-[60px]">
                            <label className="text-[8px] text-gray-600 uppercase font-mono text-center">Выходные</label>
                            <input type="number" value={item.end} onChange={e => {
                                const newItems = [...cat.items];
                                newItems[iIdx].end = parseInt(e.target.value);
                                onChange({ ...cat, items: newItems });
                            }} className="bg-white/5 rounded px-1 py-1 text-xs text-center focus:bg-white/10 outline-none" />
                        </div>

                        <div className="flex flex-col gap-0.5 pt-3">
                            <button
                                onClick={() => {
                                    const newItems = [...cat.items];
                                    newItems[iIdx].isNight = !newItems[iIdx].isNight;
                                    onChange({ ...cat, items: newItems });
                                }}
                                className={`text-[9px] px-2 py-1 rounded font-bold transition-colors uppercase ${item.isNight ? 'bg-[#FF2E63] text-white' : 'bg-white/5 text-gray-600 hover:bg-white/10'}`}
                            >НОЧЬ</button>
                        </div>

                        <div className="pt-3 pl-1">
                            <button onClick={() => {
                                const newItems = cat.items.filter((_, i) => i !== iIdx);
                                onChange({ ...cat, items: newItems });
                            }} className="text-gray-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
                <button
                    onClick={() => {
                        const newItem: PriceItem = { time: "1 ЧАС", hours: "08:00 - 17:00", week: 0, end: 0 };
                        onChange({ ...cat, items: [...cat.items, newItem] });
                    }}
                    className="w-full text-[10px] text-gray-500 hover:text-white flex items-center justify-center gap-1 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors mt-2"
                >
                    <Plus size={12} /> Добавить тариф
                </button>
            </div>
        </div>
    );
}

function AbonnementEditor({ abon, onChange, onDelete }: { abon: Abonnement, onChange: (a: Abonnement) => void, onDelete: () => void }) {
    return (
        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl relative group hover:border-white/30 transition-colors">
            <button onClick={onDelete} className="absolute top-4 right-4 text-gray-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>

            <div className="mb-4">
                <label className="text-[10px] text-gray-600 uppercase font-bold block mb-1 text-center">Название пакета</label>
                <input
                    value={abon.name}
                    onChange={e => onChange({ ...abon, name: e.target.value })}
                    className="bg-transparent border-b border-white/10 w-full text-center font-tactic font-black text-xl text-white outline-none focus:border-[#FF2E63] placeholder-white/20"
                    placeholder="НАЗВАНИЕ"
                />
            </div>

            <div className="space-y-3 mb-4 bg-black/30 p-3 rounded-xl">
                {abon.prices.map((p, pIdx) => (
                    <div key={pIdx} className="flex gap-2 items-center">
                        <input
                            value={p.zone}
                            onChange={e => {
                                const newPrices = [...abon.prices];
                                newPrices[pIdx].zone = e.target.value;
                                onChange({ ...abon, prices: newPrices });
                            }}
                            className="bg-black border border-white/10 rounded px-2 py-1 text-[10px] flex-grow text-white focus:border-[#FF2E63] outline-none uppercase font-bold"
                            placeholder="Зона"
                        />
                        <input
                            type="number"
                            value={p.value}
                            onChange={e => {
                                const newPrices = [...abon.prices];
                                newPrices[pIdx].value = parseInt(e.target.value) || 0;
                                onChange({ ...abon, prices: newPrices });
                            }}
                            className="bg-black border border-white/10 rounded w-16 text-center text-xs py-1 text-[#FF2E63] font-black focus:border-[#FF2E63] outline-none"
                        />
                        <button onClick={() => {
                            const newPrices = abon.prices.filter((_, i) => i !== pIdx);
                            onChange({ ...abon, prices: newPrices });
                        }} className="text-gray-700 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                    </div>
                ))}
                <button
                    onClick={() => {
                        const newPrices = [...abon.prices, { zone: "НОВАЯ ЗОНА", value: 0 }];
                        onChange({ ...abon, prices: newPrices });
                    }}
                    className="text-[9px] text-gray-600 hover:text-white flex items-center gap-1 uppercase font-bold justify-center w-full py-1"
                >
                    <Plus size={10} /> Добавить зону
                </button>
            </div>

            <div className="space-y-0.5">
                <label className="text-[9px] text-gray-600 uppercase font-bold text-center block">Срок действия</label>
                <input
                    value={abon.validity}
                    onChange={e => onChange({ ...abon, validity: e.target.value })}
                    className="bg-black border border-white/10 rounded w-full text-[10px] py-1.5 text-center text-white focus:border-[#FF2E63] outline-none"
                    placeholder="Например: 30 дней"
                />
            </div>
        </div>
    );
}
