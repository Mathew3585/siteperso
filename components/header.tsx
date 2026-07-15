"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { navIcon } from "@/lib/nav-icon";
import { LangSwitcher } from "./lang-switcher";
import { ThemeToggle } from "./theme-toggle";

interface NavItem {
  href: string;
  label: string;
}

interface HeaderProps {
  locale: Locale;
  name: string;
  nav: NavItem[];
  cvLabel: string;
  cvHref: string;
}

export function Header({ locale, name, nav, cvLabel, cvHref }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === `/${locale}`) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href={`/${locale}`}
          className="font-display text-xl uppercase tracking-[0.02em]"
          onClick={() => setOpen(false)}
        >
          {name}
          <span className="text-accent">.</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const Icon = navIcon(item.href);
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center rounded-full py-1.5 text-sm transition-colors",
                  active ? "pl-8 pr-3.5 text-foreground" : "px-3.5 text-muted hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none absolute left-2.5 flex items-center transition-opacity duration-200",
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )}
                >
                  <Icon className="h-4 w-4 text-accent" aria-hidden />
                </span>
                <span
                  className={cn(
                    "transition-transform duration-200",
                    active ? "" : "group-hover:translate-x-4"
                  )}
                >
                  {item.label}
                </span>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-accent-soft"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LangSwitcher current={locale} />
          </div>
          <ThemeToggle />
          <a
            href={cvHref}
            download
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-strong sm:inline-block"
          >
            {cvLabel}
          </a>

          {/* Burger mobile */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {nav.map((item) => {
                const Icon = navIcon(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-base transition-colors",
                      isActive(item.href)
                        ? "bg-accent-soft text-foreground"
                        : "text-muted hover:bg-surface"
                    )}
                  >
                    <Icon className="h-5 w-5 text-accent" aria-hidden />
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-3 flex items-center justify-between">
                <LangSwitcher current={locale} />
                <a
                  href={cvHref}
                  download
                  className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white"
                >
                  {cvLabel}
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
