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

export type ResourceGroup = {
  title?: string;
  items: Resource[];
};

export type Profile = {
  slug: string;
  name: string;
  shortName?: string;
  tagline: string;
  description?: string;
  website?: { label: string; href: string };
  socials: Social[];
  resources: ResourceGroup[];
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

// Shared resource — appears under both FLAIR Next-Gen and MTRNM
const methodOasisRecap: Resource = {
  label: "method oasis Recap Deck",
  href: "https://www.canva.com/design/DAHHkeoN3xo/hXP9G-uB661W-JuurynxoQ/view",
  note: "Coachella with method & Ulta Beauty",
};

export const profiles: Profile[] = [
  {
    slug: "flair",
    name: "FLAIR",
    shortName: "FLAIR",
    tagline: "The Flair Collective",
    description:
      "A marketing collective and parent company to CampusLink, FLAIR Concierge, FLAIR Wholesale, and FLAIR's marketing practice.",
    website: { label: "theflaircollective.com", href: "https://theflaircollective.com" },
    socials: [
      { kind: "instagram", href: "https://www.instagram.com/flairdidthat" },
      { kind: "linkedin", href: "https://www.linkedin.com/company/the-flair-collective" },
    ],
    resources: [],
    children: [
      {
        slug: "marketing",
        name: "FLAIR Marketing",
        tagline: "FLAIR's marketing practice",
        description:
          "FLAIR's marketing arm — campaign work and next-generation activations.",
        socials: [],
        resources: [],
        children: [
          {
            slug: "flair-marketing",
            name: "FLAIR Marketing",
            tagline: "Decks and sponsorships",
            socials: [],
            resources: [
              {
                items: [
                  {
                    label: "FLAIR Marketing Deck",
                    href: "https://www.canva.com/design/DAHG5rlUg_8/J1P3uaq_MG8Up1vIvIFxPQ/view?utm_content=DAHG5rlUg_8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h2c8f57f4a1",
                  },
                  {
                    label: "FLAIR x Equinox Run — Sponsorship Deck",
                    href: "https://www.canva.com/design/DAHKosoPxWQ/qU3hQx-J_V_wl0wuAlcmiw/view?utm_content=DAHKosoPxWQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hef6b7239f7#1",
                  },
                ],
              },
            ],
          },
          {
            slug: "next-gen",
            name: "FLAIR Next-Gen",
            tagline: "Next-generation campaigns and case studies",
            socials: [],
            resources: [
              {
                items: [
                  {
                    label: "FLAIR Next-Gen Deck",
                    href: "https://www.canva.com/design/DAHEvvjMNbg/_a5bS2jeeb90KSqi1hSpPg/view?utm_content=DAHEvvjMNbg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hade886e86a",
                  },
                ],
              },
              {
                title: "FLAIR Next-Gen Case Studies",
                items: [
                  {
                    label: "FLAIR x Coca-Cola",
                    href: "https://www.canva.com/design/DAGWNl9_akg/tj5HQynojoERC47V2aPjTw/view?utm_content=DAGWNl9_akg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h86867bdb5e",
                  },
                  {
                    label: "FLAIR x Monster Energy",
                    href: "https://www.canva.com/design/DAGHHHFbKiA/YsFw0cAfWrQ2Sp1QqWrsVw/view?utm_content=DAGHHHFbKiA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h7689cd47e4#1",
                  },
                  {
                    label: "FLAIR x Real American Beer",
                    href: "https://drive.google.com/file/d/1dEwxQ9kcBg3RkqbF_psn9kq3nPy9bbvY/view",
                  },
                  {
                    label: "FLAIR x WOW Media",
                    href: "https://www.canva.com/design/DAGpLWLLx_k/2hFP3hOzYjE_v9rxJUey7Q/view?utm_content=DAGpLWLLx_k&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he9b4670336",
                  },
                  methodOasisRecap,
                ],
              },
            ],
          },
        ],
      },
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
      {
        items: [
          {
            label: "MTRNM Press Kit",
            href: "https://www.canva.com/design/DAGl1YiBte8/uiLl_aUFG6DEB4IVfC4szA/view",
          },
          {
            label: "MTRNM Partnerships Deck",
            href: "https://www.canva.com/design/DAGt_oIo3BY/StFczSkMjwUX9Rdv8Gj3QA/view#1",
          },
          {
            label: "“Night At The Museum” Concept Deck",
            href: "https://canva.link/zkzck3br8ca96a8",
          },
          methodOasisRecap,
        ],
      },
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
