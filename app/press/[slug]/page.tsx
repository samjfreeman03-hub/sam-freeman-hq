import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { press, findPressGroup } from "@/data/profiles";
import { Monogram } from "../../components/Monogram";

export function generateStaticParams() {
  return press.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const group = findPressGroup(slug);
  if (!group) return { title: "Not found" };
  const desc = group.tagline ?? `${group.title} press features.`;
  const ogUrl = `/og/press/${group.slug}`;
  return {
    title: `${group.title} Press`,
    description: desc,
    openGraph: {
      title: `${group.title} Press`,
      description: desc,
      type: "website",
      siteName: "Sam's HQ",
      url: `https://samfreeman.org/press/${group.slug}`,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: `${group.title} Press` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${group.title} Press`,
      description: desc,
      images: [ogUrl],
    },
  };
}

export default async function PressGroupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const group = findPressGroup(slug);
  if (!group) notFound();

  return (
    <div className="flex flex-col flex-1 items-center w-full sm:justify-center">
      <main className="w-full max-w-3xl px-6 sm:px-10 py-8 sm:py-10 flex flex-col gap-5 sm:gap-7">
        {/* Top bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 fade-up">
          <Monogram />
          <nav className="label flex items-center gap-2 flex-wrap min-w-0" aria-label="Breadcrumb">
            <Link href="/" style={{ color: "var(--muted)" }} className="hover:text-foreground transition-colors">
              HQ
            </Link>
            <span aria-hidden style={{ color: "var(--subtle)" }}>·</span>
            <Link href="/press" style={{ color: "var(--muted)" }} className="hover:text-foreground transition-colors">
              Press
            </Link>
            <span aria-hidden style={{ color: "var(--subtle)" }}>·</span>
            <span style={{ color: "var(--foreground)" }}>{group.title}</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="flex flex-col gap-4 fade-up" style={{ animationDelay: "80ms" }}>
          <h1 className="display text-[36px] sm:text-[44px] md:text-[52px] font-medium text-foreground break-words">
            {group.title}
          </h1>
          {group.tagline && (
            <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
              {group.tagline}
            </p>
          )}
        </header>

        {/* Features */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <div className="label">Features</div>
            <div className="label" style={{ color: "var(--subtle)" }}>
              {String(group.items.length).padStart(2, "0")}
            </div>
          </div>
          <ul className="flex flex-col gap-2.5 stagger">
            {group.items.map((p) => (
              <li key={p.href}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-quiet group flex items-center gap-4 px-4 py-3 sm:px-5 sm:py-3.5"
                >
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="text-sm sm:text-base font-medium break-words">
                      {p.label}
                    </span>
                    {p.note && (
                      <span className="text-xs text-muted break-words">{p.note}</span>
                    )}
                  </div>
                  <span className="arrow text-subtle shrink-0" aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer
          className="pt-4 flex items-center justify-between text-xs"
          style={{ borderTop: "1px solid var(--hairline)", color: "var(--subtle)" }}
        >
          <Link href="/press" className="label hover:text-foreground transition-colors">
            ← Back to Press
          </Link>
          <span className="label">{group.slug}</span>
        </footer>
      </main>
    </div>
  );
}
