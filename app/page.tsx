import Image from "next/image";
import Link from "next/link";
import { personal, profiles } from "@/data/profiles";
import { SocialIcons } from "./components/SocialIcons";
import { LogoTile } from "./components/LogoTile";

export default function Home() {
  const featured = profiles.filter((p) => !p.hiddenOnHQ);

  return (
    <div className="flex flex-col flex-1 items-center w-full sm:justify-center">
      <main className="w-full max-w-3xl px-6 sm:px-10 py-8 sm:py-10 flex flex-col gap-5 sm:gap-7">
        {/* Hero: stacked on mobile, side-by-side on desktop */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:gap-7 gap-4 fade-up">
          <div className="avatar-wrap shrink-0">
            <Image
              src="/profile.png"
              alt="Sam Freeman"
              width={256}
              height={256}
              priority
              className="profile-avatar"
            />
            <a
              href="https://www.ucla.edu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="UCLA Alum"
              title="UCLA Alum"
              className="ucla-badge"
            >
              UCLA
            </a>
          </div>
          <div className="flex flex-col gap-2.5 min-w-0 flex-1">
            <div className="label">Sam Freeman HQ</div>
            <h1 className="display text-[40px] sm:text-5xl md:text-[56px] font-medium text-foreground break-words">
              Sam Freeman.
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              {personal.intro}
            </p>
            <div className="pt-1.5 flex flex-wrap items-center gap-2">
              <SocialIcons socials={personal.socials} />
              <Link href="/press" className="press-pill" aria-label="Press features">
                Press
              </Link>
            </div>
          </div>
        </header>

        {/* Ventures */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <div className="label">Ventures</div>
            <div className="label" style={{ color: "var(--subtle)" }}>
              {String(featured.length).padStart(2, "0")} active
            </div>
          </div>
          <ul className="flex flex-col gap-2.5 stagger">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className="card group block px-4 py-3.5 sm:px-5 sm:py-4"
                >
                  <div className="flex items-center gap-4">
                    {p.logo && (
                      <LogoTile logo={p.logo} alt={`${p.name} logo`} size={52} />
                    )}
                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="display text-xl sm:text-2xl font-medium tracking-tight break-words">
                          {p.name}
                        </span>
                        {p.children?.length ? (
                          <span className="label">
                            {String(p.children.length).padStart(2, "0")} {p.childrenLabel ?? (p.children.length === 1 ? "brand" : "brands")}
                          </span>
                        ) : null}
                      </div>
                      <div className="text-sm text-muted leading-snug">
                        {p.tagline}
                      </div>
                    </div>
                    <span className="arrow text-subtle shrink-0" aria-hidden>
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
          className="pt-4 flex items-center justify-between text-xs"
          style={{ borderTop: "1px solid var(--hairline)", color: "var(--subtle)" }}
        >
          <span className="label">© {new Date().getFullYear()} Sam Freeman</span>
          <span className="label">samfreeman.org</span>
        </footer>
      </main>
    </div>
  );
}
