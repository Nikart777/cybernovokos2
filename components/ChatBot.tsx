"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Привет! Я администратор CyberX Новокосино. Чем могу помочь?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Listen for global event to open chat
    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener("open-chat", handleOpenChat);
        return () => window.removeEventListener("open-chat", handleOpenChat);
    }, []);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: "user" as const, content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Извините, произошла ошибка. Пожалуйста, попробуйте позже." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed inset-0 z-[100] md:inset-auto md:right-6 md:bottom-24 md:w-[400px] md:h-[600px] flex flex-col bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 md:rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#FF0055]/20 to-[#CC0099]/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF0055] to-[#CC0099] flex items-center justify-center shadow-lg shadow-[#FF0055]/20">
                                    <Bot size={22} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-chakra font-bold uppercase tracking-wider text-sm">Чат CyberX</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] text-white/50 uppercase tracking-widest font-inter">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide">
                            {messages.map((m, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: m.role === "user" ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${m.role === "user"
                                            ? "bg-gradient-to-br from-[#FF0055] to-[#CC0099] text-white rounded-tr-none shadow-lg shadow-[#FF0055]/10"
                                            : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none backdrop-blur-md"
                                            }`}
                                    >
                                        {m.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
                                        <Loader2 size={20} className="text-[#FF0055] animate-spin" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="relative"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Напишите сообщение..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF0055]/50 transition-colors font-inter text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-[#FF0055] to-[#CC0099] rounded-lg text-white disabled:opacity-50 disabled:grayscale transition-all active:scale-95"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
