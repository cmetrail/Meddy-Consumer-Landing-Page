import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Text, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import MobileScrollAnimations from "@/components/MobileScrollAnimations";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import { JsonLd, SITE_URL, OG_IMAGE, TWITTER_IMAGE, SITE_GRAPH_LD } from "@/lib/seo";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Text({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["500"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Meddy Health — Physician-Guided Primary Care",
    template: "%s",
  },
  description:
    "Meddy Health is physician-guided primary care built around your nutrition, workouts, sleep, and labs. Now accepting our first 500 patients.",
  keywords: [
    "Meddy Health",
    "primary care",
    "physician",
    "personalized health plan",
    "telehealth",
    "biomarkers",
    "nutrition",
    "fitness",
    "sleep",
    "labs",
  ],
  category: "healthcare",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "android-chrome-192x192", url: "/favicon/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/favicon/android-chrome-512x512.png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Meddy Health",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Meddy Health",
    title: "Meddy Health — Physician-Guided Primary Care",
    description:
      "Meddy Health is physician-guided primary care built around your nutrition, workouts, sleep, and labs.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Meddy Health" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meddy Health — Physician-Guided Primary Care",
    description:
      "Meddy Health is physician-guided primary care built around your nutrition, workouts, sleep, and labs.",
    images: [TWITTER_IMAGE],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const ORGANIZATION_LD = SITE_GRAPH_LD;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${dmSerif.variable} ${inter.variable} ${playfair.variable} antialiased`}
      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
    >
      <body className="min-h-dvh flex flex-col" suppressHydrationWarning={true}>
        <JsonLd data={ORGANIZATION_LD} />
        <SmoothScrollProvider>
          {children}
          <MobileScrollAnimations />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
