import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { profile } from "@/data/resume";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: profile.seo.title,
  description: profile.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: profile.seo.title,
    description: profile.seo.description,
    url: "/",
    siteName: profile.seo.title,
    locale: "ko_KR",
    type: "profile",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className="flex min-h-full flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
