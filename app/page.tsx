import Link from "next/link";
import { personal, profiles } from "@/data/profiles";
import { SocialIcons } from "./components/SocialIcons";

export default function Home() {
  const featured = profiles.filter((p) => !p.hiddenOnHQ);

  return (
    <div className="flex flex-col flex-1 items-center w-full">
      <main className="w-full max-w-3xl px-6 sm:px-10 py-20 sm:py-28 flex flex-col gap-16 sm:gap-20">
        <header className="flex flex-col gap-6">
          <div className="text-xs uppercase tracking-[0.18em] text-muted">
            Sam Freeman — HQ
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.05]">
            {personal.name}
          </h1>
          <p className="text-lg text-muted max-w-xl leading-relaxed">
            {personal.intro}
          </p>
          <div className="pt-2">
            <SocialIcons socials={personal.socials} />
          </div>
        </header>

        <section className="flex flex-col gap-3">
          <div className="text-xs uppercase tracking-[0.18em] text-muted mb-2">
            Ventures
          </div>
          <ul className="flex flex-col gap-3">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className="card group block px-6 py-5 sm:px-7 sm:py-6"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-xl sm:text-2xl font-medium tracking-tight">
                          {p.name}
                        </span>
                        {p.children?.length ? (
                          <span className="text-xs text-muted tracking-wide">
                            {p.children.length} {p.children.length === 1 ? "brand" : "brands"}
                          </span>
                        ) : null}
                      </div>
                      <div className="text-sm text-muted leading-relaxed">
                        {p.tagline}
                      </div>
                    </div>
                    <span className="arrow text-muted shrink-0 mt-1.5" aria-hidden>
                      ↗
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <footer className="pt-6 hairline-b border-t border-[var(--hairline)] text-xs text-muted flex items-center justify-between">
          <span>© {new Date().getFullYear()} Sam Freeman</span>
          <span className="font-mono">v0.1</span>
        </footer>
      </main>
    </div>
  );
}
