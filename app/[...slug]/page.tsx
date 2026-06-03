import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  allProfilePaths,
  findProfile,
  getAncestors,
} from "@/data/profiles";
import { SocialIcons } from "../components/SocialIcons";

export function generateStaticParams() {
  return allProfilePaths().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  const profile = findProfile(slug);
  if (!profile) return { title: "Not found" };
  return {
    title: `${profile.name} — Sam Freeman HQ`,
    description: profile.description ?? profile.tagline,
  };
}

export default async function ProfilePage({ params }: PageProps<"/[...slug]">) {
  const { slug } = await params;
  const profile = findProfile(slug);
  if (!profile) notFound();

  const ancestors = getAncestors(slug);
  const hasResources = profile.resources.length > 0;
  const hasChildren = (profile.children?.length ?? 0) > 0;

  return (
    <div className="flex flex-col flex-1 items-center w-full">
      <main className="w-full max-w-3xl px-6 sm:px-10 py-16 sm:py-20 flex flex-col gap-14">
        <nav className="text-xs uppercase tracking-[0.18em] text-muted flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">
            HQ
          </Link>
          {ancestors.map((a, i) => {
            const href = "/" + slug.slice(0, i + 1).join("/");
            return (
              <span key={a.slug} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                <Link href={href} className="hover:text-foreground transition-colors">
                  {a.name}
                </Link>
              </span>
            );
          })}
          <span aria-hidden>/</span>
          <span className="text-foreground">{profile.name}</span>
        </nav>

        <header className="flex flex-col gap-5">
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.05]">
            {profile.name}
          </h1>
          <p className="text-lg text-muted max-w-xl leading-relaxed">
            {profile.description ?? profile.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {profile.website && (
              <a
                href={profile.website.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow inline-flex items-center gap-1.5 text-sm font-medium border-b border-[var(--hairline-strong)] pb-0.5 hover:border-foreground transition-colors"
              >
                {profile.website.label}
                <span className="arrow" aria-hidden>↗</span>
              </a>
            )}
            <SocialIcons socials={profile.socials} />
          </div>
        </header>

        {hasChildren && (
          <section className="flex flex-col gap-3">
            <div className="text-xs uppercase tracking-[0.18em] text-muted mb-2">
              Brands
            </div>
            <ul className="flex flex-col gap-3">
              {profile.children!.map((c) => {
                const childPath = "/" + [...slug, c.slug].join("/");
                return (
                  <li key={c.slug}>
                    <Link href={childPath} className="card group block px-6 py-5">
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex flex-col gap-1 min-w-0">
                          <span className="text-lg font-medium tracking-tight">
                            {c.name}
                          </span>
                          <span className="text-sm text-muted leading-relaxed">
                            {c.tagline}
                          </span>
                        </div>
                        <span className="arrow text-muted shrink-0 mt-1" aria-hidden>↗</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {hasResources && (
          <section className="flex flex-col gap-3">
            <div className="text-xs uppercase tracking-[0.18em] text-muted mb-2">
              Resources
            </div>
            <ul className="flex flex-col gap-2">
              {profile.resources.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card group flex items-center justify-between gap-6 px-5 py-4"
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-base font-medium">{r.label}</span>
                      {r.note && (
                        <span className="text-xs text-muted">{r.note}</span>
                      )}
                    </div>
                    <span className="arrow text-muted shrink-0" aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="pt-6 border-t border-[var(--hairline)] text-xs text-muted flex items-center justify-between">
          <Link href="/" className="hover:text-foreground transition-colors">
            ← Back to HQ
          </Link>
          <span className="font-mono">{profile.slug}</span>
        </footer>
      </main>
    </div>
  );
}
