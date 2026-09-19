import type { Metadata } from "next";
import { Archivo, Azeret_Mono } from "next/font/google";
import { CONTACT } from "@/lib/content";
import { ACCOUNT } from "@/lib/reels";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const azeret = Azeret_Mono({
  variable: "--font-azeret",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const DESCRIPTION = `Bellz Media builds organic content and distribution systems for businesses. ${ACCOUNT.totalViewsLabel} views across ${ACCOUNT.reelCount} reels, from an account with ${ACCOUNT.followers} followers.`;

export const metadata: Metadata = {
  metadataBase: new URL(CONTACT.siteUrl),
  title: {
    default: "Bellz Media",
    template: "%s · Bellz Media",
  },
  description: DESCRIPTION,
  applicationName: "Bellz Media",
  keywords: [
    "short-form video",
    "UGC creation",
    "Connecticut video production",
    "Instagram Reels",
    "TikTok content",
    "organic social",
    "content studio",
  ],
  authors: [{ name: "Jeffery Antwi" }],
  creator: "Jeffery Antwi",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: CONTACT.siteUrl,
    siteName: "Bellz Media",
    title: "Bellz Media — short-form built for reach",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bellz Media — short-form built for reach",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${azeret.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
