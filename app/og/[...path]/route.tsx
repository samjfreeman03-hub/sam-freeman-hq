import { ImageResponse } from "next/og";
import { allProfilePaths, findProfile, getAncestors } from "@/data/profiles";

const SIZE = { width: 1200, height: 630 };

export function generateStaticParams() {
  return allProfilePaths().map((path) => ({ path }));
}

function sizeFor(text: string): number {
  if (text.length <= 10) return 152;
  if (text.length <= 14) return 128;
  if (text.length <= 19) return 108;
  if (text.length <= 24) return 88;
  return 72;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const slug = path ?? [];

  const profile = slug.length > 0 ? findProfile(slug) : null;

  const name = profile?.name ?? "Sam Freeman.";
  const tagline =
    profile?.tagline ??
    "Building across marketing, global events, and AI.";
  const ancestors = profile ? getAncestors(slug) : [];

  const breadcrumb =
    ancestors.length > 0
      ? ancestors.map((a) => a.name).join("  ·  ").toUpperCase()
      : "SAM FREEMAN HQ";

  const nameFontSize = sizeFor(name);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f7f6f3",
          color: "#111111",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 88,
            height: 88,
            borderRadius: 22,
            background: "#111111",
            color: "#ffffff",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            marginBottom: 44,
          }}
        >
          SF
        </div>

        <div
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 20,
            letterSpacing: "0.12em",
            color: "#6e6e6e",
            marginBottom: 20,
            display: "flex",
          }}
        >
          {breadcrumb}
        </div>

        <div
          style={{
            fontSize: nameFontSize,
            fontWeight: 600,
            letterSpacing: "-0.045em",
            lineHeight: 1,
            display: "flex",
          }}
        >
          {name}
        </div>

        {tagline && (
          <div
            style={{
              fontSize: 34,
              color: "#6e6e6e",
              letterSpacing: "-0.012em",
              display: "flex",
              marginTop: 22,
              maxWidth: "100%",
            }}
          >
            {tagline}
          </div>
        )}
      </div>
    ),
    { ...SIZE }
  );
}
