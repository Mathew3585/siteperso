import Link from "next/link";
import { TbMail, TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SITE } from "@/lib/site";
import { navIcon } from "@/lib/nav-icon";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = "2026"; // année du build

  const socials = [
    { href: `mailto:${SITE.email}`, label: "Email", Icon: TbMail, external: false },
    { href: SITE.socials.github, label: "GitHub", Icon: TbBrandGithub, external: true },
    { href: SITE.socials.linkedin, label: "LinkedIn", Icon: TbBrandLinkedin, external: true },
  ];

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Link href={`/${locale}`} className="font-display text-xl uppercase tracking-[0.02em]">
            {SITE.name}
            <span className="text-accent">.</span>
          </Link>
          <p className="mt-2 text-sm text-muted">{dict.footer.tagline}</p>

          {/* Logos réseaux */}
          <div className="mt-5 flex items-center gap-3">
            {socials.map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-5 w-5" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <nav className="flex flex-col gap-2.5 text-sm">
          {navLinks.map((item) => {
            const Icon = navIcon(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-center py-0.5 text-muted transition-colors duration-200 hover:text-accent"
              >
                <span className="pointer-events-none absolute left-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <Icon className="h-4 w-4 text-accent" aria-hidden />
                </span>
                <span className="transition-transform duration-200 group-hover:translate-x-5">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {year} {SITE.name}. {dict.footer.rights}</span>
          <span>{dict.footer.builtWith}</span>
        </div>
      </div>
    </footer>
  );
}
