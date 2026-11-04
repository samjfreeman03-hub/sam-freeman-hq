@AGENTS.md

# Sam HQ (samfreeman.org): Project Context for Claude

This file is the canonical context for working on this codebase. Read it first.
When unsure, check `data/profiles.ts` and the route files in `app/`. Code wins over docs.

---

## 1. What This Is

**Sam HQ** is Sam Freeman's personal landing page and hub at **samfreeman.org**. It is a
link-in-bio style site with real business content: a hero (photo, UCLA Alum pill, socials,
Press pill), then a "Ventures" list of four cards, each opening a nested profile page with
description, website, socials, an optional CTA button, child brands, and resource groups
(decks, case studies, products, best events). Press coverage lives at `/press`.

The four ventures, in display order: **FLAIR** (college, next-gen, and culture marketing;
parent of CampusLink, FLAIR Marketing Agency, FLAIR Special Projects), **MTRNM** (global
house music events), **Stealth Labs** (AI infrastructure; currently raising), **TechSpace**
(curated events for startups, VCs, and family offices).

## 2. Current Status

- **Live** at samfreeman.org (per `metadataBase` in `app/layout.tsx`). Working tree is clean
  and `main` matches `origin/main` (GitHub `samjfreeman03-hub/sam-freeman-hq`).
- **Last change:** 2026-10-06, commit `cf9b720`, added the Cesme, Turkey event (3,000 people
  with &ME / Keinemusik) to MTRNM "Our Best Events". Same day: TechSpace added as the fourth
  venture, Stealth Labs logo changed to bolt only.
- **History (inferred from git log, 50 commits, 2026-06-03 to 2026-10-06):** built in one day
  on June 3 (landing + nested profile routes, logo tiles, OG images, spacing passes), then
  June additions (Price Errors app, per-page OG), July (Vetra AI product, Stealth Labs raise
  CTA, site-wide em dash audit, Press section and `/press` pages), August (CTA pointed at the
  investor deck PDF), October (TechSpace, Cesme event).
- **Next:** nothing recorded. README is still the create-next-app boilerplate.

## 3. Tech Stack

- **Framework:** Next.js 16.2.7 (App Router), React 19.2.4, TypeScript 5
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`, tokens in `app/globals.css`
  (`--background #f7f6f3`, `--foreground #111111`, `--muted`, `--subtle`, `--hairline`)
- **Fonts:** Geist Sans + Geist Mono via `next/font/google`
- **Images:** `next/og` `ImageResponse` for OG images and favicons; `next/image` for photos
- No database, no API routes besides OG, no auth, no analytics, no other dependencies.

## 4. Site Map and Content Model

All content is one TypeScript file: **`data/profiles.ts`**. No CMS, no markdown.

| Route | File | Content source |
| --- | --- | --- |
| `/` | `app/page.tsx` | `personal` (intro, socials) + `profiles` without `hiddenOnHQ` |
| `/[...slug]` | `app/[...slug]/page.tsx` | `findProfile(slug)` walks the `profiles` tree |
| `/press` | `app/press/page.tsx` | `press` groups with at least one item |
| `/press/[slug]` | `app/press/[slug]/page.tsx` | `findPressGroup(slug)` |
| `/og/[...path]` | `app/og/[...path]/route.tsx` | 1200x630 PNG per profile and press page |
| `/opengraph-image`, `/icon`, `/apple-icon` | `app/*.tsx` | Static HQ-level images |

**Profile tree.** `profiles: Profile[]` is nested via `children`. URL path = slug chain, e.g.
`/flair/special-projects/price-errors`. Current tree: `flair` > (`marketing` >
`flair-marketing`, `next-gen`; `campuslink`; `special-projects` > `concierge`, `wholesale`,
`price-errors`), `mtrnm`, `stealth-labs`, `techspace`. `childrenLabel` sets the section
heading ("subsidiaries", "practices", "projects"; default "brands").

**Profile fields:** `slug`, `name`, `tagline` (card + OG), `description` (hero; falls back to
tagline), `website`, `cta` (hero button), `socials` (`instagram | linkedin | twitter |
soundcloud | youtube | tiktok | email`), `logo` (`src`, `bg`, `padding?`, `radius?`),
`resources: ResourceGroup[]`, `children?`, `hiddenOnHQ?`.

**Resource groups** render as titled card lists. An untitled group shows as "Resources".
Groups with zero items are skipped, so `resources: []` is fine. Items: `label`, `href`,
`note?`, `logo?` (used by Vetra AI under Stealth Labs "Our Products").

**How to add an MTRNM event:** append `{ label, href, note? }` to the `items` array of the
`"Our Best Events"` group under the `mtrnm` profile. Order in the array is display order.

**How to add a venture:** add a `Profile` object to `profiles`, drop a logo in
`public/logos/`, set `logo.bg` to the logo's native background color. Routes and OG images
are generated from the tree automatically; no route code changes needed.

**How to add press:** add an item to an existing group in `press`, or a new `PressGroup`
(`slug`, `title`, `tagline?`, `items`) which gets its own `/press/<slug>` page.

## 5. Architecture and Key Files

- `data/profiles.ts`: types, all content, and helpers `findProfile`, `getAncestors`,
  `allProfilePaths`, `findPressGroup`. `allProfilePaths` feeds `generateStaticParams`, so
  every profile page and OG image is prerendered at build time.
- `app/layout.tsx`: root metadata (title "Sam's HQ", `metadataBase`, OG and Twitter defaults).
- `app/components/`: `LogoTile` (logo on a colored tile), `Monogram` ("SF" home link),
  `SocialIcons` (inline SVG per `SocialKind`).
- `app/globals.css`: all custom classes (`card`, `card-quiet`, `label`, `display`, `cta-button`,
  `press-pill`, `ucla-badge`, `fade-up`, `stagger`). Styling is tokens + utilities, no CSS modules.
- `public/`: `profile.png` (hero, 2.2 MB), `logos/` (7 brand logos), `stealth-labs-investor-deck.pdf`
  (4.2 MB, target of the Stealth Labs CTA), plus unreferenced create-next-app SVGs.

## 6. Common Commands

```
npm run dev        # local dev on http://localhost:3000
npm run build      # production build, also validates all static params
npm start          # serve the production build
npx tsc --noEmit   # typecheck (no lint or test scripts are defined)
```

## 7. Deploy

Vercel, project name `sam-freeman-hq` (from `package.json`). `.vercel/` is gitignored and not
present locally, there is no `vercel.json`, and the README is boilerplate, so whether pushes
to `main` auto-deploy could not be verified from the repo. Assume the standard Vercel Git
integration (push to `main` deploys) until confirmed in the Vercel dashboard.

## 8. Environment Variables

None. No `.env*` files exist and nothing reads `process.env`.

## 9. Gotchas and Hard-Won Learnings

- **Next.js 16.** Conventions differ from Next 14/15. `params` is a Promise and must be
  awaited. `app/[...slug]/page.tsx` uses the global `PageProps<"/[...slug]">` helper type.
  Read `node_modules/next/dist/docs/` before writing new route code.
- **Em dashes were audited out site-wide** (commits `2df1012`, `02d4858`). Do not reintroduce
  them in `data/profiles.ts` copy. Curly quotes and accented characters (Çeşme) are fine.
- **OG images:** an earlier query-string approach forced the route dynamic (inferred from
  commits `e6b186b`, `40906c6`); it was replaced by the `/og/[...path]` catch-all so each page
  gets its own statically generated, cacheable image. Link previews on social platforms are
  cached by the platform, so an updated OG image may not show until their cache expires.
- **Logo tiles:** `logo.bg` must match the logo file's own background or the tile shows a
  visible letterbox. Use `padding` for logos that need breathing room, `radius: "9999px"`
  for circular marks (Vetra).
- **Commit `cf9b720`** has the Co-Authored-By trailer in the subject line. Put trailers on
  their own line after a blank line.

## 10. Working Conventions

- When you learn something non-obvious about this project, add it to this file.
- Never commit `.env` files or paste secret values anywhere, including this file.
- No em dashes in written output or site copy; use commas or periods.
- Content changes go in `data/profiles.ts` only. Touch route files for layout changes only.
- Run `npm run build` before pushing; it catches bad slugs and type errors in the data tree.
