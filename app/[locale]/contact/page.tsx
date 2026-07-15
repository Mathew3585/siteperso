import { notFound } from "next/navigation";
import { TbMail, TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE } from "@/lib/site";
import { Container, SectionHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";

export default async function ContactPage({
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
        <SectionHeader eyebrow="Contact" title={dict.contact.title} subtitle={dict.contact.subtitle} />
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Formulaire */}
        <Reveal delay={0.05}>
          <ContactForm t={dict.contact.form} />
        </Reveal>

        {/* Contact direct */}
        <Reveal delay={0.12}>
          <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
              {dict.contact.directTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-center gap-3 text-sm text-foreground transition-colors hover:text-accent"
                >
                  <TbMail className="h-5 w-5 text-accent" aria-hidden />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-foreground transition-colors hover:text-accent"
                >
                  <TbBrandGithub className="h-5 w-5 text-accent" aria-hidden />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={SITE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-foreground transition-colors hover:text-accent"
                >
                  <TbBrandLinkedin className="h-5 w-5 text-accent" aria-hidden />
                  LinkedIn
                </a>
              </li>
            </ul>
          </aside>
        </Reveal>
      </div>
    </Container>
  );
}
