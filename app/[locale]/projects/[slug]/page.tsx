import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  categoryLabels,
  getProjectBySlug,
  projects,
} from "@/content/projects";
import { Container, Chip, ButtonLink, ArrowRight } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { Gallery } from "@/components/gallery";
import { youtubeId } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!isLocale(locale) || !project) return {};
  return {
    title: `${project.title} · Mathew Simon`,
    description: project.summary[locale as Locale],
  };
}

const GRADIENTS: Record<string, string> = {
  game: "linear-gradient(135deg, #d98a4e 0%, #b5623a 100%)",
  engine: "linear-gradient(135deg, #a9805a 0%, #6f5238 100%)",
  xr: "linear-gradient(135deg, #cf9b5f 0%, #9c6b3f 100%)",
  ai: "linear-gradient(135deg, #c26b3d 0%, #8a4e2f 100%)",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const gradient = GRADIENTS[project.categories[0]] ?? GRADIENTS.game;

  return (
    <Container className="py-12 sm:py-16">
      <Reveal>
        <ButtonLink href={`/${l}/projects`} variant="ghost" className="px-0">
          <ArrowRight className="rotate-180" />
          {dict.cta.backToProjects}
        </ButtonLink>
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Reveal>
            <div className="mb-4 flex flex-wrap gap-2">
              {project.categories.map((cat) => (
                <span key={cat} className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {categoryLabels[cat][l]}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-muted">{project.summary[l]}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8">
              {project.gallery && project.gallery.length > 0 ? (
                <Gallery
                  images={project.gallery}
                  alt={project.title}
                  video={
                    project.video
                      ? {
                          id: youtubeId(project.video),
                          poster: project.image ?? project.gallery[0],
                        }
                      : undefined
                  }
                />
              ) : project.video ? (
                <YouTubeEmbed
                  id={youtubeId(project.video)}
                  poster={project.image ?? ""}
                  title={project.title}
                />
              ) : project.image ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[16/9] w-full rounded-2xl" style={{ background: gradient }} aria-hidden />
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="prose-scand mt-8 space-y-4">
              {project.description[l].map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-foreground/90">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Panneau infos */}
        <Reveal delay={0.1}>
          <aside className="h-fit rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-24">
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted">{dict.projects.yearLabel}</dt>
                <dd className="mt-1 text-foreground">{project.year}</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted">{dict.projects.roleLabel}</dt>
                <dd className="mt-1 text-foreground">{project.role[l]}</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted">{dict.projects.stackLabel}</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </dd>
              </div>
              {project.links && project.links.length > 0 && (
                <div>
                  <dt className="font-semibold uppercase tracking-wide text-muted">Liens</dt>
                  <dd className="mt-2 flex flex-col gap-1.5">
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        {link.label} ↗
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </Reveal>
      </div>
    </Container>
  );
}
