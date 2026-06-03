import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  allProfilePaths,
  findProfile,
  getAncestors,
} from "@/data/profiles";
import { SocialIcons } from "../components/SocialIcons";
import { Monogram } from "../components/Monogram";
import { LogoTile } from "../components/LogoTile";

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
  const resourceGroups = profile.resources.filter((g) => g.items.length > 0);
  const hasChildren = (profile.children?.length ?? 0) > 0;

  return (
    <div className="flex flex-col flex-1 items-center w-full">
      <main className="w-full max-w-3xl px-6 sm:px-10 py-12 sm:py-16 flex flex-col gap-16">
        {/* Top bar */}
        <div className="flex items-center justify-between fade-up">
          <Monogram />
          <nav className="label flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" style={{ color: "var(--muted)" }} className="hover:text-foreground transition-colors">
              HQ
            </Link>
            {ancestors.map((a, i) => {
              const href = "/" + slug.slice(0, i + 1).join("/");
              return (
                <span key={a.slug} className="flex items-center gap-2">
                  <span aria-hidden style={{ color: "var(--subtle)" }}>·</span>
                  <Link href={href} style={{ color: "var(--muted)" }} className="hover:text-foreground transition-colors">
                    {a.name}
                  </Link>
                </span>
              );
            })}
            <span aria-hidden style={{ color: "var(--subtle)" }}>·</span>
            <span style={{ color: "var(--foreground)" }}>{profile.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="flex flex-col gap-6 fade-up" style={{ animationDelay: "80ms" }}>
          {profile.logo && (
            <LogoTile
              logo={profile.logo}
              alt={`${profile.name} logo`}
              size={88}
              className="logo-tile-hero"
            />
          )}
          <h1 className="display text-[38px] sm:text-5xl md:text-6xl font-medium text-foreground break-words">
            {profile.name}
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
            {profile.description ?? profile.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {profile.website && (
              <a
                href={profile.website.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow inline-flex items-center gap-1.5 text-sm font-medium"
                style={{
                  borderBottom: "1px solid var(--hairline-strong)",
                  paddingBottom: "2px",
                }}
              >
                {profile.website.label}
                <span className="arrow" aria-hidden>↗</span>
              </a>
            )}
            {profile.socials.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <SocialIcons socials={profile.socials} />
              </div>
            )}
          </div>
        </header>

        {hasChildren && (
          <section className="flex flex-col gap-5">
            <div className="flex items-baseline justify-between">
              <div className="label">{profile.childrenLabel ?? "Brands"}</div>
              <div className="label" style={{ color: "var(--subtle)" }}>
                {String(profile.children!.length).padStart(2, "0")}
              </div>
            </div>
            <ul className="flex flex-col gap-3 stagger">
              {profile.children!.map((c) => {
                const childPath = "/" + [...slug, c.slug].join("/");
                return (
                  <li key={c.slug}>
                    <Link href={childPath} className="card-quiet group block px-5 py-5 sm:px-6">
                      <div className="flex items-start justify-between gap-4 sm:gap-6">
                        <div className="flex flex-col gap-1 min-w-0">
                          <span className="display text-xl sm:text-2xl font-medium break-words">
                            {c.name}
                          </span>
                          <span className="text-sm text-muted leading-relaxed">
                            {c.tagline}
                          </span>
                        </div>
                        <span className="arrow text-subtle shrink-0 mt-1.5" aria-hidden>↗</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {resourceGroups.map((group, idx) => (
          <section
            key={group.title ?? `group-${idx}`}
            className="flex flex-col gap-5"
          >
            <div className="flex items-baseline justify-between">
              <div className="label">{group.title ?? "Resources"}</div>
              <div className="label" style={{ color: "var(--subtle)" }}>
                {String(group.items.length).padStart(2, "0")}
              </div>
            </div>
            <ul className="flex flex-col gap-2 stagger">
              {group.items.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-quiet group flex items-center justify-between gap-4 sm:gap-6 px-5 py-4"
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-base font-medium break-words">{r.label}</span>
                      {r.note && (
                        <span className="text-xs text-muted break-words">{r.note}</span>
                      )}
                    </div>
                    <span className="arrow text-subtle shrink-0" aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <footer
          className="pt-8 mt-4 flex items-center justify-between text-xs"
          style={{ borderTop: "1px solid var(--hairline)", color: "var(--subtle)" }}
        >
          <Link href="/" className="label hover:text-foreground transition-colors">
            ← Back to HQ
          </Link>
          <span className="label">{profile.slug}</span>
        </footer>
      </main>
    </div>
  );
}
