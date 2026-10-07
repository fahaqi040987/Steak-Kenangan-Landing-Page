/**
 * Root Layout – Wraps every page with fonts, metadata, and global styles.
 * Next.js App Router: layout.tsx is the root shell; children are the current route's page.
 * Copy/metadata sourced from content/site values; fonts and colors are candidate-4 scope.
 */
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";

/** Playfair Display (serif) for headings — the brand's display face from the reference site. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

/** Inter (sans-serif) for body text. Variable exposes --font-inter for Tailwind. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

/**
 * SEO & social metadata for Steak Kenangan.
 * metadataBase: base URL for resolving relative image paths in Open Graph.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://steakkenangan.com"),
  title: {
    default:
      "Steak Kenangan — Rasa Yang Bercerita | Premium Steakhouse Sejak 2021",
    template: "%s | Steak Kenangan",
  },
  description:
    "Steak Kenangan adalah premium steakhouse yang berawal dari dapur sederhana di Belitung pada 2021. Lebih dari 100 item menu — Iga Bakar, Chicken Steak Crispy Black Paper, hingga pasta dan minuman signature. Hadir di Belitung, Depok Tanah Baru, Cibitung Bekasi, dan Jogjakarta. Bersertifikat Halal Indonesia. Reservasi tersedia, buka setiap hari 10.00–22.00 WIB.",
  keywords: [
    "steak kenangan",
    "steakhouse",
    "steak depok",
    "iga bakar",
    "restoran halal",
    "steak rumahan",
    "resto belitung",
    "reservasi meja",
    "steak cibitung",
    "steak jogja",
    "menu steak",
    "Next.js",
    "React",
    "TailwindCSS",
    "Framer Motion",
  ],
  authors: [
    {
      name: "Arnob Mahmud",
      url: "https://www.arnobmahmud.com",
    },
  ],
  other: {
    "application-name": "Steak Kenangan",
    "apple-mobile-web-app-title": "Steak Kenangan",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "mobile-web-app-capable": "yes",
    // Literal hex required by the theme-color spec — the one sanctioned copy;
    // mirrors `cream` in tailwind.config.js, the token seam.
    "theme-color": "#F7F1E6",
  },
  creator: "Arnob Mahmud",
  publisher: "Steak Kenangan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://steakkenangan.com",
    siteName: "Steak Kenangan",
    title: "Steak Kenangan — Rasa Yang Bercerita",
    description:
      "Premium steakhouse sejak 2021. Belitung • Depok Tanah Baru • Cibitung Bekasi • Jogjakarta. Bersertifikat Halal Indonesia.",
    images: [
      {
        url: "/hero/banner.jpg",
        alt: "Suasana Steak Kenangan",
      },
      {
        url: "/brand/logo-white.png",
        alt: "Logo Steak Kenangan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steak Kenangan — Rasa Yang Bercerita",
    description:
      "Premium steakhouse sejak 2021. Belitung • Depok • Bekasi • Jogja.",
    images: ["/hero/banner.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  category: "restaurant",
};

/**
 * Root layout: html lang matches the content locale (Indonesian); font CSS vars
 * come from next/font. Backgrounds are NOT set inline — globals.css @layer base
 * applies bg-cream to html/body, so the tailwind token seam stays the single edit point.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${playfair.variable} ${inter.variable}`}>
        {/* Skip link: first tab stop, jumps past the fixed header into the page */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-charcoal focus:text-gold focus:px-4 focus:py-2 focus:rounded-full"
        >
          Langsung ke konten
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
