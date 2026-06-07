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
  const desc = profile.description ?? profile.tagline;
  const ogUrl = `/og/${slug.join("/")}`;
  return {
    title: profile.name,
    description: desc,
    openGraph: {
      title: profile.name,
      description: desc,
      type: "website",
      siteName: "Sam's HQ",
      url: `https://samfreeman.org/${slug.join("/")}`,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: profile.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: profile.name,
      description: desc,
      images: [ogUrl],
    },
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
      <main className="w-full max-w-3xl px-6 sm:px-10 py-8 sm:py-10 flex flex-col gap-5 sm:gap-7">
        {/* Top bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 fade-up">
          <Monogram />
          <nav className="label flex items-center gap-2 flex-wrap min-w-0" aria-label="Breadcrumb">
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
        <header className="flex flex-col gap-4 fade-up" style={{ animationDelay: "80ms" }}>
          {profile.logo && (
            <LogoTile
              logo={profile.logo}
              alt={`${profile.name} logo`}
              size={72}
              className="logo-tile-hero"
            />
          )}
          <h1 className="display text-[36px] sm:text-[44px] md:text-[52px] font-medium text-foreground break-words">
            {profile.name}
          </h1>
          <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
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
          <section className="flex flex-col gap-2.5">
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
                    <Link href={childPath} className="card-quiet group block px-4 py-3.5 sm:px-5 sm:py-4">
                      <div className="flex items-center gap-4">
                        {c.logo && (
                          <LogoTile logo={c.logo} alt={`${c.name} logo`} size={48} />
                        )}
                        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                          <span className="display text-xl sm:text-2xl font-medium break-words">
                            {c.name}
                          </span>
                          <span className="text-sm text-muted leading-snug">
                            {c.tagline}
                          </span>
                        </div>
                        <span className="arrow text-subtle shrink-0" aria-hidden>↗</span>
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
            className="flex flex-col gap-2.5"
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
                    className="card-quiet group flex items-center justify-between gap-4 px-4 py-3 sm:px-5 sm:py-3.5"
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-sm sm:text-base font-medium break-words">{r.label}</span>
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
          className="pt-4 flex items-center justify-between text-xs"
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
