import Link from "next/link";
import type { Metadata } from "next";
import { press } from "@/data/profiles";
import { Monogram } from "../components/Monogram";

export const metadata: Metadata = {
  title: "Press",
  description: "Press features and interviews with Sam Freeman.",
  openGraph: {
    title: "Press",
    description: "Features and interviews.",
    type: "website",
    siteName: "Sam's HQ",
    url: "https://samfreeman.org/press",
    images: [{ url: "/og/press", width: 1200, height: 630, alt: "Press" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press",
    description: "Features and interviews.",
    images: ["/og/press"],
  },
};

export default function PressPage() {
  const groups = press.filter((g) => g.items.length > 0);

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
            <span style={{ color: "var(--foreground)" }}>Press</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="flex flex-col gap-4 fade-up" style={{ animationDelay: "80ms" }}>
          <h1 className="display text-[36px] sm:text-[44px] md:text-[52px] font-medium text-foreground break-words">
            Press
          </h1>
          <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
            Features and interviews.
          </p>
        </header>

        {/* Groups */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <div className="label">Coverage</div>
            <div className="label" style={{ color: "var(--subtle)" }}>
              {String(groups.length).padStart(2, "0")}
            </div>
          </div>
          <ul className="flex flex-col gap-2.5 stagger">
            {groups.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/press/${g.slug}`}
                  className="card-quiet group block px-4 py-3.5 sm:px-5 sm:py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="display text-xl sm:text-2xl font-medium break-words">
                          {g.title}
                        </span>
                        <span className="label">
                          {String(g.items.length).padStart(2, "0")}{" "}
                          {g.items.length === 1 ? "feature" : "features"}
                        </span>
                      </div>
                      {g.tagline && (
                        <span className="text-sm text-muted leading-snug">
                          {g.tagline}
                        </span>
                      )}
                    </div>
                    <span className="arrow text-subtle shrink-0" aria-hidden>↗</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer
          className="pt-4 flex items-center justify-between text-xs"
          style={{ borderTop: "1px solid var(--hairline)", color: "var(--subtle)" }}
        >
          <Link href="/" className="label hover:text-foreground transition-colors">
            ← Back to HQ
          </Link>
          <span className="label">press</span>
        </footer>
      </main>
    </div>
  );
}
