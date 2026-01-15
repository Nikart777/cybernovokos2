"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, LogOut, ChevronDown, ChevronUp } from "lucide-react";

export default function AdminPrices() {
    const [password, setPassword] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const fetchPrices = async () => {
        try {
            const res = await fetch("/api/admin/prices");
            const d = await res.json();
            setData(d);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchPrices();
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length > 0) {
            setIsAuth(true);
            // В реальном приложении здесь можно проверить пароль через API, 
            // но для "максимально простой" админки проверим при сохранении.
        }
    };

    const handleSave = async () => {
        setLoading(true);
        setStatus("Сохранение...");
        try {
            const res = await fetch("/api/admin/prices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password, data }),
            });

            if (res.ok) {
                setStatus("Данные успешно сохранены!");
                setTimeout(() => setStatus(""), 3000);
            } else {
                const err = await res.json();
                setStatus(`Ошибка: ${err.error}`);
            }
        } catch (e) {
            setStatus("Ошибка сети");
        } finally {
            setLoading(false);
        }
    };

    const addZone = () => {
        const newZone = {
            id: "zone-" + Date.now(),
            name: "НОВАЯ ЗОНА",
            desc: "Описание зоны",
            morning: [],
            evening: []
        };
        setData([...data, newZone]);
    };

    const deleteZone = (idx: number) => {
        if (confirm("Удалить всю зону?")) {
            const newData = [...data];
            newData.splice(idx, 1);
            setData(newData);
        }
    };

    const addRow = (zoneIdx: number, type: 'morning' | 'evening') => {
        const newData = [...data];
        newData[zoneIdx][type].push({ time: "TBD", hours: "00-00", week: 0, end: 0 });
        setData(newData);
    };

    const deleteRow = (zoneIdx: number, type: 'morning' | 'evening', rowIdx: number) => {
        const newData = [...data];
        newData[zoneIdx][type].splice(rowIdx, 1);
        setData(newData);
    };

    const updateZoneField = (idx: number, field: string, value: string) => {
        const newData = [...data];
        newData[idx][field] = value;
        setData(newData);
    };

    const updateRowField = (zIdx: number, type: 'morning' | 'evening', rIdx: number, field: string, value: any) => {
        const newData = [...data];
        newData[zIdx][type][rIdx][field] = field === 'week' || field === 'end' ? parseInt(value) || 0 : value;
        setData(newData);
    };

    const moveZone = (idx: number, dir: 'up' | 'down') => {
        const newData = [...data];
        if (dir === 'up' && idx > 0) {
            [newData[idx], newData[idx - 1]] = [newData[idx - 1], newData[idx]];
        } else if (dir === 'down' && idx < data.length - 1) {
            [newData[idx], newData[idx + 1]] = [newData[idx + 1], newData[idx]];
        }
        setData(newData);
    }

    if (!isAuth) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-[#111] p-8 rounded-2xl border border-white/10 w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
                    <input
                        type="password"
                        placeholder="ADMIN_PASSWORD"
                        className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 mb-6 focus:border-[#FF2E63] outline-none transition-colors"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="w-full bg-[#FF2E63] py-4 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all">
                        Enter
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10">
            <div className="max-w-6xl mx-auto">

                <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Price Manager</h1>
                        <p className="text-gray-500 text-sm">cyberx-novokosino / data / prices.json</p>
                    </div>
                    <div className="flex gap-4">
                        {status && <span className="flex items-center text-sm font-bold text-[#FF2E63]">{status}</span>}
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center gap-2 bg-[#FF2E63] px-6 py-3 rounded-xl font-bold uppercase text-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                            <Save size={18} /> Сохранить
                        </button>
                        <button
                            onClick={() => setIsAuth(false)}
                            className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </header>

                <div className="space-y-12 pb-20">
                    {data.map((zone, zIdx) => (
                        <div key={zone.id} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="bg-white/5 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5">
                                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <input
                                        className="bg-black border border-white/10 rounded-lg px-4 py-2 font-bold text-xl uppercase"
                                        value={zone.name}
                                        onChange={(e) => updateZoneField(zIdx, 'name', e.target.value)}
                                    />
                                    <input
                                        className="bg-black border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-400"
                                        value={zone.desc}
                                        onChange={(e) => updateZoneField(zIdx, 'desc', e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => moveZone(zIdx, 'up')} className="p-2 hover:text-[#FF2E63]"><ChevronUp size={20} /></button>
                                    <button onClick={() => moveZone(zIdx, 'down')} className="p-2 hover:text-[#FF2E63]"><ChevronDown size={20} /></button>
                                    <button onClick={() => deleteZone(zIdx)} className="p-2 text-red-500 hover:text-red-400"><Trash2 size={20} /></button>
                                </div>
                            </div>

                            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Morning */}
                                <PriceSection
                                    title="Morning / Day"
                                    items={zone.morning || []}
                                    onAdd={() => addRow(zIdx, 'morning')}
                                    onDelete={(rIdx) => deleteRow(zIdx, 'morning', rIdx)}
                                    onUpdate={(rIdx, f, v) => updateRowField(zIdx, 'morning', rIdx, f, v)}
                                />

                                {/* Evening */}
                                <PriceSection
                                    title="Evening / Night"
                                    items={zone.evening || []}
                                    onAdd={() => addRow(zIdx, 'evening')}
                                    onDelete={(rIdx) => deleteRow(zIdx, 'evening', rIdx)}
                                    onUpdate={(rIdx, f, v) => updateRowField(zIdx, 'evening', rIdx, f, v)}
                                />

                                {/* SubSections (like TV) - simplified for the manual editor */}
                                {zone.subSections && (
                                    <div className="col-span-full border-t border-white/5 pt-6 mt-4">
                                        <p className="text-red-500 text-xs mb-4 uppercase font-bold">Note: This zone has complex sub-sections. Manual JSON edit recommended for TV groups.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addZone}
                        className="w-full py-6 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-3 text-gray-500 hover:border-[#FF2E63] hover:text-[#FF2E63] transition-all"
                    >
                        <Plus size={24} /> Добавить новую категорию / зону
                    </button>
                </div>

            </div>
        </div>
    );
}

function PriceSection({ title, items, onAdd, onDelete, onUpdate }: {
    title: string,
    items: any[],
    onAdd: () => void,
    onDelete: (idx: number) => void,
    onUpdate: (idx: number, field: string, value: any) => void
}) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold uppercase text-xs tracking-widest text-[#FF2E63]">{title}</h3>
                <button onClick={onAdd} className="text-[10px] uppercase font-bold bg-white/5 px-3 py-1 rounded-md hover:bg-[#FF2E63] transition-colors">Add</button>
            </div>
            <div className="space-y-3">
                {items.map((row: any, rIdx: number) => (
                    <div key={rIdx} className="bg-black/40 border border-white/5 p-3 rounded-xl flex flex-wrap gap-2 items-center">
                        <input
                            placeholder="1 ЧАС" className="bg-transparent border border-white/5 rounded px-2 py-1 text-xs w-20"
                            value={row.time} onChange={(e) => onUpdate(rIdx, 'time', e.target.value)}
                        />
                        <input
                            placeholder="08-17" className="bg-transparent border border-white/5 rounded px-2 py-1 text-[10px] w-24"
                            value={row.hours} onChange={(e) => onUpdate(rIdx, 'hours', e.target.value)}
                        />
                        <div className="flex items-center gap-1">
                            <span className="text-[9px] text-gray-600">Будни:</span>
                            <input
                                type="number" className="bg-transparent border border-white/5 rounded px-2 py-1 text-xs w-16"
                                value={row.week} onChange={(e) => onUpdate(rIdx, 'week', e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-[9px] text-gray-600">Вых:</span>
                            <input
                                type="number" className="bg-transparent border border-white/5 rounded px-2 py-1 text-xs w-16"
                                value={row.end} onChange={(e) => onUpdate(rIdx, 'end', e.target.value)}
                            />
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox" checked={row.isNight}
                                onChange={(e) => onUpdate(rIdx, 'isNight', e.target.checked)}
                            />
                            <span className="text-[9px] text-gray-600">Night</span>
                        </label>
                        <button onClick={() => onDelete(rIdx)} className="ml-auto text-gray-700 hover:text-red-500"><Trash2 size={14} /></button>
                    </div>
                ))}
            </div>
        </div>
    );
}
