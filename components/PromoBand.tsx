"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function PromoBand() {
    const scrollToHero = () => {
        const hero = document.getElementById("hero");
        if (hero) {
            hero.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full py-10 overflow-hidden cursor-pointer group" onClick={scrollToHero}>
            {/* Background with animated gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88] via-[#00f0ff] to-[#00ff88] animate-gradient-xy opacity-90 transition-all duration-300 group-hover:opacity-100" />

            {/* Moving Text */}
            <div className="relative z-10 flex items-center justify-center overflow-hidden">
                <motion.div
                    className="flex items-center gap-12 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                >
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <span className="font-tactic font-black text-3xl md:text-5xl text-black uppercase italic tracking-wide">
                                ЗАБЕРИ ПРОМОКОД НА ПЕРВЫЙ ВИЗИТ
                            </span>
                            <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 text-black" />
                        </div>
                    ))}
                </motion.div>
            </div>

            <style jsx global>{`
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 6s ease infinite;
        }
      `}</style>
        </section>
    );
}
