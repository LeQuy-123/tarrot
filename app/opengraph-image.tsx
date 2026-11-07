import { ImageResponse } from "next/og";

export const alt = "ARCANA — The Astral Archive: an immersive 3D tarot reading chamber";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card used by every page. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse 80% 70% at 50% 0%, #3a2f6b 0%, #0b1026 55%, #05060d 100%)",
          color: "#ece3cf",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 14, color: "#c9a45c", textTransform: "uppercase" }}>The Astral Archive</div>
        <div style={{ fontSize: 168, letterSpacing: 18, color: "#e8d29a", marginTop: 12 }}>ARCANA</div>
        <div style={{ width: 360, height: 1, background: "#c9a45c", opacity: 0.6, marginTop: 18 }} />
        <div style={{ fontSize: 38, marginTop: 34, maxWidth: 900, textAlign: "center", lineHeight: 1.3 }}>
          An immersive 3D tarot reading chamber with an original 78-card deck
        </div>
      </div>
    ),
    size,
  );
}
