import type { Social, SocialKind } from "@/data/profiles";

function Icon({ kind }: { kind: SocialKind }) {
  switch (kind) {
    case "instagram":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zM8 8h4.37v1.92h.06c.61-1.15 2.1-2.36 4.33-2.36 4.63 0 5.48 3.05 5.48 7.01V22h-4.56v-6.2c0-1.48-.03-3.39-2.07-3.39-2.07 0-2.39 1.62-2.39 3.28V22H8V8z" />
        </svg>
      );
    case "twitter":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.91l-5.41-7.07L4.4 22H1.14l8.03-9.17L1 2h7.09l4.89 6.46L18.244 2zm-2.42 18h1.91L7.27 4H5.23l10.594 16z" />
        </svg>
      );
    case "soundcloud":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 14v4h1v-4H3zm2-2v6h1v-6H5zm2-1v7h1v-7H7zm2-1v8h1v-8H9zm3 .5V18h.5c2.6 0 4.5-1.6 4.5-4s-1.9-4-4.5-4H12zM18.5 11c-.36 0-.7.06-1 .17.18-3.4-2.4-5.92-5.5-5.92-1.9 0-3.6 1-4.5 2.5V18h11c1.66 0 3-1.34 3-3.25S20.16 11 18.5 11z" />
        </svg>
      );
    case "youtube":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M23 7.2s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.2-1C16.7 3.6 12 3.6 12 3.6s-4.7 0-7.9.3c-.4.1-1.3.1-2.1 1-.7.7-.9 2.3-.9 2.3S.9 9.1.9 11v1.9c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.5.3 7.5.3s4.7 0 7.9-.3c.5-.1 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 14.6V8.2l6.2 3.2-6.2 3.2z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M19.6 6.3a5.5 5.5 0 0 1-3.3-1.1V15a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.8a2.7 2.7 0 1 0 1.9 2.6V2h2.7a5.5 5.5 0 0 0 3.3 4.3v0z" />
        </svg>
      );
    case "email":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
  }
}

const labels: Record<SocialKind, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  twitter: "X (Twitter)",
  soundcloud: "SoundCloud",
  youtube: "YouTube",
  tiktok: "TikTok",
  email: "Email",
};

export function SocialIcons({ socials }: { socials: Social[] }) {
  if (!socials.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {socials.map((s) => (
        <a
          key={`${s.kind}-${s.href}`}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label ?? labels[s.kind]}
          title={s.label ?? labels[s.kind]}
          className="icon-link"
        >
          <Icon kind={s.kind} />
        </a>
      ))}
    </div>
  );
}
