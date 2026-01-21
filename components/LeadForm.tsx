"use client";

import { useState } from "react";
import { MousePointer2 } from "lucide-react";

export default function LeadForm() {
    const [phone, setPhone] = useState("+7");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // Prevent deleting +7
        if (!val.startsWith("+7")) return;

        // Only allow digits, spaces, dashed, parens
        if (!/^[0-9\s()+-]*$/.test(val)) return;

        if (val.length > 12) return;

        setPhone(val);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSuccess(true);
            } else {
                setError(data.error || "Ошибка отправки");
            }
        } catch (err) {
            setError("Ошибка соединения");
        } finally {
            setLoading(false);
        }
    };

    const openPrivacy = () => {
        window.dispatchEvent(new CustomEvent("open-privacy-policy"));
    };

    if (success) {
        return (
            <div className="relative overflow-hidden bg-[#0F1419]/95 backdrop-blur-xl p-8 rounded-[2rem] border border-[#00ff88]/50 shadow-[0_0_50px_rgba(0,255,136,0.15)] text-center animate-in fade-in zoom-in duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-50" />
                <h3 className="font-tactic font-black text-3xl text-white mb-4 uppercase italic tracking-wide">
                    <span className="text-[#00ff88]">V</span>ictory!
                </h3>
                <p className="font-chakra font-medium text-gray-300 mb-6 text-lg">
                    Твой промокод на 1 час игры:
                </p>
                <div className="relative group cursor-pointer" onClick={() => navigator.clipboard.writeText("CYBERXWEB")}>
                    <div className="absolute inset-0 bg-[#00ff88] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-black/50 border-2 border-[#00ff88] border-dashed text-[#00ff88] text-4xl font-mono font-bold py-4 px-6 rounded-xl select-all hover:bg-[#00ff88]/10 transition-colors">
                        CYBERXWEB
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-4 font-chakra uppercase tracking-widest">
                    Введи этот промокод в клубе при регистрации
                </p>
            </div>
        );
    }

    return (
        <div className="relative group perspective-1000">
            {/* Background Glows */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff88] to-[#00f0ff] rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-[#0a0a0a] p-8 md:p-10 rounded-[2rem] border border-[#00ff88]/30 shadow-[0_0_50px_rgba(0,255,136,0.1)] overflow-hidden">

                {/* Decor Lines */}
                <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent" />
                <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent" />

                {/* Header */}
                <div className="mb-8 text-center relative z-10">
                    <h3 className="font-tactic font-black text-3xl md:text-4xl text-white mb-3 uppercase italic leading-none drop-shadow-[0_0_10px_rgba(0,255,136,0.3)]">
                        Забери <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00f0ff]">1 час игры</span> бесплатно
                    </h3>
                    <p className="font-chakra font-medium text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                        Оставь номер, и мы пришлем промокод на первое посещение + <span className="text-[#FFD700] font-bold">400 бонусов</span> на баланс
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="relative group/input">
                        {/* Input Decor Borders */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff88] rounded-tl-lg opacity-50 group-focus-within/input:opacity-100 transition-opacity" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff88] rounded-tr-lg opacity-50 group-focus-within/input:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff88] rounded-bl-lg opacity-50 group-focus-within/input:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff88] rounded-br-lg opacity-50 group-focus-within/input:opacity-100 transition-opacity" />

                        <input
                            type="tel"
                            value={phone}
                            onChange={handlePhoneChange}
                            className="w-full bg-[#141414] border border-[#00ff88]/20 rounded-xl px-6 py-4 text-xl font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff88] focus:bg-[#00ff88]/5 focus:shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-all text-center"
                            required
                            minLength={12}
                        />
                    </div>

                    {error && <p className="text-[#FF2E63] text-sm text-center font-bold animate-pulse">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00cc6a] p-[1px] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:shadow-[0_0_50px_rgba(0,255,136,0.5)]"
                    >
                        <div className="relative bg-black/10 backdrop-blur-sm rounded-[11px] py-4 transition-all group-hover/btn:bg-transparent">
                            <span className="font-tactic font-black text-xl text-[#050505] uppercase italic tracking-wider flex items-center justify-center gap-3">
                                Получить код
                                <MousePointer2 className="w-5 h-5 fill-black stroke-black rotate-[-15deg]" />
                            </span>
                        </div>
                        {/* Shine effect */}
                        <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 pointer-events-none" />
                    </button>

                    <p className="text-[10px] text-gray-600 text-center font-chakra uppercase tracking-wider">
                        Нажимая кнопку, вы соглашаетесь с{" "}
                        <button
                            type="button"
                            onClick={openPrivacy}
                            className="text-gray-400 hover:text-[#00ff88] underline decoration-dashed underline-offset-4 transition-colors"
                        >
                            политикой конфиденциальности
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}
