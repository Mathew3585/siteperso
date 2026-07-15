import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projects } from "@/content/projects";
import { Container, SectionHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ProjectsGrid } from "@/components/projects-grid";

export default async function ProjectsPage({
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
      <Reveal>
        <SectionHeader eyebrow="Portfolio" title={dict.projects.title} subtitle={dict.projects.subtitle} />
      </Reveal>
      <div className="mt-10">
        <ProjectsGrid
          projects={projects}
          locale={l}
          allLabel={dict.projects.all}
          emptyLabel={dict.projects.empty}
        />
      </div>
    </Container>
  );
}
