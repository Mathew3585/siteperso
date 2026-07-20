"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { Locale } from "@/i18n/config";
import { categoryLabels, type Project } from "@/content/projects";
import { Chip } from "./ui";

// Dégradés chauds déterministes (bois / ambre) en attendant les vraies vignettes.
const GRADIENTS: Record<string, string> = {
  game: "linear-gradient(135deg, #d98a4e 0%, #b5623a 100%)",
  engine: "linear-gradient(135deg, #a9805a 0%, #6f5238 100%)",
  xr: "linear-gradient(135deg, #cf9b5f 0%, #9c6b3f 100%)",
  ai: "linear-gradient(135deg, #c26b3d 0%, #8a4e2f 100%)",
  hardware: "linear-gradient(135deg, #b98a5e 0%, #6b4a30 100%)",
  app: "linear-gradient(135deg, #d0956a 0%, #9c5f38 100%)",
};

export function ProjectCard({
  project,
  locale,
  index = 0,
}: {
  project: Project;
  locale: Locale;
  index?: number;
}) {
  const primary = project.categories[0];
  const gradient = GRADIENTS[primary] ?? GRADIENTS.game;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <Link
        href={`/${locale}/projects/${project.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-24px_rgba(120,80,40,0.5)]"
      >
        {/* Vignette */}
        <div
          className="relative aspect-[16/10] overflow-hidden"
          style={project.image ? undefined : { background: gradient }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_20%_20%,#fff_0,transparent_40%)]" />
          )}
          {/* Voile pour la lisibilité du titre */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {project.year}
          </span>
          <span className="absolute bottom-4 left-4 right-4 font-display text-2xl text-white transition-transform duration-300 group-hover:translate-x-1">
            {project.title}
          </span>
        </div>

        {/* Contenu */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.categories.map((cat) => (
              <span key={cat} className="text-xs font-semibold uppercase tracking-wide text-accent">
                {categoryLabels[cat][locale]}
              </span>
            ))}
          </div>
          <p className="flex-1 text-sm leading-relaxed text-muted">{project.summary[locale]}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
