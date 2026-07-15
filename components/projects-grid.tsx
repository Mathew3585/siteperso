"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Locale } from "@/i18n/config";
import {
  categoryLabels,
  type Project,
  type ProjectCategory,
} from "@/content/projects";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";

const CATEGORIES: ProjectCategory[] = ["game", "engine", "xr", "ai"];

export function ProjectsGrid({
  projects,
  locale,
  allLabel,
  emptyLabel,
}: {
  projects: Project[];
  locale: Locale;
  allLabel: string;
  emptyLabel: string;
}) {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const available = CATEGORIES.filter((cat) =>
    projects.some((p) => p.categories.includes(cat))
  );
  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(filter));

  return (
    <div>
      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
          {allLabel}
        </FilterButton>
        {available.map((cat) => (
          <FilterButton key={cat} active={filter === cat} onClick={() => setFilter(cat)}>
            {categoryLabels[cat][locale]}
          </FilterButton>
        ))}
      </div>

      {/* Grille */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div key={project.slug} layout exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.2 }}>
              <ProjectCard project={project} locale={locale} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-muted">{emptyLabel}</p>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-accent bg-accent text-white"
          : "border-border text-muted hover:border-accent hover:text-accent"
      )}
    >
      {children}
    </button>
  );
}
