export type SocialKind =
  | "instagram"
  | "linkedin"
  | "twitter"
  | "soundcloud"
  | "youtube"
  | "tiktok"
  | "email";

export type Social = {
  kind: SocialKind;
  href: string;
  label?: string;
};

export type Resource = {
  label: string;
  href: string;
  note?: string;
};

export type Profile = {
  slug: string;
  name: string;
  shortName?: string;
  tagline: string;
  description?: string;
  website?: { label: string; href: string };
  socials: Social[];
  resources: Resource[];
  children?: Profile[];
  hiddenOnHQ?: boolean;
};

export const personal = {
  name: "Sam Freeman",
  intro: "Building across music, marketing, and AI.",
  socials: [
    { kind: "instagram" as const, href: "https://www.instagram.com/sam_.f" },
    { kind: "linkedin" as const, href: "https://www.linkedin.com/in/samjfreeman1/" },
  ],
};

export const profiles: Profile[] = [
  {
    slug: "flair",
    name: "FLAIR",
    shortName: "FLAIR",
    tagline: "The Flair Collective",
    description:
      "A marketing collective and parent company to CampusLink, FLAIR Concierge, and FLAIR Wholesale.",
    website: { label: "theflaircollective.com", href: "https://theflaircollective.com" },
    socials: [
      { kind: "instagram", href: "https://www.instagram.com/flairdidthat" },
      { kind: "linkedin", href: "https://www.linkedin.com/company/the-flair-collective" },
    ],
    resources: [],
    children: [
      {
        slug: "campuslink",
        name: "CampusLink",
        tagline: "FLAIR's college marketing platform",
        description:
          "Connecting brands with college students through a network of campus ambassadors.",
        website: { label: "joincampuslink.com", href: "https://joincampuslink.com" },
        socials: [
          { kind: "instagram", href: "https://www.instagram.com/joincampuslink" },
          { kind: "linkedin", href: "https://www.linkedin.com/company/joincampuslink" },
        ],
        resources: [],
      },
      {
        slug: "concierge",
        name: "FLAIR Concierge",
        tagline: "Concierge services by FLAIR",
        website: { label: "theflairconcierge.com", href: "https://theflairconcierge.com" },
        socials: [
          { kind: "instagram", href: "https://www.instagram.com/flairconcierge" },
        ],
        resources: [],
      },
      {
        slug: "wholesale",
        name: "FLAIR Wholesale",
        tagline: "FLAIR's wholesale manifest",
        website: { label: "View the manifest", href: "https://wholesale-red.vercel.app/catalog" },
        socials: [],
        resources: [],
      },
    ],
  },
  {
    slug: "mtrnm",
    name: "MTRNM",
    tagline: "House music events.",
    description: "A house music brand and event series.",
    website: { label: "mtrnm.co", href: "https://www.mtrnm.co" },
    socials: [
      { kind: "instagram", href: "https://www.instagram.com/mtrnm_" },
      { kind: "linkedin", href: "https://www.linkedin.com/company/mtrnm" },
    ],
    resources: [
      // Add when ready:
      // { label: "Partnerships Deck", href: "" },
      // { label: "Press Kit", href: "" },
    ],
  },
  {
    slug: "stealth-labs",
    name: "Stealth Labs",
    tagline: "AI products.",
    description: "Building AI-native products and tools.",
    website: { label: "stealth-labs.ai", href: "https://stealth-labs.ai" },
    socials: [],
    resources: [],
  },
];

export function findProfile(slugs: string[]): Profile | null {
  let current: Profile | undefined;
  let pool = profiles;
  for (const slug of slugs) {
    current = pool.find((p) => p.slug === slug);
    if (!current) return null;
    pool = current.children ?? [];
  }
  return current ?? null;
}

export function getAncestors(slugs: string[]): Profile[] {
  const ancestors: Profile[] = [];
  let pool = profiles;
  for (let i = 0; i < slugs.length - 1; i++) {
    const found = pool.find((p) => p.slug === slugs[i]);
    if (!found) break;
    ancestors.push(found);
    pool = found.children ?? [];
  }
  return ancestors;
}

export function allProfilePaths(): string[][] {
  const out: string[][] = [];
  const walk = (nodes: Profile[], trail: string[]) => {
    for (const n of nodes) {
      const next = [...trail, n.slug];
      out.push(next);
      if (n.children?.length) walk(n.children, next);
    }
  };
  walk(profiles, []);
  return out;
}
