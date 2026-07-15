"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LangSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  function pathFor(locale: Locale): string {
    const segments = pathname.split("/");
    // segments[0] = "" ; segments[1] = locale actuel
    if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = locale;
    } else {
      return `/${locale}`;
    }
    return segments.join("/") || `/${locale}`;
  }

  return (
    <div className="inline-flex items-center rounded-full border border-border p-0.5 text-xs font-medium">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={pathFor(locale)}
          aria-current={locale === current ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
            locale === current
              ? "bg-accent text-white"
              : "text-muted hover:text-accent"
          )}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
