"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import type { Locale } from "@/i18n/config";
import { Magnetic } from "./magnetic";
import { ArrowRight } from "./ui";

interface HeroProps {
  locale: Locale;
  name: string;
  kicker: string;
  lede: string;
  ctaProjects: string;
  ctaCv: string;
  projectsHref: string;
  cvHref: string;
  portraitSrc: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({
  name,
  kicker,
  lede,
  ctaProjects,
  ctaCv,
  projectsHref,
  cvHref,
  portraitSrc,
}: HeroProps) {
  const reduce = useReducedMotion();

  // Position souris normalisée (-0.5 → 0.5)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.5 });
  const smy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.5 });

  // Parallaxe carte photo (translation douce, sans déformation 3D)
  const portraitX = useTransform(smx, [-0.5, 0.5], [10, -10]);
  const portraitY = useTransform(smy, [-0.5, 0.5], [8, -8]);
  // Parallaxe blobs de fond (sens opposé)
  const blobX = useTransform(smx, [-0.5, 0.5], [-30, 30]);
  const blobY = useTransform(smy, [-0.5, 0.5], [-20, 20]);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function resetMouse() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      className="relative overflow-hidden"
    >
      {/* Blobs chauds animés en fond */}
      <motion.div
        aria-hidden
        style={{ x: blobX, y: blobY }}
        className="pointer-events-none absolute -top-24 right-[-6%] h-[460px] w-[460px] rounded-full opacity-50 blur-3xl"
      >
        <div
          className="h-full w-full"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 68%)" }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: blobY, y: blobX }}
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[380px] w-[380px] rounded-full opacity-30 blur-3xl"
      >
        <div
          className="h-full w-full"
          style={{ background: "radial-gradient(circle, var(--wood) 0%, transparent 70%)" }}
        />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-5 pt-16 pb-12 sm:px-8 sm:pt-24 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* Colonne texte */}
        <div className="order-2 lg:order-1">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent sm:text-sm"
          >
            {kicker}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-4 font-display text-[clamp(3.2rem,9vw,6.5rem)] uppercase leading-[0.92] tracking-[0.005em]"
          >
            {name.split(" ").map((word, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-accent">{word}</span> : word}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="mt-6 max-w-md text-lg leading-relaxed text-muted"
          >
            {lede}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link
                href={projectsHref}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
              >
                {ctaProjects}
                <ArrowRight />
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href={cvHref}
                download
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {ctaCv}
              </a>
            </Magnetic>
          </motion.div>

        </div>

        {/* Colonne portrait : carte photo (avec fond) + bloc accent décalé derrière */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <div className="relative aspect-[4/5] w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[400px]">
            {/* Halo chaud flou derrière (profondeur douce, pas une 2e carte) */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2.75rem] opacity-55 blur-2xl"
              style={{ background: "radial-gradient(60% 60% at 60% 40%, var(--accent) 0%, transparent 75%)" }}
            />

            {/* Carte photo (unique) */}
            <motion.div
              style={{ x: portraitX, y: portraitY }}
              className="absolute inset-0 overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_30px_60px_-28px_rgba(60,30,10,0.5)]"
            >
              <Image
                src={portraitSrc}
                alt={name}
                fill
                priority
                sizes="(max-width: 1024px) 340px, 400px"
                className="select-none object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
