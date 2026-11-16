import { ImageResponse } from "next/og";
import { agency } from "@/data/agency-config";

export const alt = `${agency.name} — independent insurance in Kendallville, Indiana`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0a1a28 0%, #0f2537 55%, #214664 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, color: "#fbbf24", letterSpacing: 4, textTransform: "uppercase" }}>
          Independent Insurance · Kendallville, Indiana
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, marginTop: 24, lineHeight: 1.05 }}>
          {agency.name}
        </div>
        <div style={{ fontSize: 40, marginTop: 28, color: "#dbe6f0" }}>{agency.tagline}</div>
        <div style={{ fontSize: 32, marginTop: 56, color: "#ffffff" }}>
          {`Auto · Home · Health · Life · Business — ${agency.phone.display}`}
        </div>
      </div>
    ),
    size,
  );
}
