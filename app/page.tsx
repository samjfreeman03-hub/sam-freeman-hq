import Link from "next/link";
import { personal, profiles } from "@/data/profiles";
import { SocialIcons } from "./components/SocialIcons";
import { Monogram } from "./components/Monogram";

export default function Home() {
  const featured = profiles.filter((p) => !p.hiddenOnHQ);

  return (
    <div className="flex flex-col flex-1 items-center w-full">
      <main className="w-full max-w-3xl px-6 sm:px-10 py-12 sm:py-16 flex flex-col gap-20 sm:gap-24">
        {/* Top bar */}
        <div className="flex items-center justify-between fade-up">
          <Monogram />
          <div className="flex items-center gap-2">
            <span className="status-dot" aria-hidden />
            <span className="label" style={{ color: "var(--foreground)" }}>Live</span>
          </div>
        </div>

        {/* Hero */}
        <header className="flex flex-col gap-7 fade-up" style={{ animationDelay: "80ms" }}>
          <div className="label">Sam Freeman — HQ</div>
          <h1 className="display text-6xl sm:text-7xl font-medium text-foreground">
            Sam Freeman.
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-xl leading-relaxed">
            {personal.intro}
          </p>
          <div className="pt-3">
            <SocialIcons socials={personal.socials} />
          </div>
        </header>

        {/* Ventures */}
        <section className="flex flex-col gap-5">
          <div className="flex items-baseline justify-between">
            <div className="label">Ventures</div>
            <div className="label" style={{ color: "var(--subtle)" }}>
              {String(featured.length).padStart(2, "0")} active
            </div>
          </div>
          <ul className="flex flex-col gap-3 stagger">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className="card group block px-6 py-6 sm:px-8 sm:py-7"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex flex-col gap-2 min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="display text-2xl sm:text-3xl font-medium tracking-tight">
                          {p.name}
                        </span>
                        {p.children?.length ? (
                          <span className="label">
                            {String(p.children.length).padStart(2, "0")} {p.children.length === 1 ? "brand" : "brands"}
                          </span>
                        ) : null}
                      </div>
                      <div className="text-base text-muted leading-relaxed">
                        {p.tagline}
                      </div>
                    </div>
                    <span className="arrow text-subtle shrink-0 mt-2 text-lg" aria-hidden>
                      ↗
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer
          className="pt-8 mt-4 flex items-center justify-between text-xs"
          style={{ borderTop: "1px solid var(--hairline)", color: "var(--subtle)" }}
        >
          <span className="label">© {new Date().getFullYear()} Sam Freeman</span>
          <span className="label">samfreeman.org</span>
        </footer>
      </main>
    </div>
  );
}
