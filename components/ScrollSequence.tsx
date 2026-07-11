'use client';

import React, { useEffect, useRef } from 'react';
import { MotionValue } from 'framer-motion';

/**
 * Twinbru-style scroll scrubber: draws pre-rendered webp frames onto a canvas,
 * frame index driven by an external 0→1 MotionValue (our useSectionProgress).
 *
 * Perf rules baked in:
 * - Frame 1 loads immediately (first paint), the rest stream in the background.
 * - On small screens / prefers-reduced-motion only frame 1 is loaded and drawn —
 *   no multi-megabyte sequence on mobile.
 * - Drawing is rAF-throttled; if the exact frame isn't loaded yet, the nearest
 *   loaded one is shown (no flashes).
 */
export default function ScrollSequence({
  progress,
  base,
  count,
  pad = 3,
  className = '',
}: {
  progress: MotionValue<number>;
  base: string; // e.g. '/frames/hero/'
  count: number;
  pad?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isStatic =
      window.matchMedia('(max-width: 767px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    imagesRef.current = new Array(count).fill(null);
    loadedRef.current = new Array(count).fill(false);

    const src = (i: number) => `${base}${String(i + 1).padStart(pad, '0')}.webp`;

    const draw = (idx: number) => {
      // Fall back to the nearest loaded frame at or below idx (or above it).
      let use = idx;
      while (use > 0 && !loadedRef.current[use]) use--;
      if (!loadedRef.current[use]) {
        use = loadedRef.current.findIndex(Boolean);
        if (use === -1) return;
      }
      const img = imagesRef.current[use];
      if (!img) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      // cover-fit
      const scale = Math.max((w * dpr) / img.width, (h * dpr) / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, (w * dpr - dw) / 2, (h * dpr - dh) / 2, dw, dh);
    };

    const load = (i: number, onDone?: () => void) => {
      const img = new Image();
      img.onload = () => {
        imagesRef.current[i] = img;
        loadedRef.current[i] = true;
        onDone?.();
      };
      img.src = src(i);
    };

    // First frame right away…
    load(0, () => draw(frameRef.current));

    if (!isStatic) {
      // …then stream the rest, redrawing when the currently wanted frame lands.
      for (let i = 1; i < count; i++) {
        load(i, () => {
          if (Math.abs(i - frameRef.current) < 3) draw(frameRef.current);
        });
      }
    }

    const schedule = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        draw(frameRef.current);
      });
    };

    const unsub = isStatic
      ? undefined
      : progress.on('change', (v) => {
          const idx = Math.max(0, Math.min(count - 1, Math.round(v * (count - 1))));
          if (idx !== frameRef.current) {
            frameRef.current = idx;
            schedule();
          }
        });

    const onResize = () => schedule();
    window.addEventListener('resize', onResize);

    return () => {
      unsub?.();
      window.removeEventListener('resize', onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [progress, base, count, pad]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
