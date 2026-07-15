import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-1 flex-col items-center justify-center px-6 text-center">
      <span className="font-display text-7xl font-semibold text-accent">404</span>
      <h1 className="mt-4 font-display text-2xl font-semibold">Page introuvable / Not found</h1>
      <p className="mt-2 max-w-md text-muted">
        Cette page n&apos;existe pas ou a été déplacée. · This page doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/fr"
        className="mt-8 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
      >
        Accueil / Home
      </Link>
    </div>
  );
}
