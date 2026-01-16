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

    // Load data
    useEffect(() => {
        if (isAuthorized) {
            fetchData();
        }
    }, [isAuthorized]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/prices");
            const json = await res.json();
            if (json.error) throw new Error(json.error);
            setData(json);
        } catch (e: any) {
            setMessage({ text: "Ошибка загрузки: " + e.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password) {
            setIsAuthorized(true);
            // We'll verify on save anyway, but this unlocks UI
        }
    };

    const handleSave = async () => {
        if (!data) return;
        setSaving(true);
        setMessage({ text: "", type: "" });
        try {
            const res = await fetch("/api/admin/prices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password, data }),
            });
            const result = await res.json();
            if (result.error) throw new Error(result.error);
            setMessage({ text: "Цены успешно сохранены!", type: "success" });
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
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4 bg-[#111] p-6 rounded-2xl border border-white/10 sticky top-4 z-40 backdrop-blur-xl">
                    <div>
                        <h1 className="font-tactic font-black text-3xl uppercase text-white">Управление ценами</h1>
                        <p className="text-gray-500 text-xs uppercase tracking-widest font-chakra mt-1">CyberX Novokosino CMS</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {message.text && (
                            <div className={`px-4 py-2 rounded-lg text-sm font-bold ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {message.text}
                            </div>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 bg-[#FF2E63] hover:bg-[#FF2E63]/80 disabled:opacity-50 px-6 py-3 rounded-xl font-chakra font-black uppercase tracking-wider transition-all"
                        >
                            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            Сохранить
                        </button>
                        <button onClick={() => setIsAuthorized(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                {/* Zones */}
                <div className="space-y-12">
                    <SectionTitle title="Игровые зоны" />
                    {data.zones.map((zone, zIdx) => (
                        <ZoneEditor
                            key={zone.id}
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
                        {data.abonnements.map((abon, aIdx) => (
                            <AbonnementEditor
                                key={aIdx}
                                abon={abon}
                                onChange={(newAbon) => {
                                    const newAbons = [...data.abonnements];
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
                                setData({ ...data, abonnements: [...data.abonnements, newAbon] });
                            }}
                            className="h-full min-h-[200px] border-2 border-dashed border-white/10 rounded-2xl hover:border-[#FF2E63]/40 text-gray-500 hover:text-[#FF2E63] transition-all flex items-center justify-center gap-2 font-chakra font-bold"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>

                <div className="mt-20 text-center text-gray-600 text-xs font-mono">
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
        <div className="bg-[#111] rounded-3xl border border-white/10 overflow-hidden mb-8">
            <div className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 mr-4">
                    <input
                        value={zone.name}
                        onChange={e => onChange({ ...zone, name: e.target.value })}
                        className="bg-black border border-white/10 rounded-lg px-3 py-2 text-white font-tactic font-bold uppercase"
                    />
                    <input
                        value={zone.desc}
                        onChange={e => onChange({ ...zone, desc: e.target.value })}
                        placeholder="Описание железа"
                        className="bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    />
                </div>
                <button onClick={onDelete} className="text-gray-500 hover:text-red-500 transition-colors p-2"><Trash2 size={20} /></button>
            </div>

            <div className="p-6">
                {isSubZoned ? (
                    <div className="space-y-8">
                        {zone.subZones?.map((sub, sIdx) => (
                            <div key={sIdx} className="border border-white/5 rounded-2xl p-4 bg-black/20">
                                <div className="flex items-center justify-between mb-4">
                                    <input
                                        value={sub.name}
                                        onChange={e => {
                                            const newSubs = [...zone.subZones!];
                                            newSubs[sIdx].name = e.target.value;
                                            onChange({ ...zone, subZones: newSubs });
                                        }}
                                        className="bg-black border border-white/10 rounded-lg px-3 py-2 text-white font-bold"
                                    />
                                    <button onClick={() => {
                                        const newSubs = zone.subZones!.filter((_, i) => i !== sIdx);
                                        onChange({ ...zone, subZones: newSubs });
                                    }} className="text-gray-700 hover:text-red-500"><Trash2 size={16} /></button>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {sub.categories.map((cat, cIdx) => (
                                        <CategoryEditor
                                            key={cIdx}
                                            cat={cat}
                                            onChange={(newCat) => {
                                                const newSubs = [...zone.subZones!];
                                                newSubs[sIdx].categories[cIdx] = newCat;
                                                onChange({ ...zone, subZones: newSubs });
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button onClick={() => {
                            const newSub = { name: "Подзона", categories: [{ title: "Тариф", color: "#B900FF", items: [] }] };
                            onChange({ ...zone, subZones: [...(zone.subZones || []), newSub] });
                        }} className="text-xs text-gray-500 hover:text-white uppercase font-bold">+ Добавить подзону</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {zone.categories?.map((cat, cIdx) => (
                            <CategoryEditor
                                key={cIdx}
                                cat={cat}
                                onChange={(newCat) => {
                                    const newCats = [...zone.categories!];
                                    newCats[cIdx] = newCat;
                                    onChange({ ...zone, categories: newCats });
                                }}
                            />
                        ))}
                        <button onClick={() => {
                            onChange({ ...zone, categories: [...(zone.categories || []), { title: "Новая Категория", color: "#FF2E63", items: [] }] });
                        }} className="border-2 border-dashed border-white/5 rounded-2xl h-full py-10 text-gray-600 hover:text-white transition-colors capitalize">+ Добавить категорию</button>
                    </div>
                )}
            </div>
        </div>
    );
}

function CategoryEditor({ cat, onChange }: { cat: PricingCategory, onChange: (c: PricingCategory) => void }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <input
                    value={cat.title}
                    onChange={e => onChange({ ...cat, title: e.target.value })}
                    className="bg-transparent border-b border-white/10 focus:border-[#FF2E63] text-sm font-bold text-white uppercase outline-none"
                />
                <input
                    type="color"
                    value={cat.color}
                    onChange={e => onChange({ ...cat, color: e.target.value })}
                    className="w-6 h-6 bg-transparent border-none p-0 cursor-pointer"
                />
            </div>

            <div className="space-y-2">
                {cat.items.map((item, iIdx) => (
                    <div key={iIdx} className="bg-black/40 p-3 rounded-xl flex items-center flex-wrap gap-2 group">
                        <input value={item.time} onChange={e => {
                            const newItems = [...cat.items];
                            newItems[iIdx].time = e.target.value;
                            onChange({ ...cat, items: newItems });
                        }} placeholder="1 ЧАС" className="bg-white/5 rounded px-2 py-1 text-xs w-20" />

                        <input value={item.hours} onChange={e => {
                            const newItems = [...cat.items];
                            newItems[iIdx].hours = e.target.value;
                            onChange({ ...cat, items: newItems });
                        }} placeholder="Часы" className="bg-white/5 rounded px-2 py-1 text-[10px] flex-grow" />

                        <div className="flex items-center gap-1">
                            <span className="text-[9px] text-gray-600">Б:</span>
                            <input type="number" value={item.week} onChange={e => {
                                const newItems = [...cat.items];
                                newItems[iIdx].week = parseInt(e.target.value);
                                onChange({ ...cat, items: newItems });
                            }} className="bg-white/5 rounded px-1 py-1 text-xs w-12 text-center" />
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="text-[9px] text-gray-600">В:</span>
                            <input type="number" value={item.end} onChange={e => {
                                const newItems = [...cat.items];
                                newItems[iIdx].end = parseInt(e.target.value);
                                onChange({ ...cat, items: newItems });
                            }} className="bg-white/5 rounded px-1 py-1 text-xs w-12 text-center" />
                        </div>

                        <button
                            onClick={() => {
                                const newItems = [...cat.items];
                                newItems[iIdx].isNight = !newItems[iIdx].isNight;
                                onChange({ ...cat, items: newItems });
                            }}
                            className={`text-[9px] px-1.5 py-1 rounded font-bold transition-colors ${item.isNight ? 'bg-[#FF2E63] text-white' : 'bg-white/5 text-gray-600'}`}
                        >НОЧЬ</button>

                        <button onClick={() => {
                            const newItems = cat.items.filter((_, i) => i !== iIdx);
                            onChange({ ...cat, items: newItems });
                        }} className="text-gray-700 hover:text-red-500 ml-auto"><Trash2 size={14} /></button>
                    </div>
                ))}
                <button
                    onClick={() => {
                        const newItem: PriceItem = { time: "1 ЧАС", hours: "08:00 - 17:00", week: 150, end: 170 };
                        onChange({ ...cat, items: [...cat.items, newItem] });
                    }}
                    className="text-[10px] text-gray-600 hover:text-white flex items-center gap-1"
                >
                    <Plus size={12} /> Добавить тариф
                </button>
            </div>
        </div>
    );
}

function AbonnementEditor({ abon, onChange, onDelete }: { abon: Abonnement, onChange: (a: Abonnement) => void, onDelete: () => void }) {
    return (
        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl relative group">
            <button onClick={onDelete} className="absolute top-4 right-4 text-gray-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
            <input
                value={abon.name}
                onChange={e => onChange({ ...abon, name: e.target.value })}
                className="bg-transparent border-b border-white/10 w-full mb-4 text-center font-tactic font-black text-xl text-white outline-none focus:border-[#FF2E63]"
            />

            <div className="space-y-3 mb-4">
                {abon.prices.map((p, pIdx) => (
                    <div key={pIdx} className="flex gap-2 items-center">
                        <input
                            value={p.zone}
                            onChange={e => {
                                const newPrices = [...abon.prices];
                                newPrices[pIdx].zone = e.target.value;
                                onChange({ ...abon, prices: newPrices });
                            }}
                            className="bg-black border border-white/10 rounded px-2 py-1 text-[10px] flex-grow"
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
                            className="bg-black border border-white/10 rounded w-16 text-center text-xs py-1"
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
                    className="text-[9px] text-gray-600 hover:text-white flex items-center gap-1 uppercase font-bold"
                >
                    <Plus size={10} /> Добавить зону
                </button>
            </div>

            <div className="space-y-2">
                <input
                    value={abon.validity}
                    onChange={e => onChange({ ...abon, validity: e.target.value })}
                    className="bg-black border border-white/10 rounded w-full text-[10px] py-1 text-center"
                    placeholder="Срок действия"
                />
            </div>
        </div>
    );
}
