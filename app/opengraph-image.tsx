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
          background: "#111111",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top row: monogram + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#ffffff",
              color: "#111111",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            SF
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 18,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#777572",
              display: "flex",
            }}
          >
            samfreeman.org
          </div>
        </div>

        {/* Bottom: name + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 18,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#777572",
              display: "flex",
            }}
          >
            Sam Freeman — HQ
          </div>
          <div
            style={{
              fontSize: 132,
              fontWeight: 600,
              letterSpacing: "-0.045em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            Sam Freeman.
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#a8a6a2",
              letterSpacing: "-0.01em",
              display: "flex",
              marginTop: 8,
            }}
          >
            Building across global events, marketing, and AI.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
