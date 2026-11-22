"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import type { StoryChapter } from "./promoData";

export function StoryReveal({
  children,
  delay = 0,
  y = 18,
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
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MobileStoryRail({ chapters }: { chapters: StoryChapter[] }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
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
        rootMargin: "-25% 0px -55% 0px",
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
    <div className="sticky top-[58px] z-40 border-b border-white/10 bg-[#050505]/95 backdrop-blur-md md:top-[70px]">
      {/* Thin GPU scroll-progress thread */}
      <div className="h-[2px] w-full bg-white/[0.06]" aria-hidden="true">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-[#FF2E63] via-[#D5FF39] to-[#00F0FF]"
          style={{ scaleX: reduceMotion ? 1 : scaleX }}
        />
      </div>

      {/* Horizontal chapter quick-jump pills for mobile thumb ergonomics */}
      <nav
        aria-label="Разделы страницы акций"
        className="mx-auto flex max-w-[1760px] items-center gap-1.5 overflow-x-auto px-3 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-center md:gap-2 md:px-10"
      >
        {chapters.map((chapter) => {
          const isActive = activeId === chapter.id;
          const isDropX = chapter.id === "dropx";

          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => scrollToChapter(chapter.id)}
              className={`relative shrink-0 rounded-full px-3.5 py-2 font-chakra text-[11px] font-bold uppercase tracking-[0.06em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                isActive
                  ? isDropX
                    ? "text-[#090909]"
                    : "text-[#090909]"
                  : "text-white/65 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="promo-story-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className={`absolute inset-0 -z-10 rounded-full ${
                    isDropX ? "bg-[#D5FF39]" : "bg-[#FF2E63]"
                  }`}
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-1.5">
                {chapter.label}
                {chapter.badge && !isActive && (
                  <span className="rounded bg-[#D5FF39]/20 px-1.5 py-0.5 text-[9px] font-black leading-none text-[#D5FF39]">
                    {chapter.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
