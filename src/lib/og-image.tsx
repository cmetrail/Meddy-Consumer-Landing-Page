import { ImageResponse } from "next/og";

const BRAND_GREEN = "#17925a";
const MINT = "#6ee7a0";

function LogoMark() {
  return (
    <svg
      width="44"
      height="28"
      viewBox="0 0 44 28"
      fill="none"
      style={{ display: "block" }}
    >
      <rect x="0" y="6.47461" width="8.82074" height="20.7238" fill="white" />
      <path d="M17.5375 0H26.5657L9.1318 27.2H0.103516L17.5375 0Z" fill="white" />
      <path d="M34.971 0H43.9993L26.5654 27.2H17.5371L34.971 0Z" fill="white" />
      <rect x="17.5371" width="9.02829" height="27.2" fill="white" />
      <rect x="34.9727" width="9.02829" height="27.2" fill="white" />
    </svg>
  );
}

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 88px",
          background:
            "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(23,146,90,0.28), transparent 60%), linear-gradient(160deg, #0d100d 0%, #09090b 75%)",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: BRAND_GREEN,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LogoMark />
          </div>
          <div style={{ fontSize: "30px", fontWeight: 700, letterSpacing: "-0.01em" }}>
            Meddy Health
          </div>
        </div>

        <div
          style={{
            fontSize: "76px",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: "920px",
          }}
        >
          Physician-guided primary care.
        </div>

        <div
          style={{
            marginTop: "24px",
            fontSize: "30px",
            color: "#8a8a82",
            maxWidth: "760px",
            lineHeight: 1.4,
          }}
        >
          Built around your nutrition, workouts, sleep, and labs — that moves the needle.
        </div>

        <div
          style={{
            marginTop: "48px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: MINT,
              padding: "10px 22px",
              borderRadius: "999px",
              border: "2px solid rgba(110,231,160,0.4)",
            }}
          >
            Now accepting our first 500 patients
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
