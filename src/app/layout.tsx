import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, Space_Grotesk, Syne, Anton } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const syne = Syne({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const cormorant = Cormorant_Garamond({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const sanskaranLogo = "/sanskaran-logo.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.technosahotsava.in"),
  title: "Sanskaran & Sahotsava 2026",
  description:
    "Official portal for Sanskaran & Sahotsava 2026 — the annual cultural and music conclave where intellectual heritage meets stadium euphoria.",
  icons: {
    icon: { url: sanskaranLogo, type: "image/png" },
    apple: {
      url: `${sanskaranLogo}?v=20261124`,
      type: "image/png",
    },
  },
  openGraph: {
    title: "Sanskaran & Sahotsava 2026",
    description:
      "Official portal for Sanskaran & Sahotsava 2026 — the annual cultural and music conclave where intellectual heritage meets stadium euphoria.",
    siteName: "Sanskaran & Sahotsava 2026",
    type: "website",
    url: "/",
    images: [
      {
        url: sanskaranLogo,
        width: 2122,
        height: 2165,
        alt: "Sanskaran cultural club logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Sanskaran & Sahotsava 2026",
    description:
      "Official portal for Sanskaran & Sahotsava 2026 — the annual cultural and music conclave where intellectual heritage meets stadium euphoria.",
    images: [sanskaranLogo],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${syne.variable} ${anton.variable} ${cormorant.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#000000] text-[#EDE8FF] selection:bg-[#B9ACF0] selection:text-[#07060D] overflow-x-hidden">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
