import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getFeaturedProjects } from "@/content/projects";
import { SITE } from "@/lib/site";
import { Container, ButtonLink, ArrowRight } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { Hero } from "@/components/hero";
import { SpotlightCard } from "@/components/spotlight-card";
import { CtaCard } from "@/components/cta-card";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const featured = getFeaturedProjects();

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <Hero
        locale={l}
        name={SITE.name}
        kicker={dict.hero.kicker}
        lede={dict.hero.lede}
        ctaProjects={dict.cta.viewProjects}
        ctaCv={dict.cta.downloadCv}
        projectsHref={`/${l}/projects`}
        cvHref={SITE.cv[l]}
        portraitSrc="/images/mathew-photo.jpg"
      />

      {/* ---------------- Compétences ---------------- */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">Skills</h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.skills.groups.map((group) => (
              <StaggerItem key={group.label}>
                <SpotlightCard className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40">
                  <h3 className="font-display text-lg uppercase tracking-wide">{group.label}</h3>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ---------------- Projets à la une ---------------- */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl text-foreground sm:text-4xl">Portfolio</h2>
              <ButtonLink href={`/${l}/projects`} variant="ghost" className="hidden shrink-0 sm:inline-flex">
                {dict.cta.viewAll}
                <ArrowRight />
              </ButtonLink>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} locale={l} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------- CTA contact ---------------- */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <CtaCard>
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {dict.homeCta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">{dict.homeCta.subtitle}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href={`/${l}/contact`}>
                  {dict.cta.contact}
                </ButtonLink>
                <ButtonLink href={`/${l}/about`} variant="outline">
                  {dict.nav.about}
                </ButtonLink>
              </div>
            </CtaCard>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
