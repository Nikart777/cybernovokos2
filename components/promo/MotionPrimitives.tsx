"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import type { StoryChapter } from "./promoData";

export function StoryReveal({
  children,
  delay = 0,
  y = 14,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0.01, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.42, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MobileStoryRail({ chapters }: { chapters: StoryChapter[] }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    restDelta: 0.001,
  });
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "start");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-24% 0px -56% 0px",
        threshold: [0.1, 0.35, 0.6],
      },
    );

    chapters.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [chapters]);

  const scrollToChapter = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="sticky top-[58px] z-40 border-y border-white/10 bg-[#050505]/95 backdrop-blur-md md:top-[70px]">
      <div className="h-[2px] w-full bg-white/[0.06]" aria-hidden="true">
        <motion.div
          className="h-full origin-left bg-[#FF2E63]"
          style={{ scaleX: reduceMotion ? 1 : scaleX }}
        />
      </div>

      <nav
        aria-label="Разделы страницы акций"
        className="mx-auto flex max-w-[1440px] items-center gap-6 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-between md:px-10"
      >
        {chapters.map((chapter) => {
          const isActive = activeId === chapter.id;
          const isDropX = chapter.id === "dropx";

          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => scrollToChapter(chapter.id)}
              className={`relative shrink-0 py-3.5 font-chakra text-[11px] font-bold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:text-white ${
                isActive
                  ? isDropX
                    ? "text-[#D5FF39]"
                    : "text-white"
                  : "text-white/45 hover:text-white/80"
              }`}
            >
              <span>{chapter.label}</span>
              {isActive && (
                <motion.span
                  layoutId="promo-nav-line"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  className={`absolute inset-x-0 bottom-0 h-[2px] ${
                    isDropX ? "bg-[#D5FF39]" : "bg-[#FF2E63]"
                  }`}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
