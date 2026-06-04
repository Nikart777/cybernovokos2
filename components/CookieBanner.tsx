"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie } from "lucide-react";
import Link from "next/link";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:max-w-md z-[100]"
                >
                    <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden group">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E63]/10 to-[#00F0FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                        
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="p-3 bg-white/5 rounded-xl text-[#00F0FF] shrink-0">
                                <Cookie size={24} />
                            </div>
                            <div className="flex-1 pr-6">
                                <h4 className="font-chakra font-bold text-white mb-1">Мы используем Cookie</h4>
                                <p className="text-white/60 text-xs font-inter mb-4 leading-relaxed">
                                    Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
                                    <Link href="/legal/privacy" className="text-[#FF2E63] hover:underline underline-offset-2">
                                        Политикой конфиденциальности
                                    </Link>
                                    {' '}и использованием файлов cookie для улучшения работы сайта.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={acceptCookies}
                                        className="px-5 py-2 bg-white text-black font-chakra font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-[#FF2E63] hover:text-white transition-colors"
                                    >
                                        Согласен
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
