import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Tecjato — Máquinas de jateamento e shot peening sob medida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #014076 0%, #012b4f 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "white",
            color: "#014076",
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: 4,
            padding: "10px 28px",
            borderRadius: 8,
            alignSelf: "flex-start",
          }}
        >
          TECJATO
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 40,
            maxWidth: 950,
          }}
        >
          Máquinas de jateamento e shot peening sob medida
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#9fc1e6",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          Fabricante verticalizada · ISO 9001:2015 · desde 1987 · Araquari/SC
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 16,
            background: "#0057FF",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
