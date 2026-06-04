import { ImageResponse } from "next/og";

export const alt = "Sam Freeman — HQ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        {/* SF monogram — matches the site */}
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
            marginBottom: 56,
          }}
        >
          SF
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 156,
            fontWeight: 600,
            letterSpacing: "-0.045em",
            lineHeight: 1,
            display: "flex",
          }}
        >
          Sam Freeman.
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 42,
            color: "#6e6e6e",
            letterSpacing: "-0.012em",
            display: "flex",
            marginTop: 24,
          }}
        >
          Building across marketing, global events, and AI.
        </div>
      </div>
    ),
    { ...size }
  );
}
