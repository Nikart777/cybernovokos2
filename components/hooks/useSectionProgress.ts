"use client";

import { RefObject, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * Returns a spring-smoothed 0→1 progress for how far a (taller-than-viewport)
 * pinned section has been scrolled through. Driven by a plain scroll listener +
 * getBoundingClientRect — framer's own useScroll proved unreliable on this site.
 */
export function useSectionProgress(ref: RefObject<HTMLElement>) {
    const progress = useMotionValue(0);
    const smooth = useSpring(progress, { damping: 30, stiffness: 180, mass: 0.5 });

    useEffect(() => {
        const onScroll = () => {
            const el = ref.current;
            if (!el) return;
            const total = el.offsetHeight - window.innerHeight;
            const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(total, 0));
            progress.set(total > 0 ? scrolled / total : 0);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [ref, progress]);

    return smooth;
}
