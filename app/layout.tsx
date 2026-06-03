import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://samfreeman.org"),
  title: {
    default: "Sam Freeman — HQ",
    template: "%s",
  },
  description:
    "Sam Freeman's hub: FLAIR, CampusLink, MTRNM, Stealth Labs, and more.",
  openGraph: {
    title: "Sam Freeman — HQ",
    description: "Building across global events, marketing, and AI.",
    url: "https://samfreeman.org",
    siteName: "Sam Freeman HQ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Freeman — HQ",
    description: "Building across global events, marketing, and AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
