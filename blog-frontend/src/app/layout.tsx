import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Reader | Latest Technology Insights",
  description:
    "Discover the latest insights in technology, innovation, and digital transformation",
  keywords: [
    "technology",
    "innovation",
    "digital transformation",
    "AI",
    "blockchain",
  ],
  authors: [{ name: "Tech Reader Team" }],
  creator: "Tech Reader",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Tech Reader",
    title: "Tech Reader | Latest Technology Insights",
    description:
      "Your source for the latest technology insights and innovations",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tech Reader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Reader",
    description:
      "Your source for the latest technology insights and innovations",
    images: ["/og-image.jpg"],
  },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
