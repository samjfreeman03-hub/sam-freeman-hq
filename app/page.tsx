import Image from "next/image";
import Link from "next/link";
import { personal, profiles } from "@/data/profiles";
import { SocialIcons } from "./components/SocialIcons";
import { Monogram } from "./components/Monogram";
import { UCLAPill } from "./components/UCLAPill";

export default function Home() {
  const featured = profiles.filter((p) => !p.hiddenOnHQ);

  return (
    <div className="flex flex-col flex-1 items-center w-full">
      <main className="w-full max-w-3xl px-6 sm:px-10 py-12 sm:py-16 flex flex-col gap-20 sm:gap-24">
        {/* Top bar */}
        <div className="flex items-center justify-between fade-up">
          <Monogram />
        </div>

        {/* Hero */}
        <header className="flex flex-col gap-7 fade-up" style={{ animationDelay: "80ms" }}>
          <div className="flex flex-col gap-5">
            <Image
              src="/profile.png"
              alt="Sam Freeman"
              width={256}
              height={256}
              priority
              className="profile-avatar"
            />
            <div className="label">Sam Freeman — HQ</div>
          </div>
          <h1 className="display text-[44px] sm:text-6xl md:text-7xl font-medium text-foreground break-words">
            Sam Freeman.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted max-w-xl leading-relaxed">
            {personal.intro}
          </p>
          <div className="pt-3 flex flex-wrap items-center gap-2">
            <SocialIcons socials={personal.socials} />
            <UCLAPill />
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
                  <div className="flex items-start justify-between gap-4 sm:gap-6">
                    <div className="flex flex-col gap-2 min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="display text-2xl sm:text-3xl font-medium tracking-tight break-words">
                          {p.name}
                        </span>
                        {p.children?.length ? (
                          <span className="label">
                            {String(p.children.length).padStart(2, "0")} {p.childrenLabel ?? (p.children.length === 1 ? "brand" : "brands")}
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
