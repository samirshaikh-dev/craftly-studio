import { ImageResponse } from "next/og";

export const alt = "Craftly Studio — Digital Experiences Crafted for Business";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          color: "#fafafa",
          padding: "70px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            C
          </div>
          <span style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.5px" }}>
            Craftly Studio
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "#60a5fa",
            }}
          >
            Vapi, Gujarat • Digital Agency
          </div>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              margin: 0,
              color: "#ffffff",
            }}
          >
            Not another template website.
          </h1>
          <p
            style={{
              fontSize: "26px",
              lineHeight: 1.4,
              color: "#a1a1aa",
              margin: 0,
            }}
          >
            Bespoke web platforms, local SEO, and AI automation engineered for business growth.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #27272a",
            paddingTop: "24px",
          }}
        >
          <span style={{ fontSize: "18px", color: "#71717a" }}>
            craftly-studio.vercel.app
          </span>
          <div style={{ display: "flex", gap: "24px", fontSize: "16px", color: "#93c5fd" }}>
            <span>Next.js 16</span>
            <span>•</span>
            <span>Local SEO</span>
            <span>•</span>
            <span>AI Automation</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
