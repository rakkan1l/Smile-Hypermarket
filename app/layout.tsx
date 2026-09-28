import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/data/site";
import { images } from "@/data/images";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

/*
 * Google Fonts (Red Hat Display, Red Hat Text, Poppins), self-hosted from
 * /app/fonts for zero layout shift and no third-party request at runtime.
 */
const redHatDisplay = localFont({
  src: [
    { path: "./fonts/red-hat-display-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/red-hat-display-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-red-hat-display",
  display: "swap",
});

const redHatText = localFont({
  src: [
    { path: "./fonts/red-hat-text-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/red-hat-text-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-red-hat-text",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Smile Hypermarket | Kannur & UAE",
    template: "%s | Smile Hypermarket",
  },
  description: "Discover Smile Hypermarket locations, offers and services across Kannur and the UAE.",
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: images.hero, width: 1200, height: 630, alt: "Smile Hypermarket" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

/**
 * Applies the saved theme before first paint so there is no flash of the
 * wrong palette. Falls back to the operating system preference.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("smile-theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${redHatDisplay.variable} ${redHatText.variable} ${poppins.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
