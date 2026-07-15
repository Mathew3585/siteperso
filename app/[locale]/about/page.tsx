import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { experience, education, skillSet } from "@/content/experience";
import { SITE } from "@/lib/site";
import Image from "next/image";
import { TbStack2, TbBriefcase, TbSchool } from "react-icons/tb";
import { Container, SectionHeader, ButtonLink } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SkillIcon } from "@/components/skill-icon";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <Container className="py-16 sm:py-20">
      {/* En-tête + bio */}
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <SectionHeader eyebrow="About" title={dict.about.title} subtitle={dict.about.subtitle} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/90">
              {dict.about.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={SITE.cv[l]} download>
                {dict.cta.downloadCv}
              </ButtonLink>
              <ButtonLink href={`/${l}/contact`} variant="outline">
                {dict.cta.contact}
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Portrait / bloc décoratif */}
        <Reveal delay={0.15}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
            <Image
              src="/images/mathew-photo.jpg"
              alt={SITE.name}
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display text-2xl uppercase tracking-wide text-white">{SITE.name}</p>
              <p className="mt-1 text-sm text-white/85">{dict.footer.tagline}</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Compétences */}
      <section className="mt-20">
        <Reveal>
          <h2 className="flex items-center gap-2.5 font-display text-2xl">
            <TbStack2 className="h-6 w-6 text-accent" aria-hidden />
            {dict.about.skillsTitle}
          </h2>
        </Reveal>
        <Stagger className="mt-6 grid gap-5 sm:grid-cols-3">
          {skillSet.map((group) => (
            <StaggerItem key={group.label}>
              <div className="h-full rounded-2xl border border-border bg-surface p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">{group.label}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="group inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/60"
                    >
                      <SkillIcon
                        name={item}
                        className="h-[18px] w-[18px] text-accent transition-transform group-hover:scale-110"
                      />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Expérience */}
      <section className="mt-20">
        <Reveal>
          <h2 className="flex items-center gap-2.5 font-display text-2xl">
            <TbBriefcase className="h-6 w-6 text-accent" aria-hidden />
            {dict.about.experienceTitle}
          </h2>
        </Reveal>
        <div className="mt-8 space-y-0">
          {experience.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="relative grid gap-2 border-l border-border py-6 pl-8 sm:grid-cols-[170px_1fr] sm:gap-6 sm:pl-10">
                <span className="absolute left-[-6px] top-8 h-3 w-3 rounded-full border-2 border-background bg-accent" />
                <div className="text-sm font-medium text-muted">
                  {item.period}
                  {item.location && (
                    <span className="mt-1 block text-xs text-muted/80">{item.location[l]}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-lg">
                    {item.role[l]} · <span className="text-accent">{item.company}</span>
                  </h3>
                  {item.contract && (
                    <span className="mt-1 inline-block rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-muted">
                      {item.contract[l]}
                    </span>
                  )}
                  <p className="mt-2.5 leading-relaxed text-muted">{item.description[l]}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Formation */}
      <section className="mt-20">
        <Reveal>
          <h2 className="flex items-center gap-2.5 font-display text-2xl">
            <TbSchool className="h-6 w-6 text-accent" aria-hidden />
            {dict.about.educationTitle}
          </h2>
        </Reveal>
        <div className="mt-8 space-y-0">
          {education.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="relative grid gap-2 border-l border-border py-6 pl-8 sm:grid-cols-[170px_1fr] sm:gap-6 sm:pl-10">
                <span className="absolute left-[-6px] top-8 h-3 w-3 rounded-full border-2 border-background bg-accent" />
                <div className="text-sm font-medium text-muted">{item.period}</div>
                <div>
                  <h3 className="font-display text-lg">{item.school}</h3>
                  <p className="mt-1.5 text-muted">{item.detail[l]}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Container>
  );
}
