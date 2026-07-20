"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

const GLOW_W = 520;
const GLOW_H = 320;

/**
 * Carte d'appel à l'action dont la lueur ambrée suit le curseur.
 * Au repos (et si l'utilisateur préfère moins d'animations), la lueur
 * retrouve sa place d'origine : centrée sous le bas de la carte.
 */
export function CtaCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 20, mass: 0.6 });

  const rest = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    x.set(width / 2 - GLOW_W / 2);
    y.set(height - GLOW_H / 2 + 40);
  }, [x, y]);

  useEffect(() => {
    rest();
    window.addEventListener("resize", rest);
    return () => window.removeEventListener("resize", rest);
  }, [rest]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(e.clientX - rect.left - GLOW_W / 2);
    y.set(e.clientY - rect.top - GLOW_H / 2);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={rest}
      className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-12 text-center sm:px-12 sm:py-16"
    >
      <motion.div
        aria-hidden
        style={{
          x: sx,
          y: sy,
          width: GLOW_W,
          height: GLOW_H,
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
        className="pointer-events-none absolute left-0 top-0 rounded-full opacity-25 blur-3xl"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
