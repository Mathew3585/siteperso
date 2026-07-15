import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE } from "@/lib/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL(SITE.url),
    alternates: {
      languages: { fr: "/fr", en: "/en" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  const nav = [
    { href: `/${l}`, label: dict.nav.home },
    { href: `/${l}/projects`, label: dict.nav.projects },
    { href: `/${l}/about`, label: dict.nav.about },
    { href: `/${l}/contact`, label: dict.nav.contact },
  ];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(l)};`,
        }}
      />
      <ScrollProgress />
      <Header
        locale={l}
        name={SITE.name}
        nav={nav}
        cvLabel={dict.cta.downloadCv}
        cvHref={SITE.cv[l]}
      />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer locale={l} dict={dict} />
    </>
  );
}
